import prisma from '$lib/server/prisma';

interface Params {
	id: string;
	storeId: string;
}

interface Data {
	name: string;
	billboardId: string;
}

interface InsertData extends Data {
	storeId: string;
}

type StoreIdParam = Omit<Params, 'id'>;

export async function getCategory(params: Params) {
	const { id, storeId } = params;

	return prisma.category.findUnique({
		where: {
			id,
			storeId
		},
		include: {
			billboard: true
		}
	});
}

export async function createCategory(data: InsertData) {
	const { name, billboardId, storeId } = data;

	return prisma.category.create({
		data: {
			name,
			storeId,
			billboardId
		}
	});
}

export async function getCategories(params: StoreIdParam) {
	const { storeId } = params;

	return prisma.category.findMany({
		where: {
			storeId
		},
		include: {
			billboard: true
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateCategory(params: Params, data: Data) {
	const { id, storeId } = params;
	const { name, billboardId } = data;

	return prisma.category.update({
		where: {
			id,
			storeId
		},
		data: {
			name,
			billboardId
		}
	});
}

export async function deleteCategory(params: Params) {
	const { id, storeId } = params;

	return prisma.category.delete({
		where: {
			id,
			storeId
		}
	});
}

export async function getCategoriesSelection(params: StoreIdParam) {
	const { storeId } = params;

	return prisma.category.findMany({
		where: {
			storeId
		},
		select: {
			id: true,
			name: true
		}
	});
}
