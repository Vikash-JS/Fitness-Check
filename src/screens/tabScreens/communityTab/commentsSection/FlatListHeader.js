import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  Dimensions,
} from 'react-native';
import CommentHeader from './CommentHeader';
import imagesFile from '../../../../../assets/imagesFile';
import { Colors, Fonts } from '../../../../utils/Constants';
import {
  Directions,
  FlingGestureHandler,
  State,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import VideoPlayer from 'react-native-video-player';
// import CustomMFMVideoPlayer from '../../../commonComponents/videoPlayer';
import CustomMFMVideoPlayer from '../../../commonComponents/videoPlayer';
import Carousel, { Pagination } from 'react-native-snap-carousel';
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
const windowWidth = Dimensions.get('window').width;

const FlatListHeader = props => {
  console.log('props:FlatListHeader**&*&*&*&*&*&', props);
  const isCarousel = React.useRef(null);
  const [indexCar, setIndexSwipeCar] = React.useState(0);

  const renderItem = ({ item, index }) =>
    item.fileType == 'Image' ? (
      <View style={{ flex: 1 }}>
        <Image
          style={{ height: windowHeight, width: windowWidth }}
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

  return (
    <View>
      <CommentHeader
        onBookmark={props.onBookmark}
        onReportPost={() =>
          props.onReportPost(props.item._id, props.item.communityId)
        }
        userDetail={props.item}
        onPressback={props.onPressback}
      />
      <View style={{ marginHorizontal: 18, marginTop: 6 }}>
        <Text style={styles.semibold_12_black}>{props.item.content}</Text>
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
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#DEDEDE',
            justifyContent: 'space-between',

          }}>
          <View>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                padding: 12
              }}
              onPress={props.onLike}
              onLongPress={props.onLongPressLike}>
              <View style={{ marginLeft: 6 }}>
                <Image
                  style={{ width: 25, height: 25 }}
                  source={
                    props.isLike
                      ? imagesFile.ic_selectedHeart
                      : imagesFile.ic_unselectedHeart
                  }
                />
              </View>
              <View style={{ marginLeft: 6 }}>
                <Text style={styles.semibold_12_opacity}>{props.item.likes}</Text>
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

        </View>
      </View>

      <View style={{ flexDirection: 'row', height: 35, alignItems: 'center' }}>

      </View>
    </View>
  );
};

export default FlatListHeader;

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
  semibold_12_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
    opacity: 0.4,
  },
});
