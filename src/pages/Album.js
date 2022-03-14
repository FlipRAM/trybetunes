import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      listOfMusics: [],
      artworkUrl100: '',
      collectionName: '',
      artistName: '',
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const listMusics = musics.filter((element) => element.trackName !== undefined);
    this.setState({
      listOfMusics: listMusics,
      artworkUrl100: musics[0].artworkUrl100,
      collectionName: musics[0].collectionName,
      artistName: musics[0].artistName });
  }

  render() {
    const {
      listOfMusics,
      artworkUrl100,
      collectionName,
      artistName,
    } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div id="album">
          <img
            src={ artworkUrl100 }
            alt={ `album ${collectionName}` }
          />
          <p data-testid="album-name">{collectionName}</p>
          <p data-testid="artist-name">{artistName}</p>
        </div>
        <div id="musics">
          {listOfMusics.length > 0
            && listOfMusics.map((element) => (
              <MusicCard
                key={ element.trackId }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
                trackId={ element.trackId }
                objMusic={ element }
              />
            ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: propTypes.shape,
}.isRequired;

export default Album;
