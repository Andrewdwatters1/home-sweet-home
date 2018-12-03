import React, { Component } from 'react';
import { connect } from 'react-redux';

import { updateSelectedResult } from '../redux/reducers/query';
import { usStates } from '../assets/globalData.json';

class ResultsList extends Component {
  constructor() {
    super()
    this.state = {
      enableHideSidebar: false,
    }
  }
  enableHideSidebar = (e) => {
    if (![...e.target.classList].some(e => e === 'ignore')) {
      this.setState({
        enableHideSidebar: true
      }, () => {
        this.hideSidebar()
        document.removeEventListener('click', this.enableHideSidebar);
      });
    }
  }
  showSidebar = () => {
    document.documentElement.style.setProperty('--resultsListWidth', '200px');
  }
  hideSidebar = () => {
    if (this.state.enableHideSidebar) {
      document.documentElement.style.setProperty('--resultsListWidth', '20px');
    }
  }

  componentDidMount() {
    document.addEventListener('click', this.enableHideSidebar);
  }
  render() { // MUST ADD CLASSNAME="ignore" to all elements
    const { searchResults } = this.props.query;
    const { state } = this.props.user;

    console.log(searchResults[0]);

    return (
      <div
        className="results-list-outer ignore"
        onMouseEnter={this.showSidebar}
        onBlur={this.enableHideSidebar}
        onMouseLeave={this.hideSidebar}>

        <ul>
          {this.props.query.searchResults
            .map((e, i) => {
              return (
                <li
                  onClick={() => this.props.updateSelectedResult(i)}>
                  <p>{`${searchResults[i].address} \n\r${searchResults[i].city}, ${usStates[searchResults[i].province] || state}`}</p>
                  <p>{`${searchResults[i].numBedroom} beds, ${searchResults[i].numBathroom} baths, ${searchResults[i].floorSizeValue} ${searchResults[i].floorSizeUnit}`}</p>
                  {searchResults[i].statuses[0].type ?
                    <p>{`${searchResults[i].statuses[0].type}: $${searchResults[i].prices[0].amountMax || searchResults[i].proves[0].amountMax}`}</p>
                    :
                    <p>${searchResults[i].prices[0].amountMax || searchResults[i].proves[0].amountMax}</p>
                  }
                </li>
              )
            })}
        </ul>

      </div >
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    query: state.query
  }
}
export default connect(mapStateToProps, { updateSelectedResult })(ResultsList);


// 20474 E Hampden Pl
// Aurora, CO 80013
// 3 beds 3 baths 1,591 sqft

// $359,900
// [status]
