import React from 'react';
import { Link } from 'react-router-dom';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Header from '../components/Header';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonIsDisabled: true,
      search: '',
      searchFinal: '',
      isLoading: false,
      listOfMusics: [],
    };
    this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(event) {
    event.preventDefault();
    const { search } = this.state;
    const searchToFind = search;
    this.setState({
      search: '',
      searchFinal: searchToFind,
      isLoading: true,
    });
    const listOfItems = await searchAlbumsAPI(searchToFind);
    this.setState({ isLoading: false, listOfMusics: listOfItems });
  }

  validate(event) {
    const newSearchValue = event.target.value;
    const minLengthSearch = 2;
    if (newSearchValue.length >= minLengthSearch) {
      this.setState({ search: newSearchValue, buttonIsDisabled: false });
    } else if (newSearchValue.length < minLengthSearch) {
      this.setState({ search: newSearchValue, buttonIsDisabled: true });
    }
  }

  render() {
    const { buttonIsDisabled, search, searchFinal, isLoading, listOfMusics } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {isLoading
          ? <Carregando />
          : (
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
                onClick={ this.handleClick }
              >
                Pesquisar
              </button>
            </form>
          )}
        { searchFinal.length > 0 && `Resultado de álbuns de: ${searchFinal}`}
        {(listOfMusics.length > 0)
          ? (listOfMusics.map((element) => (
            <div key={ element.collectionId }>
              <Link
                to={ `/album/${element.collectionId}` }
                data-testid={ `link-to-album-${element.collectionId}` }
              >
                <img
                  src={ element.artworkUrl100 }
                  alt={ `Capa do album: ${element.collectionName}` }
                />
              </Link>
              <p>{ element.collectionName }</p>
              <p>{ element.artistName }</p>
            </div>
          )))
          : <p>Nenhum álbum foi encontrado</p>}
      </div>
    );
  }
}

export default Search;
