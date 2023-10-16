const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    createArticlesLibs: async (title,body,userId) => {

        try {
            await prisma.user.findUniqueOrThrow({
                where : {
                    id : userId
                }
            })

            const post = await prisma.article.create({
                data : {
                    title : title,
                    body : body,
                    user_id : userId
                }
            })

            return post

        } catch (err) {
            throw err
        }

    }
}
