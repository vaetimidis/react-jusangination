import { notification } from 'antd';

import './notifications.scss';
import { AxiosResponse } from 'axios';

export const errorIntercept = () => {
  notification.open({
    message: 'TItle',
    description: 'Description',
    className: 'error-notification'
  });
};
