import { array, number, object, string, type } from 'superstruct';
import SearchAggResponseType from '../../App/Window/WindowSwitch/_types/SearchAggResponseType';

const SearchAttributeAggType = type({
  name: object({
    doc_count: number(),
    key: object({
      doc_count_error_upper_bound: number(),
      sum_other_doc_count: number(),
      buckets: array(
        object({
          key: string(),
          doc_count: number(),
          value: object({
            doc_count_error_upper_bound: number(),
            sum_other_doc_count: number(),
            buckets: array(
              object({
                key: string(),
                doc_count: number(),
              })
            ),
          }),
        })
      ),
    }),
  }),
});

const parseAttributeAggs = (
  maybeAggregations: unknown
): SearchAggResponseType => {
  const aggregations = SearchAttributeAggType.create(maybeAggregations);

  return aggregations.name.key.buckets.map((bucket) => ({
    key: bucket.key,
    values: bucket.value.buckets.map((bucketValue) => ({
      value: bucketValue.key,
      count: bucketValue.doc_count,
    })),
  }));
};

export default parseAttributeAggs;
