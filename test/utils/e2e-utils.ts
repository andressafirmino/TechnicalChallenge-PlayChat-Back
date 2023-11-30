import { PrismaService } from "../../src/prisma/prisma.service";

export class e2e {
    async cleanDB(prisma: PrismaService) {
        await prisma.message.deleteMany({});
        await prisma.session.deleteMany({});
        await prisma.user.deleteMany({});
    }
}