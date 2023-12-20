import React, { FC } from 'react';

import styles from './GlobalFilters.module.scss';
import DateFilter from '../DateFilter/DateFilter';
import ItemsFilter from '../ItemsFilter/ItemsFilter';

const GlobalFilters: FC = () => {
  const filterTypeName = ['Все типы', 'Входящие', 'Исходящие'];

  return (
    <div className={styles.filters}>
      <ItemsFilter name="Все типы" list={filterTypeName} />
      <DateFilter />
    </div>
  );
};

export default GlobalFilters;
