import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {Colors, Fonts} from '../../../../../utils/Constants';
const CommonDropDown = (props) => {
    return (
        <View style={styles.mainContainer}>
            <View>
                <Text style={styles.bold_18_black}>{props.Heading}</Text>
            </View>
            <View style={{ marginTop: 12 }} >
            <SelectList
            placeholder={props?.placeholder?props?.placeholder:"Select"}
            inputStyles={{color:Colors.palceHolder_grey, fontFamily:Fonts.gilroy_SemiBold, fontSize:12,}}
            dropdownTextStyles={{fontFamily:Fonts.gilroy_SemiBold,fontSize:12,color:Colors.black}}
            disabledTextStyles={{fontSize:12, fontFamily:Fonts.gilroy_SemiBold,color:Colors.pink}}
            boxStyles={{borderRadius:7,alignItems:'center' ,borderColor:Colors.inputGrey}}
            dropdownStyles={{borderWidth:0}}
            setSelected={props.setSelected}
            data={props.data}
            save="value"
        />
            </View>
        </View>
    )
}

export default CommonDropDown;

const styles = StyleSheet.create({
    mainContainer:{
        // borderWidth: 1, 
        
    },
    bold_18_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:18,
        color:Colors.black
    }
})