import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('post.db')

export class DB{
    static init(){
       return new Promise((resolve,reject)=>{
           db.transaction(tx=>{
               tx.executeSql(
                   'CREATE TABLE IF NOT EXISTS posts (' +
                   'id INTEGER PRIMARY KEY NOT NULL,' +
                   'img TEXT,' +
                   'text TEXT NOT NULL,' +
                   'title TEXT NOT NULL,' +
                   'date TEXT NOT NULL,' +
                   'booked INT' +
                   ')',
                   [],
                   resolve,
                   (_,error)=>reject(error)
               )
           })
       })
    }

    static getPosts(){
        return new Promise((resolve,reject)=>{
            db.transaction(tx=>{
                tx.executeSql(
                    'Select * from posts',
                    [],
                    (_,result)=>resolve(result.rows._array),
                    (_,error)=>reject(error)
                )
            })
        })
    }

    static createPost({title,text,date,booked,img}){
        return new Promise((resolve,reject)=>{
            db.transaction(tx=>{
                tx.executeSql(
                    `INSERT INTO posts (title,text,date,booked,img) VALUES (?,?,?,?,?)`,
                    [title,text,date,booked,img],
                    (_,result)=>resolve(result.insertId),
                    (_,error)=>reject(error)
                )
            })
        })
    }

    static updatePost(post){
        return new Promise((resolve,reject)=>{
            db.transaction(tx=>{
                tx.executeSql(
                    'UPDATE posts SET booked = ? WHERE id = ?',
                    [post.booked?0:1,post.id],
                    resolve,
                    (_,error)=>reject(error)
                )
            })
        })
    }

    static editPost({title,text,img,id}){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                tx.executeSql(
                    'UPDATE posts SET title = ?,text=?,img = ? WHERE id = ?',
                    [title,text,img,id],
                    resolve,
                    (_,error)=>reject(error)
                )
            })
        })
    }

    static removePost(id){
        return new Promise((resolve, reject)=>{
            db.transaction(tx=>{
                tx.executeSql(
                    'DELETE FROM posts WHERE id = ?',
                    [id],
                    resolve,
                    (_,error)=>reject(error)
                )
            })
        })
    }
}
