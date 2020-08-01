import React,{useState,useRef} from 'react'
import {View,TextInput,StyleSheet,Button,Image,ScrollView,TouchableWithoutFeedback,Keyboard,Alert} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons/index";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {THEME} from "../theme";
import {useDispatch} from "react-redux";
import {addPost} from "../store/actions/post";
import {PhotoPicket} from "../components/PhotoPicket";

export const CreateScreen = ({navigation}) =>{
    const [title,setTitle] = useState('')
    const [text,setText] = useState('')
    const dispatch = useDispatch()
    const imgRef = useRef()

    const onPickHandler = uri=>{
        imgRef.current = uri
    }

    const createPost = () =>{
        const post = {
            title:title,
            text:text,
            date:new Date().toJSON(),
            img:imgRef.current,
            booked:false
        }

        setTitle('')
        setText('')
        dispatch(addPost(post))
        navigation.navigate('Main')
    }

    return(
        <ScrollView>
            <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
                <View style={styles.container}>
                    <View style={styles.containerTitle}>
                        <TextInput
                            value={title}
                            placeholder='Title'
                            onChangeText={setTitle}
                        />
                    </View>
                    <TextInput
                        value={text}
                        onChangeText={setText}
                        multiline
                        placeholder='Text post'
                    />
                    <PhotoPicket onPick={onPickHandler}/>
                    <Button
                        title='Create post'
                        color={THEME.MAIN_COLOR}
                        onPress={createPost}
                        disabled={!text||!title}
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    )
}

CreateScreen.navigationOptions = ({navigation}) =>({
    headerTitle: 'Create post',
    headerLeft: (
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title='Menu'
                iconName='ios-menu'
                onPress={()=>navigation.toggleDrawer()}
            />
        </HeaderButtons>
    )
})

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    containerTitle:{
        alignItems: 'center'
    },
    img:{
        width:'100%',
        height:200,
        resizeMode:'contain'
    }
})
