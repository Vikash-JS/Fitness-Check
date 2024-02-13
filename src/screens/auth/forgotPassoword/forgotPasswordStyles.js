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

  resetBtnViewStyle: {
    backgroundColor: Colors.blue,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
    marginHorizontal: 18,
  },
  resetBtnTextStyle: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 14,
    color: Colors.white,
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
  signInTextStyle: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
    marginLeft: 8,
  },
  goBack: {
    opacity: 0.4,
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  goBackBtnStyle: {
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
});
