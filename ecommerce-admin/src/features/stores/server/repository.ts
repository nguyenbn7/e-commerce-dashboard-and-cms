import prisma from '$lib/server/prisma';

interface Data {
	name: string;
}

interface Params {
	id: string;
	userId: string;
}

type UserIdParam = Omit<Params, 'id'>;
type StoreIdParam = Omit<Params, 'userId'>;

export async function getStores(params: UserIdParam) {
	const { userId } = params;

	return prisma.store.findMany({
		where: {
			userId
		}
	});
}

export async function createStore(params: UserIdParam, data: Data) {
	const { userId } = params;
	const { name } = data;

	return prisma.store.create({
		data: {
			name,
			userId
		}
	});
}

export async function getFirstStore(params: UserIdParam) {
	const { userId } = params;

	return prisma.store.findFirst({
		where: {
			userId
		}
	});
}

export async function findStoreById(params: Params) {
	const { id, userId } = params;

	return prisma.store.findFirst({
		where: {
			id,
			userId
		}
	});
}

export async function updateStore(params: Params, data: Data) {
	const { id, userId } = params;
	const { name } = data;

	return prisma.store.update({
		where: {
			id,
			userId
		},
		data: {
			name
		}
	});
}

export async function deleteStore(params: Params) {
	const { id, userId } = params;

	return prisma.store.delete({
		where: {
			id,
			userId
		}
	});
}

export async function findStoreByUserIdAndStoreId(params: Params) {
	const { id, userId } = params;

	return prisma.store.findFirst({
		where: {
			id,
			userId
		}
	});
}

export async function getStore(params: StoreIdParam) {
	const { id } = params;

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
