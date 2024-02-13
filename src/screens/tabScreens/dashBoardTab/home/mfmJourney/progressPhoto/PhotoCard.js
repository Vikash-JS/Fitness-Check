import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Dimensions, Modal, TouchableOpacity, ActivityIndicator } from 'react-native';
import { ProgressPhotoConstants } from '../mfmJourneyConstants';
import DropShadow from "react-native-drop-shadow";
import { Colors, Fonts } from '../../../../../../utils/Constants';
import ImageViewer from 'react-native-image-zoom-viewer';
const windowWidth = Dimensions.get('window').width;
const images = [{
    // Simplest usage.
    url: 'https://picsum.photos/200/300',

    // width: number
    // height: number
    // Optional, if you know the image size, you can set the optimization performance

    // You can pass props to <Image />.
    props: {
        // headers: ...
    }
}]
const PhotoCard = (props) => {
    const [imageModal, setImageModal] = useState(false)
    const [uri, setUri] = useState('')
    function ImageModal(props) {
        return (
            <Modal visible={imageModal} transparent={true}>
                <ImageViewer
                    enableImageZoom={true}
                    enableSwipeDown={true}
                    onSwipeDown={() => {
                        setImageModal(false)
                    }}
                    //   renderIndicator={()=>}
                    imageUrls={[{ url: uri }]} />
            </Modal>
        )
    }


    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ flex: 1 }}
            onPress={() => { setImageModal(true), setUri(item?.files?.filePath) }}
        >
            <View style={{ flex: 1, marginTop: 12 }}>


                <Image style={{ backgroundColor: Colors.inputGrey, width: windowWidth / 2.6, height: 109, borderRadius: 10 }} source={{ uri: item?.files?.filePath }} />
            </View>
            <View style={{ marginTop: 8 }}>
                <Text style={styles.bold_12_black}>{item?.label}</Text>
            </View>
            <ImageModal uri={item?.files?.filePath} />
        </TouchableOpacity>
    )

    return (
        <DropShadow style={styles.shadowStyle}>

            <View style={{ borderRadius: 12, marginHorizontal: 18, padding: 18, marginVertical: 10, backgroundColor: Colors.white }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.bold_14_black}>{ProgressPhotoConstants.DATE}</Text>
                    </View>
                    <View style={{ marginLeft: 20 }}>
                        <Text>{props?.item?._id}</Text>
                    </View>
                </View>
                <View>
                    <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                        numColumns={2}
                        data={props?.item?.records}
                        renderItem={renderItem}
                        keyExtractor={item => item._id}
                    />
                </View>
            </View>
        </DropShadow>
    )
}

export default PhotoCard;

const styles = StyleSheet.create({
    shadowStyle: {
        flex: 1,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
    bold_14_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 14,
        color: Colors.black
    },
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black
    }
})