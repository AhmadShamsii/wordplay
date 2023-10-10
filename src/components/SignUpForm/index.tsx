import { useEffect } from "react";

import {
  createAuthUserWithEmailAndPassword,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase";
import { Modal, Input, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";
import { setCurrentUser } from "../../containers/AuthPage/slice";
import { usersSelector } from "../../containers/AuthPage/selectors";
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
  const { userData } = useSelector(usersSelector);
  console.log(userData);

  const handleSubmit = async (values: FormFields) => {
    const { username, email, password } = values;
    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);

      console.log(user?.user.uid);
      if (!user) return;
      const userDocRef = doc(db, "users", user?.user.uid);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        const createdAt = new Date();

        await setDoc(userDocRef, {
          username,
          email,
          createdAt,
        });
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert("Cannot create user, email already in use");
      } else console.error("errrrrrrrrrr", error);
    }
    setIsSignUpModalOpen(true);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user: any) => {
      if (user) {
        dispatch(setCurrentUser(user));
      }
    });
    return unsubscribe;
  }, []);

  const handleCancel = () => {
    setIsSignUpModalOpen(false);
  };

  const handleSignIn = () => {
    showSignInModal();
    setIsSignUpModalOpen(false);
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
