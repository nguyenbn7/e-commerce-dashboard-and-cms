interface Billboard {
	id: Number;
	label: string;
	imageUrl: string;
}

interface Category {
	id: Number;
	name: string;
	billboard: Billboard;
}

interface Product {
	id: Number;
	category: Category;
	name: String;
	price: Number;
	isFeatured: boolean;
	size: Size;
	Color: Color;
	images: Image[];
}

interface Image {
	id: string;
	url: string;
}

interface Size {
	id: Number;
	name: string;
	value: string;
}

interface Color {
	id: Number;
	name: string;
	value: string;
}
