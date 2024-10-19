import React from 'react';
import { notification as antdNotification } from 'antd';
import {
  CloseCircleFilled,
  InfoCircleFilled,
  CheckCircleFilled,
} from '@ant-design/icons';

antdNotification.config({
  placement: 'topRight',
  duration: 3,
  top: 0,
});

interface NotificationProps {
  message: string;
  description: string;
}

const NotificationMessage = {
  error: ({ message, description }: NotificationProps) => {
    antdNotification.error({
      message,
      description,
      className: 'notification',
      style: {
        backgroundColor: '#fff1f0',
        border: '1px solid #ffa39e',
        margin: 0,
        boxShadow: 'unset',
      },
      icon: <CloseCircleFilled style={{ color: '#f5222e' }} />,
    });
  },
  warning: ({ message, description }: NotificationProps) => {
    antdNotification.warning({
      message,
      description,
      className: 'notification',
      style: {
        backgroundColor: '#fffbe6',
        border: '1px solid #ffe58f',
        margin: 0,
        boxShadow: 'unset',
      },
      icon: <InfoCircleFilled style={{ color: '#f9bf02' }} />,
    });
  },
  success: ({ message, description }: NotificationProps) => {
    antdNotification.success({
      message,
      description,
      className: 'notification',
      style: {
        backgroundColor: '#F6FFED',
        border: '1px solid #B7EB8F',
        margin: 0,
        boxShadow: 'unset',
      },
      icon: <CheckCircleFilled style={{ color: '#52C51A' }} />,
    });
  },
};

export default NotificationMessage;
