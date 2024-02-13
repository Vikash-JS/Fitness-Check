import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import {Colors, Fonts} from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
const Accordion = ({title, data}) => {
  const [visible, setVisible] = useState(false);

  const toggleSwitch = () => setVisible(previousState => !previousState);

  renderItems = ({item = 'Add onion'}) => {
    return (
      <View>
        <Text style={[styles.semibold_12_black, {opacity: 0.5}]}>{item}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity style={styles.mainContainer} onPress={toggleSwitch}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.bold_14_black}>{title}</Text>
        </View>
        <View>
          <Image source={imagesFile.ic_downArrow} />
        </View>
      </View>
      {visible ? (
        <View>
          <View
            style={{
              borderWidth: 0.5,
              marginVertical: 16,
              borderColor: '#606060',
            }}></View>
          <View style={{marginBottom: 8}}></View>
          <FlatList data={data} renderItem={renderItems} />
        </View>
      ) : null}
    </TouchableOpacity>
  );
};
export default Accordion;

const styles = StyleSheet.create({
  mainContainer: {
    borderColor: Colors.inputGrey,
    borderRadius: 7,
    marginHorizontal: 8,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: 'center',
    marginVertical: 8,
  },
  bold_14_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 14,
    color: Colors.black,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
});
