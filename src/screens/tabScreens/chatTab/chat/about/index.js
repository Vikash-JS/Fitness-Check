import React from 'react';
import { SafeAreaView, Text, View, Image, StyleSheet } from 'react-native';
import imagesFile from '../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../utils/Constants';
import AppHeader from '../../../../commonComponents/AppHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import DropShadow from "react-native-drop-shadow";
const AboutScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ flex: 1 }}>
                <AppHeader Heading='Contact Info' onPress={() => navigation.goBack()} />
                <View style={styles.profilepic}>
                    <Image style={{ width: 149, height: 149, borderRadius: 74.5 }} source={imagesFile.ic_demo7} />
                </View>
                <View style={{ marginTop: 15, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.bold_22_black}>Krishna Argawal</Text>
                </View>
                <View style={{ marginTop: 6, justifyContent: 'center', alignItems: 'center', }}>
                    <Text style={styles.semibold_15_opacity}>k.agrawal@gmail.com</Text>
                </View>
                <DropShadow style={styles.shadowStyle}>
                    <View style={{ marginHorizontal: 18, backgroundColor: Colors.white, borderRadius: 10, padding: 16 }}>
                        <View>
                            <View style={{ paddingVertical: 12 }}>
                                <Text style={styles.bold_16_black}>About</Text>
                            </View>

                            <View>
                                <Text style={styles.semibold_12_black}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting
                                    industry. Lorem Ipsum has been the industry’s standard dummy
                                    text ever since the 1500s, when an unknown printer took a galley
                                    of type and scrambled it to make a type specimen book.
                                </Text>
                            </View>
                        </View>
                    </View>
                </DropShadow>
            </View>
        </SafeAreaView >

    )
}

export default AboutScreen;

const styles = StyleSheet.create({
    profilepic: {
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bold_22_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 22,
        color: Colors.black
    },
    semibold_15_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 15,
        color: Colors.black,
        opacity: 0.4
    },
    shadowStyle: {
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
        flex: 1
    },
    bold_16_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 16,
        color: Colors.black
    },
    semibold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black
    }
});