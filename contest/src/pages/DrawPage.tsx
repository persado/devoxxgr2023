import React, { useState} from "react";
import {Button,  Form,  InputNumber, Row,  Table} from "antd";
import TotalParticipants from "../components/TotalParticipants";


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

    function handleSuccess(values: any) {
        console.log(values);
        // setLuckyNum(values.lotteryNum);
        dataFetch().then(r => console.log("data fetched"));
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const dataFetch = async () => {
        console.log("Fetching data for lucky num: " + luckyNum);

        const data = await (
            await fetch(
                drawUrl + new URLSearchParams( {"idx": luckyNum}),
                {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    }
                }
            )
        ).json();
        setData(data.winnersList);
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

            <Row justify={"center"}>
                <h3> Results </h3>
            </Row>

            <div>
                <Table dataSource={data} columns={columns} pagination={false} rowKey='email'/>
            </div>


            <br/>
        </div>


    );
}

export default DrawPage;
