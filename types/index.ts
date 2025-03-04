import { z } from "zod";
import { insertProductSchema } from "@/lib/validators";
import { Prisma } from "@prisma/client";

import { prisma } from "@/db/prisma"


export type Product = z.infer<typeof insertProductSchema> & {
    id: string;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
};



// Store product Return type
// Extract the return type of the Prisma instance *after* modifications
export type StoreProductReturnType = Prisma.PromiseReturnType<typeof prisma.product.findMany>[0];







