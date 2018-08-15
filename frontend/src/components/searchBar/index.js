import React, { Component } from 'react';
import Fuse from 'fuse.js';
import styled from 'styled-components';

import searchIcon from '../../resources/search.svg';

const styledSearchIcon = styled(searchIcon)`
  width: 30px;
  height: 30px;
`;

const ContainerDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
`;

const StyledSearch = styled.span`
  border: 2px solid #a8a7a7;
  display: flex;
  width: 600px;
  height: 50px;
  justify: center;
  align: center;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  height: 48px;
  width: 550px;
  padding: 0 10px;
  font-size: 25px;
`;

const StyledSubmit = styled.button`
  width: 50px;
  height: 50px;
  background-image: url(${searchIcon});
  background-size: 30px 30px;
  background-repeat: no-repeat;
  background-position: center;
  border: none;
  outline: none;

  :hover {
    background-color: #adaaaa;
  }
`;

const SearchFilters = styled.div`
  display: flex;
  justify-content: center;
  alignt-items: center;
  flex-direction: row;
  margin: 15px;
`;

const SearchTerm = styled.label`
  font-size: 20px;
  margin: 0 15px;
`;

const StyledCheckbox = styled.input`
`;

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '', searchKeys: { title: true, description: true, tags: true } };

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
      threshold: .3,
      keys: Object.keys(this.state.searchKeys).filter(key => this.state.searchKeys[key]),
      id: 'id',
    };
    const fuse = new Fuse(this.props.events, options);
    this.props.updateEvents(fuse.search(this.state.search));
  }

  render() {
    return (
      <ContainerDiv>

        <SearchFilters>
          <SearchTerm>Search by:</SearchTerm>
          <SearchTerm>
            title
            <StyledCheckbox
              type="checkbox"
              name="search"
              value="title"
              checked={this.state.searchKeys.title}
              onChange={this.handleChange}/>
          </SearchTerm>
          <SearchTerm>
            description
            <StyledCheckbox
            type="checkbox"
            name="search"
            value="description"
            checked={this.state.searchKeys.description}
            onChange={this.handleChange}/>
          </SearchTerm>
          <SearchTerm>
            tags
            <StyledCheckbox
            type="checkbox"
            name="search"
            value="tags"
            checked={this.state.searchKeys.tags}
            onChange={this.handleChange}/>
          </SearchTerm>
        </SearchFilters>
        <form onSubmit={this.handleSubmit}>
          <StyledSearch>
            <StyledInput type="text" name="name" onChange={ this.handleSearchChange } placeholder="Search Events" autoComplete="off" />
            <StyledSubmit onClick={this.handleSubmit} />
          </StyledSearch>
        </form>
      </ContainerDiv>
    );
  }
};

export default SearchBar;
