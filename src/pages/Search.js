import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonIsDisabled: true,
      search: '',
    };
    this.validate = this.validate.bind(this);
  }

  validate(event) {
    event.preventDefault();
    const newSearchValue = event.target.value;
    const minLengthSearch = 2;
    if (newSearchValue.length >= minLengthSearch) {
      this.setState({ search: newSearchValue, buttonIsDisabled: false });
    } else if (newSearchValue.length < minLengthSearch) {
      this.setState({ search: newSearchValue, buttonIsDisabled: true });
    }
  }

  render() {
    const { buttonIsDisabled, search } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search">
            Nome:
            <input
              type="text"
              id="search"
              value={ search }
              data-testid="search-artist-input"
              onChange={ this.validate }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ buttonIsDisabled }
            // onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
