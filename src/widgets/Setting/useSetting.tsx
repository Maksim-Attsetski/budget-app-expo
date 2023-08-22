import { useActions, useFirestore, useTypedSelector } from '../../shared';

const uid = 'LhK3RhstgbC0sexiBLSY';

export const useSetting = () => {
  const { margin, ratePerHour } = useTypedSelector((s) => s.setting);

  const { action } = useActions();
  const fbStore = useFirestore('zefirka-setting');

  const onUpdateMargin = async (newMargin: string) => {
    const curMargin = Math.round(+newMargin.replaceAll('%', '') / 100);
    if (isNaN(curMargin)) return;

    fbStore.update(uid, { margin: curMargin });
    action.setMarginAC(curMargin);
  };

  const onUpdateRatePerHour = async (newRatePerHour: string) => {
    if (isNaN(+newRatePerHour)) return;

    fbStore.update(uid, { ratePerHour: +newRatePerHour });
    action.setRatePerHourAC(+newRatePerHour);
  };

  const onGetSetting = async (): Promise<void> => {
    const response = await fbStore.getAll([]);
    if (!response.result[0]) return;

    const data = response.result[0];
    action.setMarginAC(data?.margin);
    action.setRatePerHourAC(data?.ratePerHour);
  };

  return {
    margin,
    ratePerHour,
    onGetSetting,
    onUpdateMargin,
    onUpdateRatePerHour,
  };
};
