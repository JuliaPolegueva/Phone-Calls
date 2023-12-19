import React, { FC } from 'react';
//import PhoneList
import styles from './App.module.scss';

import GlobalRilters from '../GlobalFilters/GlobalFilters';
import PhoneList from '../PhoneList/PhoneList';

const App: FC = () => {
  return (
    <div className={styles.container}>
      <GlobalRilters />
      <PhoneList />
      <main className="main">gtgtgtgtgt</main>
    </div>
  );
};

export default App;
