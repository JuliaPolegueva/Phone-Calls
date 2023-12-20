import React, { FC } from 'react';

import classes from './Spinner.module.scss';

const Spinner: FC = () => {
  return (
    <div className={classes['spin-wrapper']}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Spinner;
