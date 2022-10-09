import React from 'react';
import safePubkeyString from '../../../../_helpers/safePubkeyString';
import ExplorerLink from '../ExplorerLink/ExplorerLink';
import ExplorerLinkProps from '../_types/ExplorerLinkProps';
import useAddressLabel from './_hooks/useAddressLabel';

function LabeledAddressLink({
  to,
  ellipsis,
  label: defaultLabel,
  ...rest
}: Omit<ExplorerLinkProps, 'type'>) {
  const getAddressLabel = useAddressLabel();
  const addressLabel = getAddressLabel(safePubkeyString(to));
  const label = addressLabel ?? defaultLabel;
  return (
    <ExplorerLink
      type="address"
      to={to}
      label={label}
      ellipsis={!addressLabel ? ellipsis : undefined}
      {...rest}
    />
  );
}

export default LabeledAddressLink;
