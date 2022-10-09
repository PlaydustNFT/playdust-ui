import { DateTime } from 'luxon';
import React from 'react';
import { useRecoilValue } from 'recoil';
import parsedStakeAccountAtom from './_atoms/parsedStakeAccountAtom';

function toLocaleString(time: number | null | undefined) {
  return time
    ? DateTime.fromMillis(time * 1000).toLocaleString(DateTime.DATETIME_FULL)
    : '';
}

function LockupCard() {
  const parsedStakeAccount = useRecoilValue(parsedStakeAccountAtom);

  if (!parsedStakeAccount) {
    return null;
  }

  const {
    parsed: { info },
  } = parsedStakeAccount;

  const unixTimestamp = 1000 * (info.meta.lockup.unixTimestamp || 0);

  if (Date.now() < unixTimestamp) {
    const prettyTimestamp = toLocaleString(info.meta.lockup.unixTimestamp || 0);
    return (
      <div>
        <strong>Account is locked!</strong> Lockup expires on {prettyTimestamp}
      </div>
    );
  }

  return null;
}

export default LockupCard;
