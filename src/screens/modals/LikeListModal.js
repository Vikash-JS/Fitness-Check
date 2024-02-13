import React from 'react';
import { View, Text, Modal, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import { Colors, Fonts } from '../../utils/Constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const ListLikeModal = (props) => {

    const FlatListHeader = () => {
        return (
            <View style={styles.headerStyle}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View>
                        <Text style={styles.semibold_17_black}>All Likes 👍 {props.likeList.length}</Text>
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
    const renderItem = ({ item }) => (

        <View style={{ marginTop: 15 }}>
            <View style={styles.mainCardContainer}>
                <View style={{ width: 50, height: 50, borderRadius: 25 }}>
                    <Image style={{ width: 50, height: 50, borderRadius: 25 }} source={item.likedBy.profilePicture.url ? { uri: item.likedBy.profilePicture.url } : imagesFile.ic_imgPlaceholder} />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <View>
                        <Text style={styles.bold_17_black}>{item.likedBy.fullName}</Text>
                    </View>
                    {/* <View style={{marginTop:4}}>
                        <Text style={styles.semibold_10_opacity}>{props.item.email}</Text>
                    </View> */}
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
            <View style={styles.seprator}></View>
        </View>
    )

    const Footer = () => {
        return (
            <View style={{ marginBottom: 30 }}></View>
        )
    }
    const EmptyView = () => {
        return (
            <View style={{ height: windowHeight - 200, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: Fonts.gilroy_Bold, fontSize: 30, color: Colors.inputGrey }}>Be the first to like..</Text>
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
                        showsVerticalScrollIndicator={false}
                        data={props.likeList}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<FlatListHeader />}
                        ListFooterComponent={<Footer />}
                        extraData={props.extDate}
                        ListEmptyComponent={<EmptyView />}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ListLikeModal;

const styles = StyleSheet.create({
    mainContainer: {
        justifyContent: 'flex-end',
        width: "100%",
        height: "100%",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    subContainerStyle: {
        height: "90%",
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
    },
    bold_17_black: {
        fontFamily: Fonts.gilroy_Bold,
        fontSize: 17,
        color: Colors.black
    },
    semibold_10_opacity: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 10,
        color: Colors.black,
        opacity: 0.5
    },
    mainCardContainer: {
        marginHorizontal: 18,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    seprator: {
        marginHorizontal: 18,
        borderWidth: 0.5,
        borderColor: Colors.palceHolder_grey,
        marginVertical: 15
    }
})