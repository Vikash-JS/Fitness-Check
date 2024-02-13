import React from 'react';
import {View, Text, StyleSheet,Image} from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import imagesFile from '../../../../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../../../../utils/Constants';

const Mark_as_done_Menu = (props)=>{
    return(
        <View>
            <Menu>
                <MenuTrigger>
                    <View style={styles.imageViewStyle}>
                        <Image source={imagesFile.ic_threeDot} />
                    </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.popupContainer}>
                    <MenuOption onSelect={props.onMarkDone} >
                        <Text style={styles.semibold_12_black} >{props.tab1}</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}

export default Mark_as_done_Menu;

const styles = StyleSheet.create({
    popupContainer:{
        borderRadius:10,
        width:108,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        marginTop:20
    },
    semibold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    },
    imageViewStyle:{
        width:35,
        height:20,
        justifyContent:'center',
        alignItems:'center'
    }
})