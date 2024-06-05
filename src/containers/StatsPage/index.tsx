import React, { useEffect, useState } from 'react';
import {
  StyledArrow,
  StyledContainer,
  StyledSpace,
  StyledText,
} from '../MenuPage/styles';
import { DescriptionsProps, Space } from 'antd';
import { useNavigate } from 'react-router';
import { StyledDescriptions } from '../../components/UserInfo/styles';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/users/selector';
import firebase from 'firebase/compat/app';

const StatsPage = () => {
  const statsInitialState = {
    totalGames: 0,
    totalPoints: 0,
    totalWords: 0,
    bestPoints: 0,
    bestTotalWords: 0,
  };
  const navigate = useNavigate();
  const [userStats, setuserStats] = useState<any>(statsInitialState);
  const { currentUser } = useSelector(userSelector);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRef = firebase
          .firestore()
          .collection('users')
          .doc(currentUser?.uid);
        const doc = await userRef.get();
        if (doc.exists) {
          setuserStats(doc.data()?.stats);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.log('Error getting document:', error);
      }
    };

    fetchData();
  }, [currentUser?.uid]);

  const creationDate = currentUser?.metadata?.creationTime;
  const formattedDate = new Date(creationDate).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Account Created On',
      children: (
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          {formattedDate || '-'}
        </span>
      ),
      span: 3,
    },
    {
      key: '2',
      label: 'Total Games Played',
      children: (
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          {userStats?.totalGames || '0'}
        </span>
      ),
      span: 3,
    },
    {
      key: '3',
      label: 'Total Points',
      children: (
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          {userStats?.totalPoints || '0'}
        </span>
      ),
      span: 3,
    },
    {
      key: '4',
      label: 'Total Words',
      children: (
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          {' '}
          {userStats?.totalWords || '0'}
        </span>
      ),
      span: 3,
    },
    {
      key: '5',
      label: 'Best Points',
      children: (
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          {' '}
          {userStats?.bestPoints || '0'}
        </span>
      ),
      span: 3,
    },
    {
      key: '6',
      label: 'Best Words',
      children: (
        <span style={{ fontWeight: 'bold', marginLeft: '10px' }}>
          {userStats?.bestTotalWords || '0'}
        </span>
      ),
      span: 3,
    },
  ];

  return (
    <StyledSpace>
      <StyledContainer>
        <Space
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <StyledArrow onClick={() => navigate(-1)} />
          <StyledText style={{ color: 'white' }}>Stats</StyledText>
          <div></div>
        </Space>
        <StyledDescriptions items={items} />
      </StyledContainer>
    </StyledSpace>
  );
};

export default StatsPage;
