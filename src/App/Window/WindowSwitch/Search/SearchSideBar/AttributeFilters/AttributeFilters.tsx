import styled from '@emotion/styled';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';
import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import findTopLevelAttributeAtom from '../../../_atoms/findTopLevelAttributeAtom';
import searchStateAtom from '../../../_atoms/searchStateAtom';
import searchTopAggregationAtom from '../../../_atoms/searchTopAggregationAtom';
import useToggleTopLevelAttributeNode from '../../../_hooks/useToggleTopLevelAttributeNode';
import ExplorerAccordion from '../../../_sharedComponents/ExplorerAccordion';
import CollectionQueryNodeType from '../../../_types/CollectionQueryNodeType';
import useToggleCollectionQueryNode from './_hooks/useToggleCollectionQueryNode';

const RootContainer = styled(Scrollbars)`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 16px;
`;

const showCollectionsAtom = atom<boolean>({
  key: 'showCollectionsAtom',
  default: false,
});

const showAllAttributesAtom = atom<{ [key: string]: boolean }>({
  key: 'showAllAttributesAtom',
  default: {},
});

const attributeFilterDataAtom = selector({
  key: 'attributeFilterDataAtom',
  get: ({ get }) => {
    const aggregations = get(searchTopAggregationAtom);
    const findAttribute = get(findTopLevelAttributeAtom);
    const showAll = get(showAllAttributesAtom);
    const { query } = get(searchStateAtom);
    const collectionIds = Object.values(query.nodes).reduce<string[]>(
      (acc, curr) => {
        if (CollectionQueryNodeType.is(curr)) {
          return [...acc, curr.value];
        }

        return acc;
      },
      []
    );

    const attributes = aggregations.attributes.map((attribute) => {
      const options = attribute.values
        .map((entry) => ({
          id: entry.value,
          label: entry.value,
          count: entry.count,
          checked: !!findAttribute(attribute.key, entry.value),
        }))
        .sort(
          (a, b) => Number(b.checked) - Number(a.checked) || b.count - a.count
        );

      return {
        key: attribute.key,
        options,
        expanded: showAll[attribute.key] || false,
      };
    });

    const collections = aggregations.collections.map((collection) => ({
      id: collection.id,
      label: collection.name,
      count: collection.count,
      checked: collectionIds.includes(collection.id),
    }));

    return { attributes, collections };
  },
});

interface AttributeAccordianProps {
  title: string;
  options: {
    id: string;
    label: string;
    count: number;
    checked: boolean;
  }[];
  expanded: boolean;
  onAccordianChange: () => void;
  onToggle: (id: string) => void;
}

function AttributeAccordian({
  title,
  options,
  expanded,
  onAccordianChange,
  onToggle,
}: AttributeAccordianProps) {
  const visibleOptions = expanded
    ? options
    : options.filter((entry) => entry.checked);
  const expandIcon =
    !expanded && visibleOptions.length > 0 ? <ExpandLess /> : <ExpandMore />;

  return (
    <ExplorerAccordion
      className="disable-padding"
      title={title}
      expandIcon={expandIcon}
      content={
        <FormGroup>
          {visibleOptions.map(({ id, label, checked, count }) => (
            <FormControlLabel
              key={id}
              control={
                <Checkbox
                  sx={{ ml: 2 }}
                  size="small"
                  checked={checked}
                  onChange={() => onToggle(id)}
                />
              }
              label={
                <Typography sx={{ fontSize: '80%' }}>
                  {label} ({count})
                </Typography>
              }
            />
          ))}
        </FormGroup>
      }
      expanded={visibleOptions.length > 0}
      onChange={onAccordianChange}
    />
  );
}

function AttributeFilters() {
  const { attributes, collections } = useRecoilValue(attributeFilterDataAtom);
  const [showAll, setShowAll] = useRecoilState(showAllAttributesAtom);
  const [showCollections, setShowCollections] =
    useRecoilState(showCollectionsAtom);
  const toggleAttribute = useToggleTopLevelAttributeNode();
  const toggleCollectionQueryNode = useToggleCollectionQueryNode();

  return (
    <RootContainer autoHide={true}>
      <ContentContainer>
        {collections.length ? (
          <AttributeAccordian
            title="Collections"
            expanded={showCollections}
            options={collections}
            onToggle={(collectionId) => toggleCollectionQueryNode(collectionId)}
            onAccordianChange={() => setShowCollections(!showCollections)}
          />
        ) : null}
        {attributes.map((attribute) => (
          <AttributeAccordian
            key={attribute.key}
            title={attribute.key}
            expanded={attribute.expanded}
            options={attribute.options}
            onToggle={(attributeValue) =>
              toggleAttribute(attribute.key, attributeValue)
            }
            onAccordianChange={() => {
              setShowAll({
                ...showAll,
                [attribute.key]: !attribute.expanded,
              });
            }}
          />
        ))}
      </ContentContainer>
    </RootContainer>
  );
}

export default AttributeFilters;
