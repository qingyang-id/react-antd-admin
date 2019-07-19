/**
 * @description
 * @author      yq
 * @date        2017-11-27 22:35:00
 */

import Wysiwyg from '../../components/ui/Wysiwyg';

export const UI_DIR = {
  id: '30',
  title: 'UI',
  key: '30',
  icon: 'rocket',
  children: [
    {
      id: '31',
      pid: '30',
      title: '富文本',
      key: '31',
      path: '/home/ui/editor',
      icon: 'api',
      component: Wysiwyg,
    },
  ],
};
