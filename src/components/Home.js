import React, { Component } from 'react';

export default class Home extends Component {
  constructor() {
    super() 
    this.state = {
      needs: 'has'
    }
  }
  render() {
    return (
      <div>
        Home
      </div>
    )
  }
}