import store from '../store';
import * as actions from './actions';
import { storeUserKey, getUserKey } from '../utils';
import AppService from '../app-service';

export default class UserService {
  constructor() {}

  private static _instance: UserService;

  static singleton() {
    if (!UserService._instance) {
      UserService._instance = new UserService();
    }

    return UserService._instance;
  }

  setAuthInfo(resp) {
    AppService.getInstance().setAuthInfo(
      resp.profile.auth_version,
      resp.profile.sessionToken
    );
  }

  signup(params) {
    return new Promise(resolve => {
      AppService.getInstance().createEasy(params, resp => {
        resolve(resp);
      });
    });
  }

  setPassword(params) {
    return new Promise(resolve => {
      AppService.getInstance().setPassword(params, resp => {
        resolve(resp);
      });
    });
  }

  setRecoveryKeys(params) {
    return new Promise(resolve => {
      AppService.getInstance().setRecoveryKeys(params, resp => {
        resolve(resp);
      });
    });
  }

  ssoLogin(params) {
    return new Promise((resolve, reject) => {
      AppService.getInstance().session(params, resp => {
        resolve(resp);
      });
    });
  }

  login(email, password) {
    return new Promise(resolve => {
      var credentials = {
        email: email,
        password: password,
        res: 'web',
      };

      AppService.getInstance().login(credentials, function(resp) {
        resolve(resp);
      });
    });
  }

  getProfile() {
    return new Promise(resolve => {
      let params = {};
      AppService.getInstance().profile(params, resp => {
        resolve(resp);
      });
    });
  }

  check2faCode(params) {
    return new Promise(resolve => {
      AppService.getInstance().check2faCode(params, resp => {
        resolve(resp);
      });
    });
  }
  check2faCodeSendtxn(params) {
    return new Promise(resolve => {
      AppService.getInstance().check2faCodeSendtxn(params, resp => {
        resolve(resp);
      });
    });
  }

  getMyWallets() {
    return new Promise(resolve => {
      AppService.getInstance().myWallets({}, resp => {
        resolve(resp);
      });
    });
  }

  createFlashWallet(params) {
    return new Promise(resolve => {
      AppService.getInstance().createFlashWallet(params, resp => {
        resolve(resp);
      });
    });
  }

  createBTCWallet(params) {
    return new Promise(resolve => {
      AppService.getInstance().createBTCWallet(params, resp => {
        resolve(resp);
      });
    });
  }

  createLTCWallet(params) {
    return new Promise(resolve => {
      AppService.getInstance().createLTCWallet(params, resp => {
        resolve(resp);
      });
    });
  }

  createDASHWallet(params) {
    return new Promise(resolve => {
      AppService.getInstance().createDASHWallet(params, resp => {
        resolve(resp);
      });
    });
  }

  getWalletSecret(idToken) {
    return new Promise(resolve => {
      AppService.getInstance().walletSecret(idToken, resp => {
        resolve(resp);
      });
    });
  }

  getBalance(params) {
    return new Promise(resolve => {
      AppService.getInstance().balance(params, resp => {
        resolve(resp);
      });
    });
  }
}
