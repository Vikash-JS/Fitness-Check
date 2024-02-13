import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { styles } from '../onBoard/onBoardingStyle';
import imagesFile from '../../../../assets/imagesFile';
import InputBox from '../../commonComponents/InputBox';
import { onBoarding, dropdownList } from '../onBoardingConstants';
import { Colors, Fonts } from '../../../utils/Constants';
import IncDecInputBox from '../../commonComponents/IncDecInputBox';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import InputBox_new from './InputBox_new';
import InputLabel from '../../commonComponents/InputLabel';

const FlatListFooter = (props) => {
    const navigation = useNavigation()
    const [selectGoal, setSelectGoal] = useState('')
    return (
        <View style={{ flex: 1, }}>
            <View style={{ marginTop: 20 }}>
                <Text style={styles.headingTextStyle}>{onBoarding.WHAT_IS_YOUR_FITNESS_GOAL}</Text>
            </View>
            {/* <View style={{ marginTop: 10, }}>
                <Text style={{ fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.palceHolder_grey }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Text>
            </View> */}
            <View style={{ marginTop: 20 }}>
                <SelectList
                    placeholder={"Select"}
                    inputStyles={{ color: Colors.palceHolder_grey, fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, }}
                    dropdownTextStyles={{ fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.palceHolder_grey }}
                    disabledTextStyles={{ fontSize: 12, fontFamily: Fonts.gilroy_SemiBold, color: Colors.pink }}
                    boxStyles={{ borderRadius: 7, alignItems: 'center', borderColor: Colors.inputGrey }}
                    dropdownStyles={{ borderWidth: 0 }}
                    setSelected={(val) => props.dropDown(val)}
                    data={dropdownList}
                    save="value"
                />
            </View>
            <View style={{ marginTop: 20, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <InputBox_new
                        placeholder={onBoarding.CURRRENT_HEIGHT}
                        value={props.Heightvalue}
                        onChangeText={props.onHeightChangeText}
                        keyboardType={'numeric'}
                        unit={"inches"}
                    />

                </View>
                <View style={{ width: 10 }}></View>
                <View style={{ flex: 1 }}>
                    <InputBox_new
                        placeholder={onBoarding.CURRENT_WEIGHT}
                        value={props.Weightvalue}
                        onChangeText={props.onWeightChangeText}
                        keyboardType={'numeric'}
                        unit={"KG"}
                    />
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <InputBox_new
                    placeholder={onBoarding.TARGET_WEIGHT}
                    value={props.TargetWeightvalue}
                    onChangeText={props.onTargetWeightChangeText}
                    keyboardType={'numeric'}
                    unit={"KG"}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <Text style={{ fontFamily: Fonts.gilroy_SemiBold, fontSize: 12, color: Colors.palceHolder_grey }}> Workout Frequency (In a week)</Text>
            </View>
            <View style={{ marginTop: 5 }}>
                <InputBox_new
                    placeholder={onBoarding.WORKOUT_FREQUENCY}
                    value={props.WorkoutFrequencyvalue}
                    onChangeText={props.onWorkoutFrequencyChangeText}
                    keyboardType={'numeric'}
                />
            </View>
            <View style={{ marginTop: 20 }}>
                <InputBox_new
                    placeholder={onBoarding.FOOD_PREFERENCE}
                    value={props.Foodvalue}
                    onChangeText={props.onFoodChangeText}
                />
            </View>

            <TouchableOpacity style={{ marginTop: 20, height: 54, backgroundColor: Colors.blue, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}
                onPress={props.onPress}
            >
                <Text style={{ fontFamily: Fonts.gilroy_SemiBold, fontSize: 14, color: Colors.white }}>{onBoarding.GO_TO_DASHBOARD}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default FlatListFooter;