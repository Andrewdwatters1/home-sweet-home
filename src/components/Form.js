import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { updateUser, updateUserLocation } from '../redux/reducers/user';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      submitEnabled: false,
      lat: '',
      long: '',
      zip: '',
      city: '',
      state: '',
    }
  }

  validateName = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const nameRegExp = /^[A-Za-zÀ-ÿ ,.'-]+$/;
    if (nameRegExp.test(value)) this.inputIsValid(e)
    else this.inputIsInvalid(name);
  }

  validateEmail = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    const emailRegExp = /^.+\@[A-Za-z0-9\-]+\.com/;
    if (emailRegExp.test(value)) this.inputIsValid(e)
    else this.inputIsInvalid(name);
  }

  validateZip = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ zip: value })

    const zipRegExp = /^\d{5}$/;
    if (zipRegExp.test(value)) {
      this.inputIsValid(e);
      axios.post('/api/getCityFromZip', { value })
        .then(result => {
          this.setState({
            city: result.data['place name'],
            state: result.data['state abbreviation']
          })
        })
    } else this.inputIsInvalid(name);
  }

  validateCity = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    this.setState({ city: value });

    const cityRegExp = /^[A-Za-z\.\,\ ]+$/;
    if (cityRegExp.test(value)) this.inputIsValid(e);
    else this.inputIsInvalid(name);
  }

  validateState = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({ state: value });

    const stateRegExp = /^[A-Z]{2}$/i
    if (stateRegExp.test(value)) this.inputIsValid(e);
    else this.inputIsInvalid(name);
  }

  inputIsValid = (e) => {
    const { name } = e.target;
    this.props.updateUser(e);

    const tgtInput = document.querySelectorAll(`input[name="${name}"]`)[0]
    tgtInput.classList.add('form-valid')
    tgtInput.classList.remove('form-invalid')

    this.setState({ submitEnabled: true })
  }

  inputIsInvalid = name => {
    const tgtInput = document.querySelectorAll(`input[name="${name}"]`)[0]
    tgtInput.classList.add('form-invalid');
    tgtInput.classList.remove('form-valid');

    this.setState({ submitEnabled: false })
  }

  submitForm = (e) => {
    e.preventDefault();
    const { first, last, email, city, state, zip } = this.props.user;
    if (this.state.submitEnabled && first && last && email && city && state && zip) this.props.history.push('/');
  }

  getLocationInfo = (position) => {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;

    axios.post('/api/getLocationInfo', { lat, long })
      .then(result => {
        this.setState({
          zip: result.data[0].address_components[7].long_name,
          city: result.data[0].address_components[3].long_name,
          state: result.data[0].address_components[5].short_name
        }, () => {
          const { zip, city, state } = this.state;
          this.props.updateUserLocation({ zip, city, state })

          const tgts = [
            document.querySelectorAll(`input[name="zip"]`)[0],
            document.querySelectorAll(`input[name="city"]`)[0],
            document.querySelectorAll(`input[name="state"]`)[0]
          ]

          tgts.forEach((e) => e.classList.add('form-valid'))
        })
      })
      .catch(error => console.log('error in geolocation', error));
  }

  componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getLocationInfo);
    }
  }

  render() {
    // console.log(this.props.user);
    const { first, last, email, city, state, zip } = this.props.user;

    return (
      <div className="form-background" >
        <div className="form inner" >

          <form id="initial" >
            <label for="first"> First Name</label>
            <input
              type="text"
              name="first"
              onBlur={this.validateName}
              placeholder="John" />

            <label for="last">Last Name </label>
            <input
              type="text"
              name="last"
              onBlur={this.validateName}
              placeholder="Doe" />

            <label for="email">Email</label>
            <input
              type="text"
              name="email"
              onBlur={this.validateEmail}
              placeholder="email@domain.com" />

            <div>
              <div>
                <label for="zip">Zip</label>
                <input
                  type="text"
                  name="zip"
                  onChange={this.validateZip}
                  placeholder="90210"
                  value={this.state.zip} />
              </div>

              <div>
                <label for="city">City</label>
                <input
                  type="text"
                  name="city"
                  onChange={this.validateCity}
                  placeholder="Lovely"
                  value={this.state.city} />

                <label for="state">State</label>
                <input
                  type="text"
                  name="state"
                  onChange={this.validateState}
                  placeholder="CA"
                  value={this.state.state} />
              </div>
            </div>

            <button
              type="submit"
              disabled={!this.state.submitEnabled && first && last && email && city && state && zip}
              onClick={this.submitForm}>
              Search
            </button>
            <Link to="/"><button onClick={this.skipForm}>Skip >>></button></Link>
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
export default connect(mapStateToProps, { updateUser, updateUserLocation })(Form);
