import React,{useEffect,useCallback} from 'react'
import {View,Text,StyleSheet,Image,ScrollView,Button,Alert} from 'react-native'
import {useDispatch, useSelector} from "react-redux";
import {THEME} from "../theme";
import {HeaderButtons, Item} from "react-navigation-header-buttons/index";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {removePost, toggleBooked} from "../store/actions/post";

export const PostScreen = ({navigation}) =>{
    const postId = navigation.getParam('postId')
    const post = useSelector(state=>state.post.allPosts.find(post=>post.id===postId))
    const dispatch = useDispatch()
    const booked = useSelector(state=>state.post.bookedPosts.some(post=>post.id===postId))

    useEffect(()=>{
        navigation.setParams({booked})
    },[booked])

    const toggleHandler = useCallback(()=>{
        dispatch(toggleBooked(post))
    },[dispatch,post])

    useEffect(()=>{
        navigation.setParams({toggleHandler})
    },[toggleHandler])

    const removeHandler = () =>{
        Alert.alert(
            'Удаление пост',
            'Вы точно хотите удалить пост?',
            [
                {
                    text:'Cancel',
                    style:'cancel'
                },
                {
                    text:'Remove',
                    style:'destructive',
                    onPress() {
                        navigation.goBack()
                        dispatch(removePost(postId))
                    }
                }
            ],
            {cancelable:false}
        )
    }

    if(!post){
        return null
    }

    return(
        <View style={styles.container}>
            <ScrollView style={styles.container}>
                <Image style={styles.img} source={{uri:post.img}}/>
                <View style={styles.textWrap}>
                    <Text style={styles.mainText}>{post.text}</Text>
                </View>
            </ScrollView>
            <Button color={THEME.DANGER_COLOR} onPress={removeHandler} title='Delete'/>
        </View>
    )
}

PostScreen.navigationOptions = ({navigation}) => {
    const title = navigation.getParam('title')
    const booked = navigation.getParam('booked')
    const toggleHandler = navigation.getParam('toggleHandler')
    return {
        headerTitle:title,
        headerRight:(
            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                <Item
                    title='Menu'
                    iconName={booked?'ios-star':'ios-star-outline'}
                    onPress={toggleHandler}
                />
            </HeaderButtons>
        ),
        headerStyle:{
            backgroundColor:'violet'
        },
        headerTintColor:'#fff'
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    img:{
        width:'100%',
        height:200,
        resizeMode:'contain',
        marginTop:10
    },
    textWrap:{
        paddingTop:10,
        paddingHorizontal:10
    },
    mainText:{
        fontSize:15
    }
})
