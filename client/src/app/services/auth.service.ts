import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IgenreralResponse,
  IuserLogin,
  IuserRegisterData,
} from 'src/app/interfaces/auth.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  userRegister(registerData: IuserRegisterData) {
    return this._http.post<IgenreralResponse>(
      `/v1/auth/register`,
      registerData
    );
  }

  userLogin(loginData: IuserLogin) {
    return this._http.post<IgenreralResponse&{accessToken:string,refreshToken:string,_id:string}>(
      `/v1/auth/login`,
      loginData
    );
  }

  getNewAccessToken(token:String){
    return this._http.get<IgenreralResponse&{accessToken:string}>(`/v1/auth/token/accessToken/${token}`)
  }
}
