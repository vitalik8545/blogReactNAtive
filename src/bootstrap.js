import * as Font from 'expo-font';
import {DB} from "./db";

export async function bootstrap(){
    try {
        /*await Font.loadAsync({
            'sans-bold':require('../assets/fonts/OpenSans-Bold.ttf'),
            'sans-regular':require('../assets/fonts/OpenSans-Regular.ttf')
        })*/
        console.log('Load DB')

        await DB.init()

        console.log('DB was loaded')
    }catch (e) {
        console.log('exception load DB: ',e)
    }
}
