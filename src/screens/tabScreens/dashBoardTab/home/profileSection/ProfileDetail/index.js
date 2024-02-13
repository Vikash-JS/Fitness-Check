import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, ScrollView, Image, TouchableOpacity, Alert, DeviceEventEmitter, Platform, PermissionsAndroid } from 'react-native';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import ProfileHeader from '../profile/ProfileHeader';
import { ProfileDetialConstants } from '../ProfileConstants';
import imagesFile from '../../../../../../../assets/imagesFile';
import { useNavigation } from '@react-navigation/native';
import { CommonInput, CommonHeading } from './CommonInput';
import { styles } from './styles';
import { Profile_Detail_Api, UpdateProfile, UpdateProilePhoto, Remove_Profile_Picture } from '../../../../../../apiManager/profile/index';
import Loader from '../../../../../commonComponents/Loader';
import moment from 'moment';
import SingleButton from '../../../../../commonComponents/SingleButton';
import { Toaster } from '../../../../../commonComponents/Toaster';
import DatePicker from 'react-native-date-picker';
import ImagePicker, { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ChooseImageMenu from '../../../../../commonComponents/ChooseImageMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginConstants } from '../../../../../auth/authConstants';

const ProfileDetailScreen = (props) => {
    const navigation = useNavigation();
    const [profilePicture, setProfilePicture] = useState('')
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [countryCode, setCountryCode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [gender, setGender] = useState("")
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [occupation, setOccupation] = useState("")
    const [timing, setTiming] = useState("")
    const [facebookLink, setFacebookLink] = useState("")
    const [instagramLink, setInstagramLink] = useState("")
    const [linkedInLink, setLinkedInLink] = useState("")
    const [twitterLink, setTwitterLink] = useState("")
    const [loader, setLoader] = useState(false)
    const [userDetail, setUserDetail] = useState({})
    const [isEditable, setEditable] = useState(false)
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [openBottomSheet, setOpenBottomSheet] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)

    useEffect(() => {
        UserDetial()
    }, [])

    useEffect(() => {
        console.log("updatedDate=======", date)
    }, [date])
    const deleteProfilePic = () => {
        setLoader(true)
        Remove_Profile_Picture().then((response) => {
            if (response.status == 200) {
                AsyncStorage.setItem(LoginConstants.USER_DETAIL, JSON.stringify(response.data.client))
                setProfilePicture('')
                DeviceEventEmitter.emit('updateProfile');
                setLoader(false)
            }
        }).catch((error) => {
            console.log("removeProErr========", error)
            setLoader(false)
        })
    }

    const UserDetial = () => {
        setLoader(true)
        Profile_Detail_Api().then((response) => {
            if (response.status == 200) {
                console.log("userDetailResp=====", response.data.client)
                setUserDetail(response.data)
                setProfilePicture(response?.data?.client?.profilePicture?.url)
                setName(response?.data?.client?.fullName)
                setEmail(response?.data?.client?.email)
                setPhoneNumber((response?.data?.client?.mobileNumber || '').toString())
                setGender(response?.data?.client?.gender)
                let unformattedDate = response?.data?.client?.dateOfBirth
                let formatting = moment(unformattedDate).format("DD-MM-YYYY")

                const newDate = new Date(unformattedDate)
                console.log("updatedDateNew=======", newDate)
                setDate(newDate)
                setDateOfBirth(new Date(formatting))

                setAddress(response?.data?.client?.address)
                setCity(response?.data?.client?.city)
                setState(response?.data?.client?.state)
                setCountry(response?.data?.client?.country)
                setTiming(response?.data?.client?.jobTiming)
                setOccupation(response?.data?.client?.profession)
                setFacebookLink(response?.data?.client?.fbProfileLink)
                setLinkedInLink(response?.data?.client?.linkedInProfileLink)
                setInstagramLink(response?.data?.client?.igProfileLink)
                setTwitterLink(response?.data?.client?.twitterProfileLink)
                setLoader(false)
            }
        }).catch((error) => {
            console.log("userDetailErrr========", error)
            setLoader(false)
        })
    }

    const chooseImage = () => {
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

                let data = new FormData();
                let timeStamp = moment().unix();

                let fileName = timeStamp.toString()
                data.append('profilePicture',
                    Platform.OS === 'android' ? response?.assets[0]?.uri : response?.assets[0]?.uri.replace('file://', '')
                )
                data.append('profilePicture', {
                    name: fileName + '.png',
                    // name: fileName ,
                    type: response?.assets[0]?.type,
                    uri:
                        Platform.OS === 'android' ? response?.assets[0]?.uri : response?.assets[0]?.uri.replace('file://', ''),
                });
                update_profile_photo(data)
            }
        });

    }

    const openCamera = async () => {

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
                console.log("Camera permission given");
                launchCamera(options, (response) => {
                    console.log('Response = ', response);

                    if (response.didCancel) {
                        console.log('User cancelled image picker');
                    } else if (response.error) {
                        console.log('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                        console.log('User tapped custom button: ', response.customButton);
                        alert(response.customButton);
                    } else {
                        const source = { uri: response.uri };
                        console.log('response======', JSON.stringify(response?.assets[0]?.uri));

                        let timeStamp = moment().unix();
                        console.log("timeStamp=========", timeStamp.toString())
                        let fileName = timeStamp.toString()

                        let data = new FormData();
                        data.append('profilePicture', {
                            name: fileName + '.png',
                            // name: fileName ,
                            type: response?.assets[0]?.type,
                            uri:
                                Platform.OS === 'android' ? response?.assets[0]?.uri : response?.assets[0]?.uri.replace('file://', ''),
                        });

                        update_profile_photo(data)

                    }
                });

            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
        console.log("yahaa ***************")
        let options = {
            title: "choose photo",
            mediaType: 'photo',
            allowsEditing: true,
        };


    }

    const update_profile_photo = (newFile) => {
        console.log("FileUpdated========", JSON.stringify(newFile))

        setLoader(true)
        UpdateProilePhoto(newFile).then(async (response) => {
            console.log("uploadPhotoRes========", JSON.stringify(response))
            if (response.status == 200) {
                Toaster(response.message)
                await AsyncStorage.setItem(LoginConstants.USER_DETAIL, JSON.stringify(response.data.client))
                setProfilePicture(response.data.client.profilePicture.url)
                setLoader(false)
                setTimeout(() => {
                    DeviceEventEmitter.emit('updateProfile');
                }, 1000);

            }
        }).catch((error) => {
            console.log("uploadPhotoerr========", error)
            setLoader(false)
        })
    }

    const selectGender = (gender) => {
        setGender(gender)
    }
    const Validation = () => {
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const phoneRegex = /^\d{10}$/;
        const cleanedPhoneNumber = phoneNumber.replace(/\D/g, '');
        if (profilePicture == "") {
            Toaster("Please Select Profile Picture")
        } else if (name == "" || name.match(/^ *$/)) {
            Toaster("Please Enter Name")
        } else if (email == "" || email.match(/^ *$/)) {
            Toaster("Please Enter Email")
        } else if (reg.test(email)
            === false) {
            Toaster(SignupConstants.VALIDEMAIL_VALIDATION);
        }
        else if (phoneNumber == "" || phoneNumber?.match(/^ *$/)) {
            Toaster("Please Enter Phone Number ")
        }
        else if (phoneRegex.test(cleanedPhoneNumber) === false) {
            Toaster("Please Enter Valid Phone No.");
        }
        else if (gender == "") {
            Toaster("Please Select Gender")
        } else if (date == "") {
            Toaster("Please Select Birth Date")
        } else if (address == "" || address?.match(/^ *$/)) {
            Toaster("Please Enter Address")
        } else if (city == "") {
            Toaster("Please Enter City")
        } else if (state == "" || state?.match(/^ *$/)) {
            Toaster("Please Enter State")
        } else if (country == "" || country?.match(/^ *$/)) {
            Toaster("Please Enter Country")
        } else if (occupation == "" || occupation?.match(/^ *$/)) {
            Toaster("Please Enter Occupation")
        } else if (timing == "" || timing?.match(/^ *$/)) {
            Toaster("Please Select timing")
        }
        else {
            UpdateProfileApi()
        }
    }

    const UpdateProfileApi = () => {
        let newDate = new Date(date)
        let updateDate = moment(newDate).format('YYYY-MM-DD')
        console.log("latestDate=======", updateDate)
        let data = JSON.stringify({
            "fullName": name,
            "mobileNumber": phoneNumber,
            "gender": gender,
            "dateOfBirth": updateDate,
            "address": address,
            "city": city,
            "state": state,
            "country": country,
            "fbProfileLink": facebookLink,
            "linkedInProfileLink": linkedInLink,
            "twitterProfileLink": twitterLink,
            "igProfileLink": instagramLink,
            "isEmail": true,
            "profession": occupation,
            "jobTiming": timing,
        });

        setLoader(true)
        UpdateProfile(data).then((response) => {
            console.log('updatedProfileResp========', response)
            if (response.status == 200) {
                Toaster(response.message)
                setEditable(false)
                setLoader(false)
                AsyncStorage.setItem(LoginConstants.USER_DETAIL, JSON.stringify(response.data.clientDetail))
                DeviceEventEmitter.emit('updateProfile');
            }

        }).catch((error) => {
            setEditable(false)
            setLoader(false)
            console.log("updateProfileErr======", error)
        })
    }

    const onGoBack = () => {

        navigation.goBack()

    }
    const toggleSwitch1 = () => {
        setIsUpdate(true)
        if (isEditable == false) {
            setEditable(true)
        } else {
            setEditable(false)
            Validation()
        }
    };

    return (
        <>
            <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <ScrollView style={{ flex: 1 }}>
                    <ProfileHeader isEditable={isEditable} goBack={() => onGoBack()} onPress={() => toggleSwitch1()} image1={imagesFile.ic_edit} image2={imagesFile.ic_blueTick} image={imagesFile.ic_back} Heading={ProfileDetialConstants.BASIC_DETAILS} />
                    <View style={{ marginHorizontal: 18, }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
                            <View style={{ width: 44, height: 44, borderRadius: 22 }}>
                                <Image style={{ borderRadius: 22, width: 44, height: 44 }} source={profilePicture ? { uri: profilePicture } : imagesFile.ic_imgPlaceholder} />
                            </View>
                            <View style={{ marginLeft: 12 }}>
                                {/* <Text style={styles.semibold_13_blue}>{ProfileDetialConstants.CHANGE_PHOTO}</Text> */}
                                <ChooseImageMenu
                                    label={ProfileDetialConstants.CHANGE_PHOTO}
                                    tab1={ProfileDetialConstants.OPEN_CAMERA}
                                    tab2={ProfileDetialConstants.OPEN_GALLERY}
                                    tab3={"Remove Profile"}
                                    profilePicture={profilePicture}
                                    onRemoveProfile={() => deleteProfilePic()}
                                    onSelectCamera={() => openCamera()}
                                    onSelectGallery={() => chooseImage()}
                                />
                            </View>
                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.bold_18_black}>{ProfileDetialConstants.BASIC_DETAILS}</Text>
                        </View>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <CommonHeading Heading={ProfileDetialConstants.NAME} />
                            </View>
                            <View style={styles.inputView}>
                                <View style={{ width: '100%' }}>
                                    <CommonInput editable={isEditable} value={name} placeholder={ProfileDetialConstants.NAME} onChangeText={(text) => setName(text)} />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <CommonHeading Heading={ProfileDetialConstants.EMAIL_ADDRESS} />
                            </View>
                            <View style={styles.inputView}>
                                <View style={{ width: '100%' }}>
                                    <CommonInput editable={false} value={email} placeholder={ProfileDetialConstants.EMAIL_ADDRESS} onChangeText={(text) => setEmail(text)} />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <CommonHeading Heading={ProfileDetialConstants.PHONE_NUMBER} />
                            </View>
                            <View style={styles.inputView}>
                                <View style={{ width: '100%', marginLeft: 2 }}>
                                    <CommonInput editable={isEditable} value={phoneNumber} placeholder={ProfileDetialConstants.PHONE_NUMBER} onChangeText={(text) => setPhoneNumber(text)} />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <CommonHeading Heading={ProfileDetialConstants.GENDER} />
                            </View>
                            <View style={styles.inputView}>
                                {/* <View style={{ width: '100%' }}>
                                    <CommonInput editable={isEditable} value={gender} placeholder={ProfileDetialConstants.GENDER} onChangeText={(text) => setGender(text)} />
                                </View> */}
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => isEditable ? selectGender("Male") : {}}
                                >
                                    <View>
                                        <Image source={gender == "Male" ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
                                    </View>
                                    <View style={{ marginLeft: 10 }}>
                                        <Text>Male</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ width: 50 }}></View>
                                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => isEditable ? selectGender("Female") : {}}
                                >
                                    <View>
                                        <Image source={gender == "Female" ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
                                    </View>

                                    <View style={{ marginLeft: 10 }}>
                                        <Text>Female</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flex: 1 }}></View>
                            </View>
                        </View>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <CommonHeading Heading={ProfileDetialConstants.DATE_OF_BIRTH} />
                            </View>
                            <TouchableOpacity style={styles.datePickerStyle}
                                onPress={() => isEditable ? setOpen(true) : {}}
                            >

                                <Text style={styles.samibold_16_black}>{loader && !isUpdate ? 'DD-MM-YYYY' : moment(date).format('DD-MM-YYYY')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <CommonHeading Heading={ProfileDetialConstants.ADDRESS} />
                            </View>
                            <View style={styles.inputView}>
                                <View style={{ width: '100%' }}>
                                    <CommonInput editable={isEditable} value={address} placeholder={ProfileDetialConstants.ADDRESS} onChangeText={(text) => setAddress(text)} />
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 22, flexDirection: 'row' }}>
                            <View style={{ width: '49%', borderBottomWidth: 1, borderBottomColor: Colors.ProfileDetail_Grey, }}>
                                <View>
                                    <CommonHeading Heading={ProfileDetialConstants.CITY} />
                                </View>
                                <View >
                                    <View style={{ width: '100%', marginTop: 8, marginBottom: 10 }}>
                                        <CommonInput editable={isEditable} value={city} placeholder={ProfileDetialConstants.CITY} onChangeText={(text) => setCity(text)} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <View style={{ width: '49%', borderBottomWidth: 1, borderBottomColor: Colors.ProfileDetail_Grey, }}>
                                <View>
                                    <CommonHeading Heading={ProfileDetialConstants.STATE} />
                                </View>
                                <View >
                                    <View style={{ width: '100%', marginTop: 8, marginBottom: 10 }}>
                                        <CommonInput editable={isEditable} value={state} placeholder={ProfileDetialConstants.STATE} onChangeText={(text) => setState(text)} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 22 }}>
                            <View>
                                <CommonHeading Heading={ProfileDetialConstants.COUNTRY} />
                            </View>
                            <View style={styles.inputView}>
                                <View style={{ width: '100%' }}>
                                    <CommonInput editable={isEditable} value={country} placeholder={ProfileDetialConstants.COUNTRY} onChangeText={(text) => setCountry(text)} />
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.bold_18_black}>{ProfileDetialConstants.PROFESSIONAL_DETAILS}</Text>
                            </View>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <CommonHeading Heading={ProfileDetialConstants.OCCUPATION} />
                                </View>
                                <View style={styles.inputView}>
                                    <View style={{ width: '100%' }}>
                                        <CommonInput editable={isEditable} value={occupation} placeholder={ProfileDetialConstants.OCCUPATION} onChangeText={(text) => setOccupation(text)} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <CommonHeading Heading={ProfileDetialConstants.TIMING} />
                                </View>
                                <View style={styles.inputView}>
                                    <View style={{ width: '100%' }}>
                                        <CommonInput editable={isEditable} value={timing} placeholder={ProfileDetialConstants.TIMING} onChangeText={(text) => setTiming(text)} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ marginTop: 20 }}>
                                <Text style={styles.bold_18_black}>{ProfileDetialConstants.SOCIAL_PROFILE}</Text>
                            </View>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <CommonHeading Heading={ProfileDetialConstants.FACEBOOK} />
                                </View>
                                <View style={styles.inputView}>
                                    <View style={{ width: '100%' }}>
                                        <CommonInput editable={isEditable} value={facebookLink} placeholder={ProfileDetialConstants.FACEBOOK} onChangeText={(text) => setFacebookLink(text)} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <CommonHeading Heading={ProfileDetialConstants.LINKEDIN} />
                                </View>
                                <View style={styles.inputView}>
                                    <View style={{ width: '100%' }}>
                                        <CommonInput editable={isEditable} value={linkedInLink} placeholder={ProfileDetialConstants.LINKEDIN} onChangeText={(text) => setLinkedInLink(text)} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <CommonHeading Heading={ProfileDetialConstants.INSTAGRAM} />
                                </View>
                                <View style={styles.inputView}>
                                    <View style={{ width: '100%' }}>
                                        <CommonInput editable={isEditable} value={instagramLink} placeholder={ProfileDetialConstants.INSTAGRAM} onChangeText={(text) => setInstagramLink(text)} />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 22 }}>
                                <View>
                                    <CommonHeading Heading={ProfileDetialConstants.TWITTER} />
                                </View>
                                <View style={styles.inputView}>
                                    <View style={{ width: '100%' }}>
                                        <CommonInput editable={isEditable} value={twitterLink} placeholder={ProfileDetialConstants.TWITTER} onChangeText={(text) => setTwitterLink(text)} />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    {/* {isEditable ?
                        <View style={{ marginTop: 10 }}>
                            <SingleButton name={ProfileDetialConstants.UPDATE_PROFILE} onPress={() => Validation()} />
                        </View> : null} */}
                    <DatePicker
                        modal
                        mode='date'
                        open={open}
                        date={date}
                        maximumDate={new Date()}
                        onConfirm={(date) => {
                            setOpen(false)
                            setDate(date)
                            console.log("SelectedDate========", date)
                        }}
                        onCancel={() => {
                            setOpen(false)
                        }}
                    />

                    <View style={{ height: 80 }}></View>
                </ScrollView>
                {loader ? <Loader /> : null}


            </SafeAreaView>

        </>
    )
}

export default ProfileDetailScreen;