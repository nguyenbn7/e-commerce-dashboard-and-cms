import prisma from '$lib/server/prisma';

export async function getSize(storeId: number, sizeId: number) {
	return prisma.size.findUnique({
		where: {
			id: sizeId,
			storeId
		}
	});
}

export async function createSize(storeId: number, data: { name: string; value: string }) {
	const { name, value } = data;

	return prisma.size.create({
		data: {
			name,
			value,
			storeId
		}
	});
}

export async function getSizes(storeId: number) {
	return prisma.size.findMany({
		where: {
			storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateSize(
	storeId: number,
	sizeId: number,
	data: { name: string; value: string }
) {
	const { name, value } = data;

	return prisma.size.update({
		where: {
			id: sizeId,
			storeId
		},
		data: {
			name,
			value
		}
	});
}

export async function deleteSize(storeId: number, sizeId: number) {
	return prisma.size.delete({
		where: {
			id: sizeId,
			storeId
		}
	});
}
