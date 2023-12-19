import React, { FC, useState } from 'react';
import styles from './ItemsFilter.module.scss';
import classNames from 'classnames/bind';
import Icons from '../Icons/Icons';

interface ItemsFilterProps {
  name: string;
  list?: string[];
}

const ItemsFilter: FC<ItemsFilterProps> = ({ name, list }: ItemsFilterProps) => {
  const [activeName, setActiveName] = useState(name);
  const [isOpen, setIsOpen] = useState(false);

  const onFilterCheck = (name: string) => {
    if (name !== activeName) setActiveName(name);
  };

  const onFilterClick = () => {
    setIsOpen(open => !open);
  };

  const cx = classNames.bind(styles);

  if (!list) {
    return <button className={`${styles.btn} ${styles.filter__item}`}>{name}</button>;
  }

  if (list.length === 0) {
    return (
      <button className={`${styles.btn} ${styles.filter__item}`} onClick={() => onFilterClick()}>
        {name}
        {isOpen ? <Icons name="arrow" direction="up" /> : <Icons name="arrow" />}
      </button>
    );
  }

  return (
    <div className={styles.filter}>
      <button className={cx('btn', { 'btn--active': isOpen })} onClick={() => onFilterClick()}>
        {activeName}
        {isOpen ? <Icons name="arrow" direction="up" /> : <Icons name="arrow" />}
      </button>
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
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemsFilter;
