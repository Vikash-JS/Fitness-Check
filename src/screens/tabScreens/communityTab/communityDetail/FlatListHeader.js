import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../utils/Constants';
import { useNavigation } from '@react-navigation/native';
import ThreeTab from './ThreeTab';
import About from './About';
import ReadMore from '@fawazahmed/react-native-read-more';


const data1 = [{ id: 1, img: imagesFile.ic_Demo_12 }, { id: 2, img: imagesFile.ic_Demo_12 }, { id: 3, img: imagesFile.ic_Demo_12 }, { id: 4, img: imagesFile.ic_Demo_12 }]

const FlatListHeader = (props) => {

    const navigation = useNavigation()
    const [tabIndex, setTabIndex] = useState(0)
    const [headerData, setHeaderData] = useState(props.headerData)

    useEffect(() => {
        setHeaderData(props.headerData)
        console.log("HeaderData============", headerData)
    }, [props.headerData])

    return (
        <>
            <View style={{ height: 227 }}>

                <View style={{ position: 'absolute', height: 227, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.Goal_BorderGrey }}>
                    {/* <Image source={imagesFile.ic_coDemo6} /> */}

                    <Image style={{ height: 227, width: headerData?.coverImage != '' ? '100%' : '50%' }} source={headerData?.coverImage != '' ? { uri: headerData?.coverImage } : imagesFile.ic_NoImage} />
                </View>
                <View style={styles.headerView}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                    >
                        <Image source={imagesFile.ic_back_White} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}></View>
                    {/* <TouchableOpacity>
                    <Image source={imagesFile.ic_threeWhiteDot} />
                </TouchableOpacity> */}
                </View>

                {/* <View style={{ flexDirection: 'row', marginLeft: 26, alignItems: 'center', width: '90%', marginTop: 8 }}>
                {data1.map((img) =>
                    <View style={{ marginLeft: -7, marginTop: 6 }}>
                        <Image source={img.img} />
                    </View>
                )}
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.semibold_14_white}>+ 53</Text>
                </View>
            </View> */}
            </View>
            <View style={{ marginTop: 5 }}>
                <View style={{ marginLeft: 14 }}>
                    <Text style={styles.bold_24_black}>{headerData?.title}</Text>
                </View>
                <View style={{ marginLeft: 14, marginTop: 6 }}>
                    <ReadMore seeMoreStyle={{ color: '#3B22F8' }} seeLessStyle={{ color: '#3B22F8' }} numberOfLines={2} style={styles.semibold_13_black}>
                        {headerData?.description}
                    </ReadMore>
                    {/* <Text style={styles.semibold_13_black}>{headerData?.description} Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with</Text> */}
                </View>
            </View>
            <View style={{ marginTop: 12, marginBottom: 20, marginLeft: 18 }}>
                <ThreeTab index={props.index} onPressFeeds={props.onPressFeeds} onPressAbout={props.onPressAbout} onPressPeople={props.onPressPeople} />
            </View>
            {props.index == 1 ?
                <View>
                    <About about={headerData?.about} />
                </View> : null}
        </>
    )
}

export default FlatListHeader;

const styles = StyleSheet.create({
    headerView: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 18
    },
    bold_24_white: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 24,
        color: Colors.white
    },
    bold_24_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 24,
        color: Colors.black
    },
    semibold_13_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 13,
        color: Colors.white
    },
    semibold_13_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 13,
        color: Colors.black
    },
    semibold_14_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    }
})