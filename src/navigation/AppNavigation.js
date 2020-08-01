import React from 'react'
import { createAppContainer, ThemeColors } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Platform } from 'react-native'
import {AntDesign, Entypo, Ionicons, MaterialIcons} from '@expo/vector-icons'
import { MainScreen } from '../screens/MainScreen'
import { PostScreen } from '../screens/PostScreen'
import { AboutScreen } from '../screens/AboutScreen'
import { CreateScreen } from '../screens/CreateScreen'
import { BookmarkedScreen } from '../screens/BookmarkedScreen'
import { THEME } from '../theme'
import {EditScreen} from "../screens/EditScreen";
import {HtmlScreen} from "../screens/HtmlScreen";

const navigationOptions = {
    defaultNavigationOptions:{
        headerStyle:{
            backgroundColor:Platform.OS==='ios'?'#fff':THEME.MAIN_COLOR
        },
        headerTintColor:Platform.OS==='ios'?THEME.MAIN_COLOR:'#fff'
    }
}

const PostNavigation = createStackNavigator({
    Main:MainScreen,
    Post: {
        screen: PostScreen
    },
    EditScreen:EditScreen
},navigationOptions)

const BookmarkedNavigator = createStackNavigator({
    Main:BookmarkedScreen,
    Post:PostScreen,
    EditScreen:EditScreen
},navigationOptions)

const HtmlNavigation = createStackNavigator({
    Main:HtmlScreen
})

const bottomTabsConfig = {
    AllPost:{
        screen:PostNavigation,
        navigationOptions:{
            tabBarIcon:info=><Ionicons name='ios-albums' size={25} color={info.tintColor} />,
            title:'All post'
        }
    },
    Bookmarked:{
        screen:BookmarkedNavigator,
        navigationOptions:{
            tabBarIcon:info=><Ionicons name='ios-star' size={25} color={info.tintColor}/>,
            title:'Bookmarked'
        }
    },
    HTML:{
        screen:HtmlNavigation,
        navigationOptions:{
            tabBarIcon:info=><AntDesign name="HTML" size={24} color={info.tintColor} />,
            title:'Html'
        }
    }
}

const BottomNavigation =
    Platform.OS==='ios'
        ?createBottomTabNavigator(
    bottomTabsConfig
,{
    tabBarOptions:{
        activeTintColor:THEME.MAIN_COLOR,
        showLabel:true
    }
}):createMaterialBottomTabNavigator(
    bottomTabsConfig
,{
    activeTintColor:'fff',
    barStyle:{
        backgroundColor:THEME.MAIN_COLOR
    }
})

const AboutNavigator = createStackNavigator(
    {
        About: AboutScreen
    },
    navigationOptions
)

const CreateNavigator = createStackNavigator(
    {
        Create: CreateScreen
    },
    navigationOptions
)

const MainNavigator = createDrawerNavigator({
    PostTabs:{
        screen:BottomNavigation,
        navigationOptions:{
            drawerLabel:'Home',
            drawerIcon:<Entypo name='home' size={24}/>
        }
    },
    Create:{
        screen:CreateNavigator,
        navigationOptions:{
            drawerLabel:'Create post',
            drawerIcon:<Ionicons name='ios-add' size={24}/>
        }
    },
    About:{
        screen:AboutNavigator,
        navigationOptions:{
            drawerLabel:'About app',
            drawerIcon:<MaterialIcons name='details' size={24}/>
        }
    }
},{
    contentOptions:{
        activeTintColor:THEME.MAIN_COLOR,
        labelStyle:{
            fontSize:15
        }
    }
})

export const AppNavigator = createAppContainer(MainNavigator)
