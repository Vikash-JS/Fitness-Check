import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Platform, PermissionsAndroid } from 'react-native';
import AppHeader from '../../../../../commonComponents/AppHeader';

import FlatListHeader from './FlatListHeader';
import PhotoCard from './PhotoCard';
import { Get_Photo_Api, Upload_Image } from '../../../../../../apiManager/mfmJourney/index';
import Loader from '../../../../../commonComponents/Loader';
import { ProgressPhotoConstants } from '../mfmJourneyConstants';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import OptionMenu from './OptionMenu';
import { FloatingAction } from "react-native-floating-action";
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Toaster } from '../../../../../commonComponents/Toaster';
import moment from 'moment';

const DATA = [{ id: 0 }]
const actions = [
    {
        text: "Gallery(Front)",
        //   icon: require("./images/ic_accessibility_white.png"),
        name: "Gallery_Front",
        position: 1
    },
    {
        text: "Gallery(Back)",
        //   icon: require("./images/ic_language_white.png"),
        name: "Gallery_Back",
        position: 2
    },
    {
        text: "Camera(Front)",
        //   icon: require("./images/ic_room_white.png"),
        name: "Camera_Front",
        position: 3
    },
    {
        text: "Camera(Back)",
        //   icon: require("./images/ic_videocam_white.png"),
        name: "Camera_Back",
        position: 4
    },
    {
        text: "Camera(Side)",
        //   icon: require("./images/ic_room_white.png"),
        name: "Camera_Side",
        position: 5
    },
    {
        text: "Gallery(Side)",
        //   icon: require("./images/ic_videocam_white.png"),
        name: "Gallery_Side",
        position: 6
    }
];
const ProgressPhotoScreen = () => {

    const [allPhotos, setAllPhotos] = useState([])
    const [loader, setLoader] = useState(false)
    const [uploadOption, setUploadOption] = useState('')
    const [extraData, setExtraData] = useState(new Date())
    useEffect(() => {
        getPhotos()
    }, [])

    const getPhotos = () => {
        setLoader(true)
        Get_Photo_Api().then((response) => {
            if (response.status == 200) {
                setLoader(false)
                console.log("photos======", response)
                setAllPhotos(response.data.photos)
                setExtraData(new Date())
            }
        }).catch((error) => {
            setLoader(false)
            console.log("errorGetPh=======", error)
        })
    }

    const chooseImage = (label) => {
        let options = {
            title: "choose photo",
            mediaType: 'photo',
            allowsEditing: true,

        };

        launchImageLibrary(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };
                console.log('response======', JSON.stringify(response));

                var data = new FormData();
                let timeStamp = moment().unix();

                let fileName = timeStamp.toString()
                data.append('label', label)
                data.append('progressPic', {
                    name: fileName + '.png',
                    type: response?.assets[0]?.type,
                    uri:
                        Platform.OS === 'android' ? response?.assets[0]?.uri : response?.assets[0]?.uri.replace('file://', ''),
                });
                Upload_Images_Api(data)
            }
        });

    }

    const openCamera = (label) => {
        let options = {
            title: "choose photo",
            mediaType: 'photo',
            allowsEditing: true,
        };
        launchCamera(options, async (response) => {
            console.log('Response = ', response);
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: "App Camera Permission",
                        message: "App needs access to your camera ",
                        buttonNeutral: "Ask Me Later",
                        buttonNegative: "Cancel",
                        buttonPositive: "OK"
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                        alert(response.customButton);
                    } else {
                        const source = { uri: response.uri };
                        console.log('response======', JSON.stringify(response));
                        var data = new FormData();
                        let timeStamp = moment().unix();

                        let fileName = timeStamp.toString()
                        data.append('label', label)
                        data.append('progressPic', {
                            name: fileName + '.png',
                            type: response?.assets[0]?.type,
                            uri:
                                Platform.OS === 'android' ? response?.assets[0]?.uri : response?.assets[0]?.uri.replace('file://', ''),
                        });
                        Upload_Images_Api(data)
                    }
                } else {
                    console.log("Camera permission denied");
                }
            } catch (err) {
                console.warn(err);
            }

        });
    }

    const Upload_Images_Api = (data) => {
        setLoader(true)
        console.log(data, 'data')
        // return
        Upload_Image(data).then((response) => {
            if (response.status == 200) {
                Toaster(response.message)
                getPhotos()
                setUploadOption('')
                setLoader(false)
                console.log("uploadResp=======", response)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("uploadImageErr====", error)
        })
    }

    const renderItem = ({ item }) => (
        <PhotoCard item={item} />

    )
    const Footer = () => {
        return (
            <View style={{ height: 80 }}></View>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ flex: 1 }}>

                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={allPhotos}
                    renderItem={renderItem}
                    ListHeaderComponent={<FlatListHeader />}
                    keyExtractor={item => item.id}
                    extraData={extraData}
                    ListFooterComponent={<Footer />}
                />

            </View>
            <View style={{ position: 'absolute', alignSelf: 'flex-end', bottom: '10%' }}>
                <FloatingAction
                    actions={actions}
                    onPressItem={name => {
                        console.log("selected button====", name);
                        if (name == "Gallery_Front") {
                            // setUploadOption('Front')
                            chooseImage("Front")
                        } else if (name == "Gallery_Back") {
                            setUploadOption('Back')
                            chooseImage("Back")
                        } else if (name == "Camera_Front") {
                            setUploadOption("Front")
                            openCamera("Front")
                        } else if (name == "Camera_Back") {
                            setUploadOption("Back")
                            openCamera("Back")
                        } else if (name == "Camera_Side") {
                            setUploadOption("Side")
                            openCamera("Side")
                        } else if (name == 'Gallery_Side') {
                            setUploadOption("Side")
                            chooseImage("Side")
                        }
                    }}
                />
            </View>
            {loader ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default ProgressPhotoScreen;