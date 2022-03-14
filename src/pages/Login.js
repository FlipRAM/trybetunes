import React from 'react';
import propTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      buttonIsDisabled: true,
      name: '',
      isLoading: false,
    };
    this.validate = this.validate.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    this.setState({ isLoading: true });
    const { name } = this.state;
    const userName = name;
    const { history } = this.props;
    await createUser({ name: userName });
    history.push('/search');
  }

  validate(event) {
    event.preventDefault();
    const newName = event.target.value;
    const minLengthName = 3;
    if (newName.length >= minLengthName) {
      this.setState({ name: newName, buttonIsDisabled: false });
    } else if (newName.length < minLengthName) {
      this.setState({ name: newName, buttonIsDisabled: true });
    }
  }

  render() {
    const { buttonIsDisabled, name, isLoading } = this.state;
    return (
      <div data-testid="page-login">
        <h2>Login</h2>
        {isLoading
          ? <Carregando />
          : (
            <form>
              <label htmlFor="name">
                Nome:
                <input
                  type="text"
                  id="name"
                  value={ name }
                  data-testid="login-name-input"
                  onChange={ this.validate }
                />
              </label>
              <button
                type="submit"
                data-testid="login-submit-button"
                disabled={ buttonIsDisabled }
                onClick={ this.handleClick }
              >
                Entrar
              </button>
            </form>
          )}
      </div>
    );
  }
}

Login.propTypes = {
  history: propTypes.shape,
}.isRequired;

export default Login;
