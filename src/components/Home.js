import React, { Component } from 'react';
import { connect } from 'react-redux';

import Search from './Search';

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      needs: 'has'
    }
  }

  componentDidMount() {
    console.log(this.props.user)
  }
  render() {
    return (
      <div>
        <Search />
        Home
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps )(Home);