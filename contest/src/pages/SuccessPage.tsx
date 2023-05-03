import React, {useEffect, useState} from "react";
import {Row} from "antd";
import {useLocation} from "react-router-dom";


function SuccessPage() {

    const {state} = useLocation();

    let fullName: any;
    let email: any;
    let touchpointUrl: any;
    const convertUrl = process.env.REACT_APP_CONVERT_URL;


    if (state) {
        fullName = state.fullName;
        email = state.email;
        touchpointUrl = process.env.REACT_APP_TOUCHPOINT_URL +'?user_id=' + email + '&email=' + email ;
    }


    return (
        <div>
            <Row justify="center">
                <h1> Thank you {fullName} ! </h1>
            </Row>

            { touchpointUrl &&
                <Row justify="center">
                    <img src={convertUrl}/>
                    <img src= {touchpointUrl}/>
                </Row>
            }

        </div>

    );
}

export default SuccessPage;
