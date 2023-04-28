import React from "react";
import {Row} from "antd";
import {useLocation} from "react-router-dom";

function SuccessPage() {

    const {state} = useLocation();

    let fullName: any;
    let email: any;

    if (state) {
        fullName = state.fullName;
        email = state.email;
    }

    return (
        <Row justify="center">
            <h1> Thank you {fullName} {email}! </h1>
        </Row>
    );
}

export default SuccessPage;
