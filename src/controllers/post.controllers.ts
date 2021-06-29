import {Request,Response} from 'express';
import {getRepository} from 'typeorm';
import {Post} from '../entity/Post';

export const getPosts = async (req:Request,res:Response)=>{
    const posts = await getRepository(Post).find();
    return res.status(200).json({posts:posts});
}

export const getPost = async (req:Request,res:Response)=>{
    const post = await getRepository(Post).findOne(req.params);
    if(post) {return res.json(post)}
    else {return res.json({message:'Post was not Found'})}
}

export const createPost = async (req:Request,res:Response)=>{
    const newPost = await getRepository(Post).create(req.body)
    const postSaved = await getRepository(Post).save(newPost);
    return res.json(postSaved);
}

export const plusLikeById = async (req:Request,res:Response)=>{
    const {id} = req.params
    const post = await getRepository(Post).findOne(id);
    if(post){
        post.likes = post.likes + 1 
        const postUpdated = {
            post:post.post,
            likes:post.likes,
            dislikes:post.dislikes
        }
        await getRepository(Post).merge(post,postUpdated);
        const result = await getRepository(Post).save(post);
        return res.json(result)
    }
    return res.status(404).json({message:'Post not Found'})
}

export const plusDislikeById =  async (req:Request,res:Response)=>{
    const post = await getRepository(Post).findOne(req.params.id);
    if(post){
        post.dislikes = post.dislikes + 1
        const postUpdated = {
            post:post.post,
            likes:post.likes,
            dislikes:post.dislikes
        }
        await getRepository(Post).merge(post,postUpdated);
        const result = await getRepository(Post).save(post);
        return res.json(result)
    }
    return res.status(404).json({message:'Post was not Found'})
}

export const updatePost = async (req:Request,res:Response)=>{
    const post = await getRepository(Post).findOne(req.params.id);
    if(post){
        await getRepository(Post).merge(post,req.body);
        const result = await getRepository(Post).save(post);
        return res.json(result)
    }else{
        res.status(404).json({message:'The Post was not Found'})
    }
}

export const deletePost = async (req:Request,res:Response)=>{
    const result = await getRepository(Post).delete(req.params.id);
    return res.json(result);
}