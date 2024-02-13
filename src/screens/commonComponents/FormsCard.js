import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import DropShadow from "react-native-drop-shadow";
import {Colors, Fonts} from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';

const FormsCard = (props) =>{
    
    return(
        <DropShadow style={styles.shadowProp}>
        <View style={styles.mainContainer}>
            <View>
                <Text>{props?.item?.formId?.title}</Text>
            </View>
            <View style={{flex:1}}></View>
            <View>
                <Image source={imagesFile.ic_rightArrow}/>
            </View>
        </View>
        </DropShadow>
    )
}

export default FormsCard;
const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },
      mainContainer:{
        justifyContent:'center',
        alignItems:'center',
        borderRadius:7,
        marginTop:10,
        marginHorizontal:18,
        flexDirection:'row',
        backgroundColor:Colors.white,
        paddingVertical:24,
        paddingHorizontal:20
      }
    })