import React, {useState, useRef} from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
  TextInput,
  Platform,
  Dimensions,
} from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import {Colors, Fonts} from '../../utils/Constants';
import SingleButton from '../commonComponents/SingleButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const windowHeight = Dimensions.get('window').height - 100;

const MedicalHistoryModal = props => {
  const ref = useRef();
  const [medicalIssue, setMedicalIssue] = useState(props.medicalIssues);
  const [allergies, setAllergies] = useState(props.allergies);
  const [differentlyAbled, setDifferentlyAbled] = useState(
    props.differentlyAbled,
  );
  const [other, setOther] = useState(props.otherInstructions);

  const Footer = () => {
    return (
      <View style={{marginBottom: 30}}>
        <SingleButton
          name="Done"
          onPress={() =>
            props.onDone(medicalIssue, allergies, differentlyAbled, other)
          }
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
          <KeyboardAwareScrollView>
            {/* <KeyboardAvoidingView ref={ref} behavior={Platform.OS =='ios'?'padding':'height'}   style={styles.subContainerStyle}> */}
            <View style={styles.headerStyle}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View>
                  <Text style={styles.semibold_17_black}>Medical History</Text>
                </View>
                <View style={{flex: 1}}></View>
                <TouchableOpacity onPress={props.cancelModal}>
                  <Image source={imagesFile.ic_cross} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.renderContainerStyle}>
              <View style={{marginTop: 11}}>
                <Text style={styles.semibold_12_opacity}>
                  {'Are you differently abled?'}
                </Text>
              </View>
              <TextInput
                ref={ref}
                style={{
                  height: 44,
                  color: Colors.black,
                  backgroundColor: Colors.white,
                }}
                value={differentlyAbled}
                onChangeText={text => setDifferentlyAbled(text)}
                placeholder={'Enter disability'}
              />
            </View>
            <View style={styles.renderContainerStyle}>
              <View style={{marginTop: 11}}>
                <Text style={styles.semibold_12_opacity}>
                  {'List any food item(s) you’re allergic to'}
                </Text>
              </View>
              <TextInput
                ref={ref}
                style={{
                  height: 44,
                  color: Colors.black,
                  backgroundColor: Colors.white,
                }}
                value={allergies}
                onChangeText={text => setAllergies(text)}
                placeholder={'Enter food allergies'}
              />
            </View>
            <View style={styles.renderContainerStyle}>
              <View style={{marginTop: 11}}>
                <Text style={styles.semibold_12_opacity}>
                  {'List any other medical issue(s)'}
                </Text>
              </View>

              <TextInput
                ref={ref}
                style={{
                  height: 44,
                  color: Colors.black,
                  backgroundColor: Colors.white,
                }}
                value={medicalIssue}
                onChangeText={text => setMedicalIssue(text)}
                placeholder={'Enter medical issue'}
              />
            </View>
            <View style={styles.renderContainerStyle}>
              <View style={{marginTop: 11}}>
                <Text style={styles.semibold_12_opacity}>
                  {'Other Instructions'}
                </Text>
              </View>

              <TextInput
                ref={ref}
                style={{
                  height: 44,
                  color: Colors.black,
                  backgroundColor: Colors.white,
                }}
                value={other}
                onChangeText={text => setOther(text)}
                placeholder={'Enter instructions'}
              />
            </View>
            <Footer />
          </KeyboardAwareScrollView>
          {/* </KeyboardAvoidingView> */}
        </View>
      </View>
    </Modal>
  );
};

export default MedicalHistoryModal;

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
  semibold_12_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
    opacity: 0.4,
  },
  semibold_14_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 14,
    color: Colors.black,
  },
  renderContainerStyle: {
    paddingHorizontal: 30,
    marginBottom: 24,
    justifyContent: 'center',
    paddingVertical: 5,
  },
  ButtonStyle: {
    height: 54,
    marginBottom: 30,
    marginHorizontal: 18,
    backgroundColor: Colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  semibold_14_white: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 14,
    color: Colors.white,
  },
});
