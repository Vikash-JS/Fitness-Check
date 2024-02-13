import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, Text, View, StyleSheet, Image, TextInput, FlatList, Platform, Keyboard, KeyboardAvoidingView, KeyboardEvent, DeviceEventEmitter } from 'react-native';
import MessageHeader from './MessageHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import MyStatusBar from '../../../../commonComponents/MyStatusBar';
import { Colors, data, Fonts } from '../../../../../utils/Constants';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import imagesFile from '../../../../../../assets/imagesFile';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { GenerateId, UploadAllFiles_To_s3Bucket } from '../../../../../apiManager/workout/index';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import RNFetchBlob, { RNFetchBlobConfig, RNFetchBlobSession } from 'rn-fetch-blob';
import SenderCard from './SenderCard';
import ReceiverCard from './ReceiverCard';
import { Toaster } from '../../../../commonComponents/Toaster';
import BottomSheetModal from './BottomSheetModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Loader from '../../../../commonComponents/Loader';
import { NotifyLocal } from '../../../../../notifications/general';


// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

var commonPath = ""
var MessageReference = ""
var ReceiverEndId
var senderId = '636bb612b1724ac305d98bf9'
var userId = ''
var NewRef
var MessageStatus = database().ref('status')
var SetSenderReceiver = database().ref('userChats')
var SetLastMessageRef = database().ref('chat')

