import prisma from '$lib/server/prisma';

interface Params {
	id: string;
	storeId: string;
}

interface Data {
	name: string;
	value: string;
}

interface InsertData extends Data {
	storeId: string;
}

type StoreIdParam = Omit<Params, 'id'>;

export async function getColor(params: Params) {
	const { id, storeId } = params;

	return prisma.color.findUnique({
		where: {
			id,
			storeId
		}
	});
}

export async function createColor(data: InsertData) {
	const { name, value, storeId } = data;

	return prisma.color.create({
		data: {
			name,
			value,
			storeId
		}
	});
}

export async function getColors(params: StoreIdParam) {
	const { storeId } = params;

	return prisma.color.findMany({
		where: {
			storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateColor(params: Params, data: Data) {
	const { id, storeId } = params;
	const { name, value } = data;

	return prisma.color.update({
		where: {
			id,
			storeId
		},
		data: {
			name,
			value
		}
	});
}

export async function deleteColor(params: Params) {
	const { id, storeId } = params;

	return prisma.color.delete({
		where: {
			id,
			storeId
		}
	});
}

export async function getColorsSelection(params: StoreIdParam) {
	const { storeId } = params;

	return prisma.color.findMany({
		where: {
			storeId
		},
		select: {
			id: true,
			name: true,
			value: true
		}
	});
}
