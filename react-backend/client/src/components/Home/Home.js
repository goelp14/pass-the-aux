import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
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
                <NavLink to="/stuff" className="buttonHome">
                  I'm The DJ!
                </NavLink>
              </Button>
            </Row>
            <Row className="justify-content-md-center">
              <p>Or Enter Guest Below:</p>
            </Row>
            <Row className="justify-content-md-center">
              <Form>
                <Form.Control
                  size="md"
                  type="text"
                  placeholder="Enter Song Here"
                  className="formHome"
                />
              </Form>
            </Row>
          </Col>
        </Container>
      </div>
    );
  }
}

export default Home;
