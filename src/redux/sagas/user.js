/**
 * @description 用户中心异步调度中心
 * @author yq
 * @date 2017/9/9 下午3:39
 */
import { race, put, call, take, fork, takeLatest } from 'redux-saga/effects';
import { LOGIN, LOGOUT, UPDATE_PASSWORD, LOGIN_SUCCESS, } from '../types/user';
import { UPDATE_STATE, HANDLE_SUCCESS, HANDLE_FAILED } from '../types/app';
import * as UserService from '../../services/user';
import { push } from 'react-router-redux';
import { queryURL } from '../../utils';

//或者使用ES6 import
import MD5 from 'blueimp-md5';


function* doLogin({ account, password, }) {
  try {
    // 打开loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    // 发送登录请求
    const response = yield call(UserService.login, {
      account,
      password: MD5(password),
    });
    return response;
  } catch (error) {
    console.error('登录失败', error);
    // If we get an error we send Redux the appropiate action and return
    yield put({ type: HANDLE_FAILED, payload: error });
    return false;
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

function* doLogout() {
  try {
    // We tell Redux we're in the middle of a request
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    // Similar to above, we try to log out by calling the `logout` function in the
    // `auth` module. If we get an error, we send an appropiate action. If we don't,
    // we return the response.
    // logout request
    yield call(UserService.logout);
    // 显示成功信息
    yield put({ type: HANDLE_SUCCESS, payload: { msg: '退出成功' } });
    // 跳转到登录页面
    yield put(push('/login'));
  } catch (error) {
    yield put({ type: HANDLE_FAILED, payload: error });
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

/**
 * 修改密码
 * @param action
 * @yield {Function} cb
 */
function* doUpdatePassword(action) {
  try {
    // 显示loading
    yield put({ type: UPDATE_STATE, payload: { loading: true } });
    const { oldPassword, newPassword, } = action.payload;
    // 修改密码
    yield call(UserService.updatePassword, {
      oldPassword: MD5(oldPassword),
      newPassword: MD5(newPassword),
    });
    // 隐藏模态框
    yield put({ type: UPDATE_STATE, payload: { modalVisible: false, } });
    // 显示成功信息
    yield put({ type: HANDLE_SUCCESS, payload: { msg: '修改成功' } });
    // 跳转到登录页面
    yield put(push('/login'));
  } catch (error) {
    console.error('修改失败：', error);
    yield put({ type: HANDLE_FAILED, payload: error });
  } finally {
    // When done, we tell Redux we're not in the middle of a request any more
    yield put({ type: UPDATE_STATE, payload: { loading: false } });
  }
}

export function* logout() {
  yield takeLatest(LOGOUT, doLogout);
}

export function* login() {
  // Because sagas are generators, doing `while (true)` doesn't block our program
  // Basically here we say "this saga is always listening for actions"
  while (true) {
    try {
      // And we're listening for `LOGIN_REQUEST` actions and destructuring its payload
      let request = yield take(LOGIN);
      let { account, password } = request.payload;
      // A `LOGOUT` action may happen while the `authorize` effect is going on, which may
      // lead to a race condition. This is unlikely, but just in case, we call `race` which
      // returns the "winner", i.e. the one that finished first
      let winner = yield race({
        auth: call(doLogin, { account, password, }),
        logout: take(LOGOUT)
      });
      // If `authorize` was the winner...
      if (winner.auth) {
        // ...we send Redux appropiate actions
        yield put({ type: LOGIN_SUCCESS, payload: winner.auth.data }); // User is logged in (authorized)
        // yield put({ type: RESET_LOGIN_FORM, }); // Clear form
        // 显示loading 防止跳转过程中频繁提交表单
        yield put({ type: UPDATE_STATE, payload: { loading: true } });
        yield new Promise((resolve) => {
          setTimeout(() => {
            let redirect = queryURL('redirect');
            redirect = ((redirect && redirect.indexOf('/login') === -1) && redirect) || '/home/guide';
            // 跳转
            if (redirect.indexOf('http') !== -1) window.location.href = decodeURIComponent(redirect);
            else {
              window.location.href = redirect;
              // 此法存在bug，httpUtil 不会重新实例化
              // yield put(push(redirect));
            }
            resolve();
          }, 2000);
        });
        // 隐藏loading
        yield put({ type: UPDATE_STATE, payload: { loading: false } });
      }
    } catch (error) {
      console.error('登录失败', error);
      // If we get an error we send Redux the appropiate action and return
      yield put({ type: HANDLE_FAILED, payload: error });
    }
  }
}


export function* updatePassword() {
  yield takeLatest(UPDATE_PASSWORD, doUpdatePassword);
}

export const userSagas = [
  fork(login),
  fork(logout),
  fork(updatePassword),
];
