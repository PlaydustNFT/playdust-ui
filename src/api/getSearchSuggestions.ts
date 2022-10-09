import { SearchRequest } from '@opensearch-project/opensearch/api/types';
import { string, type } from 'superstruct';
import SearchSuggestionResponseType from '../App/Window/WindowSwitch/_sharedComponents/WindowInput/_types/SearchSuggestionResponseType';
import nextApiHandler from './_helpers/nextApiHandler';
import searchCollections from './_helpers/searchCollections';

const getCollectionQuery = (term: string): SearchRequest['body'] => ({
  size: 20,
  query: {
    multi_match: {
      fields: ['description', 'name', 'symbol'],
      query: term,
    },
  },
  _source: {
    exclude: ['attributes'],
  },
  highlight: {
    fields: {
      description: {},
      name: {},
      symbol: {},
    },
    pre_tags: ['<b>'],
    post_tags: ['</b>'],
  },
  sort: [
    {
      'volume.global.total': {
        order: 'desc',
      },
    },
  ],
});

const SearchSuggestionsBody = type({
  term: string(),
});

const getSearchSuggetions = nextApiHandler<SearchSuggestionResponseType>(
  async (req) => {
    const { term } = SearchSuggestionsBody.create(req.body);
    const collectionBody = getCollectionQuery(term);
    const [collectionResult] = await searchCollections([
      { body: collectionBody },
    ]);

    const collections = collectionResult.sources.map((source, idx) => ({
      source,
      highlights: collectionResult.highlights[idx],
    }));

    return {
      collections,
    };
  }
);

export default getSearchSuggetions;
