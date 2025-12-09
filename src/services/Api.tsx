import axios from "axios";
import enviromment from '../../enviromment';

const Api = axios.create({
  baseURL: enviromment.api,
  //baseURL: 'https://bibliotecadigitalqa.intersaberes.com/api/app',
  headers: {
    "Content-Type": "application/json"
  }
});

export default Api;