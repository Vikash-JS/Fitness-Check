import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList, Alert } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';

const NutritionDetailCard = (props) => {
    const [totalCalories, setTotalCalories] = useState(0)
    const [meals, setMeals] = useState(props.item.meals)
    const [microNutrients, setMicroNutrients] = useState()
    const [nutritionDetail, setNutritionDetail] = useState(props.detail)
    const [type, setType] = useState(props.type)
    const [macros, setMacros] = useState([])
    useEffect(() => {
        console.log('nutritionDetail======', nutritionDetail[0]?.mealGroup)
        console.log('microNutrients======', nutritionDetail[0]?.microNutrients)

        let Cal = 0
        props.item.meals.forEach(element => {
            console.log("mealsData========", element)
            Cal = Cal + element.calories
        });
        setTotalCalories(Cal)
        console.log("mealsCalories========", Cal)
    }, [])

    const checkValidate = (id) => {
        var MarkedDone = false
        if (nutritionDetail[0]?.activity?.length > 0) {
            nutritionDetail[0].activity.forEach(element1 => {
                if (id == element1.mealId) {
                    console.log("yaha aa raha hai===========IN CHILD**", id, element1.mealId)
                    MarkedDone = true
                }
            });
        }
        return MarkedDone
    }

    const renderItem = ({ item, index }) => (
        <View style={styles.subContianer}>
            <View style={styles.renderRowStyle}>
                <View>
                    <Text style={styles.semiBold_12_black}>{item.itemName}</Text>
                </View>
                <View style={{ flex: 1 }}></View>
                <View>
                    <Text style={styles.medium_10_blue}>{Number(item.calories).toFixed(2)}</Text>
                </View>
                {type == 'my' ?
                    <TouchableOpacity style={{ marginLeft: 10, width: 25, height: 25, justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => props.onSelect(item._id, index)}
                    >
                        <Image source={checkValidate(item._id) == true ? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
                    </TouchableOpacity> : null}
            </View>
        </View>
    )

    return (
        meals.length > 0 ?
            <View style={styles.mainContainer}>
                <View >
                    <View>
                        <Text style={styles.bold_18_black}>{props.item.mealName}</Text>
                    </View>
                    <View style={{ borderWidth: 0.2, width: "100%", borderColor: Colors.black, opacity: 0.2, marginTop: 10 }}></View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 11 }}>
                        <View>
                            <Text style={styles.medium_10_opacity}>calories</Text>
                        </View>
                        <View style={{ flex: 1 }}></View>
                        <View>
                            <Text style={styles.bold_14_blue}>{Number(totalCalories).toFixed(2)} kcal</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <FlatList
                        data={props.item.meals}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            : null
    )
}

export default NutritionDetailCard;

const styles = StyleSheet.create({

    mainContainer: {
        backgroundColor: '#FAFAFA',
        padding: 20,
        flex: 1,
        marginHorizontal: 10,
        borderRadius: 20,
        marginTop: 20
    },
    bold_18_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 18,
        color: Colors.black
    },
    medium_10_opacity: {
        fontFamily: Fonts.gilroy_Medium,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.4
    },
    medium_10_blue: {
        fontFamily: Fonts.gilroy_Medium,
        fontSize: 10,
        color: Colors.blue
    },
    medium_9_opacity: {
        fontFamily: Fonts.gilroy_Medium,
        fontSize: 9,
        color: Colors.black,
        opacity: 0.4
    },

    bold_14_blue: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 14,
        color: Colors.blue
    },
    semiBold_12_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black,

    },
    subContianer: {

        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row',
        marginTop: 11,
        // borderWidth:1
    },
    timeView: {
        borderWidth: 1,
        borderColor: Colors.inputGrey,
        borderRadius: 7,
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    renderRowStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})