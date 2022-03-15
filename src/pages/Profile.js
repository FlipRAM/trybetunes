import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      profileData: {},
    };
  }

  componentDidMount() {
    this.loadProfile();
  }

  loadProfile = async () => {
    this.setState({ isLoading: true });
    const userData = await getUser();
    this.setState({ isLoading: false, profileData: userData });
  }

  render() {
    const { isLoading, profileData } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading
          ? <Carregando />
          : (
            <div className="profile-card">
              <div className="photo-container">
                <img
                  data-testid="profile-image"
                  src={ profileData.image }
                  alt={ `${profileData.name}'s profile` }
                />
                <Link to="/profile/edit" path="./ProfileEdit">
                  <button type="button">Editar perfil</button>
                </Link>
              </div>
              <h3>Nome</h3>
              <p>{profileData.name}</p>
              <h3>E-mail</h3>
              <p>{profileData.email}</p>
              <h3>Descrição</h3>
              <p>{profileData.description}</p>
            </div>
          )}
      </div>
    );
  }
}

export default Profile;
