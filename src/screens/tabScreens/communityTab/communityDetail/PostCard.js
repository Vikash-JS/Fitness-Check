import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../utils/Constants';
import ReportPostMenu from '../../../commonComponents/ReportPostMenu';
import CustomMFMVideoPlayer from '../../../../screens/commonComponents/videoPlayer';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Directions,
  FlingGestureHandler,
  State,
} from 'react-native-gesture-handler';
import { Post_like_Api, Dislike_Post_Api, Get_All_Likes } from '../../../../apiManager/comment';
import { CommunityHomeConstants } from '../CommunityConstants';

const windowWidth = Dimensions.get('window').width;

let multiMedia = [
  {
    _id: '648823f27a9e76ebafe331f1',
    fileName: 'WIN_20230425_17_08_39_Pro.jpg',
    fileType: 'Image',
    url: 'https://myfitmantra.s3.ap-south-1.amazonaws.com/8f551660-9e5e-4c32-8a6b-510fe51c9d4c.jpg',
  },
  {
    _id: '648823f27a9e76ebafe331f1',
    fileName: 'WIN_20230425_17_08_39_Pro.jpg',
    fileType: 'Image',
    url: 'https://myfitmantra.s3.ap-south-1.amazonaws.com/8f551660-9e5e-4c32-8a6b-510fe51c9d4c.jpg',
  },
  {
    _id: '648823f27a9e76ebafe331f1',
    fileName: 'WIN_20230425_17_08_39_Pro.jpg',
    fileType: 'Image',
    url: 'https://myfitmantra.s3.ap-south-1.amazonaws.com/8f551660-9e5e-4c32-8a6b-510fe51c9d4c.jpg',
  },
];

const CustomSwiper = ({ children, onChangeIndex }) => (
  <FlingGestureHandler
    key="left"
    direction={Directions.LEFT}
    onHandlerStateChange={ev => {
      if (ev.nativeEvent.state === State.END) {
        onChangeIndex && onChangeIndex(1);
      }
    }}>
    <FlingGestureHandler
      key="right"
      direction={Directions.RIGHT}
      onHandlerStateChange={ev => {
        if (ev.nativeEvent.state === State.END) {
          onChangeIndex && onChangeIndex(-1);
        }
      }}>
      {children}
    </FlingGestureHandler>
  </FlingGestureHandler>
);
const windowHeight = Dimensions.get('window').width * (9 / 16);

