import { useEffect } from "react";

import {
  createAuthUserWithEmailAndPassword,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase";
import { Modal, Input, Button, Form, message } from "antd";
import { useDispatch } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

interface FormFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = ({
  isSignUpModalOpen,
  setIsSignUpModalOpen,
  showSignInModal,
}: any) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const handleSubmit = async (values: FormFields) => {
    const { username, email, password } = values;

    try {
      const userCredentials = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      if (!userCredentials) {
        message.error("Error creating user credentials.");
        return;
      }
      const userDocRef = doc(db, "users", userCredentials?.user.uid);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        const createdAt = new Date();

        await setDoc(userDocRef, {
          username,
          email,
          createdAt,
        });
        message.success("Account created successfully!");
        setIsSignUpModalOpen(false);
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        message.error("Cannot create user, email already in use");
      } else {
        console.log(error);
        message.error("Error creating account!");
      }
      setIsSignUpModalOpen(true);
    }
  };

  const handleCancel = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignIn = () => {
    showSignInModal();
    setIsSignUpModalOpen(false);
  };

  const validatePassword = (_: any, value: any) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters!")
      );
    }
    return Promise.resolve();
  };

  return (
    <Modal
      title="Sign Up "
      open={isSignUpModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={500}
      style={{ marginBottom: "10px", fontFamily: "Handlee" }}
    >
      <Form
        style={{ marginTop: "30px" }}
        form={form}
        layout="vertical"
        name="signup"
        initialValues={{
          remember: true,
        }}
        onFinish={handleSubmit}
        autoComplete="off"
      >
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
              {
                type: "email",
                message: "Please enter valid email!",
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
        </Form.Item>
        <Form.Item
          name="password"
          style={{
            display: "inline-block",
            width: "calc(50% - 8px)",
          }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          style={{
            display: "inline-block",
            width: "calc(50%)",
            margin: "0 0 0 8px",
          }}
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("Passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confrim Password"
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{ marginBottom: "10px" }}
            type="primary"
            htmlType="submit"
          >
            Sign Up
          </Button>
          <br />
          Already have an account?
          <Button
            onClick={handleSignIn}
            type="link"
            style={{ paddingLeft: "5px" }}
          >
            Sign in!
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpForm;
