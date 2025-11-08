/// <reference types="vite/client" />

// Allow importing image assets in TypeScript (so imports like `import img from './public/01.jpg'` work)
declare module '*.avif';
declare module '*.bmp';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.webp';
declare module '*.mp3';
declare module '*.svg' {
	import * as React from 'react';
	const src: string;
	export default src;
	export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}
