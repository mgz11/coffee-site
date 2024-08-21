/* 
Obtained from https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices 

Workaround for Prisma warning related to having multiple instances of the Prisma client activities
This solution instantiates a single instance of the Prisma client and saves it globally 
Now, Prisma client is only instantiated if it is not already globally available, preventing the 
multiple instances of the Prisma client
*/

import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
	return new PrismaClient();
};

declare const globalThis: {
	prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const db = globalThis.prismaGlobal ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;
