import prisma from '$lib/server/prisma';

export async function getStores(userId: string) {
	return prisma.store.findMany({
		where: {
			userId
		}
	});
}

export async function createStore(userId: string, data: { name: string }) {
	return prisma.store.create({
		data: {
			name: data.name,
			userId
		}
	});
}

export async function getFirstStore(userId: string) {
	return prisma.store.findFirst({
		where: {
			userId
		}
	});
}

export async function findStoreById(userId: string, storeId: number) {
	return prisma.store.findFirst({
		where: {
			id: storeId,
			userId
		}
	});
}

export async function updateStore(userId: string, storeId: number, data: { name: string }) {
	return prisma.store.update({
		where: {
			id: storeId,
			userId
		},
		data: {
			name: data.name
		}
	});
}

export async function deleteStore(userId: string, storeId: number) {
	return prisma.store.delete({
		where: {
			id: storeId,
			userId
		}
	});
}

export async function findStoreByUserIdAndStoreId(userId: string, storeId: number) {
	return prisma.store.findFirst({
		where: {
			id: storeId,
			userId
		}
	});
}

export async function getStore(id: number) {
	return prisma.store.findUnique({
		where: {
			id
		},
		select: {
			id: true,
			name: true,
			createdAt: true
		}
	});
}
