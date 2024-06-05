import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInAuthUserWithEmailAndPassword,
  auth,
} from '../../utils/firebase/firebase';
import { Button, Checkbox, Divider, Form, Input, Modal, message } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { GoogleOutlined } from '@ant-design/icons';
import {
  setPersistence,
  sendPasswordResetEmail,
  getAuth,
  browserSessionPersistence,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import {
  setIsSignInModalOpen,
  setIsSignUpModalOpen,
} from '../../redux/appManager/slice';
import { appManagerSelector } from '../../redux/appManager/selectors';
import { signInWithGoogle } from '../../helpers';

const SignInForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSignInModalOpen } = useSelector(appManagerSelector);
  const [rememberMe, setRememberMe] = useState(true);
  const [isForgotPass, setIsForgotPass] = useState(false);

  const handleSubmit = async (values: any) => {
    const { email, password } = values;
    try {
      if (rememberMe) {
        const auth = getAuth();
        setPersistence(auth, browserSessionPersistence)
          .then(() => {
            ('yes');
          })
          .catch((error) => {
            console.log(error);
          });
      }
      await signInAuthUserWithEmailAndPassword(email, password);
      navigate('/play');
      message.success('Signed In!');
      dispatch(setIsSignInModalOpen(false));
      localStorage.setItem('USER_ID', JSON.stringify(auth?.currentUser?.uid));
    } catch (error: any) {
      if (error.code === 'auth/invalid-credential') {
        message.error('Invalid email or passoword!');
      } else {
        console.log(error);
        message.error('Error logging in!');
      }
      dispatch(setIsSignInModalOpen(true));
    }
  };

  const handleCancel = () => {
    dispatch(setIsSignInModalOpen(false));
  };

  const handleRegister = () => {
    dispatch(setIsSignUpModalOpen(true));
    dispatch(setIsSignInModalOpen(false));
  };

  const showForgotPassModal = () => {
    setIsForgotPass(true);
  };

  const handleModalCancel = () => {
    setIsForgotPass(false);
  };

  const handleForgotPassSubmit = async ({ email }: any) => {
    try {
      await sendPasswordResetEmail(auth, email);
      message.success('Reset Link Sent! Check your mail!');
    } catch (err) {
      console.error('Error sending reset link:', err);
      message.error('Error sending reset link. Please try again.');
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
          marginBottom: '10px',
          fontFamily: 'Handlee',
          top: '30%',
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
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter valid email!',
              },
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="Email" />
          </Form.Item>
          <Button type="primary" style={{ width: '100%' }} htmlType="submit">
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
        style={{ marginBottom: '10px', fontFamily: 'Handlee' }}
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
                message: 'Please input your email!',
              },
              {
                type: 'email',
                message: 'Please enter valid email!',
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
                message: 'Please input your Password!',
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
                position: 'absolute',
                right: '-12px',
                bottom: '2px',
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
              style={{ width: '100%' }}
            >
              Log in
            </Button>
            Or
            <Button
              onClick={handleRegister}
              type="link"
              style={{ paddingLeft: '5px' }}
            >
              register now!
            </Button>
          </Form.Item>
        </Form>

        <Divider style={{ fontSize: '12px' }} plain>
          Sign In with Google
        </Divider>
        <Button
          shape="round"
          type="primary"
          style={{ width: '100%' }}
          icon={<GoogleOutlined />}
          onClick={() => signInWithGoogle({ dispatch, navigate })}
        >
          Sign in with Google
        </Button>
      </Modal>
    </>
  );
};
export default SignInForm;
