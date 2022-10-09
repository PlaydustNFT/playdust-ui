import { FilterAltOutlined } from '@mui/icons-material';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  Popover,
} from '@mui/material';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import findTopLevelAttributeAtom from '../../_atoms/findTopLevelAttributeAtom';
import useToggleTopLevelAttributeNode from '../../_hooks/useToggleTopLevelAttributeNode';
import type OpenSearchNFTSourceType from '../../_types/OpenSearchNFTSourceType';

interface TokenCardFilterProps {
  metadata: OpenSearchNFTSourceType;
}

function TokenCardFilter({ metadata }: TokenCardFilterProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const { attributes } = metadata;
  const findAttribute = useRecoilValue(findTopLevelAttributeAtom);
  const toggleAttribute = useToggleTopLevelAttributeNode();

  return (
    <>
      <IconButton
        onClick={(evt) => setAnchorEl(evt.currentTarget)}
        size="small"
      >
        <FilterAltOutlined />
      </IconButton>
      <Popover
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
          <FormGroup>
            {attributes.map((attribute) => {
              const found = findAttribute(attribute.key, attribute.value);

              return (
                <FormControlLabel
                  key={`${attribute.key}:${attribute.value}`}
                  control={
                    <Checkbox
                      checked={!!found}
                      onChange={() => {
                        setAnchorEl(null);
                        toggleAttribute(attribute.key, attribute.value);
                      }}
                    />
                  }
                  label={`${attribute.key}: ${attribute.value}`}
                />
              );
            })}
          </FormGroup>
        </FormControl>
      </Popover>
    </>
  );
}

export default TokenCardFilter;
