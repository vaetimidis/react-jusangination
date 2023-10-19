import { notification } from 'antd';

import type { AxiosError } from 'axios';

export const errorIntercept = (error: AxiosError) => {
  let text = '';

  if (error.response) {
    text = (error.response.data as { message: string })?.message;
  } else if (error.request) {
    text = (error.request.data as { message: string })?.message;
  } else if (error.message) {
    text = error.message;
  }

  notification.error({
    message: 'error',
    description: `${text}`,
    duration: 5
  });
};
