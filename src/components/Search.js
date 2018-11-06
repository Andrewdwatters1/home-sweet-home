import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../redux/reducers/user';

class Search extends Component {
  constructor(props) {
    super(props)
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