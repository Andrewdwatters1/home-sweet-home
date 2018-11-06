import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateUser } from '../redux/reducers/user';

class Form extends Component {
  constructor(props) {
    super(props)
  }

  validateInput = (e) => {
    const { name, value } = e.target;
    const nameRegExp = /^[A-Za-zÀ-ÿ ,.'-]+$/;
    const emailRegExp = /^.+\@[A-Za-z0-9\-]+\.com/;
    const zipRegExp = /^\d{5}$|^\d{5}-{1}\d{4}$/;
    const cityRegExp = /^[A-Za-z]+[A-Za-z\.\ ]*,\ [A-Za-z]{2}/;

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
    // if ((name === 'first' && validName) || (name === 'last' && validName)) this.validInput(e);
    // else if (name === 'email' && validEmail) this.validInput(e);
    // else if (name === 'location' && validLoc) this.validInput(e);
  }

  validInput(e) {
    const tgt = document.querySelectorAll(`input[name="${e.target.name}"]`)[0]
    tgt.classList.remove('form-invalid');
    tgt.classList.add('form-valid')
    this.props.updateUser(e)
  }

  invalidInput(name) {
    const tgt = document.querySelectorAll(`input[name="${name}"]`)[0]
    tgt.classList.add('form-invalid');
    tgt.classList.remove('form-valid')
  }

  render() {
    console.log('current user is', this.props.user)
    return (
      <div className="form-background">
        <div className="form inner">
          <form onSubmit={this.submitUserInfo}>
            <label for="first">First Name</label>
            <input name="first" onBlur={this.validateInput} placeholder="John" />
            <label for="last">Last Name</label>
            <input name="last" onBlur={this.validateInput} placeholder="Doe" />
            <label for="email">Email</label>
            <input name="email" onBlur={this.validateInput} placeholder="email@domain.com" />
            <label for="location">Location</label>
            <input name="location" onBlur={this.validateInput} placeholder="Zip or City, ST" />
            {/* TODO: add city/state autocomplete */}
            {/* If user selects "skip" ask for location access and use their location */}
            <Link to="/home"><button>Skip >>></button></Link>
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