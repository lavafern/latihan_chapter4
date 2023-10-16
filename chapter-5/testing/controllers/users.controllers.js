const {createUser, getUserById} = require("../libs/users.libs")

module.exports = {
    create : async (req,res,next) => {
        try {
            let email = req.body.email
            let name = req.body.name
            let password = req.body.password

            try {

                const user = await createUser(email,name,password)


                return res.status(201).json({
                    status: false,
                    message: 'OK',
                    data: user
                });

            } catch (err) {

                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            
            }


        } catch (err) {
           next(err);
        }
    },

    findUser : async (req,res,next) => {

        try {
            
            let id = Number(req.params.id)

            try {
                const user = await getUserById(id)

                return res.status(200).json({
                    status: false,
                    message: 'OK',
                    data: user
                })


            } catch (err) {

                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });

            }

        } catch (err) {
            next(err)
        }
    }
}