import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform, TouchableOpacity, PermissionsAndroid, Alert, Modal } from 'react-native';
import { Colors, Fonts } from '../../../../../utils/Constants';
import moment from 'moment';
import VideoPlayer from 'react-native-video-player';
import imagesFile from '../../../../../../assets/imagesFile';
import ImageViewer from 'react-native-image-zoom-viewer';
import VideoModal from './VideoModal';
import { Toaster } from '../../../../commonComponents/Toaster';
// import Pdf from 'react-native-pdf';
import RNFetchBlob from 'rn-fetch-blob';

const SenderCard = (props) => {
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

    function PdfModal(props) {
        return (
            <Modal visible={imageModal} transparent={true}>
                <View style={{ flex: 1 }}>
                    <Pdf
                        source={{ uri: pdfUrl, cache: true }}
                        onLoadComplete={(numberOfPages, filePath) => {
                            console.log(`Number of pages: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            console.log(`Current page: ${page}`);
                        }}
                    />
                    <Button title="Download PDF" onPress={() => downloadPdf(pdfUrl)} />
                </View>
            </Modal>

        )
    }


    const verifyPlatform = async (resp) => {
        if (Platform.OS === 'ios') {
            downloadExportPdf(resp);
        } else {
            try {
                if (Platform.OS === 'android' && Platform.Version < 33) {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
                    if (
                        granted !== "granted"
                    ) {
                        // setLoader(false);
                        Toaster('storage_permission required to export ');
                    } else {
                        console.log('Storage Permission Granted.');
                        downloadExportPdf(resp);
                    }
                } else {
                    console.log('Storage Permission Granted.');
                    downloadExportPdf(resp);
                }
            } catch (err) {
                //To handle permission related issue
                console.log('error', err);
                // setLoader(false);
            }
        }
    };

    const downloadExportPdf = (pdfUrl) => {
        const pdfFileName = 'pdfFromMfmChat.pdf'; // The desired file name
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'pdf',
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: pdfFileName,
                description: 'Downloading PDF',
                mime: 'application/pdf',
                // path: RNFetchBlob.fs.dirs.DownloadDir + `/${pdfFileName}`,
                path: RNFetchBlob.fs.dirs.DownloadDir + '/' + pdfFileName,

            },
        })
            .fetch('GET', pdfUrl)
            .then((res) => {
                Toaster('PDF downloaded  successfully');
                console.log('PDF downloaded successfully');
            })
            .catch((error) => {
                console.error('Error downloading PDF:', error);
            });
    };
    return (
        <View style={styles.mainContainer}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <TouchableOpacity style={[styles.subContainerStyle, {
                        backgroundColor: props.item.type == 'image' || Colors.blue
                    }]}
                        onPress={toggleSwitch}
                        onLongPress={() => { props.item.type != 'text' ? setShowDownload(true) : null }}
                        on
                    >
                        <View>
                            {props.item.type == 'image' ?
                                <>
                                    <TouchableOpacity
                                        onPress={() => { setImageModal(true), setUri(props?.item?.message) }}
                                        onLongPress={() => { props.item.type != 'text' ? setShowDownload(true) : null }}
                                    >
                                        <Image style={styles.imageStyle} source={{ uri: props?.item?.message }} />
                                    </TouchableOpacity>

                                </>
                                : props.item.type == 'video' ?
                                    // <VideoPlayer
                                    //     fullScreenOnLongPress={true}
                                    //     disableFullscreen={false}
                                    //     // controls={true}
                                    //     style={{ overflow: 'hidden', width: 250, height: 150, borderTopRightRadius: 6, borderBottomLeftRadius: 6, borderBottomRightRadius: 6 }}
                                    //     resizeMode='cover'
                                    //     video={{ uri: props?.item?.message }}
                                    // // videoWidth={windowWidth}
                                    // // videoHeight={390}
                                    // // thumbnail={{ uri: 'https://picsum.photos/200/300' }}
                                    // /> 
                                    <TouchableOpacity
                                        onPress={() => { setVideoVisible(true), setVidUri(props?.item?.message) }}
                                        onLongPress={() => { props.item.type != 'text' ? setShowDownload(true) : null }}
                                    >
                                        <View style={{ backgroundColor: Colors.black, width: 250, height: 150, borderTopLeftRadius: 6, borderTopRightRadius: 6, borderBottomLeftRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image style={{ tintColor: 'white', height: 50, width: 50 }} source={imagesFile.ic_play} />
                                        </View>

                                    </TouchableOpacity>
                                    : props.item.type == 'file' ?
                                        <Text style={[styles.semibold_14_white, { paddingVertical: 5, paddingHorizontal: 16 }]}>{props?.item?.type}</Text> :
                                        props.item.type == 'application' ? <>
                                            <TouchableOpacity onPress={() => verifyPlatform(props?.item?.message)}>
                                                {props?.item?.message ? <View style={{ height: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', }}>
                                                    <View style={{}}>
                                                        <Text style={[styles.semibold_14_white, { paddingVertical: 5, paddingHorizontal: 16 }]} >{props?.item?.message?.split('/')?.pop()?.substr(-12)}</Text>
                                                    </View>
                                                    <View style={{ marginHorizontal: 10 }}>
                                                        <Image style={{ tintColor: 'white', height: 20, width: 22, marginRight: 0 }} source={imagesFile.ic_pdf} />
                                                        <Text style={[styles.semibold_14_white, { fontSize: 14, paddingTop: 4 }]} >{'PDF'}</Text>
                                                    </View>
                                                </View> : <Text style={[styles.semibold_14_white, { paddingVertical: 5, paddingHorizontal: 16 }]} >{props?.item?.message}</Text>}
                                            </TouchableOpacity>
                                        </> :
                                            <Text style={[styles.semibold_14_white, { paddingVertical: 5, paddingHorizontal: 16 }]} >{props?.item?.message}</Text>}
                        </View>
                    </TouchableOpacity>
                    {showTime ?
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.semibold_10_black}>{moment(props?.item?.timestamp).format('hh:mm')}</Text>
                        </View> : null}
                    {props.item.type == 'image' ?
                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.semibold_10_black}>{moment(props?.item?.timestamp).format('hh:mm')}</Text>
                        </View> : null}
                </View>

                {props.item.type != 'text' && showDownLoad ?
                    <TouchableOpacity
                        onPress={() => { props.download(), setShowDownload(false) }}
                    >
                        <Image style={{ width: 50, height: 50, justifyContent: 'center' }} source={imagesFile.ic_DownLo} />
                    </TouchableOpacity> : null}
            </View>
            <VideoModal visible={videoVisible} uri={vidUri} cancel={() => setVideoVisible(false)} />
            <ImageModal />
            {/* <PdfModal /> */}
        </View>
    )
}

export default SenderCard;

const styles = StyleSheet.create({
    mainContainer: {
        marginHorizontal: 18,
        marginVertical: 9,
        alignItems: 'flex-start',
    },
    semibold_10_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.white
    },
    subContainerStyle: {
        backgroundColor: Colors.blue,
        // paddingVertical: 5,
        // paddingHorizontal: 19,
        // borderTopLeftRadius: 12,
        borderBottomLeftRadius: 6,
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6
    },
    imageStyle: {
        width: 250,
        height: 150,
        borderTopRightRadius: 6,
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6
    },
    downloadBtnView: {
        backgroundColor: Colors.white,
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 5
    },
    semibold_10_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black
    },
    semibold_14_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    },
    semibold_10_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.white
    }
})