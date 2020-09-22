import { IWNRYNavItem } from '@wnry/angular-lib';

export const menu: IWNRYNavItem = {
	label: 'Root',
	url: '/',
	children: [
		{
			label: 'AI Erkennung',
			url: '/detect',
			path: 'detect',
			icon: 'fa fa-user-circle',
			children: [
				{
					label: 'OpenCV',
					url: '/detect/opencv',
					path: 'opencv',
					icon: 'fa fa-smile',
					children: [],
				},
				{
					label: 'TF Face',
					url: '/detect/facedetect',
					path: 'tensorflow',
					icon: 'fa fa-meh',
					children: [],
				},
				{
					label: 'TF Handpose',
					url: '/detect/handpose',
					path: 'tensorflow',
					icon: 'fa fa-meh',
					children: [],
				},
			],
		},
	],
};
