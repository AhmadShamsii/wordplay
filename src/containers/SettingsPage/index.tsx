import { ArrowLeftOutlined } from "@ant-design/icons";
import { StyledSpace, StyledText } from "../MenuPage/styles";
import { useNavigate } from "react-router";
import {
  Form,
  Input,
  Typography,
  Button,
  Space,
  Select,
  InputNumber,
} from "antd";
import { useEffect, useState } from "react";
import { auth } from "../../utils/firebase/firebase";
import firebase from "firebase/compat/app";
const { Text } = Typography;
const SettingsPage = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showButtons, setShowButtons] = useState(true);

  const [userData, setUserData] = useState({
    name: null,
    age: null,
    country: null,
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        const countryData = data.map((country: any) => ({
          name: country?.name?.common,
          flag: country.flags.png,
        }));
        const sortedCountries = countryData.sort((a: any, b: any) =>
          a?.name.localeCompare(b?.name)
        );

        setCountries(countryData);
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    // Function to get user data
    async function getUserData(userId: any) {
      try {
        const userRef = firebase.firestore().collection("users").doc(userId);
        const doc = await userRef.get();

        if (!doc.exists) {
          console.log("No such document!");
        } else {
          // Set user data to the state
          setUserData(doc.data()?.userInfo);
        }
      } catch (error) {
        console.error("Error getting user data:", error);
      }
    }

    getUserData(auth?.currentUser?.uid);
  }, [auth?.currentUser, userData]); // Empty dependency array to ensure useEffect runs only once

  const onFinish = async (values: any) => {
    const userInfo = {
      name: values?.name,
      country: values?.country,
      age: values?.age,
    };
    const uid = auth?.currentUser?.uid;
    const userRef = firebase.firestore().collection("users").doc(uid);
    try {
      // Get the current user data
      const doc = await userRef.get();

      if (doc.exists) {
        await userRef.update({ userInfo: userInfo });
        setShowButtons(true);
        console.log("User data updated successfully");
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

  type FieldType = {
    name?: string;
    country?: any;
    age?: number;
  };

  return (
    <StyledSpace>
      <Space
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
        <StyledText style={{ color: "white" }}>Settings</StyledText>
      </Space>
      <Space style={{ display: "flex", justifyContent: "center" }}>
        <Form
          name="basic"
          style={{ maxWidth: 600, marginTop: "20px", minWidth: 250 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item<FieldType>
            label={<label style={{ color: "whitesmoke" }}>Name</label>}
            style={{ margin: "5px" }}
            name="name"
            rules={[{ required: true, message: "Please enter a name" }]}
          >
            {userData?.name ? (
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "start",
                }}
              >
                {userData?.name}
              </Text>
            ) : (
              <Input
                size="small"
                placeholder="
              Enter your name"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                }}
              />
            )}
          </Form.Item>
          <Form.Item<FieldType>
            label={<label style={{ color: "whitesmoke" }}>Email</label>}
            style={{ textAlign: "start", margin: "5px" }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {auth?.currentUser?.email || "-"}
            </Text>
          </Form.Item>
          <Space style={{ display: "flex", justifyContent: "space-between" }}>
            <Form.Item<FieldType>
              label={<label style={{ color: "whitesmoke" }}>Country</label>}
              style={{ textAlign: "start", margin: "5px" }}
              name="country"
              rules={[{ required: true, message: "Please choose your name" }]}
            >
              {userData?.country ? (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "start",
                  }}
                >
                  {userData?.country}
                </Text>
              ) : (
                <Select
                  showSearch
                  style={{
                    width: 170,
                    color: "white",
                    backgroundColor: "transparent",
                  }}
                  placeholder={
                    <span style={{ color: "#aeb4c1" }}>Select a country</span>
                  }
                  optionFilterProp="children"
                  loading={loading}
                  className="transparent-background"
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
              )}
            </Form.Item>
            <Form.Item<FieldType>
              name="age"
              label={<label style={{ color: "whitesmoke" }}>Age</label>}
              style={{
                textAlign: "start",
                margin: "5px",
              }}
              className="transparent-background"
              rules={[{ required: true, message: "Please enter your name" }]}
            >
              {userData?.age ? (
                <Text
                  style={{
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "start",
                  }}
                >
                  {userData?.age}
                </Text>
              ) : (
                <InputNumber
                  style={{
                    background: "transparent",
                    color: "white",
                  }}
                  placeholder="Enter age"
                  min={1}
                  max={100}
                  type="number"
                />
              )}
            </Form.Item>
          </Space>

          {showButtons && (
            <Space style={{ marginTop: "50px" }}>
              <Form.Item>
                <Button type="dashed">Cancel</Button>
              </Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Space>
          )}
        </Form>
      </Space>
    </StyledSpace>
  );
};
export default SettingsPage;
