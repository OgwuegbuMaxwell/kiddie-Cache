import { prisma } from '@/db/prisma';


// Get the user by id if they don't have an account 
// associated with them like google or Github

export const getUserById = async(id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        })

        return user;
    } catch (error) {
        console.log(error)
        return null;
    }

    
}

