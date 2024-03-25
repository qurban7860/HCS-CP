import { GLOBAL } from 'global'
import { conNex } from 'util'

const _baseUrl = GLOBAL.SERVER_URL

function _url(...param) {
  return _baseUrl + '/' + conNex(...param)
}

export const PATH_SERVER = {
  // auth
  LOGIN: _url('security', 'getToken'),
  MFA: _url('security', 'multifactorverifyCode'),
  REGISTER: _url('security', 'register'),
  LOGOUT: (userId) => _url('security', 'logout', userId)
}
