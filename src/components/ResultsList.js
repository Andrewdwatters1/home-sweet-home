import React from 'react';

export default function ResultsList(props) {
  return (
    <div className="results-list-outer">
      <ul>
        <li onClick={(tgt) => props.updateSelectedResult(0)}>Results[0]</li>
        <li onClick={(tgt) => props.updateSelectedResult(1)}>Results[1]</li>
        <li onClick={(tgt) => props.updateSelectedResult(2)}>Results[2]</li>
        <li onClick={(tgt) => props.updateSelectedResult(3)}>Results[3]</li>
        <li onClick={(tgt) => props.updateSelectedResult(4)}>Results[4]</li>
        <li onClick={(tgt) => props.updateSelectedResult(5)}>Results[5]</li>
        <li onClick={(tgt) => props.updateSelectedResult(6)}>Results[6]</li>
        <li onClick={(tgt) => props.updateSelectedResult(7)}>Results[7]</li>
      </ul>
    </div >
  )
}