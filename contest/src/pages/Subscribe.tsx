import {Col, Row} from "antd";
import wheel from "../wheel.webp";
import FormComponent from "../components/Form";
import React from "react";

function Subscribe() {
    return (
        <Row justify="center">
            <Col xs={24} xl={8} style={{textAlign: 'center', padding:20}}>
                <img src={wheel} className="App-logo" alt="wheel" style={{maxWidth: 300, maxHeight: 300}}/>
            </Col>
            <Col xs={24} xl={8} style={{padding: 20}}>
                <FormComponent/>
            </Col>
        </Row>
    );
}

export default Subscribe;

