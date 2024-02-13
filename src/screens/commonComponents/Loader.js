import React from 'react';
import { View,ActivityIndicator, StyleSheet} from 'react-native';
import {Colors,Fonts} from '../../utils/Constants';

const Loader = ()=>{
    return(
        <View style={styles.viewStyle}>
            <ActivityIndicator size="large" color={Colors.blue}  />
        </View>
    )
}

export default Loader;

const styles = StyleSheet.create({
    viewStyle:{
        position:'absolute',
        backgroundColor:'rgba(0,0,0,0.0)',
        width:"100%",
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    }
})