import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

async function main() {
    // 試しにユーザー作成
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'test@test.com'
        },
    })
    console.log(user)
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })


