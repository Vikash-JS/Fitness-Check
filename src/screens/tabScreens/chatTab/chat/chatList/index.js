import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, FlatList,DeviceEventEmitter } from 'react-native';
import MyStatusBar from '../../../../commonComponents/MyStatusBar';
import { Colors, Fonts } from '../../../../../utils/Constants';
import imagesFile from '../../../../../../assets/imagesFile';
import SearchTab from '../../../../commonComponents/SearchTab';
import FlatListHeader from './FlatListHeader';
import ChatListCard from './ChatListCard';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Get_All_ChatList } from '../../../../../apiManager/workout/index';
import Loader from '../../../../commonComponents/Loader';
import database from '@react-native-firebase/database';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

var LastMessageRef = database().ref('chat')
let userId
const DATA = [{ id: 0 }]

const ChatListScreen = () => {
    const navigation = useNavigation()
    const bottomTabHeight = useBottomTabBarHeight()
    const [loader, setLoader] = useState(false)
    const [chatList, setChatList] = useState([])
    const [extraData, setExtraData] = useState(new Date())
    const [waitingList, setWaitingList] = useState([])
    useEffect(() => {
        DeviceEventEmitter.addListener('updateChat', () => getAllChats())
        // Get_userId()
        getAllChats()
    }, [])

    const pullToRefresh = () => {
        getAllChats()
    }
    const Get_userId = () => {
        AsyncStorage.getItem('userDetail').then((value) => {

            let parseData = JSON.parse(value)
            userId = parseData._id
            if (userId) {
                Get_Chat_List(userId)
            }
            console.log("UserDetail=========", userId)
        })
    }

    const getAllChats = () => {
        setLoader(true)
        
        let arr1 = []
        Get_All_ChatList().then((response) => {
            if (response.status == 200) {
                let rowData = response.data
                console.log("AllList===========", rowData)
                rowData.forEach(element => {
                    if (element.participant1) {
                        if (element.participant1.userModel == 'TrainerUser') {
                            element.participant1['roomId'] = element._id
                            arr1.push(element.participant1)
                        }
                    }
                    if (element.participant2) {
                        if (element.participant2.userModel == 'TrainerUser') {
                            element.participant2['roomId'] = element._id
                            arr1.push(element.participant2)
                        }
                    }
                });
                
                arr1.forEach(element => {
                    LastMessageRef.child(element.roomId)
                        .once('value')
                        .then((snapshot) => {
                            console.log("lastMesg=============",snapshot.val())
                            element['message'] = snapshot.val()?.message
                        })
                });
                // setChatList([])
                 setTimeout(() => {
                    console.log("updatedArr=======",arr1)
                    // setWaitingList(arr1)
                    const sortByDate = arr1 => {
                        const sorter = (a, b) => {
                            console.log("getLast",new Date(a?.message?.timestamp))
                            //  return new Date(a?.message?.timestamp).getTime() < new Date(b?.message?.timestamp).getTime();
                             return  new Date(a?.message?.timestamp).getTime() - new Date(b?.message?.timestamp).getTime()
                        }
                        arr1.sort(sorter);
                     };
                     sortByDate(arr1);
                    setChatList(arr1.reverse())
                    setLoader(false)
                }, 2000);

                console.log("chatListResp=======", response)
                // setExtraData(new Date())
            }
        }).catch((error) => {
            setLoader(false)
            console.log("chatlistErr=======", error)
        })
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('MessageScreen', { profileImg: item.participantId.profilePicture.url, firstName: item.participantId.firstName, lastName: item.participantId.lastName, trainerId: item.participantId._id })}
        >
            <ChatListCard item={item} />
        </TouchableOpacity>
    )

    const Footer = () => {
        return (
            <View style={{ height: bottomTabHeight }}></View>
        )
    }

    return (
        <>
            <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        bounces={true}
                        data={chatList}
                        renderItem={renderItem}
                        ListHeaderComponent={<FlatListHeader onPressBack={() => navigation.goBack()} />}
                        keyExtractor={item => item._id}
                        ListFooterComponent={<Footer />}
                        refreshing={false}
                        onRefresh={pullToRefresh}
                    // extraData={extraData}
                    />
                </View>
                {loader ? <Loader /> : null}
            </SafeAreaView>
        </>
    )
}

export default ChatListScreen;

const styles = StyleSheet.create({
    bold_32_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 32,
        color: Colors.black
    }
})