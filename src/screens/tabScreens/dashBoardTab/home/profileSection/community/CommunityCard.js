import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../../utils/Constants';
const data1 = [{ id: 1, img: imagesFile.ic_Demo_12 }, { id: 2, img: imagesFile.ic_Demo_12 }, { id: 3, img: imagesFile.ic_Demo_12 }, { id: 4, img: imagesFile.ic_Demo_12 }]
const CommunityCard = (props) => {
    return (
        <View style={styles.mainComtainer}>
            <View >
                <Image style={{ width: '100%', borderRadius: 10 }} resizeMode='cover' source={props.item.image} />
            </View>
            <View style={{ position: 'absolute', bottom: 15, marginLeft: 14, width: '100%' }}>
                <View>
                    <Text style={styles.bold_18_white}>Fitness Community</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 5, alignItems: 'center', width: '90%' }}>
                    {data1.map((img) =>
                        <View style={{ marginLeft: -7, marginTop: 6 }}>
                            <Image source={img.img} />
                        </View>
                    )}
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={styles.semiBold_12_white}>+ 53</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                        <Image source={imagesFile.ic_threeWhiteDot} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default CommunityCard;

const styles = StyleSheet.create({
    mainComtainer: {

        marginHorizontal: 18,
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden'

    },
    bold_18_white: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 18,
        color: Colors.white
    },
    semiBold_12_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.white
    }
})