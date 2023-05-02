import React, {useState} from "react";
import {Button, Form, Input, InputNumber, notification, Row, Table} from "antd";
import TotalParticipants from "../components/TotalParticipants";
import ResultsTable from "../components/ResultsTable";
import {performDraw} from "../services/DataService";


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
    const [data, setData] = useState<any | null>(null)

    async function handleSuccess(values: any) {
        try {
            const data = await performDraw(values.drawNumber, values.drawPass);
            if (data.errorMessages) {
                openNotification("Error ", data.errorMessages.join(`\n`));
            } else {
                setData(data);
            }
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
                        label="Draw number : "
                        name="drawNumber"
                        rules={[
                            {
                                type: 'number',
                                required: true,
                                message: 'Please input the lottery number',
                            }
                        ]}>

                        <InputNumber min={0} max={9} />

                    </Form.Item>

                    <Form.Item
                        label="Pass : "
                        name="drawPass"
                        rules={[
                            {
                                required: true,
                                message: 'Please input the draw pass',
                            }
                        ]}>

                        <Input />
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
