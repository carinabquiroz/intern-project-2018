import React from 'react';
import styled from 'styled-components';

const TagContainer = styled.div`
  margin-right: 10px
  border: 2px solid #e3a48d;
  background-color: #e3a48d;
  padding: 0 5px;
  border-radius: 5px;
`;

const Span = styled.span`
  display: flex;
`;

const Remove = styled.div`
  font-size: 15px;
  margin: auto 0 auto 10px;
`;

const Tag = props =>
  <TagContainer>
    <Span onClick={() => props.deleteTag(props.name)}>
      <div>{props.name}</div>
      <Remove>x</Remove>
    </Span>
  </TagContainer>;

export default Tag;
