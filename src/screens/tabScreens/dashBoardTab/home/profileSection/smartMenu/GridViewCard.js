import React from 'react';
import {View, Text,Image, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';

export const GridViewCard = (props)=>{
    return(
        <View>
            <View>
                <Image source={props.Image} />
            </View>
            <View style={{marginTop:6}}>
                <Text style={styles.bold_12_black}>{props.Name}</Text>
            </View>
        </View>
    )
}

export const Heading = (props)=>{
    return(
        <View >
            <Text style={styles.bold_12_opacity}>{props.Title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    bold_12_opacity:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.black,
        opacity:0.4
    },
    bold_12_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:12,
        color:Colors.black,
        
    },
})


