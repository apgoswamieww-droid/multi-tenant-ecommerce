import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv"
dotenv.config();

const prisma = new PrismaClient({
    adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
})

async function main() {
    console.log("Seeding Data......");
    const email = "apgoswami.eww@gmail.com"
    const password = "admin123"
    const passwordHash = await bcrypt.hash(password, 10);

    await prisma.user.upsert({
        where: {
            email
        },
        update: {
            passwordHash: passwordHash
        },
        create: {
            email,
            fullName: "Apgoswami EWW",
            passwordHash: passwordHash,
            userType: "ADMIN",
            twoFactorEnabled: false,
            phone: "9375333232",
            twoFactorSecret: ""
        }
    })

    console.log("✅ Seed Data Completed");
}

main()
    .then(() => prisma.$disconnect())
    .catch(e => {
        console.log(e)
        prisma.$disconnect()
        process.exit(1)
    })