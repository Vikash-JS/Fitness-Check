import React from 'react';
import { View, Text, Modal, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Fonts } from '../../utils/Constants';
import { CountryCode } from '../auth/authConstants';
const CountryCodeModal = (props) => {

    const renderItem = ({ item }) => (
        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: Colors.inputGrey, height: 30 }}
            onPress={() => props.onselect(item.code)}
        >
            <Text>{item.code}</Text>
        </TouchableOpacity>
    )

    return (
        <Modal
            animationType='slide'
            visible={props.visible}
            presentationStyle={'overFullScreen'}
            transparent={true}
        >
            <TouchableOpacity style={styles.main_containerStyle}
                onPress={props.cancelModal}
            >
                <View style={styles.subContainerStyle}>
                    <FlatList
                        style={{ marginTop: 20, marginBottom: 20 }}
                        data={CountryCode}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />
                </View>
            </TouchableOpacity>
        </Modal>
    )
}

export default CountryCodeModal;

const styles = StyleSheet.create({
    main_containerStyle: {
        justifyContent: 'center',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
    subContainerStyle: {
        marginLeft: 18,
        borderRadius: 20,
        marginTop: "47%",
        width: 80,
        height: "32%",
        backgroundColor: Colors.white
    }
})
