import { Button, Form, Input, InputNumber, Modal, Select, Space } from 'antd';
import { auth } from '../../../utils/firebase/firebase';
import firebase from 'firebase/compat/app';
import { useState, useEffect } from 'react';
import { setUserData } from '../../../redux/users/slice';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../redux/users/selector';
import { fetchCountries } from '../../../helpers';
const EditSettings = ({ userData, isModalOpen, setIsModalOpen }: any) => {
  const { currentUser } = useSelector(userSelector);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = firebase
          .firestore()
          .collection('users')
          .doc(currentUser?.uid);
        const doc = await userRef.get();
        if (doc.exists) {
          form.setFieldsValue({
            name: doc?.data()?.userInfo?.name,
            country: doc?.data()?.userInfo?.country,
            age: doc?.data()?.userInfo?.age,
          });
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };

    fetchData();
  }, [currentUser?.uid]);

  useEffect(() => {
    form.setFieldsValue({
      name: userData?.name,
      country: userData?.country,
      age: userData?.age,
    });
  }, [isModalOpen]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const countriesData = await fetchCountries();
        setCountries(countriesData.data);
      } catch (error) {
        // setError('Failed to fetch countries');
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  const onFinish = async (values: any) => {
    const userInfo = {
      name: values?.name,
      country: values?.country,
      age: values?.age,
    };
    const uid = currentUser?.uid;
    const userRef = firebase.firestore().collection('users').doc(uid);

    try {
      // Get the current user data
      const doc = await userRef.get();
      if (doc.exists) {
        await userRef.update({ userInfo: userInfo });
        const data = {
          name: userInfo?.name,
          email: currentUser?.email,
          country: userInfo?.country,
          age: userInfo?.age,
        };
        dispatch(setUserData(data));
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error('Error updating user data: ', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Modal
      closable={false}
      title="Edit Settings"
      open={isModalOpen}
      footer={null}
      width={350}
    >
      <Form
        form={form}
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
        style={{ marginTop: '30px' }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please enter a name' }]}
        >
          <Input size="small" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            size="small"
            value={auth?.currentUser?.email || '-'}
            disabled
          />
        </Form.Item>
        <Space style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: 'Please choose a country' }]}
          >
            <Select
              size="small"
              showSearch
              placeholder="Select a country"
              optionFilterProp="children"
              loading={loading}
            >
              {countries?.map((country: any) => (
                <Select.Option
                  style={{ fontSize: '12px' }}
                  key={country?.name}
                  value={country?.name}
                >
                  {country?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: 'Please enter age' }]}
          >
            <InputNumber
              size="small"
              placeholder="Enter age"
              min={1}
              max={100}
              type="number"
            />
          </Form.Item>
        </Space>
        <Space style={{ marginLeft: '48%' }}>
          <Form.Item>
            <Button onClick={handleCancel}>Cancel</Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

export default EditSettings;
