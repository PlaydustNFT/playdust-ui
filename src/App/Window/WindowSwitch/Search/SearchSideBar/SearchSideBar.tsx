import styled from '@emotion/styled';
import { Divider } from '@mui/material';
import React from 'react';
import SuspenseBoundary from '../../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import SkeletonRows from '../../_sharedComponents/SkeletonRows';
import AttributeFilters from './AttributeFilters/AttributeFilters';
import OnlyListedSwitch from './OnlyListedSwitch/OnlyListedSwitch';
import RangeFilters from './RangeFilters/RangeFilters';
import SortFields from './SortFields/SortFields';

const RootContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

function SearchSideBar() {
  return (
    <RootContainer>
      <SortFields />
      <OnlyListedSwitch />
      <RangeFilters />
      <br />
      <Divider />
      <br />
      <SuspenseBoundary
        error={null}
        loading={<SkeletonRows rows={50} />}
        content={<AttributeFilters />}
      />
    </RootContainer>
  );
}

export default SearchSideBar;
