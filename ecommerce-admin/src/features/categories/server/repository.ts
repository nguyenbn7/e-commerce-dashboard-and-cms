import prisma from '$lib/server/prisma';

export async function getCategory(storeId: number, categoryId: number) {
	return prisma.category.findUnique({
		where: {
			id: categoryId,
			storeId
		}
	});
}

export async function createCategory(storeId: number, data: { name: string; billboardId: number }) {
	const { name, billboardId } = data;

	return prisma.category.create({
		data: {
			name,
			storeId,
			billboardId
		}
	});
}

export async function getCategories(storeId: number) {
	return prisma.category.findMany({
		where: {
			storeId
		},
		include: {
			billboard: {
				select: {
					label: true
				}
			}
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateCategory(
	storeId: number,
	categoryId: number,
	data: { name: string; billboardId: number }
) {
	const { name, billboardId } = data;

	return prisma.category.update({
		where: {
			id: categoryId,
			storeId
		},
		data: {
			name,
			billboardId
		}
	});
}
// TODO: order params function

export async function deleteCategory(storeId: number, categoryId: number) {
	return prisma.category.delete({
		where: {
			id: categoryId,
			storeId
		}
	});
}
