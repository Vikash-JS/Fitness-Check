import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import imagesFile from '../../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../../utils/Constants';

const OptionMenu = (props) => {
    return (
        <View>
            <Menu>
                <MenuTrigger>
                    <View >
                        <Image style={{backgroundColor:Colors.white,width:50,height:50,borderRadius:25}} source={imagesFile.add_image} />
                    </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={styles.popupContainer}>
                    <MenuOption onSelect={props.onSelectViewDetail} >
                        <Text style={styles.semibold_12_black} >{'Uplaod Gallary(Front)'}</Text>
                    </MenuOption>
                    <MenuOption style={{marginTop:10}} onSelect={props.onSelectDelete} >
                        <Text style={styles.semibold_12_black} >{'Uplaod Gallary(Back)'}</Text>
                    </MenuOption>
                    <MenuOption style={{marginTop:10}} onSelect={props.onSelectSend} >
                        <Text style={styles.semibold_12_black} >{'Capture(Front)'}</Text>
                    </MenuOption>
                    <MenuOption style={{marginTop:10}} onSelect={props.onSelectSend} >
                        <Text style={styles.semibold_12_black} >{'Capture(Back)'}</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        </View>
    )
}

export default OptionMenu;

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