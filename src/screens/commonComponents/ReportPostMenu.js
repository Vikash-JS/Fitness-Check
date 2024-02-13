import React from 'react';
import { View, Text, Image, StyleSheet} from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';
const ReportPostMenu = (props) => {
    return (
        <View>
            <Menu>
                <MenuTrigger>
                    <View  style={{width:25,height:25,justifyContent:'center',alignItems:'center'}}>
                        <Image source={imagesFile.ic_threeDot} />
                    </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.popupContainer}>
                    <MenuOption onSelect={props.onReportPost} >
                        <Text style={styles.semibold_12_black} >{props.tab1}</Text>
                    </MenuOption>
                    <MenuOption onSelect={props.onBookmark} >
                        <Text style={styles.semibold_12_black} >{props.tab2}</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}

export default ReportPostMenu;

const styles = StyleSheet.create({
    popupContainer:{
        borderRadius:5,
        width:80,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        marginTop:20
    },
    semibold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    }
})