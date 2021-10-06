import Http from '@doddle/http';
import getServer from './server';

function responseDataValidator({ _response = {} }, next) {
  console.log('stat', _response);
  if (_response.status !== 'ok') {
    window.alert(_response.message || '网络错误');
    return true;
  }
  return next();
}

const http = Http.create({
  servers: getServer(),
  contentKey: 'content',
  query() {
    return null;
  },
  beforeResponse: [responseDataValidator]
});

export default http.create('admin');
