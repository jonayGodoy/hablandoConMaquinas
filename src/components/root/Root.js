import React from 'react';
import MainTemplate from '../commons/template/MainTemplate';

import { BrowserRouter as Router} from "react-router-dom";
import App from '../../pages/App';


export default class Root extends React.Component {
  render() {
    return (
      <Router><App/></Router>
    );
  }
}
