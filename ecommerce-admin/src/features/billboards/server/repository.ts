import prisma from '$lib/server/prisma';

interface Params {
	id: string;
	storeId: string;
}

interface Data {
	label: string;
	imageUrl: string;
	isFeatured?: boolean;
}

interface InsertData extends Data {
	storeId: string;
}

type StoreIdParam = Omit<Params, 'id'>;

export async function getBillboard(params: Params) {
	const { id, storeId } = params;

	return prisma.billboard.findUnique({
		where: {
			id,
			storeId
		}
	});
}

export async function createBillboard(data: InsertData) {
	const { label, imageUrl, storeId, isFeatured } = data;

	return prisma.billboard.create({
		data: {
			label,
			imageUrl,
			storeId,
			isFeatured
		}
	});
}

export async function getBillboards(params: StoreIdParam) {
	const { storeId } = params;

	return prisma.billboard.findMany({
		where: {
			storeId
		},
		orderBy: {
			createdAt: 'desc'
		}
	});
}

export async function updateBillboard(params: Params, data: Data) {
	const { id, storeId } = params;
	const { label, imageUrl, isFeatured } = data;

	return prisma.billboard.update({
		where: {
			id,
			storeId
		},
		data: {
			label,
			imageUrl,
			isFeatured
		}
	});
}

export async function deleteBillboard(params: Params) {
	const { id, storeId } = params;

	return prisma.billboard.delete({
		where: {
			id,
			storeId
		}
	});
}
