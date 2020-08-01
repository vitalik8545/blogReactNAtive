import * as FileSystem from 'expo-file-system'
import {ADD_POST, EDIT_POST, LOAD_POSTS, REMOVE_POST, TOGGLE_BOOKED} from "../types";
import {DB} from "../../db";

export const loadPosts = () =>{
    return async dispatch => {
        const posts = await DB.getPosts()
        dispatch({
            type: LOAD_POSTS,
            payload: posts
        })
    }
}

export const toggleBooked = post =>async dispatch=>{
    await DB.updatePost(post)

    dispatch({
        type:TOGGLE_BOOKED,
        payload:post.id
    })
}

export const editPost = post =>async dispatch=>{
    const fileName = post.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    await moveFile(newPath,post.img)

    const newPost = {...post,img:newPath}

    await DB.editPost(newPost)

    dispatch({
        type:EDIT_POST,
        payload:newPost.id,
        text:newPost.text,
        title:newPost.title,
        img:newPost.img
    })
}

export const removePost = id =>async dispatch=>{
    await DB.removePost(id)

    dispatch({
        type:REMOVE_POST,
        payload:id
    })
}

async function moveFile(newPath,fileName){
    try{
        await FileSystem.moveAsync({
            to:newPath,
            from:fileName
        })
        console.log('Move success')
    }catch (e){
        console.log('Error move file',e)
    }
}

export const addPost = post => async dispatch =>{
    const fileName = post.img.split('/').pop()
    const newPath = FileSystem.documentDirectory + fileName

    await moveFile(newPath,post.img)

    const payload = {...post,img:newPath,booked:0}

    const id = await DB.createPost(payload)

    payload.id = id

    dispatch({
        type:ADD_POST,
        payload
    })
}
