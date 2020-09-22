import { IWNRYNavItem } from '@wnry/angular-lib';

export const menu: IWNRYNavItem = {
	label: 'Root',
	url: '/',
	children: [
		{
			label: 'Gesichtserkennung',
			url: '/facedetect',
			path: 'facedetect',
			icon: 'fa fa-user-circle',
			children: [
				{
					label: 'OpenCV',
					url: '/facedetect/opencv',
					path: 'opencv',
					icon: 'fa fa-smile',
					children: [],
				},
				{
					label: 'Tensorflow',
					url: '/facedetect/tensorflow',
					path: 'tensorflow',
					icon: 'fa fa-meg',
					children: [],
				},
			],
		},
	],
};
