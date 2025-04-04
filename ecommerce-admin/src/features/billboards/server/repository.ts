import prisma from '$lib/server/prisma';

export async function getBillboard(billboardId: number, storeId: number) {
	return prisma.billboard.findUnique({
		where: {
			id: billboardId,
			storeId
		}
	});
}
