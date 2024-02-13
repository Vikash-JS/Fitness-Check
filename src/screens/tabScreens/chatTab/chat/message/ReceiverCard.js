import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Modal } from 'react-native';
import { Colors, Fonts } from '../../../../../utils/Constants';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import imagesFile from '../../../../../../assets/imagesFile';
import ImageViewer from 'react-native-image-zoom-viewer';
import VideoModal from './VideoModal';


const ReceiverCard = (props) => {
    const [showTime, setShowTime] = useState(false)
    const [showDownLoad, setShowDownload] = useState(false)
    const [imageModal, setImageModal] = useState(false)
    const [uri, setUri] = useState('')
    const [videoVisible, setVideoVisible] = useState(false)
    const [vidUri, setVidUri] = useState('')
    const toggleSwitch = () => setShowTime(previousState => !previousState);

    useEffect(() => {
        if (showDownLoad) {
            setTimeout(() => {
                setShowDownload(false)
            }, 3000);
        }
    }, [showDownLoad])

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

    return (
        <View style={styles.mainContainerStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                {props.item.type != 'text' && showDownLoad ?
                    <TouchableOpacity
                        onPress={() => { props.download(), setShowDownload(false) }}
                    >
                        <Image style={{ width: 50, height: 50, justifyContent: 'center' }} source={imagesFile.ic_DownLo} />
                    </TouchableOpacity> : null}
                <View>
                    <TouchableOpacity style={styles.subContainerStyle}
                        onPress={toggleSwitch}
                        onLongPress={() => { props.item.type != 'text' ? setShowDownload(true) : null }}
                    >
                        <View style={{ alignItems: 'flex-end' }}>
                            {props.item.type == 'image' ?
                                <TouchableOpacity
                                    onPress={() => { setImageModal(true), setUri(props?.item?.message) }}
                                    onLongPress={() => { props.item.type != 'text' ? setShowDownload(true) : null }}
                                >
                                    <Image style={styles.imageStyle} source={{ uri: props?.item?.message }} />
                                </TouchableOpacity>
                                :
                                props.item.type == 'video' ?
                                    <TouchableOpacity
                                        onPress={() => { setVideoVisible(true), setVidUri(props?.item?.message) }}
                                        onLongPress={() => { props.item.type != 'text' ? setShowDownload(true) : null }}
                                    >
                                        {/* <VideoPlayer
                                    pointerEvents={'none'}
                                    
                                    
                                        style={{ overflow: 'hidden', width: 250, height: 150, borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6 }}
                                        resizeMode='cover'
                                        video={{ uri: props?.item?.message }}
                                        fullScreenOnLongPress={true}
                                        
                                    // videoWidth={windowWidth}
                                    // videoHeight={390}
                                    // thumbnail={{ uri: 'https://picsum.photos/200/300' }}
                                    /> */}
                                        <View style={{ backgroundColor: Colors.black, width: 250, height: 150, borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image style={{ tintColor: 'white', height: 50, width: 50 }} source={imagesFile.ic_play} />
                                        </View>
                                    </TouchableOpacity> : props.item.type == 'file' ?
                                        <Text style={[styles.semibold_14_black, { paddingVertical: 5, paddingHorizontal: 16 }]} >DownloadFile.{props?.item?.message.split('.').pop()}</Text> :

                                        <Text style={[styles.semibold_14_black, { paddingVertical: 5, paddingHorizontal: 16 }]} >{props?.item?.message}</Text>
                            }
                        </View>
                    </TouchableOpacity>
                    {props.item.type == 'image' || props.item.type == 'video' ?
                        <View style={{ marginTop: 10, alignSelf: 'flex-end' }}>
                            <Text style={styles.semibold_10_black}>{moment(props?.item?.timestamp).format('hh:mm')}</Text>
                        </View> : null}
                    {showTime ?
                        <View style={{ marginTop: 5, alignSelf: 'flex-end' }}>
                            <Text style={styles.semibold_10_black}>{moment(props?.item?.timestamp).format('hh:mm')}</Text>
                        </View> : null}
                </View>
            </View>
            <ImageModal />
            <VideoModal visible={videoVisible} uri={vidUri} cancel={() => setVideoVisible(false)} />
        </View>
    )
}

export default ReceiverCard;

const styles = StyleSheet.create({
    mainContainerStyle: {
        marginHorizontal: 18,
        flex: 1,
        marginVertical: 9,
        alignItems: 'flex-end'
    },
    subContainerStyle: {
        backgroundColor: "rgba(59,34,248,0.1)",
        // paddingVertical: 5,
        // paddingHorizontal: 19,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        // borderBottomRightRadius: 22,
        borderTopLeftRadius: 6,
    },
    semibold_10_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black
    },
    imageStyle: {
        width: 250,
        height: 150,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6
    },
    semibold_10_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.white
    },
    downloadBtnView: {
        backgroundColor: Colors.blue,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5
    }
})