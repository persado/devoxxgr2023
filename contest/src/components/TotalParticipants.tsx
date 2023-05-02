import {useEffect, useState} from "react";
import {getTotalParticipants} from "../services/DataService";

function TotalParticipants() {

    const [data, setData] = useState(null);

    useEffect(() => {
        getTotalParticipants().then(totalParticipants => setData(totalParticipants));
    }, []);

    return (
        <div>Total number of participants: {data}</div>
    );
}

export default TotalParticipants;