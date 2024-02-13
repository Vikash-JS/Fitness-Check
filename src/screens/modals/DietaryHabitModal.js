import React from 'react';
import { Modal, View, Text, TouchableOpacity, FlatList, Image, StyleSheet } from 'react-native';
import SingleButton from '../commonComponents/SingleButton';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';

const DiataryHabitValue = [
    {
        "id": "1",
        "heading": "I prefer",
        "value": [
            {
                "id": 1,
                "option": "Veg",
                "parentId":1
            },
            {
                "id": 2,
                "option": "Non Veg",
                "parentId":1
            },
            {
                "id": 3,
                "option": "Eggetarian",
                "parentId":1
            },
            {
                "id": 4,
                "option": "Vegan",
                "parentId":1
            },
        ],
    },
    {
        "id": "2",
        "heading": "My Daily caffeine consumption is",
        "value": [
            {
                "id": 1,
                "option": "Low",
                "parentId":2
            },
            {
                "id": 2,
                "option": "Average",
                "parentId":2
            },
            {
                "id": 3,
                "option": "High",
                "parentId":2
            },
        ],
    },
    {
        "id": "3",
        "heading": "Meals per day",
        "value": [
            {
                "id": 1,
                "option": "1 Meal",
                "parentId":3
            },
            {
                "id": 2,
                "option": "2 Meal",
                "parentId":3
            },
            {
                "id": 3,
                "option": "3 Meal",
                "parentId":3
            },
            {
                "id": 4,
                "option": "4 Meal",
                "parentId":3
            },
            {
                "id": 5,
                "option": "5+ Means per day",
                "parentId":3
            },
        ],
    },
    {
        "id": "4",
        "heading": "Have you ever consumed any supplements in the past? I.e. Whey, multivitamin, etc",
        "value": [
            {
                "id": 1,
                "option": "Yes",
                
                "parentId":4
            },
            {
                "id": 2,
                "option": "No",
                "parentId":4
            },
        ],
    },
]

const DietaryHabitModal = (props) => {

    const FlatListHeader = () => {
        return (
            <View style={styles.headerStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.semibold_17_black}>Dietary Habits</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                    <TouchableOpacity
                        onPress={props.cancelModal}
                    >
                        <Image source={imagesFile.ic_cross} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderItem1 = ({item}) => (
        <TouchableOpacity style={{flexDirection:'row',paddingVertical:5}}
        onPress={()=>props.onSelectDiet(item.option,item.parentId)}
        >
            <View>
                <Image source={props.prefer == item.option?imagesFile.ic_blueTick:props.caffine == item.option?imagesFile.ic_blueTick :props.mealsPerDay == item.option? imagesFile.ic_blueTick :props.supplement == item.option? imagesFile.ic_blueTick : imagesFile.ic_recWhiteDot} />
            </View>
            <View style={{ marginLeft: 8 }}>
                <Text style={styles.semibold_14_black}>{ item.option}</Text>
            </View>
        </TouchableOpacity>
    )

    const renderItem = ({ item }) => (
        <View style={styles.renderContainerStyle}>
            <View style={{marginBottom:16}}>
                <Text style={styles.semibold_12_opacity}>{item.heading}</Text>
            </View>
            <View>
                <FlatList
                    data={item.value}
                    renderItem={renderItem1}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )

    const Footer = () => {
        return (
            <View style={{marginBottom:30}}>
                <SingleButton name="Done" onPress={props.DietaryModalDone} />
            </View>
        )
    }

    return (
        <Modal
            animationType='slide'
            visible={props.visible}
            presentationStyle={'overFullScreen'}
            transparent={true}
        >
            <View style={styles.mainContainer}>
                <View style={styles.subContainerStyle}>
                    <FlatList
                        data={DiataryHabitValue}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<FlatListHeader />}
                        ListFooterComponent={<Footer />}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default DietaryHabitModal;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-end',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    subContainerStyle: {

        backgroundColor: Colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    headerStyle: {
        paddingHorizontal: 30,
        paddingTop: 20,
        marginBottom: 16
    },
    semibold_17_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 17,
        color: Colors.black
    },
    renderContainerStyle: {
        paddingHorizontal: 30,
        marginBottom: 24,
        
    },
    semibold_14_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.black
    },
    semibold_12_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 12,
        color: Colors.black,
        opacity: 0.4
    }
})