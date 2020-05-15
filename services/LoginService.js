import Ajax from "./Ajax";
import Backend from "../constants/Backend";

const LoginService = {
    login(callback) {
        Ajax.get(`${Backend.DOMAIN}/login`, null, callback);
    }
}

export default LoginService;
