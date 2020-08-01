import {FlatList, View,StyleSheet,Text} from "react-native";
import {Post} from "./Post";
import React from "react";

export const PostList = ({data,onOpen,onEdit}) => {

    if (!data.length){
        return <View styles={styles.wrapper}>
            <Text style={styles.textNoItems}>List is empty</Text>
        </View>
    }

    return(
        <View style={styles.wrapper}>
            <FlatList
                data={data}
                keyExtractor={post => post.id.toString()}
                renderItem={({item}) => {
                    return (
                        <View>
                            <Post post={item} onOpen={onOpen} onEdit={onEdit}/>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        padding:10
    },
    textNoItems:{
        textAlign:'center',
        marginTop:10,
        fontSize:20
    }
})
