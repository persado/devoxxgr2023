import {Col, Row} from "antd";
import wheel from "../wheel.webp";
import RegistrationForm from "../components/RegistrationForm";
import React, {useEffect, useState} from "react";

function RegisterPage() {
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()} ${current.getHours()}:${current.getMinutes()} `;


    // useEffect(() => {
    //
    // }, []);
    //
        return (
            <Row justify="center">
                <Col xs={24} xl={8} style={{textAlign: 'center', padding: 20}}>
                    <h1>Register and win!</h1>
                    <p>The contest is scheduled to conclude on <b>May 05, 2023 at 18:20 EET</b>, after which the winner will
                        be informed via email and can claim their prize at the Persado booth.</p>
                    <p>Current date: {date} </p>

                    <img src={wheel} className="App-logo" alt="wheel" style={{maxWidth: 300, maxHeight: 300}}/>
                </Col>
                <Col xs={24} xl={8} style={{padding: 20}}>
                    <RegistrationForm/>
                </Col>
            </Row>
        );
    // }


}

export default RegisterPage;

