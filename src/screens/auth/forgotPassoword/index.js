import React, { useState } from 'react';
import { View, Text, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native';
import imagesFile from '../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../utils/Constants';
import { styles } from './forgotPasswordStyles';
import { ForgotPasswordConstants } from '../authConstants';
import InputBox from '../../commonComponents/InputBox';
import { Toaster } from '../../commonComponents/Toaster';
import { Forget_Password_Request } from '../../../apiManager/auth/index'
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../commonComponents/Loader';
import AppHeader from '../../commonComponents/AppHeader';
const ForgotPasswordScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [loader, setLoader] = useState(false)

  const checkValidation = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == '') {
      Toaster(ForgotPasswordConstants.EMAIL_VALIDATION);
    } else if (reg.test(email) === false) {
      Toaster(ForgotPasswordConstants.VALIDEMAIL_VALIDATION);
    } else {
      ForgetPassword();
    }
  };

  const ForgetPassword = () => {
    var raw = JSON.stringify({ "email": email });
    setLoader(true)
    Forget_Password_Request(raw).then((response) => {
      console.log("forgetResp", response)
      if (response.status == 200) {
        setLoader(false)
        Toaster(response.message)

        navigation.navigate('CreatePasswordScreen', { email: email })
      } else if (response.error) {
        setLoader(false)
        Toaster(response.error)
      }

    }).catch((error) => {
      console.log("forgetPassErr-----", error)
    })
  }

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', margin: 16.1, alignItems: 'center', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={imagesFile.ic_back} />
          </TouchableOpacity>
          <View style={{}}>
            <Image style={{ height: 37.85, width: 118.28 }} source={imagesFile.ic_logo} />
          </View>
        </View>
        <View style={styles.headingViewStyle}>
          <Text style={styles.headingTextStyle}>{ForgotPasswordConstants.RESET_PASSWORD_HEADING}</Text>
        </View>
        <View style={styles.subHeadingView}>

        </View>
        <View style={{ marginTop: 20 }}>
          <View>
            <InputBox
              placeholder={ForgotPasswordConstants.EMAIL_PLACEHOLDER}
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>
          <TouchableOpacity style={styles.resetBtnViewStyle}
            onPress={() => checkValidation()}

          >
            <Text style={styles.resetBtnTextStyle}>{ForgotPasswordConstants.RESET_PASS_BTN}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loader ? <Loader /> : null}
    </SafeAreaView >
  )
}
export default ForgotPasswordScreen;
