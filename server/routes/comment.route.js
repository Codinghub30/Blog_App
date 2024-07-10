import express from 'express';
import   { createComment, editComment, getPostComments, likeComment, deleteComment, getcomments}  from '../controllers/comment.controller.js';
import { verifyToken } from "../utils/verifyUser.js"

const router = express.Router();

router.post('/create', verifyToken, createComment);
router.get('/getPostComments/:postId', getPostComments);
router.put('/likeComment/:commentId', verifyToken, likeComment);
router.put('/editComment/:commentId', verifyToken,  editComment);
router.delete('/deleteComment/:commentId', verifyToken, deleteComment);
router.get('/getcomments', verifyToken, getcomments);

// The function we have written in the post and get like createComment and getPostComment are written in the controller file like comment.controller

export default router;