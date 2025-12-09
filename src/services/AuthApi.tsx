import axios from "axios";
import enviromment from '../../enviromment';

const AuthApi = axios.create({
  baseURL: enviromment.api,
  headers: {
    "Content-Type": "application/json",
  },
});

export default AuthApi;