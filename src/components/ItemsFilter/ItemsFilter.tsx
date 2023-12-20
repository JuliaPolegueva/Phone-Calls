import React, { FC, SetStateAction, useState } from 'react';

import styles from './ItemsFilter.module.scss';
import classNames from 'classnames/bind';
import Icons from '../Icons/Icons';

import { resetFilters, setActiveFilters } from '../../store/filters/filters.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';

interface ItemsFilterProps {
  name: string;
  sort?: string;
  list?: string[];
  setSortType?: any;
}

const ItemsFilter: FC<ItemsFilterProps> = ({ name, sort, list, setSortType }: ItemsFilterProps) => {
  const dispatch = useDispatch();
  const activeFilterType = useSelector((state: RootState) => state.filterCalls.filterType.activeFilter);
  const defFilter = useSelector((state: RootState) => state.filterCalls.filterType.name);
  const [isOpen, setIsOpen] = useState(false);

  const onFilterCheck = (name: string) => {
    if (name !== activeFilterType) {
      dispatch(setActiveFilters(name));
    }
    setIsOpen(false);
  };

  const onFilterClick = () => {
    setIsOpen(open => !open);
  };

  const resetFilter = () => {
    dispatch(resetFilters());
  };

  const cx = classNames.bind(styles);

  if (!list) {
    return <button className={`${styles.btn} ${styles.filter__item}`}>{name}</button>;
  }

  if (list.length === 0) {
    return (
      <button className={`${styles.btn} ${styles.filter__item}`} onClick={() => setSortType(sort)}>
        {name}
        {isOpen ? <Icons name="arrow" direction="up" /> : <Icons name="arrow" />}
      </button>
    );
  }

  return (
    <div className={styles.filter}>
      <div className={styles.filter__type}>
        <button
          className={cx('btn', { 'btn--active': defFilter !== activeFilterType })}
          onClick={() => onFilterClick()}
        >
          {activeFilterType}
          {isOpen ? <Icons name="arrow" direction="up" /> : <Icons name="arrow" />}
        </button>
        {defFilter !== activeFilterType && (
          <button className={styles['reset-filters']} onClick={resetFilter}>
            <span>Сбросить фильтры</span>
            <Icons name="reset" />
          </button>
        )}
      </div>
      {isOpen && (
        <div className={styles.panel}>
          <ul className={styles.list}>
            {list?.map(item => {
              return (
                <li
                  key={item}
                  className={cx('item', { 'item--active': activeFilterType === item })}
                  onClick={() => onFilterCheck(item)}
                >
                  {item}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemsFilter;
