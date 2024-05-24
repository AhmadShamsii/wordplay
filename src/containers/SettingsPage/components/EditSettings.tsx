import { Button, Form, Input, InputNumber, Modal, Select, Space } from "antd";
import { auth } from "../../../utils/firebase/firebase";
import firebase from "firebase/compat/app";
import { useState, useEffect } from "react";
import { setUserData } from "../../../redux/users/slice";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/users/selector";

const EditSettings = ({ userData, isModalOpen, setIsModalOpen }: any) => {
  const { currentUser } = useSelector(userSelector);

  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    form.setFieldsValue({
      name: userData?.name,
      country: userData?.country,
      age: userData?.age,
    });
  }, [isModalOpen]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryData = data.map((country: any) => ({
          name: country?.name?.common,
          flag: country.flags.png,
        }));

        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const onFinish = async (values: any) => {
    const userInfo = {
      name: values?.name,
      country: values?.country,
      age: values?.age,
    };
    const uid = currentUser?.uid;
    const userRef = firebase.firestore().collection("users").doc(uid);

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
      } else {
        console.log("User not found");
      }
    } catch (error) {
      console.error("Error updating user data: ", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
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
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        style={{ marginTop: "30px" }}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter a name" }]}
        >
          <Input size="small" placeholder="Enter your name" />
        </Form.Item>
        <Form.Item label="Email">
          <Input
            size="small"
            value={auth?.currentUser?.email || "-"}
            disabled
          />
        </Form.Item>
        <Space style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please choose a country" }]}
          >
            <Select
              size="small"
              showSearch
              placeholder="Select a country"
              optionFilterProp="children"
              loading={loading}
            >
              {countries.map((country: any) => (
                <Select.Option key={country?.name} value={country?.name}>
                  <img
                    src={country.flag}
                    alt={country?.name}
                    style={{ marginRight: 8, width: 20 }}
                  />
                  {country?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name="age"
            label="Age"
            rules={[{ required: true, message: "Please enter age" }]}
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
        <Space style={{ marginLeft: "48%" }}>
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
