import { useState, ChangeEvent, FormEvent } from "react";

import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase";
import { Avatar, Button, Divider, Form, Input, Modal, Typography } from "antd";
import Google from "./../../utils/assets/google.svg";

const { Text } = Typography;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};

const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
  },
};

const defaultInputFields = {
  email: "",
  password: "",
};

const SignInForm = ({ isSignInModalOpen, setIsSignInModalOpen }: any) => {
  const [form] = Form.useForm();

  const [formFields, setFormFields] = useState(defaultInputFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultInputFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();

      console.log("user signin");
    } catch (error: any) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        case "auth/wrong-password":
          alert("wrong password");
          break;
        default:
          console.log(error);
      }
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const handleCancel = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Sign In with your email and password"
        open={isSignInModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <Form
          style={{ marginTop: "30px" }}
          form={form}
          {...layout}
          validateMessages={validateMessages}
          layout="vertical"
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
              },
            ]}
          >
            <Input onChange={handleChange} />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password onChange={handleChange} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <Text>Sign In with Google</Text>
        <Divider>
          <Avatar onClick={signInWithGoogle} src={Google} />
        </Divider>
      </Modal>
    </>
  );
};
export default SignInForm;
