import React, { FC, useEffect } from 'react';
import styles from './PhoneList.module.scss';
import ItemsFilter from '../ItemsFilter/ItemsFilter';
import PhoneItem from '../PhoneItem/PhoneItem';
//import { fetchCalls } from '../../store/calls/calls.actions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { useGetCallsQuery } from '../../store/api/calls.api';
import { ICalls } from '../../types/call.types';

const PhoneList: FC = () => {
  const { data } = useGetCallsQuery();
  console.log(data);

  return (
    <div className={styles.wrapper}>
      <ul className={styles.filters}>
        <li className={styles.filter}>
          <ItemsFilter name="Тип" />
        </li>
        <li className={styles.filter}>
          <ItemsFilter name="Время" list={[]} />
        </li>
        <li className={styles.filter}>
          <ItemsFilter name="Сотрудник" />
        </li>
        <li className={styles.filter}>
          <ItemsFilter name="Звонок" />
        </li>
        <li className={styles.filter}>
          <ItemsFilter name="Источник" />
        </li>
        <li className={styles.filter}>
          <ItemsFilter name="Оценка" />
        </li>
        <li className={styles.filter}>
          <ItemsFilter name="Длительность" list={[]} />
        </li>
      </ul>
      {data?.results.map(call => {
        return <PhoneItem key={call.id} {...call} />;
      })}
    </div>
  );
};

export default PhoneList;
