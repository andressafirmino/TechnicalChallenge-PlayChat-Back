import { PrismaService } from "../../src/prisma/prisma.service";

export class CreateUser {
    private name: string;
    private email: string;
    private password: string;

    constructor(private readonly prisma: PrismaService) { }

    withName(name: string) {
        this.name = name;
        return this;
    }

    withEmail(email: string) {
        this.email = email;
        return this;
    }

    withPassword(password: string) {
        this.password = password;
        return this;
    }

    build() {
        return {
            name: this.name,
            email: this.email,
            password: this.password
        }
    }

    async persist() {
        const data = this.build();
        return await this.prisma.user.create({ data })
    }
}