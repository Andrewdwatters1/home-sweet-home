import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../redux/reducers/user';

class Search extends Component {
  constructor(props) {
    super(props)
  }



  // geoLocationOn = (position) => {
  //   this.setState({
  //     userLat: position.coords.latitude,
  //     userLng: position.coords.longitude
  //   }, () => {
  //     this.getUpdatedWeather()
  //   })
  // }
  // geoLocationOff = () => {
  //   axios.get(`//api.zippopotam.us/us/${this.state.userZipCode}`).then(result => {
  //     this.setState({
  //       userLat: result.data.places[0].latitude,
  //       userLng: result.data.places[0].longitude,
  //       userCityName: result.data.places[0]['place name']
  //     }, () => {
  //       this.getUpdatedWeather()
  //     })
  //   })
  // }
  // geoLocate = () => {
  //   const success = (position) => {
  //     this.geoLocationOn(position);
  //   }
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(success);
  //   } else {
  //     this.geoLocationOff();
  //   }
  // }
  geoLocateSuccessfull = (position) => {
    console.log(position)
  } 
  
  componentDidMount() {
    
    if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.geoLocateSuccessfull);
    }
  }




  render() {
    console.log(this.props.user)
    return (
      <div>
        I am the searchbar
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, { updateUser })(Search);