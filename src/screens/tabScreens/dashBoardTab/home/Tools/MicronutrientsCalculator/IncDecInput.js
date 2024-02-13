import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
const IncDecInput = (props) => {
    return (
        <View style={{ flex: 1,  justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <Text style={styles.bold_14_black}>1%</Text>
            </View>
            <View style={{marginTop:6}}>
                <Text style={styles.medium_10_opacity}>{props.name}</Text>
            </View>
            <View style={{marginTop:10,justifyContent:'center',alignItems:'center',height:44, flexDirection: 'row', backgroundColor: Colors.inputGrey, borderRadius: 7 }}>
                <View style={{ flex: 2 }}>
                    <TextInput
                    value={props.value.toString()}
                    onChange={props.onChange}
                        style={{  height: 30 ,marginLeft:10}}
                    />
                </View>
                <View style={{ flex: 1 ,justifyContent:'center',alignItems:'center',}}>
                    <Text style={styles.semibold_12_black}>gm</Text>
                </View>
                <View style={{height:44, flex: 1,justifyContent:'center',alignItems:'center', }}>
                    <TouchableOpacity style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center', }}
                    onPress={()=>props.onPress(0)}
                    >
                        <Image source={imagesFile.ic_upArrow} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1,width:'100%',justifyContent:'center',alignItems:'center', }}
                    onPress={()=>props.onPress(1)}
                    >
                        <Image source={imagesFile.ic_downArrow} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default IncDecInput;

const styles = StyleSheet.create({
    bold_14_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 14,
        color: Colors.black
    },
    medium_10_opacity: {
        fontFamily: Fonts.gilroy_Medium,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.4
    },
    semibold_12_black:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:12,
        color:Colors.black
    }
})