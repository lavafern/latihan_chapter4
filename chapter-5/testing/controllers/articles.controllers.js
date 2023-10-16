const {createArticlesLibs} = require("../libs/articles.libs")

module.exports = {
    createArticle : async (req,res,next) => {
        try {
            const title = req.body.title
            const body = req.body.body
            const userId = Number(req.params.userId)
            const article = await createArticlesLibs(title,body,userId)

            if (!body) throw new Error("body is empty!")
            
            res
            .status(201)
            .json({
                status : true,
                message : 'post created!',
                data : article
            })

        } catch (err) {
            res
            .status(400)
            .json({
                status : false,
                message : err.message,
                data : null
            })
        }
    }
}