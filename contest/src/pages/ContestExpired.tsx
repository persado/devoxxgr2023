import React from "react";
import {Row} from "antd";

function ContestExpired() {
    return (
        <div>
            <Row justify="center">
                <h1>The contest has now expired</h1>
            </Row>

            <Row justify="center">
                <p>Thank you for participating!</p>
            </Row>
        </div>

    );
}

export default ContestExpired;
