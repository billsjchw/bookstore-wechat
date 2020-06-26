// components/login-form/login-form.js
import login_service from "../../services/login_service";
import {Base64} from 'js-base64';
import Toast from '@vant/weapp/toast/toast';

Component({
  data: {
    submitting: false,
    value: {
      username: '',
      password: '',
    },
    errMsg: {
      username: '',
      password: '',
    }
  },
  methods: {
    handleUsernameChange(event) {
      this.setData({ 'value.username': event.detail });
    },
    handlePasswordChange(event) {
      this.setData({ 'value.password': event.detail });
    },
    handleSubmit() {
      if (this.data.submitting)
        return;

      if (!this.validate())
        return;

      this.data.submitting = true;

      getApp().globalData.basic =
          Base64.encode(`${this.data.value.username}:${this.data.value.password}`);

      Toast.loading({ context: this, duration: 0, message: 'Loading ...' });

      login_service.login((msg) => {
        Toast.clear();
        if (msg.status === 'SUCCESS') {
          getApp().globalData.user = msg.data;
          wx.switchTab({ url: '/pages/home/home' });
        } else if (msg.status === 'UNAUTHORIZED') {
          if (msg.data === 'USER_NOT_FOUND')
            Toast({ context: this, message: 'User not found' });
          else if (msg.data === 'WRONG_PASSWORD')
            Toast({ context: this, message: 'Wrong password' });
          else
            Toast({ context: this, message: 'Your account is disabled' });
        } else {
          Toast({ context: this, message: 'Unknown error' });
        }
        this.data.submitting = false;
      });
    },
    validate() {
      this.setData({ 'errMsg.username': '' });
      this.setData({ 'errMsg.password': '' });

      if (!this.data.value.username)
        this.setData({ 'errMsg.username': 'Username cannot be empty' });
      if (!this.data.value.password)
        this.setData({ 'errMsg.password': 'Password cannot be empty' });

      return !this.data.errMsg.username &&
          !this.data.errMsg.password;
    },
  },
})
