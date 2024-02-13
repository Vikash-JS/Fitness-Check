import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import imagesFile from '../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../utils/Constants';
import moment from 'moment';

const FlatListFooter = props => {
  console.log('props:appointment ', props);
  return (
    <>
      {props?.appointment?.length > 0 &&
        props?.appointment?.map((item, index) => {
          console.log('item: ????????', index);
          return (
            <View>
              <View style={{marginLeft: 20}}>
                <Text style={styles.bold_14_black}>
                  {props?.item?.Activities?.dayName}
                </Text>
              </View>
              <DropShadow style={styles.shadowProp}>
                <TouchableOpacity
                  style={styles.cardContainer}
                  onPress={() => props.onPress(index)}>
                  <View style={styles.animatedView}></View>

                  <View style={{flex: 1}}>
                    <View>
                      <Text style={styles.semiBold_12_black}>
                        {item?.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 7,
                      }}>
                      <View>
                        <Image source={imagesFile.ic_clock} />
                      </View>
                      <View style={{marginLeft: 10}}>
                        <Text style={styles.semiBold_10_opacity}>
                          {moment(item?.startTime).format('lll')}
                        </Text>
                      </View>
                      <View>
                        <Text style={{opacity: 0.6}}> | </Text>
                      </View>
                      <View>
                        <Text style={styles.semiBold_10_opacity}>
                          {moment(item?.endTime).format('lll')}
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={{flex: 1}}></View>
                  <View style={{marginRight: 18}}>
                    <Image source={imagesFile.ic_rightArrow} />
                  </View>
                </TouchableOpacity>
              </DropShadow>
              {/* <View style={{ height: 90 }}></View> */}
            </View>
          );
        })}
    </>
  );
};
export default FlatListFooter;

const styles = StyleSheet.create({
  bold_14_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 14,
    color: Colors.black,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  semiBold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  semiBold_10_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.4,
  },
  cardContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 18,
  },
  animatedView: {
    width: 3,
    height: 63,
    marginLeft: 12,
    marginRight: 12,
    backgroundColor: Colors.palceHolder_grey,
    borderRadius: 3,
  },
});
