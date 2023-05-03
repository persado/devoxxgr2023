
const drawUrl = process.env.REACT_APP_API_URL + '/draw?';
const totalParticipantsUrl = process.env.REACT_APP_API_URL + '/total_participants';
const registerUrl = process.env.REACT_APP_API_URL + '/register';


export const performDraw = async (drawNum: any, drawPass: any) => {
    try {
        const res = await fetch(
            drawUrl + new URLSearchParams({"idx": drawNum, "pass" :drawPass}),
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
        const response = await fetch(totalParticipantsUrl, {
            method: 'GET',
            headers:
                new Headers({
                    "ngrok-skip-browser-warning": "69420",
                }),
        });
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
