import * as React from "react";
import {Button, Form, Input, Select, notification, Checkbox} from "antd";

export default function FormComponent() {
    // use state to memoize data and change it when we need it
    const [data, setData] = React.useState({});
    const [form] = Form.useForm();

    const handleSuccess = (values: any) => {
        // TODO Proceed to save values
        console.log(values);

        // Notify the user on success and reset form
        notification.open({
            message: 'Good Luck!',
            description:
                'Thank you for participating. You\'ll be notified in your email in case of winning.',
            onClose: () => {
                form.resetFields()
            }
        });
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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
                        message: 'The input is not valid E-mail!',
                    },
                    {
                        required: true,
                        message: 'Please input your E-mail!',
                    },
                ]}>
                <Input/>
            </Form.Item>

            <Form.Item
                label="Name: "
                name="name">
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

            <Form.Item name="interested" valuePropName="checked">
                <Checkbox>Currently looking for a job?</Checkbox>
            </Form.Item>


            <Form.Item>
                <Button type="primary" htmlType="submit" style={{background: "red", borderRadius: 3, fontWeight: 700}}>
                    Submit
                </Button>
                <p style={{fontSize: "x-small"}}>
                    By submitting this form, you're consenting to the use of your personal information by Persado to
                    receive relevant emails about our upcoming services and promotions.
                </p>
            </Form.Item>
        </Form>
    );
}
