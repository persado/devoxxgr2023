import * as React from "react";
import {Button, Form, Input, Select, notification, Checkbox} from "antd";
import ExpirationService from "../services/ExpirationService";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../services/DataService";

export default function RegistrationForm() {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSuccess = (values: any) => {
        if (ExpirationService.contestExpired()) {
            console.log("Contest expired");
            window.location.reload();
        } else {
            register(values).catch(err => {
                console.log(err.message);
                openNotification("Error", "Unable to perform registration");
            });
        }
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

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };


    async function register(values: any) {
        const res = await registerUser(values);

        if (!res.ok) {
            res.json()
                .then(data => {
                        console.log(data);
                        if (data.errorMessages) {
                            if (res.status === 403 && data.errorMessages.includes("Contest Expired")) {
                                navigate("/expiration");
                            } else {
                                openNotification("Error " + res.status, data.errorMessages.join(`\n`));
                            }
                        } else {
                            openNotification("Error " + res.status, "Unable to perform registration");
                        }
                    }
                )
                .catch((err) => {
                    openNotification("Error " + res.status, "Unable to perform registration");
                });
        } else {
            navigate("/success", {state: {fullName: values.fullname, email: values.email}});
        }
    }

    return (
        <Form form={form} layout={"vertical"}
              name="basic"
              initialValues={{remember: true}}
              autoComplete="off"
              onFinish={handleSuccess}
              onFinishFailed={onFinishFailed}
        >

            <Form.Item
                label="E-mail: "
                name="email"
                rules={[
                    {
                        type: 'email',
                        message: 'The input is not valid E-mail',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail',
                    },
                    {
                        max: 80,
                        message: "E-mail must be less than 80 characters",
                    }
                ]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Full name: "
                name="fullname"
                rules={[
                    {
                        required: true,
                        message: 'Full name cannot be blank',
                        validator: (_, value) => {
                            if (value == null || value.trim() === '') {
                                return Promise.reject();
                            } else {
                                return Promise.resolve();
                            }
                        }
                    },
                    {
                        max: 200,
                        message: "Full name must be less than 200 characters",
                    }
                ]}>
                <Input/>
            </Form.Item>

            <Form.Item name="stack"
                       label="Favorite stack: ">
                <Select>
                    <Select.Option value="ml-python">ML - Python</Select.Option>
                    <Select.Option value="be-java">Backend - Java</Select.Option>
                    <Select.Option value="fe-react">Frontend - React</Select.Option>
                    <Select.Option value="be-other">Backend - Other</Select.Option>
                    <Select.Option value="fe-other">Frontend - Other</Select.Option>
                    <Select.Option value="other">Other</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item name="canContact" valuePropName="checked">
                <Checkbox>Currently looking for a job?</Checkbox>
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit"
                        style={{background: "red", borderRadius: 3, fontWeight: 700}}>
                    Submit
                </Button>
                <p style={{fontSize: "small"}}>
                    By submitting this form, you're consenting to the use of your personal information by Persado to
                    receive relevant emails about our upcoming services and promotions.
                </p>
            </Form.Item>
        </Form>
    );
}
