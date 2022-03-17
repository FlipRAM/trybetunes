import React from 'react';
import propTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';
import Carregando from './Carregando';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      image: '',
      name: '',
      email: '',
      description: '',
      isDisabled: true,
    };
  }

  componentDidMount() {
    this.getInfo();
  }

  getInfo = async () => {
    this.setState({ isLoading: true });
    const { name, email, image, description } = await getUser();
    this.setState({ isLoading: false, name, email, image, description });
  }

  validateForm = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.checkValidate());
  }

  checkValidate = () => {
    const { image, name, email, description } = this.state;
    if ((
      image !== ''
      && name !== ''
      && description !== ''
      && email.includes('@')
      && email.includes('.com')
    )) {
      this.setState({ isDisabled: false });
    }
  }

  updateData = async () => {
    const { image, name, email, description } = this.state;
    const { history } = this.props;
    await updateUser({ name, email, image, description });
    history.push('/profile');
  }

  render() {
    const {
      image,
      name,
      email,
      description,
      isLoading,
      isDisabled,
    } = this.state;
    return (
      <div id="profile-edit-page">
        <Header />
        <div data-testid="page-profile-edit">
          {isLoading
            ? <Carregando />
            : (
              <div className="profile-edit-card">
                <div className="photo-edit-container">
                  <input
                    type="text"
                    data-testid="edit-input-image"
                    name="image"
                    value={ image }
                    onChange={ this.validateForm }
                  />
                </div>
                <label htmlFor="changeName">
                  Nome
                  <input
                    type="text"
                    id="changeName"
                    data-testid="edit-input-name"
                    name="name"
                    value={ name }
                    onChange={ this.validateForm }
                  />
                </label>
                <label htmlFor="changeEmail">
                  E-mail
                  <input
                    type="email"
                    id="changeEmail"
                    data-testid="edit-input-email"
                    name="email"
                    value={ email }
                    onChange={ this.validateForm }
                  />
                </label>
                <label htmlFor="changeDescription">
                  Descrição
                  <textarea
                    rows="8"
                    cols="50"
                    id="changeDescription"
                    data-testid="edit-input-description"
                    name="description"
                    value={ description }
                    onChange={ this.validateForm }
                  />
                </label>
                <button
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ isDisabled }
                  onClick={ this.updateData }
                >
                  Salvar
                </button>
              </div>
            )}
          <h2>Editar perfil</h2>
        </div>
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: propTypes.shape,
}.isRequired;

export default ProfileEdit;
