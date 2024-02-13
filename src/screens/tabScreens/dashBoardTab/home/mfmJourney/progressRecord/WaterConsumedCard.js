import React from 'react';
import { View, Text, StyleSheet, Image ,TouchableOpacity} from 'react-native';
import { Colors, Fonts } from '../../../../../../utils/Constants';
import imagesFile from '../../../../../../../assets/imagesFile';
import { ProgressRecordConstants } from '../mfmJourneyConstants';
import DropShadow from "react-native-drop-shadow";

const WaterConsumedCard = (props) => {
    return (
        <DropShadow style={styles.shadowStyle}>
            <View style={styles.mainContainer}>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                onPress={props.onPressWater}
                >
                    <View style={{ width: 2, height: 44, backgroundColor: Colors.lightBlue }}></View>
                    <View style={{ marginLeft: 10 }}>
                        <View>
                            <Text style={styles.bold_12_black}>{ProgressRecordConstants.WATER_CONSUMED}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <View>
                                <Image source={imagesFile.ic_glass} />
                            </View>
                            <View style={{ marginLeft: 6.6 }}>
                                <Text>5.0</Text>
                            </View>
                            <View>
                                <Text>ltr</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Image source={imagesFile.ic_rightArrow} />
                    </View>
                </TouchableOpacity>
                <View style={{ height: 0.5, borderColor: Colors.black, opacity: 0.1, borderWidth: 1, marginVertical: 14 }}></View>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
                onPress={props.onPressWalked}
                >
                    <View style={{ width: 2, height: 44, backgroundColor: Colors.lightGreen }}></View>
                    <View style={{ marginLeft: 10 }}>
                        <View>
                            <Text style={styles.bold_12_black}>{ProgressRecordConstants.STEP_WALKED}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', marginTop: 4 }}>
                            <View>
                                <Image source={imagesFile.ic_foot} />
                            </View>
                            <View style={{ marginLeft: 6.6 }}>
                                <Text>2500</Text>
                            </View>
                            <View>
                                <Text>Steps</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <View>
                        <Image source={imagesFile.ic_rightArrow} />
                    </View>
                </TouchableOpacity>

            </View>
        </DropShadow>
    )
}

export default WaterConsumedCard;

const styles = StyleSheet.create({

    mainContainer: {
        marginHorizontal: 18,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        backgroundColor: Colors.white
    },
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black
    },
    shadowStyle: {

        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.4,
        shadowRadius: 2,
    },
});