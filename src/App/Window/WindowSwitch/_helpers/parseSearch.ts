import SearchStateType from '../_types/SearchStateType';
import validateSearchQuery from './validateSearchQuery';

const parseSearch = (input: string): SearchStateType => {
  try {
    const created = SearchStateType.create(JSON.parse(input));

    if (!validateSearchQuery(created.query)) {
      throw new Error();
    }

    return created;
  } catch {
    return {
      query: {
        rootId: '',
        nodes: {},
      },
    };
  }
};

export default parseSearch;
