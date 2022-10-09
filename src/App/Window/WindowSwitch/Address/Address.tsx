import React from 'react';
import SuspenseBoundary from '../../../_sharedComponents/SuspenseBoundary/SuspenseBoundary';
import ContentContainer from '../_sharedComponents/ContentContainer';
import ExplorerAccordion from '../_sharedComponents/ExplorerAccordion';
import StandardWindowContainer from '../_sharedComponents/StandardWindowContainer';
import AccountOverviewCard from './AccountOverviewCard/AccountOverviewCard';
import BPFUpgradeableLoaderAccountBuffer from './BPFUpgradeableLoaderAccountBuffer';
import BPFUpgradeableLoaderAccountProgram from './BPFUpgradeableLoaderAccountProgram/BPFUpgradeableLoaderAccountProgram';
import BPFUpgradeableLoaderAccountProgramData from './BPFUpgradeableLoaderAccountProgramData';
import ConfigAccountStakeConfigCard from './ConfigAccountStakeConfigCard';
import ConfigAccountValidatorInfoCard from './ConfigAccountValidatorInfoCard';
import NFTTradingModule from './NFTTradingModule/NFTTradingModule';
import NonceAccountCard from './NonceAccountCard/NonceAccountCard';
import RawAccountData from './RawAccountData';
import SPLTokenAccount from './SPLTokenAccount';
import SPLTokenMint from './SPLTokenMint';
import SPLTokenMintFungible from './SPLTokenMintFungible/SPLTokenMintFungible';
import SPLTokenMintNonFungible from './SPLTokenMintNonFungible/SPLTokenMintNonFungible';
import SPLTokenMultisig from './SPLTokenMultisig';
import StakeAccount from './StakeAccount/StakeAccount';
import SysvarAccountClockCard from './SysvarAccountClockCard';
import SysvarAccountEpochScheduleCard from './SysvarAccountEpochScheduleCard';
import SysvarAccountFeesCard from './SysvarAccountFeesCard';
import SysvarAccountRecentBlockhashesCard from './SysvarAccountRecentBlockhashesCard';
import SysvarAccountRentCard from './SysvarAccountRentCard';
import SysvarAccountRewardsCard from './SysvarAccountRewardsCard';
import SysvarAccountSlotHashesCard from './SysvarAccountSlotHashesCard';
import SysvarAccountSlotHistoryCard from './SysvarAccountSlotHistoryCard';
import SysvarAccountStakeHistoryCard from './SysvarAccountStakeHistoryCard';
import Transactions from './Transactions/Transactions';
import UserProfile from './UserProfile/UserProfile';
import VoteAccountCard from './VoteAccountCard/VoteAccountCard';
import WalletGallery from './WalletGallery';
import WalletTokenAccounts from './WalletTokenAccounts/WalletTokenAccounts';

function Address() {
  return (
    <StandardWindowContainer>
      {/* Special Account Views */}
      <SuspenseBoundary
        content={<NFTTradingModule />}
        error={null}
        loading={null}
      />

      <SuspenseBoundary
        content={<SPLTokenMintNonFungible />}
        error={null}
        loading={null}
      />

      <SuspenseBoundary
        content={<SPLTokenMintFungible />}
        error={null}
        loading={null}
      />

      {/* User Wallet Accounts */}
      <ContentContainer>
        <SuspenseBoundary
          content={<UserProfile />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<WalletGallery />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<WalletTokenAccounts />}
          error={null}
          loading={null}
        />
        {/* All Accounts */}
        <SuspenseBoundary
          content={<AccountOverviewCard />}
          error={null}
          loading={null}
        />
        {/* Token Accounts */}
        <SuspenseBoundary
          content={<SPLTokenAccount />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SPLTokenMint />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SPLTokenMultisig />}
          error={null}
          loading={null}
        />
        {/* Config & Sys Accounts */}
        <SuspenseBoundary
          content={<ConfigAccountValidatorInfoCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<ConfigAccountStakeConfigCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<StakeAccount />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<BPFUpgradeableLoaderAccountBuffer />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<BPFUpgradeableLoaderAccountProgram />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<BPFUpgradeableLoaderAccountProgramData />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<NonceAccountCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountClockCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountEpochScheduleCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountFeesCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountRecentBlockhashesCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountRentCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountRewardsCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountSlotHashesCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountSlotHistoryCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<SysvarAccountStakeHistoryCard />}
          error={null}
          loading={null}
        />
        <SuspenseBoundary
          content={<VoteAccountCard />}
          error={null}
          loading={null}
        />
        {/* All Accounts */}
        <SuspenseBoundary
          content={<RawAccountData />}
          error={null}
          loading={null}
        />
        <ExplorerAccordion
          id="transactions"
          title="Transactions"
          content={<Transactions />}
        />
      </ContentContainer>
    </StandardWindowContainer>
  );
}

export default Address;
