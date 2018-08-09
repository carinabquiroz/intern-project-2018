import React from 'react';

const Tag = props =>
  <div>
    <div onClick={() => props.deleteTag(props.name)}>{props.name}  x</div>
  </div>;

  export default Tag;
