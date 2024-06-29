import { AbcRound } from '@vicons/material';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Slugify字符串',
  path: '/slugify-string',
  description: "将字符串转换为slug格式，去掉特殊字符，空格，emoji表情等",
  keywords: [
    'slugify',
    'slug',
    'string',
    '字符串',
    '转换',
    'emoji',
    '表情',
    '特殊字符',
    '空格',
  ],
  component: () => import('./slugify-string.vue'),
  icon: AbcRound,
});
