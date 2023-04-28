import * as React from "react";
import {Button, Form, Input, Select, notification, Checkbox} from "antd";
import ExpirationService from "../services/ExpirationService";


export default function RegistrationForm() {
    // use state to memoize data and change it when we need it
    const [data, setData] = React.useState({});
    const [form] = Form.useForm();

    const registerUrl = process.env.REACT_APP_API_URL + '/register';

    const handleSuccess = (values: any) => {
        // TODO Proceed to save values
        console.log(values);

        if (ExpirationService.contestExpired()) {
            console.log("expired");
            window.location.reload();
        } else {
            register(values);
        }


        // // Notify the user on success and reset form
        // notification.open({
        //     message: 'Good Luck!',
        //     description:
        //         'Thank you for participating. You\'ll be notified in your email in case of winning.',
        //     onClose: () => {
        //         form.resetFields()
        //     }
        // });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    function register(values: any) {
        fetch(registerUrl, {
            method: 'POST',
            body: JSON.stringify(values),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((res) =>
                res.json()
            )
            .then((post) => {
                console.log("Successfully registered!")
            })
            .catch((err) => {
                console.log(err.message);
            });
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
                <Button type="primary" htmlType="submit" style={{background: "red", borderRadius: 3, fontWeight: 700}}>
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
