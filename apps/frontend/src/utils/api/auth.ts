import type { IAuthResponse, IFormProps } from '#/components/AuthContent/AuthContent';
import type { AxiosInstance } from 'axios';

export const AuthApi = (instance: AxiosInstance) => ({
  async signIn(values: IFormProps): Promise<IAuthResponse> {
    const response = await instance.post<IAuthResponse>(
      `${import.meta.env.VITE_API_URL}/sign-up`,
      values
    );

    return response;
  }
});
