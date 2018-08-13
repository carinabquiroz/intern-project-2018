import React, { Component } from 'react';
import styled from 'styled-components';

import Tag from './tag';

const Label = styled.label`
  display: flex;
  width: 600px;
`;

const Entry = styled.input`
  margin-left: 10px;
  height: 20px;
  flex-grow: 1;
`;

const TagContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  font-size: 20px;
`;

class TagInput extends Component {
  constructor(props) {
    super(props);
    this.state = { tagArray: props.tags, newTag: '' };
    this.addTag = this.addTag.bind(this);
    this.removeTag = this.removeTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ newTag: event.target.value, repeatTag: false });
  }

  addTag(event) {
    event.preventDefault();
    if (this.state.newTag) {
      const newTag = this.state.newTag;
      const tagArray = this.state.tagArray;
      if (tagArray.includes(newTag)) {
        this.setState({
          repeatTag: true,
          newTag: '',
        });
      } else {
        const newTagArray = tagArray.concat([newTag]);
        this.setState({
          tagArray: newTagArray,
          newTag: '',
        });
        this.props.onTagChange({ target: { name: 'tags', value: newTagArray } });
      }
    }
  }

  removeTag(tag) {
    const tagArray = this.state.tagArray;
    const tagIndex = tagArray.indexOf(tag);
    const newTagArray = tagArray.slice(0, tagIndex).concat(tagArray.slice(tagIndex + 1));
    this.setState({ tagArray: newTagArray });
    this.props.onTagChange({ target: { name: 'tags', value: newTagArray } });
  }

  render() {
    return (
      <div>
        <TagContainer>
          {this.props.tags.map(tag => <Tag key={tag} name={tag} deleteTag={this.removeTag}/>)}
        </TagContainer>
        <form onSubmit={ this.addTag }>
          <Label>Tags:
            <Entry type="text" name="tag" value={this.state.newTag} onChange={ this.handleChange } />
            {this.state.repeatTag && <div>{`You've already used this tag`}</div>}
          </Label>
        </form>
      </div>
    );
  }
}

export default TagInput;
