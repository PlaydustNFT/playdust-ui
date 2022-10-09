import styled from '@emotion/styled';
import { Check } from '@mui/icons-material';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Slider,
  TextField,
  Typography,
} from '@mui/material';
import React, { useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import useRemoveQueryNode from '../../../_hooks/useRemoveQueryNode';
import type RangeValueUnionType from '../../../_types/RangeValueUnionType';
import findTopLevelRangeQueryNodesAtom from './_atoms/findTopLevelRangeQueryNodesAtom';
import useUpsertTopLevelRangeQueryNode from './_hooks/useUpsertTopLevelRangeQueryNode';

interface RangeFilterProps {
  label: string;
  value: RangeValueUnionType;
  isSlider?: boolean;
}

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ActiveContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextFieldContainer = styled.div`
  display: flex;
  align-items: center;
`;

interface RangeTextFieldProps {
  value: number | undefined;
  label: string;
  setter: React.Dispatch<React.SetStateAction<number | undefined>>;
}

function RangeTextField({ value, label, setter }: RangeTextFieldProps) {
  return (
    <TextField
      label={label}
      placeholder="SOL"
      size="small"
      type="number"
      value={value === undefined ? '' : value}
      onChange={(evt) => {
        const nextValue = evt.target.value;

        if (nextValue === '') {
          return setter(undefined);
        }

        setter(parseFloat(evt.target.value));
      }}
    />
  );
}

function RangeSlider({ label, value, isSlider }: RangeFilterProps) {
  const findRange = useRecoilValue(findTopLevelRangeQueryNodesAtom);
  const found = useMemo(() => findRange(value), [findRange, value]);
  const [localMin, setLocalMin] = useState<number | undefined>();
  const [localMax, setLocalMax] = useState<number | undefined>();
  const [hasTouchedMin, setHasTouchedMin] = useState(false);
  const [hasTouchedMax, setHasTouchedMax] = useState(false);
  const [localVisible, setLocalVisible] = useState(false);
  const upsertRange = useUpsertTopLevelRangeQueryNode();
  const removeQueryNode = useRemoveQueryNode();

  const visible = useMemo(
    () => (found ? true : localVisible),
    [found, localVisible]
  );

  const sliderValue = useMemo(() => {
    const getMin = () => {
      if (localMin !== undefined) {
        return localMin;
      }

      return found?.min || 0;
    };

    const min = getMin();
    const max = localMax || found?.max || 100;

    return {
      min,
      max,
    };
  }, [localMin, localMax, found]);

  const textValue = useMemo(() => {
    if (found) {
      return {
        min: hasTouchedMin ? localMin : found.min,
        max: hasTouchedMax ? localMax : found.max,
      };
    }

    return {
      min: localMin,
      max: localMax,
    };
  }, [found, hasTouchedMax, hasTouchedMin, localMax, localMin]);

  const disabled = useMemo(() => {
    if (found && found.min === localMin && found.max === localMax) {
      return true;
    }

    if (isSlider) {
      return sliderValue.min === 0 && sliderValue.max === 100;
    }

    if (localMax && localMin) {
      return localMin >= localMax;
    }

    const hasOneValue =
      (localMax && localMax > 0) || (localMin && localMin > 0);

    return !hasOneValue;
  }, [found, isSlider, localMax, localMin, sliderValue.max, sliderValue.min]);

  return (
    <ItemContainer>
      <FormControlLabel
        control={
          <Checkbox
            checked={visible}
            size="small"
            onChange={() => {
              if (found) {
                removeQueryNode(found.id);
                return setLocalVisible(false);
              }
              setLocalVisible(!localVisible);
            }}
          />
        }
        label={label}
      />
      {visible && (
        <ActiveContainer>
          {isSlider ? (
            <Slider
              sx={{
                mx: 1,
              }}
              disableSwap={true}
              value={[sliderValue.min, sliderValue.max]}
              onChange={(_evt, newValue) => {
                if (Array.isArray(newValue)) {
                  const [newMin, newMax] = newValue;
                  if (newMax - newMin >= 1) {
                    setLocalMin(newMin);
                    setLocalMax(newMax);
                  }
                }
              }}
              valueLabelDisplay="auto"
              valueLabelFormat={(valueLabel) => `${valueLabel}%`}
            />
          ) : (
            <TextFieldContainer>
              <RangeTextField
                label="min"
                value={textValue.min}
                setter={(arg) => {
                  setLocalMin(arg);
                  setHasTouchedMin(true);
                }}
              />
              <Typography sx={{ mx: 1 }}>to</Typography>
              <RangeTextField
                label="max"
                value={textValue.max}
                setter={(arg) => {
                  setLocalMax(arg);
                  setHasTouchedMax(true);
                }}
              />
            </TextFieldContainer>
          )}
          <IconButton
            color="primary"
            sx={{ ml: 1 }}
            disabled={disabled}
            onClick={() => {
              if (!disabled) {
                const { min, max } = isSlider ? sliderValue : textValue;
                upsertRange(value, min, max);
              }
            }}
          >
            <Check />
          </IconButton>
        </ActiveContainer>
      )}
    </ItemContainer>
  );
}

function RangeFilters() {
  return (
    <RootContainer>
      <RangeSlider label="Filter by List Price" value="list-price" />
      <RangeSlider label="Filter by Sales Price" value="sale-price" />
      <RangeSlider
        label="Filter by Rarity"
        value="rarity-score"
        isSlider={true}
      />
    </RootContainer>
  );
}

export default RangeFilters;
