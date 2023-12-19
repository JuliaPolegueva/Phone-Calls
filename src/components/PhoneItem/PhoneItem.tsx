import React, { FC, useState } from 'react';
import styles from './PhoneItem.module.scss';
import Icons from '../Icons/Icons';
import { ICall } from '../../types/call.types';
import { getCallTime, getTimeFromFullDate } from '../../utils/getDateFilter';
import Audio from '../Audio/Audio';

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

  const isHovered = (id: number) => hoveredId === id;

  return (
    <div className={styles.calls} onMouseEnter={() => setHoveredId(id)} onMouseLeave={() => setHoveredId(null)}>
      <div className={styles.info}>
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
      <div className={styles.info}>
        <span>{getTimeFromFullDate(date)}</span>
      </div>
      <div className={styles.info}>
        {person_avatar ? (
          <img className={styles.avatar__def} src={person_avatar} alt="Аватар" />
        ) : (
          <span className={`${styles.avatar} ${styles.avatar__def}`}>
            {person_name[0]}
            {person_surname[0]}
          </span>
        )}
      </div>
      <div className={contact_name ? styles.contact : ''}>
        <span className={styles.contact__name}>{contact_name}</span>
        <span className={styles.tel}>+{in_out ? from_number : to_number}</span>
      </div>
      <div className={styles.info}>
        <span>{source}</span>
      </div>
      <div className={styles.info}>
        <span>
          {hoveredId === id && time ? (
            <Audio
              call={props}
              //isHovered={isHovered(id)}
              // activeId={activeId}
              // setActiveId={id => setActiveId(id)}
            />
          ) : (
            <div className={styles.info}>
              <span>{getCallTime(time)}</span>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default PhoneItem;
