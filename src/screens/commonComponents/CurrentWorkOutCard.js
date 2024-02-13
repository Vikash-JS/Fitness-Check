import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import imagesFile from '../../../assets/imagesFile';
import {Colors, Fonts} from '../../utils/Constants';

const CurrentWorkOutCard = props => {
  
  const [workoutDetail, setWorkoutDetail] = useState(props.detail);
  const [type, setType] = useState(props.type);

  useEffect(() => {}, []);

  const checkValidate = id => {
    var MarkedDone = false;
    if (workoutDetail?.activity?.length > 0) {
      workoutDetail.activity.forEach(element1 => {
        if (id == element1.setId) {
          if (props.uniqueId == element1.sessionId) {
            MarkedDone = true;
          }
        }
      });
    }
    return MarkedDone;
  };

  const renderExercise = (item, index, newItems) => {
    console.log('newItems: ', newItems);
    // console.log('item:-==-=-= ', item);
    return (
      <View style={{ paddingBottom: 15 }}>
        <View style={styles.subContianer}>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text>
              {newItems?.option1a == 'bodyweight'
                ? '-'
                : newItems?.option1a == 'rpe'
                ? item.value1b
                  ? item?.value1b
                  : '-'
                : item.value1a
                ? item?.value1a
                : '-'}
            </Text>
          </View>
          <View style={{flex: 1}}></View>
          <View
            style={{
              width: '30%',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <Text>
              {newItems?.option2a === 'time'
                ? item.value2a
                  ? item?.value2a +
                    'm ' +
                    (item?.value2b ? item?.value2b : '00') +
                    's'
                  : '-'
                : newItems?.option2a === 'repsRange'
                  ? (item.value2a ? item?.value2a : '') +
                  ' - ' +
                  (item.value2b ? item?.value2b : '')
                : (item.value2a ? item?.value2a : '-') +
                  (item.value2b &&
                  newItems?.option2a === 'repsRange' &&
                  newItems?.option2a === 'time'
                    ? item?.value2b
                    : '')}
            </Text>
          </View>
          <View style={{flex: 1}}></View>
          <View
            style={{
              width: '25%',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <Text>
              {newItems?.option3a === 'restPeriod'
                ? item?.value3a
                  ? item?.value3a + 'm ' + item?.value3b + 's'
                  : '-'
                : (item.value3a ? item?.value3a : '-') +
                '' +
                (item.value3b ? item?.value3b : '')}
            </Text>
          </View>
          <View style={{flex: 1}}></View>
          {type == 'my' ? (
            <TouchableOpacity
              style={{
                width: 25,
                height: 25,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => props.onSelect(item._id, index, item.exerciseId)}>
              <Image
                style={{ width: 15, height: 15 }}
                source={
                  checkValidate(item._id)
                    ? imagesFile.ic_blueTick
                    : imagesFile.ic_recWhiteDot
                }
              />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    );
  };

  const renderWorkout = ({item}) => {
    let newItems = item;
    return (
      <TouchableOpacity onPress={() => props.onSelectExercise(item)}>
        <DropShadow style={styles.shadowStyle}>
          <View style={styles.mainContainer}>
            <View
              style={{
                alignItems: 'center',
                marginTop: 15,
                marginLeft: 15,
                flexDirection: 'row',
              }}>
              <View style={[styles.imageContainer, { width: "12%" }]}>
                <Image
                  style={{ width: 48, borderRadius: 6, height: 48 }}
                  source={
                    item.exerciseThumbnail
                      ? { uri: item.exerciseThumbnail }
                      : imagesFile.placeHolderExercise
                  }
                />
              </View>
              <View style={{ marginLeft: 16, width: '56%' }}>
                <Text style={styles.bold_14_black}>{item.exerciseName}</Text>
              </View>
              {props?.data.repeat > 1 ? <View style={{ width: '18%', marginLeft: 16, flexDirection: 'row' }}>
                <Text style={styles.bold_14_black}>Repeat:</Text>
                <Text style={styles.bold_14_black}> {props?.data.repeat}</Text>
              </View> : null}
            </View>
            <View
              style={{
                marginTop: 12,
                marginLeft: 15,
                flexDirection: 'row',
                marginRight: 50,
              }}>
              <View
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.semiBold_10_black}>
                  {item.option1a &&
                    item.option1a?.toUpperCase() +
                      (item.option1a == 'rpe' || item?.option1a == 'bodyweight'
                        ? ''
                        : (item.option1b ? '/' : '') +
                          item.option1b?.toUpperCase())}
                </Text>
              </View>
              <View style={{flex: 1}}></View>
              <View
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 20,
                }}>
                <Text style={styles.semiBold_10_black}>
                  {item.option2a &&
                    item.option2a?.toUpperCase() +
                      (item.option2a == 'distance'
                        ? (item.option2b ? '/' : '') +
                          item.option2b?.toUpperCase()
                        : '')}
                </Text>
              </View>
              <View style={{flex: 1}}></View>
              <View
                style={{
                  width: '30%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.semiBold_10_black}>
                  {item.option3a &&
                    item.option3a?.toUpperCase() +
                      (item.option3b ? '/' : '') +
                      item.option3b?.toUpperCase()}
                </Text>
              </View>
            </View>
            <View
              style={{
                borderWidth: 0.2,
                width: '100%',
                borderColor: Colors.black,
                opacity: 0.1,
                marginTop: 8,
              }}></View>
            <View>
              <FlatList
                data={item?.sets}
                renderItem={({ item, index }) =>
                  renderExercise(item, index, newItems)
                }
                keyExtractor={item => item._id}
              />
            </View>
          </View>
        </DropShadow>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ marginBottom: 10 }}>
      <FlatList
        data={props?.data?.exercise}
        renderItem={renderWorkout}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default CurrentWorkOutCard;

const styles = StyleSheet.create({
  shadowStyle: {
    shadowColor: '#171717',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    marginTop: 20,
  },

  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 6,
  },
  bold_14_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 14,
    color: Colors.black,
  },
  semiBold_10_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.5,
  },
  subContianer: {
    marginTop: 8,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  timeView: {
    borderWidth: 1,
    borderColor: Colors.inputGrey,
    borderRadius: 7,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
