import React, { Component } from 'react';
import Fuse from 'fuse.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '', searchKeys: {title: true, description: true, tags: true} };

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }

  handleChange(event) {
    this.setState({ searchKeys: {
      ...this.state.searchKeys,
      [event.target.value]: event.target.checked, },
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const options = {
      keys: Object.keys(this.state.searchKeys).filter(key => this.state.searchKeys[key]),
      id: 'id',
    };
    const fuse = new Fuse(this.props.events, options);
    this.props.updateEvents(fuse.search(this.state.search));
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          Search Events:
          <input type="text" name="name" onChange={ this.handleSearchChange }/>
        </label>
        <label>
          title
          <input
            type="checkbox"
            name="search"
            value="title"
            checked={this.state.searchKeys.title}
            onChange={this.handleChange}/>
        </label>
        <label>
          description
          <input
          type="checkbox"
          name="search"
          value="description"
          checked={this.state.searchKeys.description}
          onChange={this.handleChange}/>
        </label>
        <label>
          tags
          <input
          type="checkbox"
          name="search"
          value="tags"
          checked={this.state.searchKeys.tags}
          onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Search" />
      </form>
    );
  }
};

export default SearchBar;
