import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import { ProgressRecordConstants, ProgressPhotoConstants } from '../mfmJourneyConstants';
import { useNavigation } from '@react-navigation/native';
import imagesFile from '../../../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../../../utils/Constants';
const FlatListHeader = () => {
    const navigation = useNavigation()
    return (
        <View>
            <AppHeader Heading={ProgressRecordConstants.MFM_JOURNEY} onPress={() => navigation.goBack()} />
            <View>
                <Image style={{ width: "100%" }} source={imagesFile.ic_banner} />
            </View>
            <View style={{ marginTop: 20, marginLeft: 18 }}>
                <Text style={styles.bold_20_black}>{ProgressPhotoConstants.PROGRESS_PHOTOS}</Text>
            </View>
        </View>
    )
}

export default FlatListHeader;

const styles = StyleSheet.create({
    bold_20_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 20,
        color: Colors.black
    }
})