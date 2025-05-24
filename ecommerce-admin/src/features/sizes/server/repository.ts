import prisma from '$lib/server/prisma';

export async function getSize(storeId: string, sizeId: string) {
	return prisma.size.findUnique({
		where: {
			id: sizeId,
			storeId
		}
	});
}

export async function createSize(storeId: string, data: { name: string; value: string }) {
	const { name, value } = data;

	return prisma.size.create({
		data: {
			name,
			value,
			storeId
		}
	});
}

export async function getSizes(storeId: string) {
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
	storeId: string,
	sizeId: string,
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

export async function deleteSize(storeId: string, sizeId: string) {
	return prisma.size.delete({
		where: {
			id: sizeId,
			storeId
		}
	});
}

export async function getSizesSelection(storeId: string) {
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
