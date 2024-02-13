import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'
import { LoginScreen, SignupScreen, ForgotPasswordScreen } from '../screens/auth/index';
import {MessageScreen} from '../screens/tabScreens/chatTab/index';
import {CommentScreen} from '../screens/tabScreens/communityTab/index';
import {TabNavigator} from './TabNavigation';
import {OnBoardingScreen} from '../screens/onBoarding/index';
import CreatePasswordScreen from '../screens/auth/forgotPassoword/createPassword';
// import TabNavigator from '../navigation/TabNavigator'
const Stack = createStackNavigator();

const RootNavigation = () => {
    console.log("globlogin=======",global.isSession)
    console.log('intrestAdded=======',global.isIntrestAdded)
    return (
        <Stack.Navigator initialRouteName={global.isSession && global.isIntrestAdded ? "TabNavigator" :!global.isSession?"LoginScreen":"OnBoardingScreen"}>
            <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown:false, gestureEnabled:false}}/>
            <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} options={{headerShown:false, gestureEnabled:false }}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen} options={{headerShown:false, gestureEnabled:false}}/>
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{headerShown:false, gestureEnabled:false}}/>
            <Stack.Screen name="CreatePasswordScreen" component={CreatePasswordScreen} options={{headerShown:false, gestureEnabled:false}}/>
            <Stack.Screen name="TabNavigator" component={TabNavigator} options={{headerShown:false, gestureEnabled:false}}/>
            <Stack.Screen name="MessageScreen" component={MessageScreen}  options={{ headerShown: false, gestureEnabled: false ,keyboardHandlingEnabled:true}} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} options={{ headerShown: false, gestureEnabled: false,keyboardHandlingEnabled:true }} />

        </Stack.Navigator>
    )

}
export default RootNavigation;