const MessageScreen = () => {

    const { fs } = RNFetchBlob;
    const navigation = useNavigation()
    // const bottomTabHeight = useBottomTabBarHeight()
    const route = useRoute()
    const [messages, setMessages] = useState("");
    const [messageList, setMessageList] = useState([])
    const [currentUserId, setCurrentUserId] = useState('');
    const [receiverId, setReceiverId] = useState(route?.params?.trainerId)
    const [profileImage, setProfileImage] = useState(route?.params?.profileImg)
    const [firstName, setFirstName] = useState(route?.params?.firstName)
    const [lastName, setLastName] = useState(route?.params?.lastName)
    const [conditionalRender, setConditionalRender] = useState(false)
    const [chatRoomId, setChatRoomId] = useState('')
    const [newPath, setNewPath] = useState('')
    const [extData, setExtData] = useState(new Date())
    const [onlineStatus, setOnlineStatus] = useState('')
    const [trainerTimeStamp, setTrainerTimeStamp] = useState('')
    const [isOpenBottomSheet, setIsOpenBottomSheet] = useState(false)
    const [openDownloadSheet, setOpenDownloadSheet] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isFocus, setIsFocus] = useState(false)
    const [loader, setLoader] = useState(false)
    const [isFirst, setIsFirst] = useState(true)

    useEffect(() => {
        // getCurrentUser()
        get_Current_user()
        console.log("trainerId-----------", route?.params?.trainerId)
    }, [])

    const currentRouteName = route.name;

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', e => setKeyboardHeight(e.endCoordinates.height));
        const hideSubscription = Keyboard.addListener('keyboardWillHide', () => setKeyboardHeight(0));
        console.log("keyboardHeight========", keyboardHeight)
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        }
    }, [setKeyboardHeight, keyboardHeight]);

    const get_Generated_id = () => {
        let arr1 = [currentUserId, receiverId]
        var raw = JSON.stringify({
            "participantData": {
                "participantId": receiverId,
                "userModel": "TrainerUser"
            }
        });

        console.log("RowData=====", raw)
        GenerateId(raw).then((response) => {
            if (response.status == 200) {
                console.log("generatedId======", response)
                setChatRoomId(response.data._id)
                let commonChatId = response.data._id
                let key = response.data._id
                let obj1 = {}
                obj1[key] = response.data._id
                SetSenderReceiver.child(userId).set(obj1)
                SetSenderReceiver.child(receiverId).set(obj1)
                get_OnceMessages(response.data._id)
                Get_Set_UserStatus()
            }
        }).catch((error) => {
            console.log("generateErr======", error)
        })
    }

    const Get_Set_UserStatus = () => {
        MessageStatus.child(receiverId)
            .on('value', snapshot => {
                if (snapshot.val() != null) {
                    console.log("UserStatus========", snapshot.val()?.timestamp)
                    setOnlineStatus(snapshot.val()?.status)
                    setTrainerTimeStamp(snapshot.val()?.timestamp)
                }
            })
    }

    const get_Current_user = async () => {
        AsyncStorage.getItem('userDetail').then((value) => {
            let parseData = JSON.parse(value)
            userId = parseData._id
            setCurrentUserId(userId)
            get_Generated_id()
        })
    }

    // const get_OnceMessages = (chatId) => {
    //     let mesgArr = messageList
    //     let latestMessage = null; // Variable to store the latest message
    //     console.log("messageList========", messageList)
    //     commonPath = chatId
    //     setNewPath(commonPath)
    //     console.log("CommonPath========", commonPath)
    //     setLoader(true)
    //     MessageReference = database().ref("chatMessages").child(commonPath);
    //     // MessageReference
    //     //     .once('value')
    //     //     .then((snapshot) => {
    //     // ---------------Active Ref------------------------
    //     MessageReference.on('child_added', snapshot => {
    //         console.log('onListnerData============', snapshot.val())
    //         const newMessage = snapshot.val();

    //         mesgArr.push(snapshot.val())
    //         setMessageList(mesgArr)
    //         setExtData(new Date())

    //         // Update the latest message
    //         latestMessage = newMessage;

    //         // Notify only for the latest message
    //         if (latestMessage) {
    //             const data = {
    //                 title: "You have a new message",
    //                 message: latestMessage.message
    //             }
    //             NotifyLocal(latestMessage, data);
    //         }
    //     })
    //     // ---------------Active Ref------------------------
    //     // })


    //     return () => MessageReference.off('child_added', MessageReference);
    // }
    const get_OnceMessages = (chatId) => {
        let mesgArr = messageList;
        let latestMessage = null;
        console.log("messageList========", messageList);
        commonPath = chatId;
        setNewPath(commonPath);
        console.log("CommonPath========", commonPath);
        setLoader(true);
        MessageReference = database().ref("chatMessages").child(commonPath);

        MessageReference.on('child_added', snapshot => {
            console.log('onListnerData============', snapshot.val());
            const newMessage = snapshot.val();
            mesgArr.push(newMessage);
            setMessageList(mesgArr);
            setExtData(new Date());

            // Update the latest message
            latestMessage = newMessage;
        });

        // Send the notification outside the event, after all messages are processed
        return () => {
            MessageReference.off('child_added', MessageReference);
            if (latestMessage) {
                const data = {
                    title: "You have a new message",
                    message: latestMessage.message
                };
                NotifyLocal(latestMessage, data);
            }
        };
    }
    const chooseImage = (label) => {
        setIsOpenBottomSheet(false)
        setTimeout(() => {
            let options = {
                title: "choose photo",
                mediaType: label == 'image' ? 'photo' : 'video',
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
                    let date = new Date()
                    let timeStamp = moment().unix();

                    let fileName = timeStamp.toString()
                    if (label == 'image') {
                        data.append('file', {
                            name: fileName + '.png',
                            type: response?.assets[0]?.type,
                            uri:
                                Platform.OS === 'android' ? response?.assets[0]?.uri : response?.assets[0]?.uri.replace('file://', ''),
                        });
                    } else {
                        data.append('file', {
                            uri: Platform.OS === 'android' ? response?.assets[0]?.uri : response?.assets[0]?.uri.replace('file://', ''),
                            type: 'video/mp4',
                            name: `${Math.floor(date.getTime() + date.getSeconds() / 2)}.mp4`
                        });
                    }
                    console.log("updatedFile========", data)
                    uploadOnS3(data, label)
                }
            });
        }, 1000);
    }
    const selectOneFile = async (label) => {
        setIsOpenBottomSheet(false)
        setTimeout(async () => {
            //Opening Document Picker for selection of one file
            try {
                const res = await DocumentPicker.pick({
                    type: [DocumentPicker.types.allFiles],

                });
                //Printing the log realted to the file
                console.log('res : ' + JSON.stringify(res));
                let response = res
                console.log("response==========", response)
                var data = new FormData();
                data.append('file', {
                    name: response[0].name,
                    type: response[0].type,
                    uri:
                        Platform.OS === 'android' ? response[0].uri : response[0].uri.replace('file://', ''),
                    // uri: response[0].uri 
                });
                console.log("formData========", data)
                uploadOnS3(data, label)
                //Setting the state to show single file attributes
                //   setSingleFile(res);
            } catch (err) {
                //Handling any exception (If any)
                if (DocumentPicker.isCancel(err)) {
                    //If user canceled the document selection
                    // alert('Canceled from single doc picker');
                    console.log("cancelDoc============", err)
                } else {
                    //For Unknown Error
                    // alert('Unknown Error: ' + JSON.stringify(err));
                    console.log("cancelDoc============", JSON.stringify(err))
                    throw err;
                }
            }
        }, 1000);
    };

    const uploadOnS3 = (data, type) => {
        UploadAllFiles_To_s3Bucket(data).then((response) => {
            console.log("uploadVideoInit=========", response)
            if (response.status == 200) {
                console.log("uploadVideo=========", response)
                const key = MessageReference.push().key;
                // console.log("user key......", key, MessageReference)
                const timeStamp = new Date().getTime()
                const messageObj = { id: key, message: response.data.url, sendBy: currentUserId, type: type, timestamp: timeStamp }
                console.log("FinalMessage=======", messageObj)
                MessageReference.child(timeStamp.toString()).set(messageObj)
                SetLastMessageRef.child(commonPath).child('message').set({
                    message: response.data.url,
                    timestamp: timeStamp,
                    type: type,
                    sendBy: currentUserId,
                })
            }
        }).catch((error) => {
            console.log("errorWhile=====", error)
        })
    }

    const onSend = () => {
        if (messages.match(/^ *$/)) {
        } else {
            const key = MessageReference.push().key;
            // console.log("user key......", key, MessageReference)
            const timeStamp = new Date().getTime()
            const messageObj = { id: key, message: messages, sendBy: currentUserId, type: 'text', timestamp: timeStamp }
            console.log("FinalMessage=======", messageObj)
            MessageReference.child(timeStamp.toString()).set(messageObj)
            MessageReference = database().ref("chatMessages").child(commonPath);
            SetLastMessageRef.child(commonPath).child('message').set({
                message: messages,
                timestamp: timeStamp,
                type: 'text',
                sendBy: currentUserId,
            })
            setMessages('')
        }
    }

    const downloadFiles = (uri) => {
        const { config, fs } = RNFetchBlob;
        console.log("uri======", uri)
        let extension = uri.split('.').pop()
        console.log("fileExtension======", extension)
        let date = new Date()
        var fileDir;
        let configOptions;
        if (Platform.OS == 'ios') {
            fileDir = RNFetchBlob.fs.dirs.DocumentDir;
            configOptions = {
                fileCache: true,
                path: fileDir +
                    '/file_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    `.${extension}`,

                notification: true,
            }
            config(configOptions)
                .fetch('GET', uri)
                .then(res => {
                    // onResumeCall();
                    Toaster('File downloaded successfully');
                    setTimeout(() => {
                        // RNFetchBlob.ios.previewDocument('file://' + res.path());   //<---Property to display iOS option to save file
                        RNFetchBlob.ios.openDocument(res.data);                      //<---Property to display downloaded file on documaent viewer
                        // Alert.alert(CONSTANTS.APP_NAME,'File downloaded successfully');
                    }, 1000);

                })
                .catch(errorMessage => {
                    console.log("ErrorMsg====", errorMessage)
                });
        } else {
            // fileDir = RNFetchBlob.fs.dirs.downloadDir;
            fileDir = RNFetchBlob.fs.dirs.DCIMDir
            configOptions = {
                fileCache: false,
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    path: fileDir +
                        '/file_' +
                        Math.floor(date.getTime() + date.getSeconds() / 2) +
                        `.${extension}`,
                    description: 'Downloading xlsx...',
                },
            };
            config(configOptions)
                .fetch('GET', uri)
                .then(res => {
                    Toaster('File downloaded successfully');
                    setTimeout(() => {
                        RNFetchBlob.android.actionViewIntent(res.path());
                    }, 2000);
                })
                .catch((errorMessage, statusCode) => {
                    console.log("errirMsg=======", errorMessage)
                });
        }
    }

    const renderMessage = ({ item }) => (
        <View style={{ flex: 1 }}>
            {item?.sendBy == userId ?
                <ReceiverCard item={item}
                    download={() => downloadFiles(item.message)}
                // download={() => setOpenDownloadSheet(true)}
                />
                :
                <SenderCard item={item}
                    download={() => downloadFiles(item.message)}
                />
            }
        </View>
    )

    const Footer = () => {
        return (
            <View style={{ height: 0 }}></View>
        )
    }

    const onGoBack = () => {
        DeviceEventEmitter.emit('updateChat');
        navigation.goBack()
    }

    return (
        <>
            <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <SafeAreaView style={styles.headerView}>
                <View >
                    <MessageHeader
                        onlineStatus={onlineStatus}
                        trainerTimeStamp={trainerTimeStamp}
                        profileImage={profileImage}
                        firstName={firstName}
                        lastName={lastName}
                        onProfilePress={() => navigation.navigate('TrainerProfile', {
                            TrainerId: receiverId,
                        })}
                        onBackPress={() => onGoBack()} />
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={messageList}
                        renderItem={renderMessage}
                        ListFooterComponent={<Footer />}
                        extraData={extData}
                    />
                </View>
                <KeyboardAvoidingView
                    enabled={true}
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                    keyboardVerticalOffset={40}
                >


                    <View style={styles.inputMainVew}>
                        <TouchableOpacity style={{ marginLeft: 5, width: 20, height: 20, justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => setIsOpenBottomSheet(true)}
                        >
                            <Image source={imagesFile.ic_fileEmo} />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', marginLeft: 5, backgroundColor: Colors.ProfileDetail_Grey, alignItems: 'center', borderRadius: 16, height: 32, flex: 1, paddingHorizontal: 10 }}>
                            <TextInput
                                placeholder="Write a message…"
                                style={{ width: '100%', height: 32, borderRadius: 16, }}
                                value={messages}
                                onChangeText={(text) => setMessages(text)}
                            // onFocus={()=>setIsFocus(true)}
                            // onBlur={()=>setIsFocus(false)}
                            />
                        </View>

                        {messages != "" ?
                            <TouchableOpacity style={{ width: 60, height: 32, justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => onSend()}
                            >
                                <Text style={styles.semibold_14_black}>send</Text>
                            </TouchableOpacity> : null}
                    </View>

                </KeyboardAvoidingView>
                {isOpenBottomSheet ? <BottomSheetModal cancel={() => setIsOpenBottomSheet(false)} uploadVideo={() => chooseImage('video')} uploadGallery={() => chooseImage('image')} uploadFile={() => selectOneFile('file')} /> : null}
            </SafeAreaView>
        </>
    )
}

export default MessageScreen;

const styles = StyleSheet.create({
    headerView: {
        flex: 1,
        backgroundColor: Colors.white,
        marginBottom: 0
    },
    inputMainVew: {

        // backgroundColor:"red",
        height: 60,
        width: '100%',

        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingRight: 18,
        paddingLeft: 10,
        backgroundColor: Colors.white
    },
    semibold_14_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.black
    },
    semibold_14_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    },
    semibold_10_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black
    },
    semibold_10_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.white
    }
})