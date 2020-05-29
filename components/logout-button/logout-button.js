// components/logout-button/logout-button.js
import LogoutService from "../../services/LogoutService";

Component({
    methods: {
        handleLogout() {
            LogoutService.logout(() => {});
            wx.reLaunch({
                url: "../../pages/login/login"
            });
        }
    }
})
