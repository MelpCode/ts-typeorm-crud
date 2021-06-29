import {Router} from 'express';
import {getPosts, createPost,
        plusLikeById, plusDislikeById, 
        deletePost, getPost,
        updatePost} from "../controllers/post.controllers";

const router = Router()

router.get('/api/posts',getPosts);
router.get('/api/posts/:id',getPost);
router.post('/api/posts',createPost);

router.put('/api/posts/like/:id',plusLikeById);
router.put('/api/posts/dislike/:id',plusDislikeById);
router.put('/api/posts/:id',updatePost);

router.delete('/api/posts/:id',deletePost);

export default router;