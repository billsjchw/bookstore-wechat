import Message from "../utils/Message";
import HttpRespStat from "../constants/HttpRespStat";

const Ajax = {
    get(url, data, callback) {
        Ajax.send("GET", url, data, callback);
    },
    put(url, data, callback) {
        Ajax.send("PUT", url, data, callback);
    },
    post(url, data, callback) {
        Ajax.send("POST", url, data, callback);
    },
    delete(url, data, callback) {
        Ajax.send("DELETE", url, data, callback);
    },
    send(method, url, data, callback) {
        let app = getApp();
        let basic = app.globalData.basic;
        if (basic === null) {
            callback(new Message("UNAUTHORIZED", null));
            return;
        }
        wx.request({
            url: url,
            data: data,
            header: {
                "Content-Type": "application/json",
                "Authorization": "Basic " + basic
            },
            method: method,
            dataType: "json",
            success(resp) {
                if (resp.statusCode === HttpRespStat.SUCCESS)
                    callback(resp.data);
                else if (resp.statusCode === HttpRespStat.NO_CONTENT)
                    callback(new Message("SUCCESS", null));
                else if (resp.statusCode === HttpRespStat.UNAUTHORIZED)
                    callback(new Message("UNAUTHORIZED", null));
                else
                    callback(new Message("UNKNOWN_HTTP_ERROR", null));
            },
            fail(resp) {
                callback(new Message("UNKNOWN_ERROR", null));
            }
        })
    }
}

export default Ajax;
