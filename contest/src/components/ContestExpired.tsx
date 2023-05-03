import React from "react";
import {Col, Row, Space} from "antd";

function ContestExpired() {
    return (
        <div>
            <Row justify="center">
                <Col xs={24} xl={24} style={{textAlign: 'center', padding: 10}}>
                        <h1>We would like to inform you that the contest has now officially expired</h1>
                </Col>
            </Row>
            <Row justify="center">
                <Col xs={24} xl={8} style={{textAlign: 'center', padding: 10}}>
                    <p>Thank you all for your enthusiastic participation!</p>

                    <p>Find out more about our current career openings at &nbsp;
                        <a href="https://apply.workable.com/persado/" target="_blank"
                           style={{color: "#626f7c"}}>Careers at Persado</a>
                    </p>
                </Col>
            </Row>
        </div>

    );
}

export default ContestExpired;
