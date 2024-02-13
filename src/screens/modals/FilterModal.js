import React,{useState} from 'react';
import { View, Text, Modal, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import imagesFile from '../../../assets/imagesFile';
import FilterCard from '../commonComponents/FilterCard';
import MyStatusBar from '../commonComponents/MyStatusBar';

const FilterModal = (props) => {
    const [trainerName, setTrainerName] = useState(props?.filterName)

    return (
        <>
            <MyStatusBar barStyle='light-content' backgroundColor={'rgba(0, 0, 0, 0.8)'} />
            <Modal
                animationType='slide'
                visible={props.visible}
                presentationStyle={'overFullScreen'}
                transparent={true}
            >
                <View style={styles.main_containerStyle}>
                    <TouchableOpacity style={{ flex: 1 }} onPress={props.cancelModal}></TouchableOpacity>
                    <View style={styles.subContainer}>
                        <View style={styles.headingView}>
                            <View>
                                <Text style={styles.semiBold_17_black}>Filter by Trainers</Text>
                            </View>
                            <View style={{ flex: 1 }}></View>
                            <TouchableOpacity
                                onPress={props.cancelModal}
                            >
                                <Image source={imagesFile.ic_cross} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.inputSubView}>
                            <TextInput
                                value={trainerName}
                                onChangeText={(text)=>setTrainerName(text)}
                                style={styles.textInputStyle}
                                placeholder={"🔍   search"}
                            />
                        </View>
                        <TouchableOpacity style={styles.filterBtnView}
                            onPress={()=>props.addFilter(trainerName)}
                        >
                            <Text style={styles.semiBold_14_white}>Filter</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </>
    )
}

export default FilterModal;

const styles = StyleSheet.create({
    main_containerStyle: {
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.8)'
    },
    subContainer: {
        flex: 2,
        backgroundColor: Colors.white,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30
    },
    headingView: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 30
    },
    semiBold_17_black: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 17,
        color: Colors.black
    },
    filterBtnView: {
        height: 54,
        backgroundColor: Colors.blue,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 18,
        borderRadius: 5,
        marginTop: 10

    },
    semiBold_14_white: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    },
    inputSubView: {
        marginTop: 10,
        borderColor: Colors.inputGrey,
        borderWidth: 1,
        //  width: '100%',
        height: 40,
        marginHorizontal: 18,
        borderRadius: 10,
        justifyContent: 'center',
    },
    textInputStyle:{
        height: 30,
        marginHorizontal: 5,
        backgroundColor: Colors.white,
        borderRadius: 10
    }
})
