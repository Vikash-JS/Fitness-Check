import {StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../../utils/Constants';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headingViewStyle: {
    marginTop: 37.1,
    justifyContent: 'center',
    marginHorizontal: 18,
  },
  headingTextStyle: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 22,
    color: Colors.black,
  },
  subHeadingView: {
    justifyContent: 'center',
    marginTop: 8,
    marginHorizontal: 18,
  },
  subHeadingTextStyle: {
    opacity: 0.5,
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 12,
    color: Colors.black,
  },
  forgotPassView: {
    flexDirection: 'row',
    marginTop: 10,
    marginHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkBoxViewStyle: {
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.inputGrey,
    width: 18,
    height: 18,
  },
  keepMeSignInTextStyle: {
    opacity: 0.4,
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 12,
    color: Colors.black,
  },
  nextBtnViewStyle: {
    backgroundColor: Colors.blue,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 18,
  },
  nextBtnTextStyle: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 14,
    color: Colors.white,
  },
  signInViewStyle: {
    alignItems: 'center',
    marginTop: 26,
    flexDirection: 'row',
    marginLeft: 18,
  },
  signInWithTextStyle: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 12,
    color: Colors.black,
  },
  notMemberTextStyle: {
    opacity: 0.4,
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  signupBtnViewStyle: {
    borderRadius: 5,
    borderColor: Colors.inputGrey,
    marginTop: 26,
    borderWidth: 1,
    flexDirection: 'row',
    height: 40,
    marginHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupTextStyle: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
    marginLeft: 8,
  },
  newIcon: {
    marginRight: 35,
    height: 15,
    width: 20,
    marginTop: 15,
    paddingBottom: 10,
    alignSelf: 'center',
    position: 'absolute',
    right: 0,
  },
  inputView: {
    borderWidth: 1,
    height: 54,
    marginHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderColor: Colors.inputGrey,
    borderRadius: 7,
    backgroundColor: Colors.white,
    color: Colors.black,
    fontFamily: Fonts.gilroy_SemiBold, fontSize: 12,
  },
  textInputStyle: {
    width: '100%',
    height: 30,
    backgroundColor: Colors.white,
    color: Colors.black,

  }
});
