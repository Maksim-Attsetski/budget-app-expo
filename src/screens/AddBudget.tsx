import React, { FC, memo } from 'react';

import { Gap } from '../UI';
import { Layout } from '../widgets/App';
import { BudgetForm } from '../widgets/Budget';

const AddBudget: FC = () => {
  return (
    <Layout>
      <Gap y={10} />
      <BudgetForm />
    </Layout>
  );
};

export default memo(AddBudget);
