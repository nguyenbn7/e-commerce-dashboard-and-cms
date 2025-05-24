import prisma from '$lib/server/prisma';

interface Params {
	id: string;
	storeId: string;
}

interface Data {
	name: string;
	value: string;
}

type StoreIdParam = Omit<Params, 'id'>;

export async function getSize(params: Params) {
	const { id, storeId } = params;

	return prisma.size.findUnique({
		where: {
			id,
			storeId
		}
	});
}

export async function createSize(params: StoreIdParam, data: Data) {
	const { storeId } = params;
	const { name, value } = data;

	return prisma.size.create({
		data: {
			name,
			value,
			storeId
		}
	});
}

export async function getSizes(params: StoreIdParam) {
	const { storeId } = params;

	return prisma.size.findMany({
		where: {
			storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateSize(params: Params, data: Data) {
	const { id, storeId } = params;
	const { name, value } = data;

	return prisma.size.update({
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

export async function deleteSize(params: Params) {
	const { id, storeId } = params;

	return prisma.size.delete({
		where: {
			id,
			storeId
		}
	});
}

export async function getSizesSelection(params: StoreIdParam) {
	const { storeId } = params;

	return prisma.size.findMany({
		where: {
			storeId
		},
		select: {
			id: true,
			name: true
		}
	});
}