var isLike = false
const PostCard = props => {
  // console.log('props:===========', props);
  const likeRef = useRef(false)

  const [communityDetail, setCommunityDetail] = useState({});
  const [indexCar, setIndexSwipeCar] = React.useState(0);
  const isCarousel = React.useRef(null);
  const [postData, setPostData] = useState(props.item)
  const [allPostLikes, setAllPostLikes] = useState([]);
  const [userId, setUserId] = useState('')

  const [postId, setPostId] = useState(props.item._id)

  useEffect(() => {
    setTimeout(() => {
      allLikes()
    }, 2000);
    GetUserId()
  }, [])

  const GetUserId = () => {
    AsyncStorage.getItem(CommunityHomeConstants.USER_DETAIL).then((value) => {
      let parse = JSON.parse(value)
      let userId = parse._id
      setUserId(userId)
    })
  }

  const allLikes = () => {
    Get_All_Likes(postId).then((response) => {
      if (response.status == 200) {
        setAllPostLikes(response.data.likesResult)
        response.data.likesResult.forEach(element => {
          if (userId == element.likedBy.userId) {
            isLike = true
          }
        });
      }
    }).catch((error) => {
      console.log("allLikesErr======", error)
    })
  }
  const renderItem = ({ item, index }) =>
    item.fileType == 'Image' ? (
      <View style={{ flex: 1 }}>
        <Image
          style={{ height: windowHeight, width: windowWidth }}
          resizeMode='cover'
          source={{ uri: item.url }}
        />
      </View>
    ) : (
      <View style={{ flex: 1 }}>
        <CustomMFMVideoPlayer
          visibileVideo={props?.visibileVideo}
          index={props?.index}
          url={item.url}
          childIndex={index}
          pageIndex={indexCar}
        />
      </View>
    );

  const onSelectLike = () => {
    if (likeRef.current) {

      return
    }
    likeRef.current = true
    let arr1 = allPostLikes
    var index;
    var xyz = false
    arr1.forEach(element => {
      if (element.likedBy.userId == userId) {
        index = arr1.indexOf(element)
        xyz = true
        console.log("index==========", index)
      }
    });
    if (xyz) {
      console.log("UserIdExist=====")
      let obj1 = postData
      obj1.likes = obj1.likes - 1
      setPostData({ ...obj1 })
      arr1.splice(index, 1)
      setAllPostLikes([...arr1])
      isLike = false
      Dislike_Post_Api(postId).then((response) => {
        if (response.status == 200) {
          props.fetchList()
          console.log("disLikeResp=========", response)
        }

      }).catch((error) => {
        console.log("DislikeErr========", error)
      })
      console.log("AfterLike=========", arr1)
    } else {
      let obj1 = postData
      obj1.likes = obj1.likes + 1
      setPostData({ ...obj1 })
      isLike = true
      console.log("NotExist======")
      Post_like_Api(postId).then((response) => {
        if (response.status == 200) {
          console.log("LikedResp==========", response)
          arr1.push(response.data.likeFinal[0])
          setAllPostLikes([...arr1])
          props.fetchList()
        }
      }).catch((error) => {
        console.log("LikeErr======", error)
      })
    }
    setTimeout(() => {
      likeRef.current = false
    }, 500);
  }

  return (
    <View style={{ marginTop: 10 }}>
      <View style={styles.headerView}>
        <View style={{ width: 34, height: 34, borderRadius: 17 }}>
          <Image
            style={{ width: 34, height: 34, borderRadius: 17 }}
            source={props.item.trainer[0]?.profilePicture.url ? { uri: props.item.trainer[0]?.profilePicture.url } : imagesFile.ic_imgPlaceholder}
          />
        </View>
        <View style={{ marginLeft: 8 }}>
          <View>
            <Text style={styles.bold_14_black}>
              {props.item.trainer[0]?.firstName}{' '}
              {props.item.trainer[0]?.lastName}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1 }}></View>

        <ReportPostMenu
          onBookmark={() =>
            props.onBookmark(props.item._id, props.item.trainer[0]?._id)
          }
          onReportPost={() =>
            props.onReportPost(props.item.communityId, props.item?._id)
          }
          tab2={'Bookmark'}
          tab1={'Report'}
        />
      </View>
      <View style={{ marginTop: 8, marginHorizontal: 12 }}>
        <Text numberOfLines={2} style={styles.semibold_12_black}>{props.item.content}</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <CustomSwiper
          onChangeIndex={index => {
            if (index == 1) {
              isCarousel?.current?.snapToNext?.();
            } else if (index == -1) {
              isCarousel?.current?.snapToPrev?.();
            }
          }}>
          <Carousel
            layout="stack"
            layoutCardOffset={9}
            ref={isCarousel}
            data={props?.item?.multiMedia}
            renderItem={renderItem}
            sliderWidth={windowWidth}
            itemWidth={windowWidth}
            onSnapToItem={index => setIndexSwipeCar(index)}
            useScrollView={true}
            inactiveSlideShift={0}
            activeSlideOffset={10}
            swipeThreshold={15}
            scrollEnabled={false}
            callbackOffsetMargin={50}
          />
        </CustomSwiper>
        <View style={{ flexDirection: 'row', backgroundColor: "#DEDEDE", justifyContent: "space-between" }}>
          <View style={styles.footerView}>
            <TouchableOpacity
              onPress={() => onSelectLike()}
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  style={{ tintColor: 'grey', width: 25, height: 25 }}
                  // source={imagesFile.ic_unselectedHeart}
                  source={
                    isLike
                      ? imagesFile.ic_selectedHeart
                      : imagesFile.ic_unselectedHeart
                  }
                />
              </View>
              <View style={{ marginLeft: 5 }}>
                <Text style={styles.semibold_12_opacity}>
                  {props.item.likes}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginLeft: 17.4,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={props.onComment}>
              <View>
                <Image source={imagesFile.ic_message} />
              </View>
              <View style={{ marginLeft: 6 }}>
                <Text style={styles.semibold_12_opacity}>
                  {props.item.comment}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ marginTop: -10 }}>
            <Pagination
              dotsLength={props?.item?.multiMedia.length}
              activeDotIndex={indexCar}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(0, 0, 0, 0.92)',
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              tappableDots={true}
            />
          </View>
          {/* <View><Text>{''}</Text></View> */}
        </View>
      </View>
    </View>
  );
};

export default PostCard;

const styles = StyleSheet.create({
  bold_14_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 14,
    color: Colors.black,
  },
  semibold_10_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.5,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  semibold_12_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
    opacity: 0.4,
  },
  headerView: {
    flexDirection: 'row',
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
});
