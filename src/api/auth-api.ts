import http from "src/utils/http"

export type AuthApiProps = {
  email: string;
  password: string;
}

const authApi = {
  register(data : AuthApiProps){
    return http.post('register', data)
  },
  login(data: AuthApiProps) {
    return http.post('login', data)
  },
  logout() {
    return http.post('logout')
  }
}
export default authApi;