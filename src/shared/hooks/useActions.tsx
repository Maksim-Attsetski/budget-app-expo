import { bindActionCreators } from 'redux';

import { useTypedDispatch } from './useRedux';
import { budgetActions } from '../../widgets/Budget';
import { clientActions } from '../../widgets/Clients';

const allActions = {
  ...budgetActions,
  ...clientActions,
};

export const useActions = () => {
  const dispatch = useTypedDispatch();

  const action = bindActionCreators(allActions, dispatch);

  return { action };
};
