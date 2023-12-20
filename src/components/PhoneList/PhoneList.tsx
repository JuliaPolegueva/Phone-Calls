import React, { FC, useEffect, useState } from 'react';

import styles from './PhoneList.module.scss';
import ItemsFilter from '../ItemsFilter/ItemsFilter';
import PhoneItem from '../PhoneItem/PhoneItem';

import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetCallsQuery, useGetSortCallsQuery } from '../../store/api/calls.api';
import { ICall } from '../../types/call.types';
import Spinner from '../Spinner/Spinner';

const PhoneList: FC = () => {
  const dates = useSelector((state: RootState) => state.filterDate.dates);
  const activeFilterType = useSelector((state: RootState) => state.filterCalls.filterType.activeFilter);
  const offsetNum = useSelector((state: RootState) => state.filterCalls.offsetNum);

  const [filterCalls, setFilterCalls] = useState<ICall[]>([]);
  const [sortType, setSortType] = useState('');

  const { data, error, isLoading, isError } = useGetCallsQuery(
    { dates },
    {
      skip: sortType !== '',
    }
  );

  const { data: sorData } = useGetSortCallsQuery(
    { dates, sortType },
    {
      skip: !sortType,
    }
  );

  useEffect(() => {
    if (data?.results.length && !sortType) {
      switch (activeFilterType) {
        case 'Входящие':
          setFilterCalls(data.results.filter(call => call.in_out === 1));
          break;
        case 'Исходящие':
          setFilterCalls(data.results.filter(call => call.in_out === 0));
          break;
        default:
          setFilterCalls(data.results);
      }
    } else if (sorData?.results.length) {
      setFilterCalls(sorData.results);
    }
  }, [data, sorData, activeFilterType, sortType]);

  const setSort = (type: string) => {
    if (sortType !== type) {
      setSortType(type);
    } else {
      setSortType('');
    }
  };

  if (isError) {
    if ('status' in error) {
      return (
        <div>
          {error.status} {JSON.stringify(error.data)}
        </div>
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      {isLoading && <Spinner />}
      {!data?.results.length && !isLoading ? (
        <span>Данные не найдены</span>
      ) : (
        <>
          <ul className={styles.filters}>
            <li className={`${styles.filter} ${styles.filter__type}`}>
              <ItemsFilter name="Тип" />
            </li>
            <li className={`${styles.filter} ${styles.filter__time}`}>
              <ItemsFilter name="Время" sort="date" list={[]} setSortType={setSort} />
            </li>
            <li className={`${styles.filter} ${styles.filter__avatar}`}>
              <ItemsFilter name="Сотрудник" />
            </li>
            <li className={`${styles.filter} ${styles.filter__tel}`}>
              <ItemsFilter name="Звонок" />
            </li>
            <li className={`${styles.filter} ${styles.filter__source}`}>
              <ItemsFilter name="Источник" />
            </li>
            <li className={`${styles.filter} ${styles.filter__rating}`}>
              <ItemsFilter name="Оценка" />
            </li>
            <li className={`${styles.filter} ${styles.filter__audio}`}>
              <ItemsFilter name="Длительность" sort="duration" list={[]} setSortType={setSort} />
            </li>
          </ul>
          {filterCalls.map(call => {
            return <PhoneItem key={call.id} {...call} />;
          })}
        </>
      )}
    </div>
  );
};

export default PhoneList;
