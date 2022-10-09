import { WindowUnionType } from '../../../../../_types/WindowUnionType';

type SearchSuggestionType =
  | {
      key: string;
      group: 'Search' | 'No Results';
      label: string;
    }
  | {
      key: string;
      group: 'Attribute';
      label: string;
      attributeMeta: {
        key: string;
        value: string;
      };
    }
  | {
      key: string;
      group: 'Collections';
      label: string;
      collectionId: string;
    }
  | {
      key: string;
      type: WindowUnionType;
      group: 'Explorer';
      label: string;
      meta: string;
    }
  | {
      key: string;
      label: string;
      group: 'Selection';
      action: 'remove';
    }
  | {
      key: string;
      label: string;
      group: 'Selection';
      action: 'group';
    };

export default SearchSuggestionType;
