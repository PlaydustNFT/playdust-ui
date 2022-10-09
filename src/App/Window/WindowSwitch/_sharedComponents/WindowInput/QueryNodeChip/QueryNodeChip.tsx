import styled from '@emotion/styled';
import { Chip } from '@mui/material';
import React from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import searchQueryActiveNodeMetaAtom from '../../../_atoms/searchQueryActiveNodeMetaAtom';
import useRemoveQueryNode from '../../../_hooks/useRemoveQueryNode';
import QueryNodeType from '../../../_types/QueryNodeType';
import collectionByIdAtom from './_atoms/collectionByIdAtom';

const QueryNodeChipContainer = styled.div`
  display: flex;
  align-items: start;
`;

function CollectionChip({ value }: QueryNodeType) {
  const collectionById = useRecoilValueLoadable(collectionByIdAtom(value));

  if (collectionById.state === 'hasValue') {
    return (
      <span>
        Collection:{' '}
        {collectionById.contents?.name || collectionById.contents?.symbol}
      </span>
    );
  }

  return <span>Collection:</span>;
}

const capitalize = (input: string) =>
  `${input[0].toUpperCase()}${input.slice(1)}`;

type ChipLabelProps = {
  node?: QueryNodeType;
};

function ChipLabel({ node }: ChipLabelProps) {
  if (!node) {
    return null;
  }

  switch (node.field) {
    case 'attribute': {
      if (node.value.length === 0) {
        return <>Attribute Trait: {node.key}</>;
      }

      const key = node.key === '' ? 'Attribute Value' : node.key;

      return (
        <>
          {key}: {node.value}
        </>
      );
    }
    case 'collection':
      return <CollectionChip {...node} />;
    case 'text':
      return <span>{node.value}</span>;
    case 'range': {
      const label = node.value.split('-').map(capitalize).join(' ');
      const endLabel = node.value !== 'rarity-score' ? 'SOL' : '%';

      if (!node.max) {
        return (
          <>
            {label}: &gt;{node.min} {endLabel}
          </>
        );
      }

      if (!node.min) {
        return (
          <>
            {label}: &lt;{node.max} {endLabel}
          </>
        );
      }

      return (
        <>
          {label}: {node.min}-{node.max} {endLabel}
        </>
      );
    }
    default: {
      return null;
    }
  }
}

interface SearchChipsProps {
  disabled: boolean;
  isActive: boolean;
  node?: QueryNodeType;
  className?: string;
  textInput: JSX.Element;
  explorerText?: string;
}

function RenderQueryNodeChip({
  className,
  disabled,
  isActive,
  node,
  textInput,
  explorerText,
}: SearchChipsProps) {
  const removeQueryNode = useRemoveQueryNode();

  return (
    <Chip
      className={className}
      disabled={disabled}
      label={
        <>
          <ChipLabel node={node} />
          {!node && explorerText ? explorerText : null}
          {isActive &&
            node?.field !== 'collection' &&
            !explorerText &&
            textInput}
        </>
      }
      variant="outlined"
      color={isActive ? 'primary' : 'default'}
      sx={{
        border: isActive ? '2px solid #276EF1' : '',
        '.MuiChip-deleteIcon': {
          display: 'none',
        },
        '&:hover':
          isActive || explorerText
            ? {}
            : {
                cursor: 'pointer',
                backgroundColor: '#276EF1',
                borderColor: '#276EF1',
                color: 'white',
                '.MuiChip-deleteIcon': {
                  display: 'unset',
                  color: 'white',
                  '&:hover': {
                    color: '#DCE8FD',
                  },
                },
              },
      }}
      onDelete={
        QueryNodeType.is(node) ? () => removeQueryNode(node.id) : undefined
      }
    />
  );
}

type QueryNodeProps = {
  node?: QueryNodeType;
  textInput: JSX.Element;
  explorerText?: string;
};

function QueryNodeChip({ node, textInput, explorerText }: QueryNodeProps) {
  const activeNodeMeta = useRecoilValue(searchQueryActiveNodeMetaAtom);

  if (explorerText) {
    return (
      <QueryNodeChipContainer>
        <RenderQueryNodeChip
          isActive={false}
          disabled={false}
          textInput={textInput}
          explorerText={explorerText}
        />
      </QueryNodeChipContainer>
    );
  }

  if (!node) {
    return (
      <QueryNodeChipContainer>
        <RenderQueryNodeChip
          isActive={true}
          disabled={false}
          textInput={textInput}
        />
      </QueryNodeChipContainer>
    );
  }

  return (
    <QueryNodeChipContainer>
      <RenderQueryNodeChip
        isActive={node.id === activeNodeMeta?.nodeId}
        node={node}
        disabled={false}
        textInput={textInput}
      />
    </QueryNodeChipContainer>
  );
}

export default QueryNodeChip;
