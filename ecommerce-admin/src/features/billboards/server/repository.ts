import prisma from '$lib/server/prisma';

export async function getBillboard(storeId: string, billboardId: string) {
	return prisma.billboard.findUnique({
		where: {
			id: billboardId,
			storeId
		}
	});
}

export async function createBillboard(storeId: string, data: { label: string; imageUrl: string }) {
	const { label, imageUrl } = data;

	return prisma.billboard.create({
		data: {
			label,
			imageUrl,
			storeId
		}
	});
}

export async function getBillboards(storeId: string) {
	return prisma.billboard.findMany({
		where: {
			storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateBillboard(
	storeId: string,
	billboardId: string,
	data: { label: string; imageUrl: string }
) {
	const { label, imageUrl } = data;

	return prisma.billboard.update({
		where: {
			id: billboardId,
			storeId
		},
		data: {
			label,
			imageUrl
		}
	});
}

export async function deleteBillboard(storeId: string, billboardId: string) {
	return prisma.billboard.delete({
		where: {
			id: billboardId,
			storeId
		}
	});
}
