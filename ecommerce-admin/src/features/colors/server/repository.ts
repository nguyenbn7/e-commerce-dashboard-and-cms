import prisma from '$lib/server/prisma';

export async function getColor(storeId: string, colorId: string) {
	return prisma.color.findUnique({
		where: {
			id: colorId,
			storeId
		}
	});
}

export async function createColor(storeId: string, data: { name: string; value: string }) {
	const { name, value } = data;

	return prisma.color.create({
		data: {
			name,
			value,
			storeId
		}
	});
}

export async function getColors(storeId: string) {
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
	storeId: string,
	colorId: string,
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

export async function deleteColor(storeId: string, colorId: string) {
	return prisma.color.delete({
		where: {
			id: colorId,
			storeId
		}
	});
}

export async function getColorsSelection(storeId: string) {
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
