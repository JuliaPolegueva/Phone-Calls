import React, { FC, useState } from 'react';

import InputMask from 'react-input-mask';
import styles from './DateFilter.module.scss';
import classNames from 'classnames/bind';
import Icons from '../Icons/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  setActiveFilter,
  setBackDates,
  setDefaultDates,
  setForwardDates,
  setUserDates,
} from '../../store/date/date.slice';

const DateFilter: FC = () => {
  const dispatch = useDispatch();
  const activeFilter = useSelector((state: RootState) => state.filterDate.activeFilter);
  const dateList = useSelector((state: RootState) => state.filterDate.filters);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const onFilterCheck = (name: string) => {
    if (name !== activeFilter) dispatch(setActiveFilter(name));
    dispatch(setDefaultDates(name));
    setIsOpen(false);
  };

  const onFilterClick = () => {
    setIsOpen(open => !open);
  };

  const handleBackClick = () => {
    dispatch(setBackDates());
  };

  const handleForwardClick = () => {
    dispatch(setForwardDates());
  };

  const onDateClick = () => {
    dispatch(setActiveFilter(`${startDate} - ${endDate}`));
    dispatch(setUserDates({ startDate, endDate }));
  };

  const cx = classNames.bind(styles);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.btn} onClick={handleBackClick}>
          <Icons name="arrow" direction="left" />
        </button>
        <button className={styles.title} onClick={() => onFilterClick()}>
          <Icons name="calendar" />
          {activeFilter}
        </button>
        <button className={styles.btn} onClick={handleForwardClick}>
          <Icons name="arrow" direction="right" />
        </button>
      </div>

      {isOpen && (
        <div className={styles.panel}>
          <ul className={styles.list}>
            {dateList?.map(item => {
              return (
                <li
                  key={item}
                  className={cx('item', { 'item--active': activeFilter === item })}
                  onClick={() => onFilterCheck(item)}
                >
                  {item}
                </li>
              );
            })}
            <li className={styles.interval}>
              <span className={styles['interval__title']}>Указать даты</span>
              <div className={styles['interval__date']}>
                <InputMask
                  mask="99.99.99"
                  placeholder="__.__.__"
                  className={styles.input}
                  value={startDate}
                  onChange={e => setStartDate(e.target.value)}
                />
                <span>-</span>
                <InputMask
                  mask="99.99.99"
                  placeholder="__.__.__"
                  className={`${styles.input} ${styles['input__end']}`}
                  value={endDate}
                  onChange={e => setEndDate(e.target.value)}
                />
                <button className={styles['input__btn']} onClick={onDateClick}>
                  <Icons name="calendar" />
                </button>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateFilter;
