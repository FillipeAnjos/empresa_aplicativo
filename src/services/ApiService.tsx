import { Alert } from "react-native";
import UsuarioRepository from "../repositories/UsuarioRepository";
import Api from "./Api";
import ApiSemUrlPadrao from "./ApiSemUrlPadrao";
import ApiRepository from "../repositories/ApiRepository";

async function cadastrarFirma(nome: string) {

    const insert = { nome: nome };
    
    let url = `/cadastrarFirma`;

    try {
        let res = await Api.post(url, insert);

        var data = res.data;

        return data;
    }catch(err) {
        console.log("Erro no cadastrarFirma - ApiService");
        return false;
    }

}

export {
    cadastrarFirma
};