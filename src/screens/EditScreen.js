import React,{useState} from 'react'
import {ScrollView,TextInput,Button,StyleSheet,TouchableWithoutFeedback,Keyboard,View} from 'react-native'
import {useDispatch} from "react-redux";
import {editPost} from "../store/actions/post";
import {PhotoPicket} from "../components/PhotoPicket";

export const EditScreen = ({navigation}) =>{
    const postId = navigation.getParam('postId')
    const [title,setTitle] = useState(navigation.getParam('title'))
    const [text,setText] = useState(navigation.getParam('text'))
    const [img,setImg] = useState(navigation.getParam('img'))
    const dispatch = useDispatch()

    const onPickHandler=uri=>{
        setImg(uri)
    }

    const onSaveHandler = () =>{
        const post = {
            id:postId,
            title,
            text,
            img
        }

        dispatch(editPost(post))
        navigation.goBack()
    }
    return(
        <ScrollView>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                <View>
                    <TextInput value={title} onChangeText={setTitle}/>
                    <TextInput value={text} onChangeText={setText} multiline/>
                    <PhotoPicket onPick={onPickHandler} img={img}/>
                    <Button title='Save' onPress={onSaveHandler}/>
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}
