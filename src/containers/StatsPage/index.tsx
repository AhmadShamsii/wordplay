import React, { useEffect, useState } from "react";
import {
  StyledArrow,
  StyledContainer,
  StyledSpace,
  StyledText,
} from "../MenuPage/styles";
import { DescriptionsProps, Space } from "antd";
import { useNavigate } from "react-router";
import UserInfo from "../../components/UserInfo";
import { StyledDescriptions } from "../../components/UserInfo/styles";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/users/selector";
import firebase from "firebase/compat/app";

const StatsPage = () => {
  const navigate = useNavigate();
  const [userStats, setuserStats] = useState<any>(null);
  const { currentUser } = useSelector(userSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = firebase.firestore().collection("users").doc(currentUser?.uid);
        const doc = await userRef.get();
        if (doc.exists) {
          setuserStats(doc.data()?.stats);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    };

    fetchData();
  }, [currentUser?.uid]);

  const creationDate = currentUser?.metadata?.creationTime;
  const formattedDate = new Date(creationDate).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Account Created On",
      children: `${formattedDate}` || "NA",
      span: 3,
    },
    {
      key: "2",
      label: "Total Games Played",
      children: `${userStats?.totalGames}` || "NA",
      span: 3,
    },
    {
      key: "3",
      label: "Total Points",
      children: `${userStats?.totalPoints}` || "NA",
      span: 3,
    },
    {
      key: "4",
      label: "Total Words",
      children: `${userStats?.totalWords}` || "NA",
      span: 3,
    },
    {
      key: "5",
      label: "Best total Points",
      children: `${userStats?.bestPoints}` || "NA",
      span: 3,
    },
    {
      key: "6",
      label: "Best total Words",
      children: `${userStats?.bestTotalWords}` || "NA",
      span: 3,
    },
  ];

  return (
    <StyledSpace>
      <StyledContainer>
        <Space
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <StyledArrow onClick={() => navigate(-1)} />
          <StyledText style={{ color: "white" }}>Stats</StyledText>
          <div></div>
        </Space>
        <StyledDescriptions layout="vertical" items={items} />{" "}
      </StyledContainer>
    </StyledSpace>
  );
};

export default StatsPage;
