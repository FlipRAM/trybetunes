import React from 'react';
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
      </header>
    );
  }
}

export default Header;
