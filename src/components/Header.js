import React from 'react';
import { Link } from 'react-router-dom';
import Carregando from '../pages/Carregando';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      name: '',
    };
    this.handleLoading = this.handleLoading.bind(this);
  }

  componentDidMount() {
    this.handleLoading();
  }

  async handleLoading() {
    this.setState({ isLoading: true });
    const { name } = await getUser();
    this.setState({
      isLoading: false,
      name,
    });
  }

  render() {
    const { isLoading, name } = this.state;
    return (
      <header data-testid="header-component">
        { isLoading
          ? <Carregando />
          : <p data-testid="header-user-name">{name}</p>}
        <Link to="/search" data-testid="link-to-search"> Pesquisa </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favoritos</Link>
        <Link to="/profile" data-testid="link-to-profile"> Perfil </Link>
      </header>
    );
  }
}

export default Header;
