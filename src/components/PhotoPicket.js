import React,{useState} from 'react'
import {View,Button,Image,StyleSheet,Alert} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

async function askForPermissions(){
    const {status} = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
    )

    if(status!=='granted') {
        Alert.alert("You don't take access!")
        return false
    }

    return true
}

export const PhotoPicket = ({img,onPick}) =>{
    const [image,setImage] = useState(img)

    const takePhoto = async ()=>{
        const hasPermissions = askForPermissions()

        if(!hasPermissions){
            return
        }

        const image = await ImagePicker.launchCameraAsync({
            quality:1,
            allowsEditing:false
        })

        setImage(image.uri)
        onPick(image.uri)
    }

    return(
        <View style={styles.wrapper}>
            <Button title='Select photo' onPress={takePhoto}/>
            {image&&<Image style={styles.img} source={{uri:image}}/>}
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        marginTop:5
    },
    img:{
        width:'100%',
        height:200,
        marginTop:10
    }
})
