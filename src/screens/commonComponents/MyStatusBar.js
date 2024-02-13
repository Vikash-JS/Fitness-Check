import React from 'react';
import {StatusBar, SafeAreaView, View, Platform} from 'react-native';

const MyStatusBar = ({backgroundColor, ...props})=>{
    return(
        <View style={{height:Platform.OS =='ios'? StatusBar.currentHeight:0, backgroundColor:{backgroundColor}}}>
          <SafeAreaView style={{backgroundColor:backgroundColor}}>
            <StatusBar  backgroundColor={backgroundColor} {...props} />
          </SafeAreaView>
        </View>
    )
}

export default MyStatusBar;