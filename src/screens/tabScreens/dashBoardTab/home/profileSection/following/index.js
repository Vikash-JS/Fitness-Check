import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, FlatList, Alert, DeviceEventEmitter } from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import FollowingCard from './FollowingCard';
import FlatListHeader from './FlatListHeader';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import { Get_Following_List, unFollowTrainer } from '../../../../../../apiManager/profile/index';
import Loader from '../../../../../commonComponents/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from '../../../../../auth/authConstants';
import { Toaster } from '../../../../../commonComponents/Toaster';

const FollowingScreen = () => {
    const [followingList, setFollowingList] = useState([])
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        getFollowingList()
    }, [])

    const getFollowingList = () => {
        setLoader(true)
        Get_Following_List().then((response) => {
            if (response.status == 200) {
                setLoader(false)
                console.log('FollowingResp========', response)
                setFollowingList(response.data.follow)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("followingErr===", error)
        })
    }

    const getFollowCount = () => {
        AsyncStorage.getItem(LoginConstants.FOLLOWING).then((value) => {
            console.log("UserFollower======", value)
            let convertNumber = value * 1
            convertNumber = convertNumber - 1
            let updateNumber = convertNumber.toString()
            console.log("formatesNumber======", convertNumber - 1)

            AsyncStorage.setItem(LoginConstants.FOLLOWING, updateNumber)
            DeviceEventEmitter.emit('updateFollower')
        })
    }


    const onUnfollowTrainer = (id, index) => {
        console.log("Trainerid========", id)
        let arr1 = followingList
        arr1.splice(index, 1)
        setFollowingList([...arr1])
        setLoader(true)
        unFollowTrainer(id).then((response) => {
            if (response.status == 200) {
                setLoader(false)
                Toaster(response.message)
                getFollowCount()
                console.log("unFollowResponse=====", response)
            }

        }).catch((error) => {
            setLoader(false)
            console.log("unFollowErr=======", error)
        })
    }

    const renderItem = ({ item, index }) => (
        <FollowingCard onPress={(id) => onUnfollowTrainer(id, index)} item={item} />
    )
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={followingList}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<FlatListHeader />}
                />
            </View>
            {loader ? <Loader /> : null}
        </SafeAreaView>
    )
}

export default FollowingScreen;