import React from 'react';

export default function Button({ classname, content, id, action }) {

  return (
    <button className={classname} id={id} onClick={(e) => {
      e.preventDefault();
      if (typeof action === 'function') {
        action();
      }
    }}>
      {content}
    </button>
  );
}
