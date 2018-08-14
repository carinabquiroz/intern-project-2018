import React from 'react';
import styled from 'styled-components';

const DisplayTag = props =>
  <Tag>
  {props.name}
  </Tag>;

const Tag = styled.div`
  margin: 3px;
  padding: 6px;
  border-radius: 3px;
  background: #A8d9d8
`;

export default DisplayTag;
