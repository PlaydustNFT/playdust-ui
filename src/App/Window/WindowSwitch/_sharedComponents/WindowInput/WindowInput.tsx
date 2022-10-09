import styled from '@emotion/styled';
import { Clear, Redo } from '@mui/icons-material';
import { Box, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDebounceCallback } from '@react-hook/debounce';
import { useSelect } from 'downshift';
import parse from 'html-react-parser';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { isMobile } from 'react-device-detect';
import AutosizeInput from 'react-input-autosize';
import { useClickAway } from 'react-use';
import { AutoSizer, ListRowRenderer } from 'react-virtualized';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import windowStateAtom from '../../../_atoms/windowStateAtom';
import clearSearchQueryAtom from '../../_atoms/clearSearchQueryAtom';
import searchQueryActiveNodeMetaAtom from '../../_atoms/searchQueryActiveNodeMetaAtom';
import searchQueryRootNodeAtom from '../../_atoms/searchQueryRootNodeAtom';
import SkeletonRows from '../SkeletonRows';
import VirtualizedList from '../VirtualizedList';
import QueryNodeChip from './QueryNodeChip/QueryNodeChip';
import RenderQuery from './RenderQuery/RenderQuery';
import searchQueryDebouncedTermAtom from './_atoms/searchQueryDebouncedTermAtom';
import searchQueryTermAtom from './_atoms/searchQueryTermAtom';
import searchSuggestionIdxAtom from './_atoms/searchSuggestionIdxAtom';
import searchSuggestionsAtom from './_atoms/searchSuggestionsAtom';
import searchSuggestionsForcedClosedAtom from './_atoms/searchSuggestionsForcedClosedAtom';
import useOnSuggestionChange from './_hooks/useOnSuggestionChange';
import useWindowInputKeyEvent from './_hooks/useWindowInputKeyEvent';

const RootContainer = styled.div`
  position: relative;
  width: 100%;
`;

interface InputContainerProps {
  isMobile: boolean;
}

const InputContainer = styled(Box)<InputContainerProps>`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  flex-wrap: ${(props) => (props.isMobile ? 'nowrap' : 'wrap')};
  padding: 0 8px;
  font-size: 80%;
  background: none;
  cursor: text;
  width: 100%;
  min-height: 58px;
  overflow-x: auto;
`;

const OverlayContainer = styled(Paper)`
  position: absolute;
  width: 100%;
  padding-top: 8px;
`;

const EmptyContainer = styled.div`
  display: flex;
  min-height: 48px;
  align-items: center;
`;

