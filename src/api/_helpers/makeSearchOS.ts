import type {
  AggregationsAggregate,
  MsearchResponse,
  SearchRequest,
  SearchResponse,
  SearchTotalHits,
} from '@opensearch-project/opensearch/api/types';
import { array, Struct } from 'superstruct';
import osClient from './osClient';

const getOSTotalValue = (total: SearchTotalHits | number) => {
  if (typeof total === 'number') {
    return total;
  }

  return total.value;
};

type RequestBodyType = SearchRequest['body'];
type SearchOSInputType<OptionsType> = {
  body: RequestBodyType;
  options?: OptionsType;
};
type SearchOSReturnType<SourceType> = {
  sources: SourceType[];
  total: number;
  aggregations: Record<string, AggregationsAggregate> | undefined;
  highlights: (Record<string, string[]> | undefined)[];
};
type WrapSearchBodyType<OptionsType> = (
  body: RequestBodyType,
  options: OptionsType | undefined
) => RequestBodyType;

async function singleSearch<SourceType>(
  body: RequestBodyType,
  index: string
): Promise<SearchOSReturnType<SourceType>[]> {
  const results = await osClient.search<SearchResponse<SourceType>>({
    index,
    body,
  });

  const sources = results.body.hits.hits.reduce<SourceType[]>((acc, curr) => {
    const source = curr._source;

    if (source) {
      return [...acc, source];
    }

    return acc;
  }, []);
  const { aggregations } = results.body;
  const highlights = results.body.hits.hits.map((entry) => entry.highlight);

  return [
    {
      sources,
      aggregations,
      total: getOSTotalValue(results.body.hits.total),
      highlights,
    },
  ];
}

async function multiSearch<SourceType>(
  body: string[]
): Promise<SearchOSReturnType<SourceType>[]> {
  const mSearchResults = await osClient.msearch<
    MsearchResponse<SourceType>,
    string[]
  >({
    body,
  });

  const responses = mSearchResults.body.responses.reduce<
    SearchOSReturnType<SourceType>[]
  >((acc, curr) => {
    if ('error' in curr) {
      return acc;
    }

    const { aggregations } = curr;

    const sources = curr.hits.hits.reduce<SourceType[]>((yAcc, yCurr) => {
      if (!yCurr._source) {
        return yAcc;
      }

      return [...yAcc, yCurr._source];
    }, []);

    const highlights = curr.hits.hits.map((entry) => entry.highlight);

    return [
      ...acc,
      {
        sources,
        aggregations,
        total: getOSTotalValue(curr.hits.total),
        highlights,
      },
    ];
  }, []);

  return responses;
}

function makeSearchOS<SourceType, OptionsType>(
  index: string,
  struct: Struct<SourceType>,
  wrapSearchBody: WrapSearchBodyType<OptionsType>
) {
  return async (
    input: SearchOSInputType<OptionsType>[]
  ): Promise<SearchOSReturnType<SourceType>[]> => {
    const creator = array(struct);
    const isSingleSearch = input.length === 1;
    let data: SearchOSReturnType<SourceType>[] = [];

    if (isSingleSearch) {
      const body = wrapSearchBody(input[0].body, input[0].options);
      data = await singleSearch<SourceType>(body, index);
    } else {
      const body = input.flatMap((entry) => [
        `{ "index": "${index}" }`,
        JSON.stringify(wrapSearchBody(entry.body, entry.options)),
      ]);
      data = await multiSearch<SourceType>(body);
    }

    return data.map((entry) => ({
      ...entry,
      sources: creator.create(entry.sources),
    }));
  };
}

export default makeSearchOS;
