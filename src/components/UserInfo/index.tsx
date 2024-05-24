import React, { useEffect, useState } from "react";
import { userSelector } from "../../redux/users/selector";
import { useSelector } from "react-redux";
import { DescriptionsProps } from "antd";
import { StyledDescriptions } from "./styles";
import firebase from "firebase/compat/app";

const UserInfo = () => {
  const [userData, setUserData] = useState<any>(null);
  const { currentUser } = useSelector(userSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = firebase
          .firestore()
          .collection("users")
          .doc(currentUser?.uid);
        const doc = await userRef.get();
        if (doc.exists) {
          setUserData(doc.data()?.userInfo);
        } 
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchData();
  }, [currentUser?.uid]);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: `${userData?.name || "-"}`,
      span: 3,
    },
    {
      key: "2",
      label: "Email",
      children: `${currentUser?.email}`,
      span: 3,
    },
    {
      key: "3",
      label: "Country",
      children: `${userData?.country || "-"}`,
      span: 3,
    },
    {
      key: "4",
      label: "Age",
      children: `${userData?.age || "-"}`,
      span: 3,
    },
  ];
  return <StyledDescriptions layout="vertical" items={items} />;
};
export default UserInfo;
