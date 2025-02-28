export type Prettify<T> = {
	[K in keyof T]: T[K];
};

export type IconProps = {
	size?: number;
	className?: string;
};
