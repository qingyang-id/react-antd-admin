/**
 * @description 身份信息管理
 * @author yq
 * @date 2017/9/7 下午9:46
 */
import Cookies from 'js-cookie';

export const remove = key => Cookies.remove(key);

export const set = (key, value, options) => Cookies.set(key, value, options);

export const get = key => Cookies.get(key);

export const getJson = key => Cookies.getJSON(key);
