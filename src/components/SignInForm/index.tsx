import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  auth,
} from "../../utils/firebase/firebase";
import { Button, Checkbox, Divider, Form, Input, Modal, message } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { GoogleOutlined } from "@ant-design/icons";
import {
  Persistence,
  setPersistence,
  browserLocalPersistence,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignInForm = ({
  isSignInModalOpen,
  setIsSignInModalOpen,
  showSignUpModal,
}: any) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotPass, setIsForgotPass] = useState(false);

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    message.success("Signed In!");
    setIsSignInModalOpen(false);
    navigate("home");
  };

  const handleSubmit = async (values: any) => {
    const { email, password } = values;
    console.log(email, password);
    try {
      let persistence: Persistence;
      if (rememberMe) {
        persistence = browserLocalPersistence;
      } else return 0;

      await setPersistence(auth, persistence);

      await signInAuthUserWithEmailAndPassword(email, password);
      navigate("home");
      message.success("Signed In!");
    } catch (error: any) {
      // TODO: use validator for this
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
    setIsSignInModalOpen(false);
  };

  const handleCancel = () => {
    setIsSignInModalOpen(false);
  };

  const handleRegister = () => {
    showSignUpModal();
    setIsSignInModalOpen(false);
  };

  const showForgotPassModal = () => {
    setIsForgotPass(true);
  };

  const handleModalCancel = () => {
    setIsForgotPass(false);
  };

  const handleForgotPassSubmit = async ({ email }: any) => {
    console.log(email);
    try {
      sendPasswordResetEmail(auth, email).then((data) => {
        message.success("Reset Link Sent! Check your mail!");
      });
    } catch (err) {
      message.error("Reset Link is not Sent!");
    }
  };

  const forgotPassModal = () => {
    return (
      <Modal
        title="Reset Password"
        open={isForgotPass}
        onCancel={handleModalCancel}
        footer={null}
        width={300}
        style={{
          marginBottom: "10px",
          fontFamily: "Handlee",
          top: "30%",
        }}
        closable={false}
      >
        <Form
          name="forgot-pass"
          initialValues={{
            remember: true,
          }}
          onFinish={handleForgotPassSubmit}
        >
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
          <Button type="primary" style={{ width: "100%" }} htmlType="submit">
            Send Password Reset link
          </Button>
        </Form>
      </Modal>
    );
  };

  return (
    <>
      <Modal
        title="Sign In"
        open={isSignInModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={400}
        style={{ marginBottom: "10px", fontFamily: "Handlee" }}
        closable={false}
      >
        <Form
          name="login"
          initialValues={{
            remember: true,
          }}
          onFinish={handleSubmit}
        >
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
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox onChange={() => setRememberMe(!rememberMe)}>
                Remember me
              </Checkbox>
            </Form.Item>

            <Button
              style={{
                position: "absolute",
                right: "-12px",
                bottom: "2px",
              }}
              type="link"
              onClick={showForgotPassModal}
            >
              Forgot password
            </Button>
            {forgotPassModal()}
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{ width: "100%" }}
            >
              Log in
            </Button>
            Or
            <Button
              onClick={handleRegister}
              type="link"
              style={{ paddingLeft: "5px" }}
            >
              register now!
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ fontSize: "12px" }} plain>
          Sign In with Google
        </Divider>
        <Button
          shape="round"
          type="primary"
          style={{ width: "100%" }}
          icon={<GoogleOutlined />}
          onClick={signInWithGoogle}
        >
          Sign in with Google!
        </Button>
      </Modal>
    </>
  );
};
export default SignInForm;
