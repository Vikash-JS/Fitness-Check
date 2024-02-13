import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import imagesFile from '../../../assets/imagesFile';
import {Colors, Fonts} from '../../utils/Constants';
const PopupMenu = (props) => {
    console.log("dateValidation=======",props.checkDate)
    return (
        <View>
            <Menu>
                <MenuTrigger>
                    <View >
                        <Image source={imagesFile.ic_threeDot} />
                    </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.popupContainer}>
                    <MenuOption onSelect={props.onSelectViewDetail} >
                        <Text style={styles.semibold_12_black} >{props.tab1}</Text>
                    </MenuOption>
                    { props.tabIndex == 2 ?
                    <MenuOption style={{marginTop:10}} onSelect={props.onSelectDelete} >
                        <Text style={styles.semibold_12_black} >{props.tab2}</Text>
                    </MenuOption>:null}
                    <MenuOption style={{marginTop:10}} onSelect={props.onSelectSend} >
                        <Text style={styles.semibold_12_black} >{props.tab3}</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}

export default PopupMenu;

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
    }
})