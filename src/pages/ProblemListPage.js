import React, { Component } from "react";
import { Link } from "react-router-dom";
class ProblemListPage extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/problem/1">문제1</Link>
          </li>
          <li>
            <Link to="/problem/2">문제2</Link>
          </li>
          <li>
            <Link to="/problem/3">문제3</Link>
          </li>
          <li>
            <Link to="/problem/4">문제4</Link>
          </li>
          <li>
            <Link to="/problem/5">문제5</Link>
          </li>
          <li>
            <Link to="/problem/6">문제6</Link>
          </li>
        </ul>
      </div>
    );
  }
}
export default ProblemListPage;
