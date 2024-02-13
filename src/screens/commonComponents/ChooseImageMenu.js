import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Colors, Fonts} from '../../utils/Constants';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from 'react-native-popup-menu';
const ChooseImageMenu = props => {
    console.log("FSFDASFDASDfas",props?.profilePicture)
  return (
    <View>
      <Menu>
        <MenuTrigger>
          <View>
            <Text style={styles.semibold_13_blue}>{props.label}</Text>
          </View>
        </MenuTrigger>
        <MenuOptions optionsContainerStyle={styles.popupContainer}>
          <MenuOption onSelect={props.onSelectCamera}>
            <Text style={styles.semibold_12_black}>{props.tab1}</Text>
          </MenuOption>
          <MenuOption style={{marginTop: 10}} onSelect={props.onSelectGallery}>
            <Text style={styles.semibold_12_black}>{props.tab2}</Text>
          </MenuOption>
          {!props?.profilePicture?null: (
            <MenuOption
              style={{marginTop: 10}}
              onSelect={props.onRemoveProfile}>
              <Text style={styles.semibold_12_black}>{props.tab3}</Text>
            </MenuOption>
          )}
        </MenuOptions>
      </Menu>
    </View>
  );
};
export default ChooseImageMenu;

const styles = StyleSheet.create({
  popupContainer: {
    borderRadius: 10,
    width: 108,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 20,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  semibold_13_blue: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 13,
    color: Colors.lightBlue,
  },
});
