// reactstrap components
import {
    Row,
    Col,
    Container,
} from "react-bootstrap";

import '../../App.css';

import {bindAllMethods} from "../../utils/component.js";
import React, { Component } from "react";
  
class ErrorScreen extends Component{

    constructor(props){
        super(props);

        this.state = {
        }

        bindAllMethods(this);
    }

    render(){

        return(
            <Container fluid>
                <Row className="text-center">
                    <Col md={6}>
                        <span className="server-error-title">
                            <b>SERVER ERROR</b>
                        </span>
                    </Col>
                    <Col md={6}>
                        <img src={"https://static.wixstatic.com/media/1b127d_2ee614f40fea4f738ccd284cb56f784c~mv2.png/v1/fill/w_383,h_437,al_c,q_85,usm_0.66_1.00_0.01/astronauta.webp"}/>
                    </Col>
                </Row>
            </Container>
            
        );
    }
}

export default ErrorScreen;