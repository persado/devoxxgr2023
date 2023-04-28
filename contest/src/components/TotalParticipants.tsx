import {Outlet} from "react-router-dom";
import ContestExpired from "./ContestExpired";
import ExpirationService from "../services/ExpirationService";
import {useEffect, useState} from "react";

function TotalParticipants() {

    const [data, setData] = useState(null);
    const url = process.env.REACT_APP_API_URL + '/total_participants';

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const newData = await response.json();
            setData(newData);
        };

        fetchData();
    }, []);

    return (
        <div>Total number of participants: {data}</div>
    );
}
export default TotalParticipants;