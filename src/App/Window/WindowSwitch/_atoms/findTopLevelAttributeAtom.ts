import { selector } from 'recoil';
import AttributeQueryNodeType from '../_types/AttributeQueryNodeType';
import secondLevelAttributeMapAtom from './secondLevelAttributeMapAtom';
import topLevelAttributesMapAtom from './topLevelAttributesMapAtom';

const findTopLevelAttributeAtom = selector<
  (key: string, value: string) => AttributeQueryNodeType | undefined
>({
  key: 'findTopLevelAttributeAtom',
  get: ({ get }) => {
    const topLevelAttributes = get(topLevelAttributesMapAtom);
    const secondLevelAttributes = get(secondLevelAttributeMapAtom);
    const attributes = { ...topLevelAttributes, ...secondLevelAttributes };

    return (key, value) => {
      if (attributes[key] && attributes[key][value]) {
        return attributes[key][value];
      }
    };
  },
});

export default findTopLevelAttributeAtom;
