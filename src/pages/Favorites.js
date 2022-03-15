import React from 'react';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';
import MusicCard from '../components/MusicCard';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      favorites: [],
    };
  }

  async componentDidMount() {
    this.showList();
  }

  showList = async () => {
    this.setState({ isLoading: true });
    const favoritesList = await getFavoriteSongs();
    this.setState({ isLoading: false, favorites: favoritesList });
  }

  render() {
    const { isLoading, favorites } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        {isLoading
          ? <Carregando />
          : favorites.map((element) => (
            <div className="each-music" key={ element.trackName }>
              <img src={ element.artworkUrl100 } alt={ element.collectionName } />
              <MusicCard
                key={ element.trackId }
                trackName={ element.trackName }
                previewUrl={ element.previewUrl }
                trackId={ element.trackId }
                objMusic={ element }
                showList={ this.showList }
              />
            </div>
          ))}
      </div>
    );
  }
}

export default Favorites;
