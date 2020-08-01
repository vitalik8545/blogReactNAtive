import React from 'react'
import { WebView } from 'react-native-webview';

export const HtmlScreen = () =>{
    return(
        <WebView source={{ uri: 'https://www.youtube.com/embed/2m6nGyM8kTs' }} />
    )
}
