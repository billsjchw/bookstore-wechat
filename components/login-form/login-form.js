// components/login-form/login-form.js
import LoginService from "../../services/LoginService";
import {Base64} from "js-base64";
import Toast from "@vant/weapp/toast/toast";

Component({
    data: {
        username: "",
        password: ""
    },
    methods: {
        onUsernameChange(event) {
            this.setData({ username: event.detail });
        },
        onPasswordChange(event) {
            this.setData({ password: event.detail });
        },
        onSubmit() {
            let app = getApp();
            app.globalData.basic = Base64.encode(`${this.data.username}:${this.data.password}`);
            LoginService.login((msg) => {
                if (msg.status === "SUCCESS")
                    wx.redirectTo({ url: "../../pages/books/books" });
                else if (msg.status === "UNAUTHORIZED") {
                    app.globalData.basic = null;
                    Toast({
                        context: this,
                        message: "Wrong username/password"
                    });
                } else {
                    app.globalData.basic = null;
                    Toast({
                        context: this,
                        message: "Unknown error"
                    });
                }
            });
        }
    }
})
