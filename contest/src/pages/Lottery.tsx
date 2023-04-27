import React, {useEffect, useRef, useState} from "react";
import {Button, Checkbox, Form, Input, InputNumber, Row, Select, Table} from "antd";


const columns = [
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Name",
        dataIndex: "name",
    }
]

function Lottery() {
    const [form] = Form.useForm();
    const [luckyNum, setLuckyNum] = useState<any | null>(null)
    const [winners, setWinners] = useState<any | null>(null)

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
                'http://localhost:8080/lottery/' + luckyNum, {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                }
            )
        ).json();
        setWinners(data);
    };

    return (
        <div>
            <br/>
            <Row justify={"center"}>
                <Form form={form} layout={"inline"}
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
                        <InputNumber min={0} onChange={(value) => {
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
                <Table dataSource={winners} columns={columns} pagination={false} rowKey='email'/>
            </div>


            <br/>
        </div>


    );
}

export default Lottery;
