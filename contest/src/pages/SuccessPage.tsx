import React, {useEffect, useState} from "react";
import {Row} from "antd";
import {useLocation} from "react-router-dom";
import {fetchImgSourceUrl, fetchHtmlData} from "../services/DataService";

function SuccessPage() {

    const {state} = useLocation();

    let fullName: any;
    let email: any;

    if (state) {
        fullName = state.fullName;
        email = state.email;
    }

    const [imgSource, setImgSource] = useState<any>(null);
    const [bannerData, setBannerData] = useState<any>(null);


    useEffect(() => {
        fetchImgSourceUrl("logo.jpg", email).then(sourceUrl => setImgSource(sourceUrl));
        fetchHtmlData("banner.html", email).then(responseText => setBannerData(responseText));
    }, []);

    return (
        <div>
            <Row justify="center">
                <h1> Thank you {fullName} ! </h1>
            </Row>

            {imgSource && <Row justify="center">
                <img width={200} height={200} src={imgSource}/>
            </Row>
            }

            {bannerData && <Row justify="center">
                <div dangerouslySetInnerHTML={{__html: bannerData}}>
                </div>
            </Row>
            }
        </div>

    );
}

export default SuccessPage;