function WindowInput() {
  const [activeNodeMeta, setActiveNodeMeta] = useRecoilState(
    searchQueryActiveNodeMetaAtom
  );
  const [inInput, setInInput] = useState(false);
  const rootNode = useRecoilValue(searchQueryRootNodeAtom);
  const [term, setTerm] = useRecoilState(searchQueryTermAtom);
  const setDTerm = useSetRecoilState(searchQueryDebouncedTermAtom);
  const setDebouncedTerm = useDebounceCallback(setDTerm, 500);
  const theme = useTheme();
  const isActive = !!activeNodeMeta;
  const borderColor = isActive
    ? theme.palette.primary.main
    : theme.palette.grey[400];
  const borderWidth = isActive ? 1.5 : 1;
  const containerRef = useRef(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const setInputRef = useCallback((inputElement: HTMLInputElement | null) => {
    inputRef.current = inputElement;
  }, []);

  const [activeIdx, setActiveIdx] = useRecoilState(searchSuggestionIdxAtom);
  const { suggestions, loading } = useRecoilValue(searchSuggestionsAtom);
  const onSuggestionChange = useOnSuggestionChange();
  const [forceClosed, setForceClosed] = useRecoilState(
    searchSuggestionsForcedClosedAtom
  );
  const windowState = useRecoilValue(windowStateAtom);
  const [clearSearchQuery, setClearSearchQuery] =
    useRecoilState(clearSearchQueryAtom);
  const inExplorer = !['home', 'search'].includes(windowState.type);

  useEffect(() => {
    setInInput(false);
    setTerm('');
    setDTerm('');
  }, [windowState.state]); // eslint-disable-line

  useClickAway(containerRef, () => {
    setForceClosed(true);
    setActiveNodeMeta(null);
    setInInput(false);

    if (inExplorer && windowState.state === term) {
      setTerm('');
      setDTerm('');
    }
  });

  useEffect(() => {
    setTerm('');
    setDTerm('');
    setActiveIdx(0);
  }, [activeNodeMeta]); // eslint-disable-line

  useWindowInputKeyEvent();

  const { isOpen, getItemProps, getMenuProps, getToggleButtonProps } =
    useSelect({
      items: suggestions,
      isOpen: suggestions.length > 0,
      highlightedIndex: activeIdx,
    });

  const showOverlay = isOpen && !forceClosed;

  const textInput = useMemo(
    () => (
      <AutosizeInput
        key="auto-size-input"
        inputStyle={{
          fontFamily: 'inherit',
          border: 'none',
          outline: 'none',
          background: 'inherit',
        }}
        inputRef={setInputRef}
        value={term}
        placeholder={
          !inExplorer && (!rootNode || clearSearchQuery)
            ? 'Search...'
            : undefined
        }
        onChange={(evt) => {
          const { value } = evt.target;

          if (value.includes('(') || value.includes(')')) {
            return;
          }

          if (activeIdx !== 0) {
            setActiveIdx(0);
          }
          setForceClosed(false);
          setTerm(value);
          setDebouncedTerm(value);
        }}
        autoFocus={true}
        onBlur={() => {
          if (suggestions.length > 0) {
            inputRef?.current?.focus();
          }
        }}
      />
    ),
    [
      activeIdx,
      clearSearchQuery,
      rootNode,
      setActiveIdx,
      setDebouncedTerm,
      setForceClosed,
      setInputRef,
      setTerm,
      suggestions.length,
      term,
      inExplorer,
    ]
  );

  const rowRenderer = useCallback<ListRowRenderer>(
    ({ index, key, style }) => {
      const suggestion = suggestions[index];
      const isActiveSuggestion = activeIdx === index;

      return (
        <div key={key} style={style}>
          <Typography
            {...getItemProps({ item: suggestion, index })}
            onMouseMove={undefined}
            sx={{
              paddingX: 3,
              paddingY: 0.5,
              height: '100%',
              fontSize: '80%',
              cursor: 'pointer',
              whiteSpace: 'noWrap',
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              textAlign: 'left',
              alignSelf: 'flex-start',
              border: 'none',
              outline: 'none',
              background: isActiveSuggestion
                ? theme.palette.grey[200]
                : theme.palette.background.default,
              '&:hover': {
                background: isActiveSuggestion
                  ? 'auto'
                  : theme.palette.grey[100],
              },
            }}
            onClick={() => onSuggestionChange(suggestion)}
          >
            {parse(suggestion.label)}
          </Typography>
        </div>
      );
    },
    [activeIdx, getItemProps, onSuggestionChange, suggestions, theme.palette]
  );

  const rowHeight = 30;
  const maxHeight = window.innerHeight * 0.5;

  return (
    <RootContainer ref={containerRef}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          border: 'solid',
          borderColor,
          borderWidth,
          '&:hover': {
            borderColor: theme.palette.primary.main,
          },
        }}
      >
        {windowState.type === 'search' && (
          <IconButton
            sx={{ ml: 1 }}
            onClick={(evt) => {
              evt.stopPropagation();
              setClearSearchQuery(!clearSearchQuery);
            }}
          >
            {clearSearchQuery ? <Redo /> : <Clear />}
          </IconButton>
        )}
        <InputContainer
          {...getToggleButtonProps()}
          onClick={() => {
            setForceClosed(false);

            if (inExplorer) {
              setInInput(true);
              setTerm(windowState.state);
              setDTerm(windowState.state);

              setTimeout(() => {
                inputRef?.current?.select();
              }, 150);
            }

            if (rootNode) {
              setActiveNodeMeta({
                type: 'group',
                nodeId: rootNode.id,
                index: rootNode.children.length,
              });
            }
            inputRef?.current?.focus();
          }}
          isMobile={isMobile}
        >
          {windowState.type === 'search' && !clearSearchQuery && (
            <RenderQuery
              renderChipInput={(node) => (
                <QueryNodeChip textInput={textInput} node={node} />
              )}
            />
          )}
          {(windowState.type !== 'search' || clearSearchQuery) && (
            <EmptyContainer>
              {!inInput && inExplorer && (
                <>
                  <QueryNodeChip
                    textInput={textInput}
                    explorerText={windowState.state}
                  />
                  &nbsp;
                </>
              )}
              {textInput}
            </EmptyContainer>
          )}
        </InputContainer>
      </Box>
      <OverlayContainer
        elevation={showOverlay ? 8 : 0}
        {...getMenuProps()}
        sx={{
          border: 'none',
          outline: 'none',
        }}
      >
        {showOverlay && (
          <>
            <AutoSizer disableHeight={true}>
              {({ width }) => (
                <VirtualizedList
                  height={Math.min(maxHeight, suggestions.length * rowHeight)}
                  width={width}
                  rowCount={suggestions.length}
                  rowRenderer={rowRenderer}
                  rowHeight={30}
                  overscanRowCount={4}
                  scrollToIndex={activeIdx}
                />
              )}
            </AutoSizer>
            {loading && (
              <Stack sx={{ px: 3 }}>
                <SkeletonRows rows={2} />
              </Stack>
            )}
          </>
        )}
      </OverlayContainer>
    </RootContainer>
  );
}

export default WindowInput;
