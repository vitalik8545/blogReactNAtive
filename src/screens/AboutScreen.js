import React from 'react'
import {View,Image,StyleSheet,Text,ImageBackground} from 'react-native'
import {HeaderButtons, Item} from "react-navigation-header-buttons/index";
import {AppHeaderIcon} from "../components/AppHeaderIcon";
import {THEME} from "../theme";

export const AboutScreen = ({}) =>{
    return(
        <View style={styles.container}>
            <ImageBackground
                source={{uri:'https://thumbs.gfycat.com/ImpressiveComfortableInsect-size_restricted.gif'}}
                style={styles.imgContainer}>
                <View style={styles.wrapper}>
                    <Image
                        style={styles.img}
                        source={{uri:'https://lenta.gcdn.co/globalassets/1/-/00/53/53/275689.png?preset=thumbnail'}}
                    />
                    <Text style={styles.text}>Happy Holiday</Text>
                </View>

            </ImageBackground>

        </View>
    )
}

AboutScreen.navigationOptions = ({navigation}) =>({
    headerTitle: 'About app',
    headerLeft:(
        <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
            <Item
                title='ShowMenu'
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
    wrapper:{
        justifyContent:'center',
        alignItems:'center',
        flex:1
    },
    img:{
        width:'100%',
        height:200,
        resizeMode:'contain'
    },
    text:{
        paddingTop:10,
        fontSize:15,
        color:'green'
    },
    imgContainer:{
        width: '100%',
        height: '100%'
    }
})
