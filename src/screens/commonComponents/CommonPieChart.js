import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import PieChart from 'react-native-pie-chart';
import { Colors, Fonts, CommonConstants } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
const widthAndHeight = 250

const CommonPieChart = (props) => {
    return (
        <View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:15.5}}>
                <PieChart
                    widthAndHeight={widthAndHeight}
                    series={props.series}
                    sliceColor={props.sliceColor}
                    doughnut={true}
                    coverRadius={0.75}
                />
                <View style={{position:'absolute'}}>
                    <Text style={styles.bold_16_black}>3 Kcal</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row',width:"100%",marginTop:25.5 }}>
                <View style={{ flexDirection: 'row' ,marginLeft:20}}>
                    <View>
                        <Image source={imagesFile.ic_redInd} />
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <View>
                            <Text style={styles.bold_12_black}>{CommonConstants.PROTEIN}</Text>
                        </View>
                        <View>
                            <Text style={styles.medium_10_black}>50gm</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image source={imagesFile.ic_yellowInd} />
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <View>
                            <Text style={styles.bold_12_black}>{CommonConstants.CARBS}</Text>
                        </View>
                        <View>
                            <Text style={styles.medium_10_black}>50gm</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}></View>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image source={imagesFile.ic_greenInd} />
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <View>
                            <Text style={styles.bold_12_black}>{CommonConstants.FATS}</Text>
                        </View>
                        <View>
                            <Text style={styles.medium_10_black}>50gm</Text>
                        </View>
                    </View>
                </View>
                <View style={{flex:1}}></View>
                <View style={{ flexDirection: 'row' ,marginRight:20}}>
                    <View>
                        <Image source={imagesFile.ic_greyInd} />
                    </View>
                    <View style={{ marginLeft: 5 }}>
                        <View>
                            <Text style={styles.bold_12_black}>{CommonConstants.REMAINING}</Text>
                        </View>
                        <View>
                            <Text style={styles.medium_10_black}>50gm</Text>
                        </View>
                    </View>
                </View>
            </View>

        </View>
    )
}

export default CommonPieChart;

const styles = StyleSheet.create({
    bold_12_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 12,
        color: Colors.black
    },
    medium_10_black: {
        fontFamily: Fonts.gilroy_Medium,
        fontSize: 10,
        color: Colors.black
    },
    bold_16_black:{
        fontFamily:Fonts.gilroy_Bold,
        fontSize:16,
        color:Colors.black
    }
})