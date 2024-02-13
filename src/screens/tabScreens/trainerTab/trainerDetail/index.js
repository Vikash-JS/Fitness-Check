import React, { useEffect, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  FlatList,
  Alert,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import FlatListHeader from './FlatListHeader';
import { Colors, Fonts } from '../../../../utils/Constants';
import MyStatusBar from '../../../commonComponents/MyStatusBar';
import imagesFile from '../../../../../assets/imagesFile';
import PackageCard from './PackageCard';
import ReviewCard from './ReviewCard';
import {
  Get_Trainer_Detail_ByID,
  PackageAllDetails,
  TrainerFeeds,
  TrainerReview,
  FollowTrainer,
  UnFollowTrainer,
  Package_By_TrainerId
} from '../../../../apiManager/trainer/index';
import { Toaster } from '../../../commonComponents/Toaster';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../../commonComponents/Loader';


const windowWidth = Dimensions.get('window').width / 3;

const TrainerProfile = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const [TrainerId, setTrainerId] = useState(route.params.TrainerId);
  console.log('my trainer id=========>', TrainerId);
  const [detailId, SetDetailId] = useState(route.params.TrainerId);
  console.log('id detailid========>', detailId);
  const [Trainer, setTrainerData] = useState();
  const [feeds, Setfeeds] = useState([]);
  const [Package, setpackage] = useState([]);
  const [details, setdetails] = useState([{ id: 1 }]);
  const [follower, Setfollower] = useState();
  const [rating, SetAverageRating] = useState();
  const [review, setReview] = useState();
  const [isFollow, setIsFollow] = useState()
  const [extraData, setExtraData] = useState(new Date())
  const [loader, setLoader] = useState(false)
  const renderDetails = () => { };
  const getDtetalis_ByID = () => {
    console.log('Called=============');
    setLoader(true)
    Get_Trainer_Detail_ByID(detailId)
      .then(response => {
        if (response.status == 200) {
          console.log('trainerRespbyId======.....', response);
          setTrainerData(response.data.trainer);
          Setfollower(response.data.followers);
          SetAverageRating(response.data.avgRating);
          setIsFollow(response.data.isFollow)
          setLoader(false)
        }
      })
      .catch(error => {
        setLoader(false)
        console.log('Trainererrrrorrrrrrr=====>', error);
      });
  };



  const PackageDetails = () => {
    setLoader(true)
    PackageAllDetails()
      .then(response => {
        if (response.status == 200) {
          console.log('PackageDetails======.....', response);
          setpackage(response.data.packages);
          setLoader(false)
        }
      })
      .catch(error => {
        setLoader(false)
        console.log('Trainererrrrorrrrrrr=====>', error);
      });
  };

  const numOfColm = 3;
  const [FlatThreeColumn, setFlatThreeColumn] = useState(3);
  const [FlatColumn1, setFlatColoumn1] = useState(1);
  const [selectedIndex, setSelectedIndex] = useState(0);


  const getPackageByTrainerId = () => {
    setLoader(true)
    Package_By_TrainerId(detailId).then((response) => {
      if (response.status == 200) {
        console.log('PackageDetails======.....', response);
        setpackage(response.data.packages);
        setLoader(false)
      }
    }).catch((error) => {
      setLoader(false)
      console.log("packageByIdErr=======", error)
    })
  }

  const selectTab = id => {
    console.log('SelectedID==============>', id);
    setSelectedIndex(id);
    if (id == 2) {
      getPackageByTrainerId();
    }
    if (id == 3) {
      console.log('SelectedID==============>', id);
      RatingviewApi();
    }
  };

  const GetFeeddetails = () => {
    setLoader(true)
    TrainerFeeds(detailId)
      .then(response => {
        if (response.status == 200) {
          console.log('Feedetails======>.....', response);
          Setfeeds(response.data.feeds);
          setLoader(false)
        }
      })
      .catch(error => {
        setLoader(false)
        console.log('Trainererrrrorrrrrrr=====>', error);
      });
  };

  const follow_unFollow = () => {

    let followCount = follower
    if (isFollow) {
      followCount = followCount - 1
      Setfollower(followCount)
      setIsFollow(false)
      setExtraData(new Date())
      UnFollowTrainer(detailId).then((response) => {
        if (response.status == 200) {
          Toaster(response.message)
        }
      }).catch((error) => {
        console.log("unfollowErr======", error)
      })
    } else {
      followCount = followCount + 1
      Setfollower(followCount)
      setIsFollow(true)
      setExtraData(new Date())
      FollowTrainer(detailId).then((response) => {
        if (response.status == 200) {
          Toaster(response.message)
        }
      }).catch((error) => {
        console.log("followerr=======", erro)
      })
    }

  }

  const renderItem_feeds = ({ item }) => (
    <TouchableOpacity
      style={{
        width: windowWidth - 1,
        borderColor: Colors.white,
        overflow: 'hidden',
        borderWidth: 1,
      }}
      onPress={() => navigation.navigate('CommentScreen', { post: item })}
    //  onPress={() => console.log("items=========", item)}
    >
      {item?.multiMedia[0]?.fileType == "Image" ?
        <Image
          style={{ width: windowWidth - 1, height: 123 }}
          source={{ uri: item.multiMedia[0].url }}
        /> :
        <Image
          style={{ width: windowWidth - 1, height: 123 }}
          source={imagesFile.ic_demo}
        />
      }
      {/* //<Video source={{uri:item.multiMedia[0].url}}  */}
    </TouchableOpacity>
  );
  const renderItem_Package = ({ item, index }) => (
    <PackageCard index={index} item={item} />
  );

  const RatingviewApi = () => {
    TrainerReview(TrainerId)
      .then(response => {
        if (response.status == 200) {
          console.log('my review=======>', response);
          setReview(response.data.ratingReview);
        }
      })
      .catch(error => {
        console.log('my rerrrorrr========>', error);
      });
  };
  const renderItem_Review = ({ item }) => <ReviewCard item={item} />;

  const Footer = () => {
    return <View style={{ height: 80 }}></View>;
  };
  useEffect(() => {
    getDtetalis_ByID();
    GetFeeddetails();
  }, []);

  return (
    <>
      <MyStatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
        <View>
          {selectedIndex == 0 ? (
            <FlatList
              extraData={extraData}
              numColumns={FlatThreeColumn}
              data={feeds}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem_feeds}
              keyExtractor={item => item._id}
              ListHeaderComponent={
                <FlatListHeader
                  onMessengerClick={() => navigation.navigate('MessageScreen', { profileImg: Trainer.profilePicture.url, trainerId: TrainerId, firstName: Trainer.firstName, lastName: Trainer.lastName })}
                  follow={() => follow_unFollow()}
                  isFollow={isFollow}
                  index={selectedIndex}
                  onPress={id => selectTab(id)}
                  Trainer={Trainer}
                  follower={follower}
                  trainerid={TrainerId}
                  averageRating={rating}
                />
              }
              ListFooterComponent={<Footer />}
            />
          ) : null}

          {selectedIndex == 1 ? (
            <FlatList
              numColumns={FlatThreeColumn}
              data={details}
              showsVerticalScrollIndicator={false}
              renderItem={renderDetails}
              keyExtractor={item => item.id}
              ListHeaderComponent={
                <FlatListHeader
                  onMessengerClick={() => navigation.navigate('MessageScreen', { profileImg: Trainer.profilePicture.url, trainerId: TrainerId, firstName: Trainer.firstName, lastName: Trainer.lastName })}
                  follow={() => follow_unFollow()}
                  isFollow={isFollow}
                  index={selectedIndex}
                  onPress={id => selectTab(id)}
                  Trainer={Trainer}
                  trainerid={TrainerId}
                  averageRating={rating}
                  follower={follower}
                />
              }
              ListFooterComponent={<Footer />}
            />
          ) : null}
          {selectedIndex == 2 ? (
            <FlatList
              numColumns={FlatColumn1}
              data={Package}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem_Package}
              keyExtractor={item => item.id}
              ListHeaderComponent={
                <FlatListHeader
                  onMessengerClick={() => navigation.navigate('MessageScreen', { profileImg: Trainer.profilePicture.url, trainerId: TrainerId, firstName: Trainer.firstName, lastName: Trainer.lastName })}
                  follow={() => follow_unFollow()}
                  isFollow={isFollow}
                  index={selectedIndex}
                  onPress={id => selectTab(id)}
                  Trainer={Trainer}
                  trainerid={TrainerId}
                  averageRating={rating}
                  follower={follower}
                />
              }
              ListFooterComponent={<Footer />}
            />
          ) : null}

          {selectedIndex == 3 ? (
            <FlatList
              numColumns={FlatColumn1}
              data={review}
              showsVerticalScrollIndicator={false}
              renderItem={renderItem_Review}
              keyExtractor={item => item.id}
              ListHeaderComponent={
                <FlatListHeader
                  onMessengerClick={() => navigation.navigate('MessageScreen', { profileImg: Trainer.profilePicture.url, trainerId: TrainerId, firstName: Trainer.firstName, lastName: Trainer.lastName })}
                  follow={() => follow_unFollow()}
                  isFollow={isFollow}
                  index={selectedIndex}
                  onPress={id => selectTab(id)}
                  Trainer={Trainer}
                  trainerid={TrainerId}
                  averageRating={rating}
                  follower={follower}
                />
              }
              ListFooterComponent={<Footer />}
            />
          ) : null}
        </View>
        {loader ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};

export default TrainerProfile;
