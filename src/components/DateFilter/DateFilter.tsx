import React, { FC, useState } from 'react';

import InputMask from 'react-input-mask';
import calendar from '../../assets/images/calendar.svg';
import styles from './DateFilter.module.scss';
import classNames from 'classnames/bind';
import Icons from '../Icons/Icons';

interface DateFilterProps {
  name: string;
  list: string[];
}

const DateFilter: FC<DateFilterProps> = ({ name, list }: DateFilterProps) => {
  const [activeName, setActiveName] = useState(name);
  const [isOpen, setIsOpen] = useState(false);

  const onFilterCheck = (name: string) => {
    if (name !== activeName) setActiveName(name);
  };

  const onFilterClick = () => {
    setIsOpen(open => !open);
  };

  const cx = classNames.bind(styles);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <button className={styles.btn}>
          <Icons name="arrow" direction="left" />
        </button>
        <button className={styles.title} onClick={() => onFilterClick()}>
          <Icons name="calendar" />
          {activeName}
        </button>
        <button className={styles.btn}>
          <Icons name="arrow" direction="right" />
        </button>
      </div>

      {isOpen && (
        <div className={styles.panel}>
          <ul className={styles.list}>
            {list?.map(item => {
              return (
                <li
                  key={item}
                  className={cx('item', { 'item--active': activeName === item })}
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
                  //value={startDate}
                />
                <span>-</span>
                <InputMask
                  mask="99.99.99"
                  placeholder="__.__.__"
                  className={`${styles.input} ${styles['input__end']}`}
                  /*value={endDate}*/
                />
                <button className={styles['input__btn']}>
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
