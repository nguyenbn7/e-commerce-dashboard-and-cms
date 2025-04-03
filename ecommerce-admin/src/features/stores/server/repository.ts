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
