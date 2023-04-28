import {Col, Row} from "antd";
import wheel from "../wheel.webp";
import RegistrationForm from "../components/RegistrationForm";
import React from "react";

function RegisterPage() {
    return (
        <Row justify="center">
            <Col xs={24} xl={8} style={{textAlign: 'center', padding:20}}>
                <img src={wheel} className="App-logo" alt="wheel" style={{maxWidth: 300, maxHeight: 300}}/>
            </Col>
            <Col xs={24} xl={8} style={{padding: 20}}>
                <RegistrationForm/>
            </Col>
        </Row>
    );
}

export default RegisterPage;

