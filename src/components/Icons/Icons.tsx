import React, { FC } from 'react';

import styles from './Icons.module.scss';

interface IconsProps {
  name: string;
  direction?: string;
}

const Icons: FC<IconsProps> = ({ name, direction }: IconsProps) => {
  const getStyles = (name: string) => {
    if (name === 'call') {
      switch (direction) {
        case 'in-err':
          return styles.inErr;
        case 'out-ok':
          return styles.outOk;
        case 'out-err':
          return styles.outErr;
      }
    }

    if (name === 'arrow') {
      switch (direction) {
        case 'up':
          return styles.arrowUp;
        case 'left':
          return styles.arrowLeft;
        case 'right':
          return styles.arrowRight;
      }
    }

    if (name === 'download') {
      if (direction === 'add') return styles.add;
    }
  };

  if (name === 'calendar')
    return (
      <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M14.4 1.63636H13.6V0H12V1.63636H4V0H2.4V1.63636H1.6C0.72 1.63636 0 2.37273 0 3.27273V16.3636C0 17.2636 
          0.72 18 1.6 18H14.4C15.28 18 16 17.2636 16 16.3636V3.27273C16 2.37273 15.28 1.63636 14.4 1.63636ZM14.4 
          16.3636H1.6V5.72727H14.4V16.3636Z"
          fill="#ADBFDF"
        />
      </svg>
    );

  if (name === 'call')
    return (
      <svg className={getStyles(name)} width="13" height="13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12.5217 1.17704L11.3447 0L1.66957 9.67513V4.17391H0V12.5217H8.34783V10.8522H2.84661L12.5217 1.17704Z"
          fill="#002CFB"
        />
      </svg>
    );

  if (name === 'download')
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6 20H19V18.1176H6V20ZM19 9.64706H15.2857V4H9.71429V9.64706H6L12.5 16.2353L19 9.64706Z"
          fill="#ADBFDF"
        />
      </svg>
    );

  if (name === 'close')
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
          fill="#ADBFDF"
        />
      </svg>
    );

  if (name === 'reset')
    return (
      <svg className={styles.reset} width="9" height="9" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M8.875 1.00625L7.99375 0.125L4.5 3.61875L1.00625 0.125L0.125 1.00625L3.61875 4.5L0.125 7.99375L1.00625 
          8.875L4.5 5.38125L7.99375 8.875L8.875 7.99375L5.38125 4.5L8.875 1.00625Z"
          fill="#ADBFDF"
        />
      </svg>
    );

  return (
    <svg className={getStyles(name)} xmlns="http://www.w3.org/2000/svg" width="18" height="21" fill="none">
      <g id="dropdown">
        <path
          id="Vector"
          d="M13.9001 8.60117L13.3991 8.10024C13.3324 8.03334 13.2555 8 13.1685 8C13.0818 8 13.0049 8.03334 12.9382 
          8.10024L9.00005 12.0382L5.06209 8.10034C4.9953 8.03345 4.91844 8.00011 4.83161 8.00011C4.74475 8.00011 
          4.66789 8.03345 4.60113 8.10034L4.10024 8.60131C4.03334 8.66806 4 8.74492 4 8.83179C4 8.91858 4.03345 
          8.99544 4.10024 9.06219L8.76957 13.7316C8.83633 13.7984 8.91322 13.8318 9.00005 13.8318C9.08688 13.8318 
          9.16364 13.7984 9.23036 13.7316L13.9001 9.06219C13.9668 8.99541 14 8.91854 14 8.83179C14 8.74492 13.9668 
          8.66806 13.9001 8.60117Z"
          fill="#ADBFDF"
        />
      </g>
    </svg>
  );
};

export default Icons;
