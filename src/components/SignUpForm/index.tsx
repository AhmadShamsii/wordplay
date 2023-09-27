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
import { useModal } from "../../containers/AuthPage/modalContext";
// const layout = {
//   labelCol: { span: 6 },
//   wrapperCol: { span: 24 },
// };

interface FormFields {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = ({ isSignUpModalOpen, setIsSignUpModalOpen }: any) => {
  const { isModal2Visible, toggleModal2 } = useModal();

  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { userData } = useSelector(usersSelector);
  console.log(userData);

  const handleSubmit = async (values: FormFields) => {
    const { firstName, lastName, username, email, password } = values;
    try {
      const user = await createAuthUserWithEmailAndPassword(email, password);

      console.log(user?.user.uid);
      if (!user) return;
      const userDocRef = doc(db, "users", user?.user.uid);

      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        const createdAt = new Date();

        await setDoc(userDocRef, {
          firstName,
          lastName,
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

  return (
    <Modal
      title="Sign Up with your email and password"
      open={isSignUpModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={500}
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
            label="First Name"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your first name",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
            }}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your last name",
              },
            ]}
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
          >
            <Input />
          </Form.Item>
        </Form.Item>{" "}
        <Form.Item
          style={{
            marginBottom: 0,
          }}
        >
          <Form.Item
            label="Username"
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
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            style={{
              display: "inline-block",
              width: "calc(50% - 8px)",
              margin: "0 8px",
            }}
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
            <Input />
          </Form.Item>
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
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
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
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Sign Up
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SignUpForm;
