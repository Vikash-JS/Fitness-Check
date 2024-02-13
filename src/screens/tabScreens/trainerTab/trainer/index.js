import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import FlatListHeader from './FlatListHeader';
import imagesFile from '../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../utils/Constants';
import MyTrainerCard from './MyTrainerCard';
import MyStatusBar from '../../../commonComponents/MyStatusBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Get_All_Trainer, Get_My_TrainerList, Search_Trainer, Search_My_Trainer } from '../../../../apiManager/trainer/index';
import Loader from '../../../commonComponents/Loader';
import EmptyComponent from '../../../commonComponents/EmptyComponent';
import TrainerFilterModal from '../../../modals/TrainerFilterModal';

const TrainerHomeScreen = (props) => {
  const coloumn = 2;
  const navigation = useNavigation();
  const route = useRoute();
  const [index, setIndex] = useState(route?.params?.index ? route?.params?.index : 0);
  const [allTrainers, setAllTrainers] = useState([]);
  const [myTrainer_List, setMyTrainer_List] = useState([])
  const [loader, setLoader] = useState(false)
  const [extraData, setExtraData] = useState(new Date())
  const [search, setSearch] = useState('')
  const [adsUri, setAdsUri] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [filterTrainerId, setFilterTrainerId] = useState('')
  const [gender, setGender] = useState('')
  const [speciality, setSpeciality] = useState([])
  useEffect(() => {
    console.log("routeIndex=========", route?.params?.index)
    if (index == 0) {
      myTrainerList()
    } else {
      allTrainerApi();
    }

  }, []);

  const onSelectTab = (id) => {
    console.log("index========", id)
    if (id == 0 && myTrainer_List.length == 0) {
      myTrainerList();
    } else if (id == 1 && allTrainers.length == 0) {
      allTrainerApi();
    }
    setIndex(id);
  };

  const pullToRefresh = () => {
    if (index == 0) {
      myTrainerList();
    } else {
      allTrainerApi();
    }
  }

  const myTrainerList = () => {
    setLoader(true)
    Get_My_TrainerList().then((response) => {
      if (response.status == 200) {
        console.log("myTrainerResp======", response)
        setMyTrainer_List(response.data.trainers)
        setLoader(false)
      }
    }).catch((error) => {
      setLoader(false)
      console.log("myTrainerErr========", error)
    })
  }

  const allTrainerApi = () => {
    setLoader(true)
    Get_All_Trainer()
      .then(response => {
        if (response.status == 200) {
          setLoader(false)
          console.log('trainerResp======', response);
          setAllTrainers(response.data.trainers);
        }
      })
      .catch(error => {
        setLoader(false)
        console.log('AllTrainerErr====', error);
      });
  };

  const searchTrainer = (text, gender, speciality) => {
    var raw
    console.log("search=======", text)
    setSearch(text)

    if (index == 0) {

      raw = JSON.stringify({ "name": text, "gender": gender, "specialty": speciality.toString() });

      Search_My_Trainer(raw).then((response) => {
        if (response.status == 200) {
          console.log("mySearchResp=======", response)
          setMyTrainer_List(response.data.trainers)
        }

      }).catch((error) => {
        console.log("searchMy======", error)
      })

    } else {
      setAllTrainers([])
      // raw = JSON.stringify({ "search": text });
      raw = JSON.stringify({ "name": text, "gender": gender, "specialty": speciality.toString() });
      Search_Trainer(raw).then((response) => {
        console.log("searchResp=========", response)
        if (response.status == 200) {
          setAllTrainers(response.data.trainers)
        }

      }).catch((error) => {
        console.log("searchErr=======", error)
      })
    }

  }

  const addFilter = (gender, speciality) => {
    console.log("filterData=======", gender, speciality)
    setGender(gender)
    setSpeciality(speciality)
    setModalVisible(false)
    searchTrainer(search, gender, speciality)

  }

  const onClearFilter = () => {
    setGender("")
    setSpeciality([])
    searchTrainer(search, "", "")
  }

  const renderItem = ({ item }) => {

    return (
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() =>
          navigation.navigate('TrainerProfile', {
            TrainerId: item._id,
          })
        }>
        <MyTrainerCard item={item} onPressMessage={(id) => navigation.push('MessageScreen', { profileImg: item.profilePicture.url, trainerId: id, firstName: item.firstName, lastName: item.lastName })} item={item} />
      </TouchableOpacity>
    );
  };
  const Footer = () => {
    return <View style={{ height: 80 }}></View>;
  };

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={index == 0 ? myTrainer_List : allTrainers}
            renderItem={renderItem}
            // keyExtractor={item => item._id}
            numColumns={coloumn}
            ListHeaderComponent={
              <FlatListHeader
                gender={gender}
                specialty={speciality}
                value={search}
                index={index}
                from={"trainer"}
                onChangeText={(text) => searchTrainer(text, gender, speciality)}
                onPressTab={(id) => onSelectTab(id)}
                onFilterPress={() => setModalVisible(true)}
                clearFilter={() => onClearFilter()}
              />
            }
            refreshing={false}
            onRefresh={pullToRefresh}
            ListFooterComponent={<Footer />}
            ListEmptyComponent={<EmptyComponent Heading={index == 0 ? "Empty Trainer!" : "Empty Library!"} />}
          />
        </View>
        {modalVisible ? <TrainerFilterModal
          gender={gender}
          speciality={speciality}
          filterId={filterTrainerId}
          addFilter={(gender, speciality) => addFilter(gender, speciality)}
          cancelModal={() => setModalVisible(false)}
          visible={modalVisible}
        /> : null}
        {loader ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};
export default TrainerHomeScreen;
