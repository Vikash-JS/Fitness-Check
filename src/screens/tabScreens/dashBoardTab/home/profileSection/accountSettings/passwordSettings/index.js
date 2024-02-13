import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View, TextInput, TouchableOpacity, Image, } from 'react-native';
import { Reset_Password_Api } from '../../../../../../../apiManager/profile/index';
import imagesFile from '../../../../../../../../assets/imagesFile';
import AppHeader from '../../../../../../commonComponents/AppHeader';
import { PasswordSettingConstants } from '../../ProfileConstants';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';
import { Toaster } from '../../../../../../commonComponents/Toaster';
import Loader from '../../../../../../commonComponents/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from '../../../../../../auth/authConstants';
import InputBox from '../../../../../../commonComponents/InputBox';
import MyStatusBar from '../../../../../../commonComponents/MyStatusBar';

const ResetPassword = () => {
    const navigation = useNavigation()
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loader, setLoader] = useState(false);
    const [userId, setUserId] = useState('');
    const [userData, setUserData] = useState({});



    useEffect(() => {
        AsyncStorage.getItem(LoginConstants.USER_DETAIL).then((value) => {
            let parseData = JSON.parse(value)
            console.log("UserDetail1======", parseData)
            setUserData(parseData)
            console.log("userId===========", parseData._id)
            setUserId(parseData._id)

        })
    }, [])

    const checkValidation = () => {
        if (currentPassword == '') {
            Toaster("Current password is empty!")
        } else if (newPassword == '') {
            Toaster("New Password  is empty!")
        } else if (confirmPassword == '') {
            Toaster("confirm Password  is empty!")
        } else if (confirmPassword != newPassword) {
            Toaster("Confirm Password is different from New Password!")
        } else {
            resetPassword()
        }
    }

    const resetPassword = () => {

        var formdata = new FormData();
        formdata.append("password", newPassword);
        // var raw = JSON.stringify({ "password": newPassword });

        setLoader(true)
        Reset_Password_Api(userId, formdata).then((response) => {
            if (response.status == 200) {
                console.log("resetPassRes======", response)
                setLoader(false)
                Toaster(response.message)
                navigation.goBack()
            }
        }).catch((error) => {
            setLoader(false)
            console.log("ResetPasswordErr=========", error)
        })
    }

    return (
        <>
            <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{
                    flex: 1, backgroundColor: Colors.white,
                }}>
                    <View>
                        <AppHeader Heading={PasswordSettingConstants.PASSWORD_SETTINGS} onPress={() => navigation.goBack()} />
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: Colors.lightGrey, marginTop: 20 }}>
                        <View style={styles.placeholder}>
                            <InputBox
                                value={currentPassword}
                                placeholder={"Enter Current Password"}
                                secureTextEntry={true}
                                onChangeText={(text) => setCurrentPassword(text)}
                                style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', height: 40, }}
                            />
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: Colors.lightGrey, marginTop: 10 }}>
                        <View style={{ marginTop: 20 }}>
                            <InputBox
                                value={newPassword}
                                placeholder={"New Password"}
                                secureTextEntry={true}
                                onChangeText={(text) => setNewPassword(text)}
                                style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', height: 40, }}
                            />
                        </View>
                    </View>
                    <View style={{ borderBottomWidth: 0.5, borderBottomColor: Colors.lightGrey, marginTop: 10 }}>
                        <View style={{ marginTop: 20 }}>
                            <InputBox
                                value={confirmPassword}
                                placeholder={"Confirm New Password"}
                                onChangeText={(text) => setConfirmPassword(text)}
                                secureTextEntry={true}
                                style={{ borderBottomWidth: 1, borderBottomColor: 'lightgrey', height: 40, }}
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button}
                        onPress={() => checkValidation()}
                    >
                        <Text style={styles.semibold_14_white}>{PasswordSettingConstants.DONE}</Text>
                    </TouchableOpacity>
                </View>
                {loader ? <Loader /> : null}
            </SafeAreaView>
        </>
    );
};



export default ResetPassword;