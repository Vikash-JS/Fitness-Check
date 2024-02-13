import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, TouchableOpacity } from 'react-native';
import FlatListHeader from './FlatListHeader';
import { Colors, Fonts } from '../../../../../../../utils/Constants';
import imagesFile from '../../../../../../../../assets/imagesFile';
import FormsCard from '../../../../../../commonComponents/FormsCard';
import FilterModal from '../../../../../../modals/FilterModal';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Get_All_Forms } from '../../../../../../../apiManager/form/index';
import EmptyComponent from '../../../../../../commonComponents/EmptyComponent';
import Loader from '../../../../../../commonComponents/Loader';
const FormScreen = () => {
    const navigation = useNavigation()
    const [modalVisible, setModalVisible] = useState(false)
    const [formList, setFormList] = useState([])
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        GetAllForms()
    }, [])
    const pullToRefresh = () => {
        GetAllForms()
    }

    const GetAllForms = () => {
        setLoader(true)

        Get_All_Forms().then((response) => {
            if (response.status == 200) {
                console.log("AllFormResp=========", response)
                setLoader(false)
                setFormList(response.data.forms)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("AllFormsErr========", error)
        })
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("FormDetailScreen", { title: item.formId.title, FormId: item._id, TrainerId: item.trainerId._id, businessId: item.businessId })}>
            <FormsCard item={item} />
        </TouchableOpacity>
    )
    const Footer = () => {
        return (
            <View style={{ height: 80 }}>

            </View>
        )
    }
    const onFilterTab = () => {
        setModalVisible(true)
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={formList}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListHeaderComponent={<FlatListHeader onFilterPress={() => onFilterTab()} />}
                    ListFooterComponent={<Footer />}
                    ListEmptyComponent={!loader && !formList.length && <EmptyComponent Heading={"Empty Forms!"} />}
                    refreshing={false}
                    onRefresh={pullToRefresh}
                />
            </View>
            {modalVisible ? <FilterModal cancelModal={() => setModalVisible(false)} visible={modalVisible} /> : null}
            {loader && <Loader />}

        </SafeAreaView>
    )
}

export default FormScreen;