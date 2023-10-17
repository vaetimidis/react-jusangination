import { notification } from 'antd';

import './notifications.scss';
import type { AxiosError } from 'axios';

export const errorIntercept = (error: AxiosError) => {
  let text = '';

  if (error.response) {
    text = error.response.statusText;
  } else if (error.request) {
    text = error.request;
  } else if (error.message) {
    text = error.message;
  }

  notification.error({
    message: 'error',
    description: `${text}`,
    duration: 5
  });
};
