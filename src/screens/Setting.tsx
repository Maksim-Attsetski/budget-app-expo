import React, { FC, memo, useState } from 'react';

import { Gap } from '../UI';
import { Layout } from '../widgets/App';
import { SettingItem, useSetting } from '../widgets/Setting';

const Setting: FC = () => {
  const { margin, onUpdateMargin, onUpdateRatePerHour, ratePerHour } =
    useSetting();
  const [newMargin, setNewMargin] = useState<string>(margin * 100 + '');
  const [newRatePerHour, setNewRatePerHour] = useState<string>(
    ratePerHour + ''
  );

  return (
    <Layout headerProps={{ children: 'Настройки' }}>
      <Gap y={7} />
      <SettingItem
        onSave={() => onUpdateMargin(newMargin)}
        setValue={setNewMargin}
        value={newMargin}
        placeholder='Наценка'
        keyboardType='number-pad'
        postfix='%'
      />
      <Gap y={7} />
      <SettingItem
        onSave={() => onUpdateRatePerHour(newRatePerHour)}
        setValue={setNewRatePerHour}
        value={newRatePerHour}
        placeholder='Ставка '
        postfix='р. / час'
        keyboardType='number-pad'
      />
    </Layout>
  );
};

export default memo(Setting);
