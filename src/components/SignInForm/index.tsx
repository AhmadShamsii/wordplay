import { useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  auth,
} from "../../utils/firebase/firebase";
import {
  Avatar,
  Button,
  Checkbox,
  Divider,
  Form,
  Input,
  Modal,
  Typography,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { GoogleOutlined } from "@ant-design/icons";
import {
  Persistence,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { useModal } from "../../containers/AuthPage/modalContext";

const SignInForm = ({ isSignInModalOpen, setIsSignInModalOpen }: any) => {
  const { isModal1Visible, toggleModal1, toggleModal2 } = useModal();

  const dispatch = useDispatch();
  const [rememberMe, setRememberMe] = useState(true);

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    setIsSignInModalOpen(false);
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
    setIsSignInModalOpen(false);
  };

  const handleCancel = () => {
    setIsSignInModalOpen(false);
  };

  return (
    <>
      <Modal
        visible={isModal1Visible}
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
            <Input
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

            <a
              style={{ position: "absolute", right: "0px" }}
              className="login-form-forgot"
              href=""
            >
              Forgot password
            </a>
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
              onClick={toggleModal2}
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
