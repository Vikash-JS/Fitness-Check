import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
import { useNavigation } from '@react-navigation/native';
import { homeConstants } from '../tabScreens/dashBoardTab/dashBoardConstants';
import DropShadow from "react-native-drop-shadow";

const ToolsBar = () => {
    const navigation = useNavigation()
    return (
        <ScrollView showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }} horizontal={true}>
            
            <TouchableOpacity style={styles.BarImageStyle}
               onPress={()=>navigation.navigate('BMRCalculatorScreen')}
            >
                <DropShadow style={styles.shadowStyle}>
                <View>
                    <Image style={{width:80,height:80}} source={imagesFile.ic_bmr} />
                </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bold_12_black}>{homeConstants.BMR}</Text>
                </View>
            </TouchableOpacity>
            
            <TouchableOpacity
            style={styles.BarImageStyle}
               onPress={()=>navigation.navigate('MicronutrientCalculatorScreen')}
            >
                <DropShadow style={styles.shadowStyle}>
                <View>
                    <Image style={{width:80,height:80}} source={imagesFile.ic_calculator} />
                </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bold_12_black}>{homeConstants.MACRO_NUTRIENTS}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BarImageStyle}
             onPress={()=>navigation.navigate('BodyFatCalculatorScreen')}
            >
                <DropShadow style={styles.shadowStyle}>
                <View>
                    <Image style={{width:80,height:80}} source={imagesFile.ic_bodyfat} />
                </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bold_12_black}>{homeConstants.BODY_FAT}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BarImageStyle}
             onPress={()=>navigation.navigate('RmCalculatorScreen')}
            >
                <DropShadow style={styles.shadowStyle}>
                <View>
                    <Image style={{width:80,height:80}} source={imagesFile.ic_rm} />
                </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.bold_12_black}>{homeConstants.RM_CALCULATOR}</Text>
                </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.BarImageStyle}
             onPress={()=>navigation.navigate('BMICalculator')}
            >
                <DropShadow style={styles.shadowStyle}>
                <View>
                    <Image style={{width:62,height:62,borderRadius:75,marginTop:4}} source={imagesFile.sm_bmi} />
                </View>
                </DropShadow>
                <View style={{ justifyContent: 'center', alignItems: 'center' ,marginTop:13}}>
                    <Text style={styles.bold_12_black}>{homeConstants.BMI}</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default ToolsBar;

const styles = StyleSheet.create({
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black
    },
    shadowStyle: {
        // flex:1,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    BarImageStyle:{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal:10

    },
})