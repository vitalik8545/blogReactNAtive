import React from 'react'
import {View,FlatList,StyleSheet} from 'react-native'
import {Post} from "../components/Post";
import {HeaderButtons, Item} from "react-navigation-header-buttons/index";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {PostList} from "../components/PostList";
import {useSelector} from "react-redux";

export const BookmarkedScreen = ({navigation}) =>{
    const onOpen=post=>{
        navigation.navigate('Post',{postId:post.id,text:post.text,booked:post.booked})
    }

    const onEdit=post=>{

    }

    const bookedPosts = useSelector(state=>state.post.bookedPosts)

    return(
        <PostList data={bookedPosts} onOpen={onOpen} />
    )
}

BookmarkedScreen.navigationOptions=({navigation})=>({
    headerTitle: 'Bookmarked',
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
    wrapper:{
        padding:10
    }
})
