import React, { FC } from 'react';
import styles from './App.module.scss';

import GlobalRilters from '../GlobalFilters/GlobalFilters';
import PhoneList from '../PhoneList/PhoneList';

const App: FC = () => {
  return (
    <div className={styles.container}>
      <GlobalRilters />
      <PhoneList />
    </div>
  );
};

export default App;
