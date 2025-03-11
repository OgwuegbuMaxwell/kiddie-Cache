import { prisma } from '@/db/prisma';

export const getAccountByUserId = async(userId: string) => {
    try {
        const account = await prisma.account.findFirst({
            where: {
                userId: userId
            }
        })

        return account;
    } catch (error) {
        console.log(error)
        return null;
    }

    
}