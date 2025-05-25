interface Billboard {
	id: string;
	label: string;
	imageUrl: string;
}

interface Category {
	id: string;
	name: string;
	billboard: Billboard;
}

interface Product {
	id: string;
	category: Category;
	name: string;
	price: number;
	isFeatured: boolean;
	size: Size;
	color: Color;
	images: Image[];
}

interface Image {
	id: string;
	url: string;
}

interface Size {
	id: string;
	name: string;
	value: string;
}

interface Color {
	id: string;
	name: string;
	value: string;
}

interface ResponseError {
	error: {
		code: number;
		message: string;
	};
}

interface HttpError extends Error {
	status?: number;
}

interface AvailableStore {
	id: string;
	name: string;
	isOpen: boolean;
	billboards: { id: string }[];
}
