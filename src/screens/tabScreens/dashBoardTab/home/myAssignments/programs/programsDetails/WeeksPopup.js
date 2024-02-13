import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
    renderers
    
} from 'react-native-popup-menu';
import imagesFile from '../../../../../../../../assets/imagesFile';
const Weekspopup = (props)=>{
    return(
        <View>
            <Menu>
                <MenuTrigger>
                    <View style={{height:30,width:50,justifyContent:'center',alignItems:'center'}}>
                    <Image source={imagesFile.ic_threeDot} />
                    </View>
                </MenuTrigger>
                <MenuOptions optionsContainerStyle={[styles.popupContainer,{paddingVertical:props?.type == "my"?15:10}]}>
                    {props?.type == "my" &&<MenuOption onSelect={props.onSelectMarkAsDone} >
                        <Text style={styles.semibold_12_black} >{props.tab1}</Text>
                    </MenuOption>}
                    <MenuOption style={{ marginTop:props?.type == "my" ? 10:0 }} onSelect={props.onSelectViewDetail} >
                        <Text style={styles.semibold_12_black} >{props.tab2}</Text>
                    </MenuOption>
                    
                </MenuOptions>
            </Menu>
        </View>
    )
}

export default Weekspopup;

const styles = StyleSheet.create({
    popupContainer:{
        borderRadius:10,
        width:108,
        justifyContent:'center',
        alignItems:'center',
         marginTop:35
    },
    semibold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    },
    semibold_13_blue:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:13,
        color:Colors.lightBlue
    },
})