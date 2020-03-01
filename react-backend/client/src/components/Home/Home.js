import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import { Row, Col, Container } from "react-bootstrap";
import "./Home.css";
class Home extends Component {
  render() {
    return (
      <div className="Home">
        {/* <ul className="header">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/stuff">Stuff</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul> */}
        <h1 className="center basic">Pass The Aux</h1>
        <Container>
          <Col>
            <Row className="justify-content-md-center">
              <Button variant="secondary">
                {/* <NavLink to="/dj" className="buttonHome">
                  I'm The DJ!
                </NavLink> */}
                I'm The DJ!
              </Button>
            </Row>
            <Row className="justify-content-md-center">
              <p>Or Enter Guest Below:</p>
            </Row>
            <Row className="justify-content-md-left">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                />
                <InputGroup.Append>
                  <Button variant="outline-primary">Submit</Button>
                </InputGroup.Append>
              </InputGroup>
            </Row>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Home;
