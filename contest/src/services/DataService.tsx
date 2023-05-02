
const baseTouchpointRequestUrl = process.env.REACT_APP_TOUCHPOINT_URL + '/' + process.env.REACT_APP_CAMPAIGN ;
const drawUrl = process.env.REACT_APP_API_URL + '/draw?';
const totalParticipantsUrl = process.env.REACT_APP_API_URL + '/total_participants';
const registerUrl = process.env.REACT_APP_API_URL + '/register';


export const fetchImgSourceUrl = async (touchpointName: string, userId: string) => {
    try {
        const url = baseTouchpointRequestUrl + '/' + touchpointName + '?user_id=' + userId;
        const response = await fetch(url);
        if (response.ok) {
            return response.url;
        }
        return null;
    } catch (e) {
        console.log("Unable to fetch img source data")
        return null;
    }
};


export const fetchHtmlData = async (touchpointName: string, userId: string) => {
    try {
        const url = baseTouchpointRequestUrl + '/' + touchpointName + '?user_id=' + userId;
        const response = await fetch(url);
        if (response.ok) {
            const responseData = await response.text();
            return responseData;
        }
        return null;
    } catch (e) {
        console.log("Unable to fetch text data for touchpoint")
        return null;
    }
};


export const performDraw = async (drawNum: any) => {
    try {
        const res = await fetch(
            drawUrl + new URLSearchParams({"idx": drawNum}),
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
        )
        const data = await res.json();
        return data;
    } catch (e) {
        console.log("Unable to perform draw")
    }
};


export const getTotalParticipants = async () => {
    try {
        const response = await fetch(totalParticipantsUrl);
        const totalParticipants = await response.json();
        return totalParticipants;
    } catch (e) {
        console.log("Unable to get total participants")
    }
}


export const registerUser = async (formValues: any) => {
    const res = await fetch(registerUrl, {
        method: 'POST',
        body: JSON.stringify(formValues),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
    return res;
}
