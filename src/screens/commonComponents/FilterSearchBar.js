import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';

const FilterSearchBar = (props) => {
    const [index, setIndex] = useState(props?.index)
    return (
        <View style={styles.inputView}>
            {props?.from =='pl'?     <View style={[styles.inputSubView, { width: '100%'}]}>
                <TextInput
                    value={props.value}
                    onChangeText={props.onChangeText}
                    style={{ height: 30, marginHorizontal: 5, backgroundColor: Colors.white, borderRadius: 10 }}
                    placeholder={"🔍   search"}
                />
            </View>:
                 <View style={[styles.inputSubView, { width: props?.index == 0 || props?.from ? '80%' : '100%',justifyContent:"center"}]}>
                 <TextInput
                     value={props.value}
                     onChangeText={props.onChangeText}
                     style={{ height: 30, marginHorizontal: 5, backgroundColor: Colors.white, borderRadius: 10 }}
                     placeholder={"🔍   search"}
                 />
             </View>
            }
       
            {!props?.isFilterBarHide && (props?.index == 0 || props.from == "trainer" )?
                <TouchableOpacity style={{ marginRight: 18, marginLeft: 10 }}
                    onPress={props.onFilterPress}
                >
                    <Image source={imagesFile.ic_filter} />
                </TouchableOpacity> : null}
        </View>
    )
}

export default FilterSearchBar;

const styles = StyleSheet.create({
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 14.5,
        paddingHorizontal: 10
    },
    inputSubView: {
        borderColor: Colors.inputGrey,
        borderWidth: 1,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
    }
})