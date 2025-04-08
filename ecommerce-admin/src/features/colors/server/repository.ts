import prisma from '$lib/server/prisma';

export async function getColor(storeId: number, colorId: number) {
	return prisma.color.findUnique({
		where: {
			id: colorId,
			storeId
		}
	});
}

export async function createColor(storeId: number, data: { name: string; value: string }) {
	const { name, value } = data;

	return prisma.color.create({
		data: {
			name,
			value,
			storeId
		}
	});
}

export async function getColors(storeId: number) {
	return prisma.color.findMany({
		where: {
			storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateColor(
	storeId: number,
	colorId: number,
	data: { name: string; value: string }
) {
	const { name, value } = data;

	return prisma.color.update({
		where: {
			id: colorId,
			storeId
		},
		data: {
			name,
			value
		}
	});
}

export async function deleteColor(storeId: number, colorId: number) {
	return prisma.color.delete({
		where: {
			id: colorId,
			storeId
		}
	});
}
