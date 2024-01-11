import express from 'express';
import { prisma } from "../utils/prisma/index.js";

const router = express.Router();


const createNewPost = async (req, res) => {
  const {title, content} = req.body;
  const post = await prisma.posts.create({
    data:{
        title,
        content,
    }
  });
  return res.status(201).json({data:post});
};

const getAllPosts = async (req, res) => {
  const posts = await prisma.posts.findMany({
    select:{
        id: true,
        title: true,
        content: true,
    },
    orderBy:{
        id: "asc",
    },
  });
  return res.status(200).json({data: posts});
};

const updatePost = async (req, res) => {
    const {title, content} = req.body;
    const {postId} = req.params;

    const post = await prisma.posts.update({
        where: {id: +postId},
        data:{
            title,
            content,
        }
    });
    return res.status(200).json({data: post});
};

const deletePostById = async (req, res) => {
  const {postId} = req.params;

  const post = await prisma.posts.delete({
    where: {id: +postId},
  });

  return res.status(202).json({Message: "success"});
};

router.post('/api/posts', createNewPost);
router.get('/api/posts', getAllPosts);
router.put('/api/posts/:postId', updatePost);
router.delete('/api/posts/:postId', deletePostById);

export default router;