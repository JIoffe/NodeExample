import express from 'express';

const indexRouter = () => {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.render("index", { title: "Home" });
    });

    return router;
}

export default indexRouter;