import React from 'react';
import { useRecoilValue } from 'recoil';
import ExplorerGrid from '../_sharedComponents/ExplorerGrid';
import ExplorerGridRow from '../_sharedComponents/ExplorerGridRow';
import LabeledAddressLink from '../_sharedComponents/LabeledAddressLink/LabeledAddressLink';
import parsedConfigAccountAtom from './_atoms/parsedConfigAccountAtom';

// 7qUt9itGTzT7QLNTbmoPwXCKR93pd4i8TqZp1BEj5ah8
function ConfigAccountValidatorInfoCard() {
  const parsedConfigAccount = useRecoilValue(parsedConfigAccountAtom);

  if (!parsedConfigAccount || parsedConfigAccount.type !== 'validatorInfo') {
    return null;
  }

  const { info } = parsedConfigAccount;

  return (
    <ExplorerGrid>
      {info.configData.name && (
        <ExplorerGridRow label="Name" value={info.configData.name} />
      )}
      {info.configData.keybaseUsername && (
        <ExplorerGridRow
          label="Keybase Username"
          value={info.configData.keybaseUsername}
        />
      )}
      {info.configData.website && (
        <ExplorerGridRow label="Website" value={info.configData.website} />
      )}
      {info.configData.details && (
        <ExplorerGridRow label="Details" value={info.configData.details} />
      )}
      {info.keys.map(({ pubkey, signer }, idx) => (
        <ExplorerGridRow
          label={`Key ${idx + 1}${signer ? ' (signer)' : ''}`}
          value={<LabeledAddressLink to={pubkey} allowCopy={true} />}
        />
      ))}
    </ExplorerGrid>
  );
}

export default ConfigAccountValidatorInfoCard;
