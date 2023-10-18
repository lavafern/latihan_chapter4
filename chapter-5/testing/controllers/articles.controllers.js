const {createArticlesLibs} = require("../libs/articles.libs");
const { getAllArticles, getArticleById } = require('../libs/articles.libs');

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
    },
     getAll: async (req, res, next) => {
        try {
            const articles = await getAllArticles();
            return res.status(200).json({
                status: true,
                message: 'OK',
                data: articles
            });
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    },

    getById: async (req, res, next) => {
        try {
            let { id } = req.params;
            try {
                let article = await getArticleById(Number(id));

                return res.status(200).json({
                    status: true,
                    message: 'OK',
                    data: article
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            }
        } catch (err) {
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    }
};