import {
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";
import { Modal, Input, Button, Form, message, Divider } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../utils/firebase/firebase";
import {
  GoogleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import firebase from "firebase/compat/app";
import {
  setIsSignInModalOpen,
  setIsSignUpModalOpen,
} from "../../redux/appManager/slice";
import { appManagerSelector } from "../../redux/appManager/selectors";
import { useNavigate } from "react-router";

interface FormFields {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { isSignUpModalOpen } = useSelector(appManagerSelector);

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
        navigate("/play");
        message.success("Account created successfully!");
        dispatch(setIsSignUpModalOpen(false));
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        message.error("Cannot create user, email already in use");
      } else {
        console.log(error);
        message.error("Error creating account!");
      }
      dispatch(setIsSignUpModalOpen(true));
    }
  };

  const handleCancel = () => {
    dispatch(setIsSignUpModalOpen(false));
  };

  const handleSignIn = () => {
    dispatch(setIsSignInModalOpen(true));
    dispatch(setIsSignUpModalOpen(false));
  };

  const validatePassword = (_: any, value: any) => {
    if (value && value.length < 8) {
      return Promise.reject(
        new Error("Password must be at least 8 characters!")
      );
    }
    return Promise.resolve();
  };
  // function for username validation
  const checkUsername = async (rule: any, value: any) => {
    try {
      const usersRef = firebase.firestore().collection("users");
      const snapshot = await usersRef.get();
      const usersData: any = [];
      snapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });

      if (value?.length < 3) {
        throw new Error("Username should be atleast 3 letters");
      }
      if (
        value?.length >= 3 &&
        usersData.some((user: any) => user?.username === value)
      ) {
        throw new Error("Username is already taken");
      }
    } catch (error: any) {
      throw new Error(error?.message);
    }
  };

  const signInWithGoogle = async () => {
    const result = await signInWithGooglePopup();
    const user = result?.user;
    const userRef = doc(db, "users", user?.uid);
    await setDoc(userRef, {
      email: user?.email,
      username: user?.displayName,
      createdAt: new Date()
    });
    message.success("Account created successfully!");
    dispatch(setIsSignInModalOpen(false));
    navigate("/play");
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
              { validator: checkUsername },
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
      <Divider style={{ fontSize: "12px" }} plain>
        Sign Up with Google
      </Divider>
      <Button
        shape="round"
        type="primary"
        style={{ width: "100%" }}
        icon={<GoogleOutlined />}
        onClick={signInWithGoogle}
      >
        Sign Up with Google!
      </Button>
    </Modal>
  );
};

export default SignUpForm;
