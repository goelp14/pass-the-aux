import React, { Component } from "react";
import { Route, HashRouter } from "react-router-dom";
import Home from "./Home/Home";
import Stuff from "./Stuff";
import Contact from "./Contact";
import DJ from "./Dj/Dj";
import Guest from "./Guest/Guest";
import 'bootstrap/dist/css/bootstrap.min.css';


// import { ReactComponent as Logo } from './logo/logo.svg';

class Main extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          {/* <Logo /> */}
          {/* <h1>PassTheAux</h1> */}
          <div className="content">
            <Route exact path="/" component={Home} />
            <Route path="/stuff" component={Stuff} />
            <Route path="/contact" component={Contact} />
            <Route path="/dj" component={DJ} />
            <Route path="/guest" component={Guest} />
          </div>
        </div>
      </HashRouter>
    );
  }
}

export default Main;