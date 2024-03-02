import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
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
import { getAuth } from "firebase/auth";

import firebase from "firebase/compat/app";
import EditSettings from "./components/EditSettings";
const { Text } = Typography;

interface UserData {
  name: string;
  country: string;
  age: number;
  // Add other user data fields here
}

const SettingsPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  const uid = auth?.currentUser?.uid;

  useEffect(() => {
    async function getUserData(uid: any) {
      try {
        const docRef = firebase.firestore().collection("users").doc(uid);
        const snapshot = await docRef.get();

        if (snapshot.exists) {
          const user = snapshot.data();
          setUserData(user?.userInfo);
        } else {
          console.log("No user document found with the provided ID");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getUserData(uid);
  }, [uid, userData]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <StyledSpace>
      <Space
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <ArrowLeftOutlined onClick={() => navigate(-1)} />
        <StyledText style={{ color: "white" }}>Settings</StyledText>
        <EditOutlined onClick={showModal} />
        <EditSettings
          userData={userData}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </Space>
      <Space
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          marginTop: "40px",
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>Name</Text>
        <Text style={{ color: "white" }}>{userData?.name || "-"}</Text>

        <Text style={{ color: "white", fontWeight: "bold" }}>Email</Text>
        <Text style={{ color: "white" }}>
          {auth?.currentUser?.email || "-"}
        </Text>

        <Text style={{ color: "white", fontWeight: "bold" }}>Country</Text>
        <Text style={{ color: "white" }}>{userData?.country || "-"}</Text>

        <Text style={{ color: "white", fontWeight: "bold" }}>Age</Text>
        <Text style={{ color: "white" }}>{userData?.age || "-"}</Text>
      </Space>
    </StyledSpace>
  );
};
export default SettingsPage;
