import React, { PropTypes } from 'react';
import classnames from 'classnames';
import { Redirect } from 'react-router';
import timezones from '../../data/timezones';
import TextFieldGroup from '../common/TextFieldGroup';
import validateInput from '../../../shared/validations/signup';

class SignupForm extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      timezone: '',
      errors: {},
      isLoading: false,
      isLogged: false
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.checkUserExists = this.checkUserExists.bind(this);
  }
  onChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  isValid() {
    const { errors, isValid } = validateInput(this.state);

    if(!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }
  onSubmit(e) {
    e.preventDefault();
    if(this.isValid()) {
      this.setState({ errors: {}, isLoading: true });
      this.props.userSignupRequest(this.state).then(
        () => {
          this.props.addFlashMessage({
            type: 'success',
            text: 'You signed up successfully. Welcome!'
          });
          this.setState({ isLogged: true });
        }
        ,
        ({ data }) => this.setState({ errors: data, isLoading: false })
      );
    }
  }
  checkUserExists(e) {

  }
  render () {
    const errors = this.state.errors;
    const options = Object.keys(timezones).map(
      k => <option key={timezones[k]} value={timezones[k]}>{k}</option>
    );
    return (
      <div>
        {this.state.isLogged ? <Redirect to="/" /> :
          <form onSubmit={this.onSubmit}>
            <h1>Join our community!</h1>

            <TextFieldGroup
              field="username"
              value={this.state.username}
              label="Username"
              error={errors.username}
              onChange={this.onChange}
              onBlur={this.checkUserExists}
            />
            <TextFieldGroup
              field="email"
              value={this.state.email}
              label="Email"
              error={errors.email}
              onChange={this.onChange}
              onBlur={this.checkUserExists}
            />
            <TextFieldGroup
              field="password"
              value={this.state.password}
              label="Password"
              error={errors.password}
              onChange={this.onChange}
              type="password"
            />
            <TextFieldGroup
              field="passwordConfirmation"
              value={this.state.passwordConfirmation}
              label="Password Confirmation"
              error={errors.passwordConfirmation}
              onChange={this.onChange}
              type="password"
            />
            <div className={ classnames("form-group", { "has-error": errors.timezone }) }>
              <label className="control-label">Timezone</label>
              <select
                className="form-control"
                name="timezone"
                onChange={this.onChange}
                value={this.state.timezone}
              >
                <option value="" disabled>Choose Your Timezone</option>
                {options}
              </select>
              {errors.timezone && <span className="help-block">{errors.timezone}</span>}
            </div>
            <div className="form-group">
              <button disabled={this.state.isLoading} className="btn btn-primary btn-lg">
                Sign up
              </button>
            </div>
          </form>
        }
      </div>
    )
  }
}

SignupForm.propTypes = {
  userSignupRequest: React.PropTypes.func.isRequired,
  addFlashMessage: React.PropTypes.func.isRequired
}

export default SignupForm;
