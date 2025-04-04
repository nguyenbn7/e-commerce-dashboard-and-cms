import prisma from '$lib/server/prisma';

export async function getBillboard(billboardId: number, storeId: number) {
	return prisma.billboard.findUnique({
		where: {
			id: billboardId,
			storeId
		}
	});
}

export async function createBillboard(storeId: number, data: { label: string; imageUrl: string }) {
	const { label, imageUrl } = data;

	return prisma.billboard.create({
		data: {
			label,
			imageUrl,
			storeId
		}
	});
}

export async function getBillboards(storeId: number) {
	return prisma.billboard.findMany({
		where: {
			storeId
		}
	});
}

export async function updateBillboard(
	storeId: number,
	billboardId: number,
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

export async function deleteBillboard(storeId: number, billboardId: number) {
	return prisma.billboard.delete({
		where: {
			id: billboardId,
			storeId
		}
	});
}
