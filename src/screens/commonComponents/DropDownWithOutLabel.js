import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { Colors, Fonts } from '../../utils/Constants';
const DropDownWithOutLabel = (props) => {
    return (
        <View style={styles.mainContainer}>
            <SelectList
                placeholder={props.placeholder}
                inputStyles={{ color: Colors.black, fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, }}
                dropdownTextStyles={{ fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.black }}
                disabledTextStyles={{ fontSize: 12, fontFamily: Fonts.gilroy_SemiBold, color: Colors.pink }}
                boxStyles={{ borderRadius: 7, alignItems: 'center', borderColor: Colors.inputGrey }}
                dropdownStyles={{ borderWidth: 0 }}
                setSelected={props.setSelected}

                data={props.data}
                save="value"
            />
        </View>
    )
}

export default DropDownWithOutLabel;

const styles = StyleSheet.create({
    mainContainer: {
        // borderWidth: 1, 
    },
    bold_18_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 18,
        color: Colors.black
    }
})