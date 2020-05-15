import Ajax from "./Ajax";
import Backend from "../constants/Backend";

const LogoutService = {
    logout(callback) {
        Ajax.get(`${Backend.DOMAIN}/logout`, null, callback);
    }
};

export default LogoutService;
