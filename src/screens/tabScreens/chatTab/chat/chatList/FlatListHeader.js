import React from 'react';
import { View, Text, SafeAreaView, Image, TouchableOpacity,StyleSheet } from 'react-native';
import imagesFile from '../../../../../../assets/imagesFile';
import SearchTab from '../../../../commonComponents/SearchTab';
import {Colors, Fonts} from '../../../../../utils/Constants';
const FlatListHeader = (props) => {
    return (
        <>
            <View style={{ height: 50, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginHorizontal: 18 }}>
                <TouchableOpacity
                onPress={props.onPressBack}
                >
                    <Image source={imagesFile.ic_back} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}></View>
                {/* <TouchableOpacity>
                    <Image source={imagesFile.ic_black_dot} />
                </TouchableOpacity> */}
            </View>
            <View style={{ marginTop: 10, marginLeft: 18 }}>
                <Text style={styles.bold_32_black}>Chats</Text>
            </View>
            {/* <SearchTab /> */}
        </>
    )
}
export default FlatListHeader;

const styles = StyleSheet.create({
    bold_32_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 32,
        color: Colors.black
    }
})