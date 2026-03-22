import axios from "axios";
import enviromment from '../../enviromment';

const Api = axios.create({
  baseURL: enviromment.api,
  headers: { "Content-Type": "application/json" }
});

export default Api;