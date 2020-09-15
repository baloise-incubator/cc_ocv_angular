import { IWNRYNavItem } from '@wnry/angular-lib';

export const menu: IWNRYNavItem = {
  label: 'Root',
  url: '/',
  children: [
    {
      label: 'camera-test',
      url: '/camera-test',
      path: 'camera-test',
      children: []
    }
  ]
};