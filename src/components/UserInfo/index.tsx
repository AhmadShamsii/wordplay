import React from "react";
import { userSelector } from "../../redux/users/selector";
import { useSelector } from "react-redux";
import { DescriptionsProps } from "antd";
import { StyledDescriptions } from "./styles";
const UserInfo = () => {
  const { userData, currentUser } = useSelector(userSelector);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: `${userData?.name}` || "NA",
      span: 3,
    },
    {
      key: "2",
      label: "Email",
      children: `${currentUser?.email}` || "NA",
      span: 3,
    },
    {
      key: "3",
      label: "Country",
      children: `${userData?.country}` || "NA",
      span: 3,
    },
    {
      key: "4",
      label: "Age",
      children: `${userData?.age}` || "NA",
      span: 3,
    },
  ];
  return <StyledDescriptions layout="vertical" items={items} />;
};
export default UserInfo;
