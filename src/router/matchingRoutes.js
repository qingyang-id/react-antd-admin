// 映射 路由配置表(项目逻辑)
// 布局组件
import LayoutContainers from '../App';

// 将 globalDir 中的映射处理好
import globalDir from './globalDir';
// 映射全局 详情页面 路由配置

// 判断是否 有 compObj; 返回值(Boolean)
const hasCompObj = obj => obj.hasOwnProperty('component');

// 储存 迭代 globalDir中的路由数据(需要处理)
const globalRoutes = [];

// 根据是否存在 component属性, 保存对象
const findRoutes = (item) => {
  // 非数组不执行
  if (!Array.isArray(item)) {
    return;
  }
  for (let i = 0; i < item.length; i += 1) {
    const itemChildRoute = item[i];
    hasCompObj(itemChildRoute)
      ? globalRoutes.push(itemChildRoute) // 有 component, 存入 数组
      : findRoutes(itemChildRoute.children); // 无 component, 拿它的 children 属性值(数组), 再次进入方法遍历
  }
};

// 查找所有路由
globalDir.forEach((dir) => {
  if (Array.isArray(dir.children)) {
    findRoutes(dir.children);
  } else {
    globalRoutes.push(dir);
  }
});

// 合并 数据(测试 + 迭代出来的路由数据)
const routesArr = [
  ...globalRoutes,
];

const matchingRoutes = [{
  path: '/home',
  component: LayoutContainers,
  routes: routesArr,
}];

export default matchingRoutes;
