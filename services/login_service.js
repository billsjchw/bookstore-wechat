import service from './service';

function login(callback) {
  service.get('/login', null, callback);
}

export default {login};
