import React from 'react';

import css from './Heart.css';  // eslint-disable-line import/no-unresolved

export default function Heart(props) {
  return (
    <div className={css.heart}>
      <span className={css.text}>{props.children}</span>
    </div>
  );
}
