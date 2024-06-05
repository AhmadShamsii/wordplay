import { EditOutlined } from '@ant-design/icons';
import {
  StyledArrow,
  StyledContainer,
  StyledSpace,
  StyledText,
} from '../MenuPage/styles';
import { useNavigate } from 'react-router';
import { Space } from 'antd';
import { useState } from 'react';

import EditSettings from './components/EditSettings';
import { useSelector } from 'react-redux';
import { userSelector } from '../../redux/users/selector';
import UserInfo from '../../components/UserInfo';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { userData } = useSelector(userSelector);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

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
          <StyledText style={{ color: 'white' }}>Settings</StyledText>
          <EditOutlined onClick={showModal} />
          <EditSettings
            userData={userData}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
          />
        </Space>
        <UserInfo isModalOpen={isModalOpen} />
      </StyledContainer>
    </StyledSpace>
  );
};
export default SettingsPage;
