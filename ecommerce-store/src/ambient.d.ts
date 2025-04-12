interface Billboard {
	id: number;
	label: string;
	imageUrl: string;
}

interface Category {
	id: number;
	name: string;
	billboard: Billboard;
}

interface Product {
	id: number;
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
	id: number;
	name: string;
	value: string;
}

interface Color {
	id: number;
	name: string;
	value: string;
}

interface ResponseError {
	error: {
		code: number;
		message: string;
	};
}
