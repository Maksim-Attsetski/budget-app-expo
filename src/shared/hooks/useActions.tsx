import { useMemo } from 'react';
import { bindActionCreators } from 'redux';

import { useTypedDispatch } from './useRedux';
import { budgetActions } from '../../widgets/Budget';
import { clientActions } from '../../widgets/Clients';
import { appActions } from '../../widgets/App';
import { orderActions } from '../../widgets/Orders';

export const useActions = () => {
  const dispatch = useTypedDispatch();

  const allActions = useMemo(
    () => ({
      ...budgetActions,
      ...clientActions,
      ...appActions,
      ...orderActions,
    }),
    []
  );

  const action = bindActionCreators(allActions, dispatch);

  return { action };
};
