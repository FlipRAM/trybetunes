import React from 'react';
import propTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      isFavorite: false,
    };
  }

  async componentDidMount() {
    const { objMusic } = this.props;
    this.setState({ isLoading: true });
    const favoritesList = await getFavoriteSongs();
    const matchFav = favoritesList.find((fav) => fav.trackId === objMusic.trackId);
    if (matchFav !== undefined) {
      this.setState({ isLoading: false, isFavorite: true });
    } if (matchFav === undefined) {
      this.setState({ isLoading: false, isFavorite: false });
    }
  }

  saveFavorites = async ({ target }) => {
    if (target.checked === true) {
      this.addFavorites();
    } if (target.checked === false) {
      this.removeFavorites();
    }
  }

  addFavorites = async () => {
    const { objMusic } = this.props;
    this.setState({ isLoading: true, isFavorite: true });
    await addSong(objMusic);
    this.setState({ isLoading: false });
  }

  removeFavorites = async () => {
    const { objMusic, showList } = this.props;
    this.setState({ isLoading: true, isFavorite: false });
    await removeSong(objMusic);
    this.setState({ isLoading: false });
    showList();
  }

  render() {
    const { isLoading, isFavorite } = this.state;
    const { trackName, previewUrl, trackId } = this.props;
    return (
      <div id="audio">
        <p>{trackName}</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        {isLoading
          ? <Carregando />
          : (
            <label htmlFor={ trackName }>
              <input
                id={ trackName }
                data-testid={ `checkbox-music-${trackId}` }
                type="checkbox"
                onChange={ this.saveFavorites }
                checked={ isFavorite }
              />
              Favorita
            </label>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string,
  previewUrl: propTypes.string,
  trackId: propTypes.number,
  objMusic: propTypes.shape,
}.isRequired;

export default MusicCard;
