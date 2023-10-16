const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()

module.exports = {
    prisma : prisma,

    createUser : async (email,name,password) => {
      
            try {
                let existUser = await prisma.user.findUnique({
                    where  : {email}
                })

                if (existUser) throw "email sudah dipakai"


                let user = await prisma.user.create({
                    data : {
                        email,
                        name,
                        password
                    }
                })

                return user
            } catch (err) {
                throw err
            }
    },

    getUserById: async (id) => {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) throw 'user tidak ditemukan';

            return user;
        } catch (err) {
            throw err;
        }
    }
}