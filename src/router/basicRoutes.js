// 基础常用 路由配置表(404 / Login 等页面)
// import Login from '../components/forms/LoginForm';
import Login1 from '../components/pages/Login';
import Login from '../components/login';
import NotFound from '../components/error/Error';

const basicRoutes = [
  {
    path: '/login',
    component: Login,
  },
  {
    path: '/login1',
    component: Login1,
  },
  {
    component: NotFound,
  },
];

export default basicRoutes;
