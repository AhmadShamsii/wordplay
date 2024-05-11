import { Descriptions } from "antd";
import styled from "styled-components";

export const StyledDescriptions = styled(Descriptions)`
  margin: 10% 0;
  .ant-descriptions-item {
    margin:0;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .ant-descriptions-row{

    text-align: center;
  }
  .ant-descriptions-item-label {
    color: #d5d1d1;
  }
  .ant-descriptions-item-label:after {
margin: 0;
  }
  .ant-descriptions-item-content {
    text-align: center;

    color: white;
  }
`;