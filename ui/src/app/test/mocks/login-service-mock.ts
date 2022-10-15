import { ResponseData } from '../../shared/model/response-data';
import { asyncData } from '../../../../../sample/src/app/test-helper';
export class MockLoginService {
    registerUser(user: any) {
        // return this.http.post<ResponseData<any>>(`${this.url}register`, user);
        let result: ResponseData<string> = { error: false, result: "sucesss"};
        return asyncData(result);
      }
    
      logout() {
        localStorage.clear();
      }
    
      loginUser(user: any) {
        this.logout();
        // return this.http.post<any>(`${this.url}login`, user);
        let result: ResponseData<any> = { error: false, result: {token: "aaaaaa"}};
        return asyncData(result);
      }
    
      loggedIn() {
        return !!localStorage.getItem('token');
      }
    
      getToken() {
        return localStorage.getItem('token');
      }
    
      registerToken(token: string) {
        localStorage.setItem('token', token);
      }
}