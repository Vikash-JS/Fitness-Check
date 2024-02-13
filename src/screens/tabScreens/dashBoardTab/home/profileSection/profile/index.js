import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, Text, Image, ScrollView, TouchableOpacity, DeviceEventEmitter } from 'react-native';
import { styles } from './styles';
import ProfileHeader from './ProfileHeader';
import imagesFile from '../../../../../../../assets/imagesFile';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../../../../../utils/Constants';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import { MyProfileConstants } from '../ProfileConstants';
import CommonProfileTab from './CommonProfileTab';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from '../../../../../auth/authConstants';
import { Get_Following_Count } from '../../../../../../apiManager/profile';
import Loader from '../../../../../commonComponents/Loader';

const MyProfille = () => {
    const navigation = useNavigation()
    const [userData, setUserData] = useState({})
    const [followingCount, setFollowingCount] = useState('')
    const [communityCount, setCommunityCount] = useState('')
    const [loader, setLoader] = useState(false)

    useEffect(() => {
        DeviceEventEmitter.addListener('updateProfile', () => callBack())
        DeviceEventEmitter.addListener('updateFollower', () => getFollowingCount())
        // AsyncStorage.getItem(LoginConstants.USER_DETAIL).then((value) => {
        //     let parseData = JSON.parse(value)
        //     console.log("UserDetail1======", parseData)
        //     setUserData(parseData)
        // })
        callBack()
        getFollowingCount()
        // setTimeout(() => {
        //     getFollowing_Community()
        // }, 500);

    }, [])

    const callBack = async () => {
        await AsyncStorage.getItem(LoginConstants.USER_DETAIL).then((value) => {
            let parseData = JSON.parse(value)
            console.log("UserDetail1======", parseData)
            setUserData(parseData)
        })
    }
    const getFollowing_Community = () => {
        AsyncStorage.getItem(LoginConstants.FOLLOWING).then((value) => {
            console.log("UserFollower======", value)
            setFollowingCount(value)
        })
        AsyncStorage.getItem(LoginConstants.COMMUNITY).then((value) => {
            console.log("UserCommunity======", value)
            setCommunityCount(value)
        })
    }

    const getFollowingCount = () => {
        setLoader(true)
        Get_Following_Count().then((response) => {
            console.log(response, '-=-=-===-=')
            if (response.status == 200) {
                setLoader(false)
                // console.log('FollowingCount========', response.data?.client)
                setFollowingCount(response.data?.follow)
                setCommunityCount(response.data?.community)
            } else {
                setLoader(false)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("followingErr===", error)
        })
    }

    return (
        <>
            <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
                    <View>
                        <ProfileHeader goBack={() => navigation.goBack()} Heading={MyProfileConstants.PROFILE} image={imagesFile.ic_back} />
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={styles.profileImgContainer}>
                            <Image style={{ width: 88, height: 88, borderRadius: 44 }} source={userData?.profilePicture?.url != null ? { uri: userData?.profilePicture?.url } : imagesFile.ic_imgPlaceholder} />
                        </View>
                        <View style={{ marginTop: 19 }}>
                            <Text style={styles.bold_16_black}>{userData?.fullName}</Text>
                        </View>
                        <View style={{ marginTop: 5 }}>
                            <Text style={styles.semiBold_12_opacity}>{userData?.email}</Text>
                        </View>
                        <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                                onPress={() => followingCount != "0" ? navigation.navigate('FollowingScreen') : null}
                            >
                                <View>
                                    <Text style={styles.bold_20_black}>{followingCount}</Text>
                                </View>
                                <View style={{ marginTop: 3 }}>
                                    <Text style={styles.semibold_10_opacity}>{MyProfileConstants.FOLLOWING}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: 21.5, height: 16, borderWidth: 0.5, borderColor: '#333333' }}></View>
                            <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}
                                // onPress={() => navigation.navigate('CommunityHomeScreen')}
                                onPress={() => navigation.jumpTo('CommunityTab')}
                            >
                                <View>
                                    <Text style={styles.bold_20_black}>{communityCount}</Text>
                                </View>
                                <View style={{ marginTop: 3 }}>
                                    <Text style={styles.semibold_10_opacity}>{MyProfileConstants.COMMUNITIES}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{ marginTop: 20, marginHorizontal: 18 }}>
                        <View>
                            <Text style={styles.bold_12_opacity}>{MyProfileConstants.ACCOUNT_SETTING}</Text>
                        </View>
                        <View style={{ marginTop: 12 }}>
                            <CommonProfileTab onPress={() => navigation.navigate('ProfileDetailScreen')} image={imagesFile.ic_basicdetail} TabName={MyProfileConstants.BASIC_DETAIL} />
                        </View>
                        <View style={{ marginTop: 14 }}
                        >
                            <CommonProfileTab onPress={() => navigation.navigate('GoalsPreferernceScreen')} image={imagesFile.ic_pg} TabName={MyProfileConstants.GOAL_PREFERENCE} />
                        </View>
                        <View style={{ marginTop: 14 }}>
                            <CommonProfileTab onPress={() => navigation.navigate('ParqScreen')} image={imagesFile.ic_par} TabName={MyProfileConstants.PARQ_DETAIL} />
                        </View>
                        <View style={{ marginTop: 14 }}>
                            <CommonProfileTab image={imagesFile.ic_repass} TabName={MyProfileConstants.PASSWORD_SETTINGS} onPress={() => navigation.navigate('ResetPassword')} />
                        </View>
                    </View>
                    <View style={{ height: 80 }}></View>
                </ScrollView>
                {loader ? <Loader /> : null}
            </SafeAreaView>
        </>
    )
}

export default MyProfille;