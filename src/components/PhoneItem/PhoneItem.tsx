import React, { FC, useState } from 'react';
import styles from './PhoneItem.module.scss';
import Icons from '../Icons/Icons';
import { ICall } from '../../types/call.types';
import { getCallTime, getTimeFromFullDate } from '../../utils/getDateFilter';
import Audio from '../Audio/Audio';
import classNames from 'classnames/bind';

const PhoneItem: FC<ICall> = (props: ICall) => {
  const {
    id,
    date,
    from_number,
    to_number,
    contact_name,
    source,
    status,
    in_out,
    time,
    person_name,
    person_surname,
    person_avatar,
  } = props;

  const [hoveredId, setHoveredId] = useState<number | null>();

  const cx = classNames.bind(styles);

  return (
    <div className={styles.calls} onMouseEnter={() => setHoveredId(id)} onMouseLeave={() => setHoveredId(null)}>
      <div className={`${styles.info} ${styles.info__type}`}>
        {status === 'Дозвонился' ? (
          in_out ? (
            <Icons name="call" />
          ) : (
            <Icons name="call" direction="out-ok" />
          )
        ) : in_out ? (
          <Icons name="call" direction="in-err" />
        ) : (
          <Icons name="call" direction="out-err" />
        )}
      </div>
      <div className={`${styles.info} ${styles.info__time}`}>
        <span>{getTimeFromFullDate(date)}</span>
      </div>
      <div className={`${styles.info} ${styles.info__avatar}`}>
        {person_avatar ? (
          <img className={styles.avatar__def} src={person_avatar} alt="Аватар" />
        ) : (
          <span className={`${styles.avatar} ${styles.avatar__def}`}>
            {person_name[0]}
            {person_surname[0]}
          </span>
        )}
      </div>
      <div className={cx('info', 'info__tel', { contact: contact_name })}>
        <span className={styles.contact__name}>{contact_name}</span>
        <span className={styles.tel}>+{in_out ? from_number : to_number}</span>
      </div>
      <div className={`${styles.info} ${styles.info__source}`}>
        <span>{source}</span>
      </div>
      <div className={`${styles.info} ${styles.info__rating}`}>
        <span className={styles.rating}>Отлично</span>
      </div>

      <div className={`${styles.info}`}>
        {hoveredId === id && time ? <Audio call={props} /> : <span>{getCallTime(time)}</span>}
      </div>
    </div>
  );
};

export default PhoneItem;
