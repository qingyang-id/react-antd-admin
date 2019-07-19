import Mock from 'mockjs';
import MD5 from 'blueimp-md5';
import { loginApi, logoutApi, updatePasswordApi } from '../config/api';
import * as Cookie from '../utils/cookie';

// const usersListData = Mock.mock({
//   'data|80-100': [
//     {
//       id: '@id',
//       name: '@name',
//       nickName: '@last',
//       phone: /^1[34578]\d{9}$/,
//       'age|11-99': 1,
//       address: '@county(true)',
//       isMale: '@boolean',
//       email: '@email',
//       createTime: '@datetime',
//       avatar() {
//         return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1));
//       },
//     },
//   ],
// });


// const database = usersListData.data;

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
};

const userPermission = {
  DEFAULT: {
    visit: ['1', '2', '21', '7', '5', '51', '52', '53'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
};

const adminUsers = [
  {
    id: 1,
    account: 'admin',
    password: '123456',
    permissions: userPermission.ADMIN,
  }, {
    id: 2,
    account: 'guest',
    password: '123456',
    permissions: userPermission.DEFAULT,
  }, {
    id: 3,
    account: 'sailor',
    password: '123456',
    permissions: userPermission.DEVELOPER,
  },
];

export default () => {
  // Mock
  // 登录
  Mock.mock(new RegExp(loginApi.path), loginApi.method, (options) => {
    console.log('登录接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const { account, password } = body;
    const user = adminUsers.find(item => item.account === account);
    if (!user || !MD5(user.password) === password) {
      return {
        code: 400,
        msg: '账号或密码不正确',
      };
    }
    Cookie.set('login-user', {
      uid: user.uid,
      account: user.account,
      password,
      token: user.account,
    });
    return {
      code: 0,
      data: {
        token: user.account,
        user: {
          uid: user.uid,
          account: user.account,
        },
      },
    };
  });
  // 修改密码
  Mock.mock(new RegExp(updatePasswordApi.path), updatePasswordApi.method, (options) => {
    console.log('修改密码接口-----', options);
    let body = {};
    if (options.body) {
      try {
        body = JSON.parse(options.body);
      } catch (err) {
        console.error('parse body err', err);
        body = {};
      }
    }
    const { newPassword, oldPassword } = body;
    const loginUser = Cookie.getJson('login-user');
    if (!loginUser) {
      return {
        code: 401,
        msg: '请先登录',
      };
    }
    if (loginUser.password !== oldPassword) {
      return {
        code: 400,
        msg: '原密码不正确',
      };
    }
    loginUser.password = newPassword;
    Cookie.set('login-user', loginUser);
    return {
      code: 0,
      msg: '操作成功',
    };
  });
  // 退出
  Mock.mock(new RegExp(logoutApi.path), logoutApi.method, () => {
    // 清空cookie
    Cookie.remove('login-user');
    return {
      code: 0,
      msg: '操作成功',
    };
  });
};
