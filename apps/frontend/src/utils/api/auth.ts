import type { IAuthResponse, IFormProps } from '#/components/AuthContent/AuthContent';
import type { AxiosInstance, AxiosPromise } from 'axios';

export const AuthApi = (instance: AxiosInstance) => ({
  async signIn(values: IFormProps): AxiosPromise<IAuthResponse> {
    return instance.post<IAuthResponse>(`${import.meta.env.VITE_API_URL}/sign-up`, values);
  }
});
