import React, { FC } from 'react';
import styles from './GlobalFilters.module.scss';
import calendar from '../../assets/images/calendar.svg';
import DateFilter from '../DateFilter/DateFilter';
import ItemsFilter from '../ItemsFilter/ItemsFilter';

const GlobalFilters: FC = () => {
  //////////////////////////////////////////////////////////
  const filterName = ['Все типы', 'Входящие', 'Исходящие'];
  ///////////////////////////////////////////////////////////
  const filterDate = ['3 дня', 'Неделя', 'Месяц', 'Год'];
  //////////////////////////////////////////////////////////
  return (
    <div className={styles.filters}>
      <ItemsFilter name="Все типы" list={filterName} />
      <DateFilter name="3 дня" list={filterDate} />
    </div>
  );
};

export default GlobalFilters;
