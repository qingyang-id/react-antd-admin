/**
 * @description 应用底层action
 * @author yq
 * @date 2017/8/25 下午4:59
 */
import {
  UPDATE_STATE, SWITCH_THEME, COLLAPSE_MENU, SWITCH_MENU_POPOVER,
} from '../types/app';

// 更新state
export const updateState = data => ({ type: UPDATE_STATE, payload: data });

// 改变主题
export const switchTheme = () => ({ type: SWITCH_THEME });

// 折叠菜单
export const collapseMenu = () => ({ type: COLLAPSE_MENU });

// 菜单显示隐藏
export const switchMenuPopover = () => ({ type: SWITCH_MENU_POPOVER });
