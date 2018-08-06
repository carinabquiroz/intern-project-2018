import React, { Component } from 'react';
import Fuse from 'fuse.js';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: ''};

    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSearchChange(event) {
    this.setState({ search: event.target.value });
  }


  handleSubmit(event) {
    event.preventDefault();
    const options = {
      keys: ['title', 'description'],
      id: 'id'
    }
    const fuse = new Fuse(this.props.events, options)
    this.props.updateEvents(fuse.search(this.state.search))
  }

  render() {
    return (
      <form onSubmit={ this.handleSubmit }>
        <label>
          Search Events:
          <input type="text" name="name" onChange={ this.handleSearchChange }/>
        </label>
        <input type="submit" value="Search" />
      </form>
    );
  }
};

export default SearchBar;
