import React from 'react';
import {View, Text, StyleSheet,Image,TouchableOpacity} from 'react-native';
import DropShadow from "react-native-drop-shadow";
import imagesFile from '../../../assets/imagesFile';
import {Colors, Fonts} from '../../utils/Constants'
const PDFCard = (props) =>{
    return(
        <DropShadow style={styles.shadowStyle}>
        <TouchableOpacity style={styles.mainContainer}
        onPress={props.onPress}
        >
            <View>
                <Image source={imagesFile.ic_pdf}/>
            </View>
            <View style={{marginLeft:11}}>
                <Text style={styles.semiBold_12_black}>{props?.item?.fileName}</Text>
            </View>
        </TouchableOpacity>
        </DropShadow>
    )
}
export default PDFCard;

const styles = StyleSheet.create({
    shadowStyle:{
        shadowColor: '#171717', 
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2, 
    },
    mainContainer:{
        flexDirection:'row',
        alignItems:'center',
        paddingVertical:15,
        paddingHorizontal:20,
        backgroundColor:Colors.white,
        borderRadius:7,
        
    },
    semiBold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    }
})