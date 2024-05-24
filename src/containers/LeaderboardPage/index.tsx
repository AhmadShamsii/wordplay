import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/users/selector";
import firebase from "firebase/compat/app";
import {
  StyledArrow,
  StyledContainer,
  StyledSpace,
  StyledText,
} from "../MenuPage/styles";
import {  List, Space } from "antd";
import { useNavigate } from "react-router";
const LeaderBoardPage = () => {
  const { currentUser } = useSelector(userSelector);
  const navigate = useNavigate();
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRef = firebase.firestore().collection("users");
        const snapshot = await usersRef.get();

        const usersData: any = [];
        snapshot.forEach((doc) => {
          usersData.push({ id: doc.id, ...doc.data() });
        });

        // Sort users by bestTotalWords
        const sortedUsers = usersData.sort((a: any, b: any) => {
          const aTotalWords = a.stats ? a.stats.bestTotalWords || 0 : 0;
          const bTotalWords = b.stats ? b.stats.bestTotalWords || 0 : 0;
          return bTotalWords - aTotalWords;
        });

        // Set top 5 users
        setTopUsers(sortedUsers.slice(0, Math.min(sortedUsers.length, 5)));
      } catch (error) {
        console.log("Error getting documents:", error);
      }
    };

    fetchData();
  }, [currentUser?.uid]);

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
          <StyledText style={{ color: "white" }}>Leaderboards</StyledText>
          <div></div>
        </Space>
        <List
          itemLayout="horizontal"
          dataSource={topUsers}
          renderItem={(user:any, index) => (
            <List.Item>
              <List.Item.Meta
                style={{ textAlign: "center", color:"white" }}
                title={<span style={{color:"#d5d1d1"}} >User: {user?.username}</span>}
                description={<span style={{color:"#d5d1d1"}} >Words: {user?.stats?.bestTotalWords || '0'}  Points: {user?.stats?.bestPoints || '0'}</span>}
              />
            </List.Item>
          )}
        />
      </StyledContainer>
    </StyledSpace>
  );
};

export default LeaderBoardPage;
