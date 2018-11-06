import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUser } from '../redux/reducers/user';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitEnabled: false
    }
  }

  validateInput = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const nameRegExp = /^[A-Za-zÀ-ÿ ,.'-]+$/;
    const emailRegExp = /^.+\@[A-Za-z0-9\-]+\.com/;
    const zipRegExp = /^\d{5}$|^\d{5}-{1}\d{4}$/;
    const cityRegExp = /^[A-Za-z]+[A-Za-z\. ]*,\ [A-Za-z]{2}/;

    if (name === 'first' || name === 'last') {
      if (nameRegExp.test(value)) this.validInput(e)
      else this.invalidInput(name);

    } else if (name === 'email') {
      if (emailRegExp.test(value)) this.validInput(e)
      else this.invalidInput(name);

    } else if (name === 'location') {
      if (zipRegExp.test(value) || cityRegExp.test(value)) this.validInput(e)
      else this.invalidInput(name);
    }
  }

  validInput = (e) => {
    const { name } = e.target;
    this.props.updateUser(e)
    const tgtInput = document.querySelectorAll(`input[name="${name}"]`)[0]
    tgtInput.classList.add('form-valid')
    tgtInput.classList.remove('form-invalid')
    this.setState({
      submitEnabled: true
    })
  }

  invalidInput = name => {
    const tgtInput = document.querySelectorAll(`input[name="${name}"]`)[0]
    tgtInput.classList.add('form-invalid');
    tgtInput.classList.remove('form-valid');
    this.setState({
      submitEnabled: false
    })
  }

  submitForm = (e) => {
    e.preventDefault();
    const { first, last, email, location } = this.props.user;
    if (this.state.submitEnabled && first && last && email && location) this.props.history.push('/');
    else this.validateInput(e)
  }

  render() {
    const { first, last, email, location } = this.props.user;
    return (
      <div className="form-background">
        <div className="form inner">

          <form id="initial">
            <label for="first">First Name</label>
            <input type="text" name="first" onBlur={this.validateInput} placeholder="John" />

            <label for="last">Last Name</label>
            <input type="text" name="last" onBlur={this.validateInput} placeholder="Doe" />

            <label for="email">Email</label>
            <input type="text" name="email" onBlur={this.validateInput} placeholder="email@domain.com" />

            <label for="location">Location</label>
            <input
              type="text"
              name="location"
              onBlur={this.validateInput}
              placeholder="Zip or City, ST" />
            {/* TODO: add city/state autocomplete */}
            {/* If user selects "skip" ask for location access and use their location */}
            <button
              type="submit"
              disabled={!this.state.submitEnabled && first && last && email && location}
              onClick={this.submitForm}
            >Search</button>
            <Link to="/"><button>Skip >>></button></Link>
          </form>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, { updateUser })(Form);