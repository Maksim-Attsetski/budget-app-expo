import { bindActionCreators } from 'redux';
import { useTypedDispatch } from './useRedux';
import { budgetActions } from '../../widgets/Budget';

const allActions = {
  ...budgetActions,
};

export const useActions = () => {
  const dispatch = useTypedDispatch();

  const action = bindActionCreators(allActions, dispatch);

  return { action };
};
