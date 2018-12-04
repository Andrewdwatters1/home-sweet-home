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

  updateSelectedResult = (i) => {
    this.props.updateSelectedResult(i);
    const tgts = document.querySelectorAll('li.results-list-item');
    tgts.forEach(e => e.classList.remove('results-list-item-active'));
    document.getElementById(`results-list-item-${i}`).classList.add('results-list-item-active');
  }
  componentDidMount() {
    document.addEventListener('click', this.enableHideSidebar);
  }

  render() {
    const { searchResults } = this.props.query;
    const { state } = this.props.user;
    console.log(this.props.query.selectedSearchResult);

    return (
      <div
        className="results-list-outer ignore"
        onMouseEnter={this.showSidebar}
        onBlur={this.enableHideSidebar}
        onMouseLeave={this.hideSidebar}>

        <ul className="results-list-inner ignore">
          {this.props.query.searchResults
            .map((e, i) => {
              return (
                <li
                  onClick={() => this.updateSelectedResult(i)}
                  className="results-list-item ignore"
                  id={`results-list-item-${i}`}>
                  <p className="ignore">{`${searchResults[i].address} \n\r${searchResults[i].city}, ${usStates[searchResults[i].province] || state}`}</p>
                  <p className="ignore">{`${searchResults[i].numBedroom} beds, ${searchResults[i].numBathroom} baths, ${searchResults[i].floorSizeValue} ${searchResults[i].floorSizeUnit}`}</p>
                  {searchResults[i].statuses[0].type ?
                    <p className="ignore">{`${searchResults[i].statuses[0].type}: $${searchResults[i].prices[0].amountMax || searchResults[i].proves[0].amountMax}`}</p>
                    :
                    <p className="ignore">${searchResults[i].prices[0].amountMax || searchResults[i].proves[0].amountMax}</p>
                  }
                </li>
              )
            })
          }
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
