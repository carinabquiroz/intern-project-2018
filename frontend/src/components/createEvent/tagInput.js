import React, { Component } from 'react';

import Tag from './tag';

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
      <form onSubmit={ this.addTag }>
        {this.props.tags.map(tag => <Tag key={tag} name={tag} deleteTag={this.removeTag}/>)}
        <input type="text" name="tag" value={this.state.newTag} onChange={ this.handleChange } />
        {this.state.repeatTag && <div>{`You've already used this tag`}</div>}
      </form>
    );
  }
}

export default TagInput;
