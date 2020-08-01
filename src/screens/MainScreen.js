import React,{useEffect} from 'react'
import {View,StyleSheet,ActivityIndicator} from 'react-native'
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons/index";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {PostList} from "../components/PostList";
import {useDispatch, useSelector} from "react-redux";
import {loadPosts} from "../store/actions/post";
import {THEME} from "../theme";

export const MainScreen = ({navigation}) =>{
    const onOpen = (post) =>{
        navigation.navigate('Post',{postId:post.id,text:post.text,title:post.title})
    }

    const onEdit = post =>{
        navigation.navigate('EditScreen',{postId:post.id,text:post.text,title:post.title,img:post.img})
    }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(loadPosts())
    }, [dispatch]);


    const allPosts = useSelector(state=>state.post.allPosts)
    const loading = useSelector(state=>state.post.loading)

    if(loading){
        return (
            <View style={styles.center}>
                <ActivityIndicator color={THEME.MAIN_COLOR}/>
            </View>
        )
    }

    return(
        <PostList data={allPosts} onOpen={onOpen} onEdit={onEdit} />
    )
}

MainScreen.navigationOptions =({navigation})=> ({
    headerTitle:'My blog',
    headerRight:(
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title='UploadPhoto'
                iconName='ios-camera'
                onPress={()=>navigation.navigate('Create')}
            />
        </HeaderButtons>
    ),
    headerLeft:(
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
    center:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})


