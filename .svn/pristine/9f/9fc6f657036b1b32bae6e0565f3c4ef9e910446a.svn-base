/**
 * @description 身份校验
 * @author yq
 * @date 2017/9/8 下午2:15
 */
import * as Cookie from './cookie';
import { tokenKey } from '../config';

// 是否登录
export const isLogin = !!Cookie.get(tokenKey);
// 获取token
export const getToken = () => Cookie.get(tokenKey);
// 将token 存入cookie
export const setToken = (token, options) => !!Cookie.set(tokenKey, token, options);
// 清楚token
export const removeToken = () => !!Cookie.remove(tokenKey);
