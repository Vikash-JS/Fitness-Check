import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Touchable } from 'react-native';
import { styles } from '../onBoard/onBoardingStyle';
import imagesFile from '../../../../assets/imagesFile';
import InputBox from '../../commonComponents/InputBox';
import InputBox_new from './InputBox_new';
import { onBoarding } from '../onBoardingConstants';
import { Colors, Fonts } from '../../../utils/Constants';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
const FlatListHeader = (props) => {
    console.log('props:***** ', props?.selectedDate);
    
    const [date, setDate] = useState('DD-MM-YYYY')


    return (
        <View >
            <View style={{ marginTop: 16.1, marginLeft: 16 }}>
                <Image style={{ height: 37.85, width: 118.28 }} source={imagesFile.ic_logo} />
            </View>
            <View style={styles.headingViewStyle}>
                <Text style={styles.headingTextStyle}>{onBoarding.ONBOARDING_HEADING}</Text>
            </View>
            <View style={styles.subHeadingView}>
                {/* <Text style={styles.subHeadingTextStyle}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text> */}
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.palceHolder_grey }}>Date of Birth</Text>
                <TouchableOpacity style={{ borderRadius: 7, borderColor: Colors.inputGrey, borderWidth: 1, height: 44, justifyContent: 'center', paddingLeft: 30 }}
                    onPress={props.openDatePicker}
                >
                    <Text style={{ fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.palceHolder_grey }}>{date}</Text>
                </TouchableOpacity>
                <View style={{ marginLeft: 2, marginTop: 8 }}>
                    <Text style={styles.birthdayRewardTextStyle}>{onBoarding.BIRTHDAY_REWARD_QUATE}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity style={props.genderSelectedId == 1 ? styles.maleBtn_selected : styles.maleBtn_unselected}
                        onPress={() => props.genderSelected(1)}
                    >
                        <Text style={props.genderSelectedId == 1 ? styles.genderText_selected : styles.genderText_unselected}>{onBoarding.MALE}</Text>
                    </TouchableOpacity>
                    <View style={{ width: 10 }}></View>
                    <TouchableOpacity style={props.genderSelectedId == 2 ? styles.maleBtn_selected : styles.maleBtn_unselected}
                        onPress={() => props.genderSelected(2)}
                    >
                        <Text style={props.genderSelectedId == 2 ? styles.genderText_selected : styles.genderText_unselected}>{onBoarding.FEMALE}</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.headingTextStyle}>{onBoarding.FITNESS_INTRESTS}</Text>
                </View>
                {/* <TouchableOpacity style={styles.nextBtnViewStyle}
                            // onPress={() => navigation.navigate('onBoardingScreen')}
                        >
                            <Text style={styles.nextBtnTextStyle}>{LoginConstants.NEXT_BTN}</Text>
                        </TouchableOpacity> */}
            </View>
            <DatePicker
                modal
                open={props.visible}
                date={props.selectedDate}
                mode={'date'}
maximumDate={new Date()}
                onConfirm={(date) =>{ props.onConfirm(date)
                    let new_date = moment(date).format('DD-MM-YYYY')
                    setDate(new_date)
                }}
                onCancel={ props.onCancelDatePicker}
            />
        </View>
    )
}

export default FlatListHeader