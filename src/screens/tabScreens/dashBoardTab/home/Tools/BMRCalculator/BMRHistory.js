import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Alert,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import Loader from '../../../../../commonComponents/Loader';
import EmptyComponent from '../../../../../commonComponents/EmptyComponent';
import {useNavigation} from '@react-navigation/native';
import AppHeader from '../../../../../commonComponents/AppHeader';
import {
  Remove_BMR,
  getBmrHistoryList,
} from '../../../../../../apiManager/tools';
import {Toaster} from '../../../../../commonComponents/Toaster';
import DropShadow from 'react-native-drop-shadow';
import imagesFile from '../../../../../../../assets/imagesFile';
import {Path, Svg} from 'react-native-svg';
import moment from 'moment';

const BMRHistory = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    Get_History();
  }, []);

  const Get_History = () => {
    getBmrHistoryList()
      .then(list => {
        setLoader(false);
        setFileList(list?.data);
      })
      .catch(err => {
        setLoader(false);
        Toaster(err);
      });
  };

  const removeBmr = item => {
    setLoader(true);
    Remove_BMR(item?._id)
      .then(res => {
        console.log('res:****** ', res);
        setLoader(false);
        Get_History();
        // Toaster(res?.message);
      })
      .catch(err => {
        setLoader(false);
        // Toaster(err);
      });
  };
  const renderItem = ({item, index}) => {
    console.log('item: ', item);
    return (
      <>
        {index == 0 && (
          <View style={styles.bmrHeading}>
            <Text style={styles.semiBold_15_black}>{'Date'}</Text>
            <Text style={[styles.semiBold_15_black, {marginLeft: 15}]}>
              {'BMR Cal/day'}
            </Text>
            <Text style={styles.semiBold_15_black}>{'Remove'}</Text>
          </View>
        )}
        <DropShadow style={styles.shadowProp}>
          <View style={styles.mainContainer}>
            <Text style={styles.Regular15_black}>
              {moment(item?.createdAt).format('DD MMMM YY')}
            </Text>
            <Text style={[styles.Regular15_black, {marginLeft: -15}]}>
              {item?.bmrValue}
            </Text>
            <TouchableOpacity onPress={() => removeBmr(item)}>
              <DeleteIcon />
            </TouchableOpacity>
          </View>
        </DropShadow>
      </>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <AppHeader Heading={'BMR History'} onPress={() => navigation.goBack()} />
      <FlatList
        data={fileList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        // ListHeaderComponent={<FlatListHeader onFilterPress={()=>onFilterTab()} />}
        // ListFooterComponent={<Footer/>}
        ListEmptyComponent={
          !loader && <EmptyComponent Heading={'No History Found!'} />
        }
      />
      {loader ? <Loader /> : null}

      {/* <View style={{ flex: 1 }}
            </View>
            {modalVisible ? <FilterModal cancelModal={()=>setModalVisible(false)} visible={modalVisible}/> : null}  */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 2,
  },
  mainContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    borderRadius: 7,
    marginTop: 10,
    padding: 10,
    marginVertical: 15,
    marginHorizontal: 18,
  },
  Regular15_black: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 15,
    color: Colors.black,
  },
  semiBold_15_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 15,
    color: Colors.black,
  },
  bmrHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
    padding: 10,
  },
});

export default BMRHistory;

const DeleteIcon = props => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={25}
      height={25}
      className="icon"
      viewBox="0 0 1024 1024"
      {...props}>
      <Path
        fill="#fff"
        d="M667.8 362.1H304V830c0 28.2 23 51 51.3 51h312.4c28.4 0 51.4-22.8 51.4-51V362.2h-51.3z"
      />
      <Path
        fill="#fff"
        d="M750.3 295.2c0-8.9-7.6-16.1-17-16.1H289.9c-9.4 0-17 7.2-17 16.1v50.9c0 8.9 7.6 16.1 17 16.1h443.4c9.4 0 17-7.2 17-16.1v-50.9z"
      />
      <Path
        fill="#211F1E"
        d="M733.3 258.3H626.6V196c0-11.5-9.3-20.8-20.8-20.8H419.1c-11.5 0-20.8 9.3-20.8 20.8v62.3H289.9c-20.8 0-37.7 16.5-37.7 36.8V346c0 18.1 13.5 33.1 31.1 36.2V830c0 39.6 32.3 71.8 72.1 71.8h312.4c39.8 0 72.1-32.2 72.1-71.8V382.2c17.7-3.1 31.1-18.1 31.1-36.2v-50.9c.1-20.2-16.9-36.8-37.7-36.8zm-293.5-41.5h145.3v41.5H439.8v-41.5zm-146.2 83.1h435.9v41.5H293.6v-41.5zm404.8 530.2c0 16.7-13.7 30.3-30.6 30.3H355.4c-16.9 0-30.6-13.6-30.6-30.3V382.9h373.6v447.2z"
      />
      <Path
        fill="#211F1E"
        d="M511.6 798.9c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.4 9.3 20.7 20.8 20.7zm-103.8 0c11.5 0 20.8-9.3 20.8-20.8V466.8c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c.1 11.4 9.4 20.7 20.8 20.7zm207.6.7c11.5 0 20.8-9.3 20.8-20.8V467.4c0-11.5-9.3-20.8-20.8-20.8s-20.8 9.3-20.8 20.8v311.4c0 11.5 9.3 20.8 20.8 20.8z"
      />
    </Svg>
  );
};
