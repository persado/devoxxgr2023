import React, {useState} from "react";
import {Button, Form, InputNumber, notification, Row, Table} from "antd";
import TotalParticipants from "../components/TotalParticipants";
import ResultsTable from "../components/ResultsTable";


const columns = [

    {
        title: "Draw Id",
        dataIndex: "drawId",
        width: '10%'
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Full name",
        dataIndex: "fullname",
    }

]

function DrawPage() {
    const [form] = Form.useForm();
    const [luckyNum, setLuckyNum] = useState<any | null>(null)
    const [data, setData] = useState<any | null>(null)

    const drawUrl = process.env.REACT_APP_API_URL + '/draw?';

    async function handleSuccess(values: any) {
        console.log(values);
        try {
            await dataFetch();
        } catch (e) {
            openNotification("Error", "Unable to perform draw operation")
        }
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const openNotification = (messageTitle: string, data: any) => {
        notification.error({
            message: messageTitle,
            description: (
                <>
                    {data}
                </>
            )
        })
    };

    const dataFetch = async () => {
        console.log("Fetching data for lucky num: " + luckyNum);

        //TODO add a code input to be verified in the backend

        const res = await fetch(
            drawUrl + new URLSearchParams({"idx": luckyNum}),
            {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                }
            }
        )

        const data = await res.json();
        if (data.errorMessages) {
            openNotification("Error " + res.status, data.errorMessages.join(`\n`));
        } else {
            setData(data.winnersList);
        }
    };

    return (
        <div>
            <br/>
            <Row justify={"center"}>
                <TotalParticipants/>
            </Row>
            <br/>
            <Row justify={"center"}>
                <Form form={form} layout={"horizontal"}
                      name="basic"
                      onFinish={handleSuccess}
                      onFinishFailed={onFinishFailed}
                >

                    <Form.Item
                        label="Lottery number : "
                        name="lotteryNum"
                        rules={[
                            {
                                type: 'number',
                                required: true,
                                message: 'Please input the lottery number',
                            }
                        ]}>

                        <InputNumber min={0} max={9} onChange={(value) => {
                            setLuckyNum(value)
                        }}/>

                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit"
                                style={{background: "red", borderRadius: 3, fontWeight: 700}}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Row>

            <br/>
                <ResultsTable data={data} columns={columns}/>
            <br/>
        </div>


    );
}

export default DrawPage;
