import React from 'react';
import { View, Text, Image,StyleSheet } from 'react-native';
import { Colors, Fonts } from '../../../../utils/Constants';
const People = (props) => {
    return (
        <View style={{marginTop:15}}>
            <View style={{marginHorizontal:18,  flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 50, height: 50, borderRadius: 25 }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={{ uri:props.item.clientId.profilePicture.url}} />
                </View>

                <View style={{ marginLeft: 10 }}>
                    <View>
                        <Text style={styles.bold_17_black}>{props.item.clientId.fullName}</Text>
                    </View>
                    {/* <View style={{marginTop:4}}>
                        <Text style={styles.semibold_10_opacity}>{props.item.email}</Text>
                    </View> */}
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={{marginHorizontal:18,borderWidth:0.5,borderColor:Colors.palceHolder_grey,marginVertical:15 }}></View>
        </View>
    )
}

export default People;

const styles = StyleSheet.create({
    bold_17_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:17,
        color:Colors.black
    },
    semibold_10_opacity:{
        fontFamily:Fonts.gilroy_SemiBold,
        fontSize:10,
        color:Colors.black,
        opacity:0.5
    }
})