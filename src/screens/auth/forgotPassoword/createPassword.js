import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import imagesFile from '../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../utils/Constants';
import {styles} from './forgotPasswordStyles';
import {
  ForgotPasswordConstants,
  CreatePasswordConstants,
  LoginConstants,
} from '../authConstants';
import InputBox from '../../commonComponents/InputBox';
import {Toaster} from '../../commonComponents/Toaster';
import {
  Forget_Password_Request,
  Verify_OTP,
} from '../../../apiManager/auth/index';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../commonComponents/Loader';
import {useEffect} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {HideIcon, ShowIcon} from '../login';

const CELL_COUNT = 6;

const CreatePasswordScreen = props => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [loader, setLoader] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirm] = useState('');
  const [otp, setOtp] = useState('');
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [showConfirm, setConfirmShowIcon] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [propsCode, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    let email_id = props?.route?.params?.email;
    console.log('email_id: ', email_id);
    setEmail(email_id);
  }, []);

  const checkValidation = () => {
    if (value?.length < 6) {
      Toaster(CreatePasswordConstants.VALID_OTP);
      console.log('value:****', value?.length);
    } else if (password == '') {
      Toaster(CreatePasswordConstants.NEW_PASSWORD_EMPTY);
    } else if (confirmPassword == '') {
      Toaster(CreatePasswordConstants.CONFIRM_PASSWORD_EMPTY);
    } else if (password !== confirmPassword) {
      Toaster(CreatePasswordConstants.EQUAL_PASSWORD);
    } else {
      verifyOtpSubmit();
    }
  };

  const verifyOtpSubmit = () => {
    setLoader(true);
    var raw = JSON.stringify({
      email: email,
      otp: value,
      password: confirmPassword,
    });

    console.log(raw);
    Verify_OTP(raw)
      .then(response => {
        console.log('response: ??????', response);
        setLoader(false);
        if (response && response?.status == 200) {
          Toaster(response?.message);
          navigation.navigate('LoginScreen');
        } else if (response?.error) {
          setValue('')
          Toaster(response?.error);
        }
      })
      .catch(err => {
        setLoader(false);
        console.log(err, 'err');
      });
  };

  const onResendOtp = () => {
    var raw = JSON.stringify({email: email});
    setLoader(true);
    Forget_Password_Request(raw)
      .then(response => {
        console.log('forgetResp', response);
        if (response.status == 200) {
          setLoader(false);
          Toaster(response.message);
        } else if (response.error) {
          setLoader(false);
          Toaster(response.error);
        }
      })
      .catch(error => {
        console.log('forgetPassErr-----', error);
      });
  };

  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View style={{flex: 1}}>
        <View style={{marginTop: 16.1, marginLeft: 34}}>
          <Image
            style={{height: 37.85, width: 118.28}}
            source={imagesFile.ic_logo}
          />
        </View>
        <View style={styles.headingViewStyle}>
          <Text style={styles.headingTextStyle}>
            {CreatePasswordConstants.CREATE_PASSWORD_HEADING}
          </Text>
        </View>
        <View style={styles.subHeadingView}></View>
        <View style={{paddingHorizontal: 18, paddingVertical: 10}}>
          <CodeField
            ref={ref}
            {...propsCode}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={stylesCode.codeFieldRoot}
            keyboardType="number-pad"
            textContentType="oneTimeCode"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[stylesCode.cell, isFocused && stylesCode.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <Text
            style={{
              fontSize: 15,
              textAlign: 'center',
              fontFamily: Fonts.gilroy_Regular,
              marginTop: 20,
              color: '#58595B',
            }}>
            Don't receive an OTP?
          </Text>

          <Text
            onPress={onResendOtp}
            style={{
              fontSize: 15,
              textAlign: 'center',
              fontFamily: Fonts.gilroy_SemiBold,
              marginTop: 15,
            }}>
            Resend OTP
          </Text>
        </View>
        <View style={{marginTop: 20}}>
          <View style={{marginTop: 15}}>
            <InputBox
              placeholder={CreatePasswordConstants.NEW_PASSWORD}
              secureTextEntry={!show}
              value={password}
              onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
              style={styles.newIcon}
              onPress={() => {
                setShow(!show);
              }}>
              {show ? <ShowIcon /> : <HideIcon />}
            </TouchableOpacity>
          </View>

          <View style={{marginTop: 15}}>
            <InputBox
              placeholder={CreatePasswordConstants.CONFIRM_PASSWORD}
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={text => setConfirm(text)}
            />
            <TouchableOpacity
              style={styles.newIcon}
              onPress={() => {
                setConfirmShowIcon(!showConfirm);
              }}>
              {show ? <ShowIcon /> : <HideIcon />}
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.resetBtnViewStyle}
            onPress={() => checkValidation()}>
            <Text style={styles.resetBtnTextStyle}>
              {CreatePasswordConstants.SUMBIT_OTP}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loader ? <Loader /> : null}
    </SafeAreaView>
  );
};
const stylesCode = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 48,
    borderRadius: 5,
    fontSize: 24,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    borderColor: '#999999',
    borderWidth: 2,
    backgroundColor: '#ffffff',
  },
  focusCell: {
    borderColor: '#3B22F8',
    borderWidth: 2,
  },
});
export default CreatePasswordScreen;
