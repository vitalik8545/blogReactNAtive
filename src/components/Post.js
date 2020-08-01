import React from 'react'
import {View,Text,ImageBackground,StyleSheet,TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import {THEME} from "../theme";

export const Post = ({post,onOpen,onEdit}) => {
    return (
        <TouchableOpacity onPress={()=>onOpen(post)}>
            <View style={styles.post}>
                <ImageBackground style={styles.img} source={{uri:post.img}}>
                    <View style={styles.textWrap}>
                        <Text style={styles.title}>{new Date(post.date).toLocaleDateString()}</Text>
                        <View style={styles.editButtonContent}>
                            <AntDesign
                                name="edit"
                                size={24}
                                color={THEME.MAIN_COLOR}
                                onPress={()=>onEdit(post)}/>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:200
    },
    post:{
        marginBottom:10,
        overflow:'hidden'
    },
    textWrap:{
        backgroundColor:'rgba(0,0,0,0.5)',
        paddingVertical:5,
        justifyContent:'center',
        width: '100%',
        flexDirection:'row'
    },
    editButtonContent:{
        right: 5,
        position:'absolute'
    },
    title:{
        color:'#fff'
        //fontFamily:'sans-regular'
    }
})
