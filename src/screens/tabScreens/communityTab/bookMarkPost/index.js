import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { Colors, Fonts } from '../../../../utils/Constants';
import AppHeader from '../../../commonComponents/AppHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  Get_Bookmark_Post,
  Remove_Bookmark_Post,
} from '../../../../apiManager/community/index';
import RemoveBookmarkMenu from '../../../commonComponents/RemoveBookmarkMenu';
import Loader from '../../../commonComponents/Loader';
import EmptyComponent from '../../../commonComponents/EmptyComponent';
import {
  Directions,
  FlingGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import CustomMFMVideoPlayer from '../../../commonComponents/videoPlayer';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import imagesFile from '../../../../../assets/imagesFile';
import { useIsFocused } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').width * (9 / 16);

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

const BookMarkScreen = props => {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const [bookmarkList, setBookmarkList] = useState([]);
  const [loader, setLoader] = useState(false);
  const isCarousel = React.useRef(null);
  const [indexCar, setIndexSwipeCar] = React.useState(0);

  useEffect(() => {
    bookmarkPosts();
  }, [isFocused]);

  const bookmarkPosts = () => {
    setLoader(true);
    Get_Bookmark_Post()
      .then(response => {
        if (response.status == 200) {
          setLoader(false);
          setBookmarkList(response.data);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('bookmarkErr=====', error);
      });
  };

  const onRemoveBookMark = postId => {
    Remove_Bookmark_Post(postId)
      .then(response => {
        bookmarkPosts();
      })
      .catch(error => {
        console.log('removeErr=======', error);
      });
  };

  const onSelectPost = item => {
    let obj = {
      _id: item.postId,
      businessId: '',
      multiMedia: item.multiMedia,
      content: item?.content ? item?.content.toString() : null,
      trainer: item.trainer,
      comment: item.comment,
      likes: item.likes,
    };

    navigation.navigate('CommentScreen', { post: obj });
  };

  const header = () => {
    return (
      <View>
        <AppHeader
          onPress={() => navigation.goBack()}
          Heading="Bookmark Post"
        />
      </View>
    );
  };

  const Footer = () => {
    return <View style={{ height: 100 }}></View>;
  };

  const renderHorizontal = (item, parentItem) => (
    <TouchableOpacity onPress={() => onSelectPost(parentItem)}>
      {item?.item?.fileType == 'Image' ? (
        <View style={{ flex: 1 }}>
          <Image
            style={{ height: windowHeight, width: windowWidth }}
            source={{ uri: item?.item?.url }}
          />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <CustomMFMVideoPlayer
            visibileVideo={[{ index: 0 }]}
            index={0}
            url={item?.item?.url}
            childIndex={item?.index}
            pageIndex={indexCar}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => {
    const parentItem = item;
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}>
          <View>
            <Image
              style={{ height: 40, width: 40, borderRadius: 20 }}
              source={{ uri: item?.trainer[0]?.profilePicture?.url }}
            />
          </View>
          <View style={{ marginLeft: 10 }}>
            <Text style={styles.bold_14_black}>
              {item?.trainer[0]?.firstName} {item?.trainer[0]?.lastName}
            </Text>
          </View>
          <View style={{ flex: 1 }}></View>
          <View>
            <RemoveBookmarkMenu
              onRemoveBookmark={() => onRemoveBookMark(item?._id)}
              tab1="remove Bookmark"
            />
          </View>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Text style={styles.semibold_12_black}>
            {item?.content ? item?.content.toString() : ''}
          </Text>
        </View>

        <View>
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
              data={item?.multiMedia}
              renderItem={item => renderHorizontal(item, parentItem)}
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
          <View style={styles.postBottom}>
            <View style={styles.footerView}>
              <TouchableOpacity style={styles.insideFooter}>
                <View>
                  <Image
                    style={{ tintColor: 'grey', width: 25, height: 25 }}
                    source={imagesFile.ic_unselectedHeart}
                  />
                </View>
                <View style={{ marginLeft: 5 }}>
                  <Text style={styles.semibold_12_opacity}>{item.likes}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.commentIcon}
                onPress={props.onComment}>
                <View>
                  <Image source={imagesFile.ic_message} />
                </View>
                <View style={{ marginLeft: 6 }}>
                  <Text style={styles.semibold_12_opacity}>{item.comment}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: -10 }}>
              <Pagination
                dotsLength={item?.multiMedia.length}
                activeDotIndex={indexCar}
                carouselRef={isCarousel}
                dotStyle={styles.paginationDots}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={bookmarkList}
          renderItem={renderItem}
          ListHeaderComponent={header}
          ListEmptyComponent={<EmptyComponent Heading={'Bookmark is empty!'} />}
          ListFooterComponent={<Footer />}
        />
      </View>
      {loader ? <Loader /> : null}
    </SafeAreaView>
  );
};
export default BookMarkScreen;

const styles = StyleSheet.create({
  bold_14_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 14,
    color: Colors.black,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  footerView: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35,
    marginTop: 10,
    marginLeft: 18,
  },
  postBottom: {
    flexDirection: 'row',
    backgroundColor: '#DEDEDE',
    justifyContent: 'space-between',
  },
  insideFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentIcon: {
    marginLeft: 17.4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDots: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
});
