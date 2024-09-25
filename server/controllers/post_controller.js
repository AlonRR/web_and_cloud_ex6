// import { dbConnect } from "../dbConnect";

const getAllPosts = async (req, res) => {
    try {
        const [rows] = await req.context.connection.execute(
            `SELECT * FROM posts`
        );
        return res.send(rows);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

const getPostById = async (req, res) => {
    try {
        const [rows] = await req.context.connection.execute(
            `SELECT * FROM posts WHERE post_id = ?`,
            [req.params.id]
        );
        return res.send(rows);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

const createPost = async (req, res) => {
    try {
        const [result] = await req.context.connection.execute(
            `INSERT INTO posts (post_title, post_content) VALUES (?, ?)`,
            [req.body.post_title, req.body.post_content]
        );
        return res.send(result);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

const updatePost = async (req, res) => {
    try {
        const [result] = await req.context.connection.execute(
            `UPDATE posts SET post_title = ?, post_content = ? WHERE post_id = ?`,
            [req.body.post_title, req.body.post_content, req.params.id]
        );
        return res.send(result);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

const deletePost = async (req, res) => {
    try {
        const [result] = await req.context.connection.execute(
            `DELETE FROM posts WHERE post_id = ?`,
            [req.params.id]
        );
        return res.send(result);
    }
    catch (err) {
        return res.status(400).send(err);
    }
};

const postController = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};

export default postController;
