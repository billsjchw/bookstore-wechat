import {MiscConst, HttpStatus} from '../utils/constant';

function get(path, params, callback) {
  let url = `${MiscConst.BACKEND_BASE_URL}${path}`;

  let header = {};
  let basic = getApp().globalData.basic;
  if (basic !== null)
    header['Authorization'] = `Basic ${basic}`;

  wx.request({
    url: url,
    data: params,
    header: header,
    method: 'GET',
    dataType: 'json',
    success(resp) {
      if (resp.statusCode === HttpStatus.OK ||
          resp.statusCode === HttpStatus.UNAUTHORIZED)
        callback(resp.data);
      else
        callback({ status: 'UNKNOWN_ERROR', data: null });
    },
    fail() {
      callback({ status: 'UNKNOWN_ERROR', data: null });
    },
  })
}

function post(path, body, callback) {
  let url = `${MiscConst.BACKEND_BASE_URL}${path}`;

  let header = {
    'Content-Type': 'application/json',
  };
  let basic = getApp().globalData.basic;
  if (basic !== null)
    header['Authorization'] = `Basic ${basic}`;

  wx.request({
    url: url,
    data: body,
    header: header,
    method: 'POST',
    dataType: 'json',
    success(resp) {
      if (resp.statusCode === HttpStatus.OK ||
          resp.statusCode === HttpStatus.UNAUTHORIZED)
        callback(resp.data);
      else
        callback({ status: 'UNKNOWN_ERROR', data: null });
    },
    fail() {
      callback({ status: 'UNKNOWN_ERROR', data: null });
    },
  })
}

export default {get, post};
