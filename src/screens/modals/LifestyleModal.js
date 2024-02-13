import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import SingleButton from '../commonComponents/SingleButton';
import {Colors, Fonts} from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';

const DiataryHabitValue = [
  {
    id: '1',
    heading: 'Do you have any of these habits?',
    value: [
      {
        id: 1,
        option: 'Alcohol',
        parentId: 1,
      },
      {
        id: 2,
        option: 'Tobacco',
        parentId: 1,
      },
      {
        id: 3,
        option: 'Smoking',
        parentId: 1,
      },
      {
        id: 4,
        option: 'None of the above',
        parentId: 1,
      },
    ],
  },
  {
    id: '2',
    heading: 'I have access to gym',
    value: [
      {
        id: 1,
        option: 'Yes',
        parentId: 2,
      },
      {
        id: 2,
        option: 'No',
        parentId: 2,
      },
    ],
  },
  {
    id: '3',
    heading: 'I Travel',
    value: [
      {
        id: 1,
        option: 'Regularly',
        parentId: 3,
      },
      {
        id: 2,
        option: 'Occasionally',
        parentId: 3,
      },
      {
        id: 3,
        option: 'None of the above',
        parentId: 3,
      },
    ],
  },
  {
    id: '4',
    heading: 'I sleep for at least',
    value: [
      {
        id: 1,
        option: '1-2 hours',
        parentId: 4,
      },
      {
        id: 2,
        option: '5-8 hours',
        parentId: 4,
      },
      {
        id: 3,
        option: '8-10 hours',
        parentId: 4,
      },
      {
        id: 4,
        option: 'None of the above',
        parentId: 4,
      },
    ],
  },
  {
    id: '5',
    heading: 'How is your sleep quality?',
    value: [
      {
        id: 1,
        option: 'Good',
        parentId: 5,
      },
      {
        id: 2,
        option: 'Average',
        parentId: 5,
      },
      {
        id: 3,
        option: 'Bad',
        parentId: 5,
      },
      {
        id: 4,
        option: 'None of the above',
        parentId: 5,
      },
    ],
  },
];
const LifestyleModal = props => {
  const [tempGymAccess, setTempGymAccess] = useState(
    props.gymAccess ? 'Yes' : 'No',
  );
  const [tempFre, setTempFre] = useState(props.travelFre);
  const [tempSleep, setTempSleep] = useState(props.sleepHours);
  const [tempSleepQuality, setTempSleepQuality] = useState(props.sleepQuality);
  const [tempHabits, setTempHabits] = useState([...props.habits]);

  const checkValidate = options => {
    let MarkedDone = false;
    if (tempHabits?.length > 0) {
      tempHabits.forEach(element => {
        if (element === options) {
          MarkedDone = true;
        }
      });
    }
    return MarkedDone;
  };
  const FlatListHeader = () => {
    return (
      <View style={styles.headerStyle}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View>
            <Text style={styles.semibold_17_black}>Lifestyle and Sleep</Text>
          </View>
          <View style={{flex: 1}}></View>
          <TouchableOpacity
            onPress={() => {
              props.cancelModal();
            }}>
            <Image source={imagesFile.ic_cross} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem1 = ({item}) => (
    <TouchableOpacity
      style={{flexDirection: 'row', paddingVertical: 5}}
      onPress={() => {
        if (item.parentId === 2) {
          setTempGymAccess(item.option);
        } else if (item.parentId === 3) {
          setTempFre(item.option);
        } else if (item.parentId === 4) {
          setTempSleep(item.option);
        } else if (item.parentId === 5) {
          setTempSleepQuality(item.option);
        } else if (item.parentId === 1) {
          let newArr = tempHabits;
          let Filter = newArr.includes(item.option);

          if (Filter) {
            let index = newArr.indexOf(item.option);
            newArr.splice(index, 1);
          } else {
            newArr.push(item.option);
            // if user selected none of the above -> Unselect all other items
            if (item.option === 'None of the above') {
              newArr = ['None of the above'];
            } else {
              let idx = newArr.indexOf('None of the above');
              // If user select any other item deselect None of the above.
              if (idx > -1) newArr.splice(idx, 1);
            }
          }
          props.setExtDate(new Date());
          setTempHabits(newArr);
        }
      }}>
      <View>
        <Image
          source={
            checkValidate(item.option) && item.parentId === 1
              ? imagesFile.ic_blueTick
              : tempGymAccess == item.option && item.parentId === 2
              ? imagesFile.ic_blueTick
              : tempFre == item.option && item.parentId === 3
              ? imagesFile.ic_blueTick
              : tempSleep == item.option && item.parentId === 4
              ? imagesFile.ic_blueTick
              : tempSleepQuality == item.option && item.parentId === 5
              ? imagesFile.ic_blueTick
              : imagesFile.ic_recWhiteDot
          }
        />
      </View>
      <View style={{marginLeft: 8}}>
        <Text style={styles.semibold_14_black}>{item.option}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({item}) => (
    <View style={styles.renderContainerStyle}>
      <View style={{marginBottom: 16}}>
        <Text style={styles.semibold_12_opacity}>{item.heading}</Text>
      </View>
      <View>
        <FlatList
          data={item.value}
          renderItem={renderItem1}
          keyExtractor={item => item.id}
          extraData={props.extDate}
        />
      </View>
    </View>
  );

  const Footer = () => {
    return (
      <View style={{marginBottom: 30}}>
        <SingleButton
          name="Done"
          onPress={() => {
            const data = {
              habitList: tempHabits,
              sleepHours: tempSleep,
              sleepQuality: tempSleepQuality,
              gymAccess: tempGymAccess === 'Yes',
              travelFre: tempFre,
            };
            props.onSelectLifeStyle(data);
            props.onLifeStyleModalDone(data);
          }}
        />
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      visible={props.visible}
      presentationStyle={'overFullScreen'}
      transparent={true}>
      <View style={styles.mainContainer}>
        <View style={styles.subContainerStyle}>
          <FlatList
            data={DiataryHabitValue}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListHeaderComponent={<FlatListHeader />}
            ListFooterComponent={<Footer />}
            extraData={props.extDate}
          />
        </View>
      </View>
    </Modal>
  );
};

export default LifestyleModal;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  subContainerStyle: {
    backgroundColor: Colors.white,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  headerStyle: {
    paddingHorizontal: 30,
    paddingTop: 20,
    marginBottom: 16,
  },
  semibold_17_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 17,
    color: Colors.black,
  },
  renderContainerStyle: {
    paddingHorizontal: 30,
    marginBottom: 24,
  },
  semibold_14_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 14,
    color: Colors.black,
  },
  semibold_12_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
    opacity: 0.4,
  },
});
