import React from 'react';
import propTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Carregando from '../pages/Carregando';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favoritesList: [],
      isChecked: false,
    };
  }

  saveFavorites = async ({ target }) => {
    console.log(target.checked);
    const { objMusic } = this.props;
    if (target.checked === true) {
      this.setState({ isLoading: true, isChecked: true });
      await addSong(objMusic);
      this.setState({ isLoading: false });
    } else {
      this.setState({ isChecked: false });
    }
  }

  render() {
    const { isLoading, isChecked } = this.state;
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
                checked={ isChecked }
              />
              Favorita
            </label>)}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: propTypes.string.isRequired,
  previewUrl: propTypes.string.isRequired,
  trackId: propTypes.string.isRequired,
};

export default MusicCard;
