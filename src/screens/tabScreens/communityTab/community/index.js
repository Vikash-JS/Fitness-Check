import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  DeviceEventEmitter,
  Alert,
  Dimensions,
} from 'react-native';
import MyStatusBar from '../../../commonComponents/MyStatusBar';
import { Colors, Fonts } from '../../../../utils/Constants';
import FlatListHeader from './FlatListHeader';
import { useNavigation, useRoute } from '@react-navigation/native';
import PostCard from '../communityDetail/PostCard';
import CommunityCard from './CommunityCard';
import {
  Get_Community_List,
  Get_Feeds,
  Report_Post_Api,
  Add_Bookmark_Post,
} from '../../../../apiManager/community/index';
import { Toaster } from '../../../commonComponents/Toaster';
import Loader from '../../../commonComponents/Loader';
import ReportModal from '../../../modals/ReportModal';
import { useIsFocused } from '@react-navigation/native';

const CommunityHomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [tabIndex, setTabIndex] = useState(0);
  const [communityList, setCommunityList] = useState([]);
  const [loader, setLoader] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [ReportCommunityId, setReportCommunityId] = useState('');
  const [ReportPostId, setReportPostId] = useState('');
  const [openReportModal, setOpenReportModal] = useState(false);
  const [isVisibleVideo, setVideoVisible] = React.useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    console.log('fromScreen=======', route?.params?.tab);
    DeviceEventEmitter.addListener('updateLike', () => GetAllFeeds());
    DeviceEventEmitter.addListener('updateCommunity', () => GetAllFeeds());
    GetAllFeeds();
  }, [isFocused]);

  const onSelectIndex = id => {
    if (id == 0) {
      GetAllFeeds();
      setTabIndex(id);
    } else if (id == 1) {
      GetCommunityList();
      setTabIndex(id);
    } else {
      navigation.navigate('BookMarkScreen');
    }
  };

  const pullToRefresh = () => {
    if (tabIndex == 0) {
      GetAllFeeds();
    } else {
      GetCommunityList();
    }
  };

  const GetCommunityList = () => {
    setLoader(true);
    Get_Community_List()
      .then(response => {
        if (response.status == 200) {
          setLoader(false);
          console.log('response========', response);
          setCommunityList(response.data.community);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('CommListErr=======', error);
      });
  };

  const get_feeds = () => {
    Get_Feeds()
      .then(response => {
        if (response.status == 200) {
          setLoader(false);
          console.log('responseFeed===========', response);
          // let index = response.data.feeds.indexOf(null);
          // if (index) {
          //   console.log('indexOfNull==========', index);
          //   response.data.feeds.splice(index, 1);
          // }
          setFeeds(response?.data?.feeds);
          console.log('response?.data?.feeds: ', response?.data?.feeds);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('feedsErr========', error);
      });
  }

  const GetAllFeeds = () => {
    setLoader(true);
    get_feeds()
  };

  const onClickReport = (communityId, postId) => {
    console.log('CommunityReportId========', communityId, postId);
    setOpenReportModal(true);
    setReportCommunityId(communityId);
    setReportPostId(postId);
  };
  const onFinalReport = reason => {
    if (reason != '') {
      var raw = JSON.stringify({
        reason: reason,
        communityId: ReportCommunityId,
      });
      console.log("report22", raw)

      Report_Post_Api(ReportPostId, raw)
        .then(response => {
          if (response.status == 200) {
            setOpenReportModal(false);
            setReportCommunityId('');
            setReportPostId('');
            get_feeds()
            setTimeout(() => {
              Toaster(response.message);
            }, 1000);
          }
        })
        .catch(error => {
          setOpenReportModal(false);
          console.log('reportPostErr======', error);
        });
    }
  };

  const onAddBookmark = (postId, trainerId) => {
    console.log('postid,trainerId======', postId, trainerId);

    Add_Bookmark_Post(postId, trainerId)
      .then(response => {
        if (response.status == 200) {
          Toaster('Bookmark successfully');
        }
      })
      .catch(error => {
        console.log('addBookmarkErr=======', error);
      });
  };

  const renderItem = ({ item, index }) =>
    // console.log("commentProps========", item),
    tabIndex == 0 ? (
      <>
        <PostCard
          visibileVideo={isVisibleVideo}
          index={index}
          fetchList={() => get_feeds()}
          onBookmark={(postId, trainerId) => onAddBookmark(postId, trainerId)}
          onReportPost={(communityId, postId) =>
            onClickReport(communityId, postId)
          }
          item={item}
          onComment={() => navigation.navigate('CommentScreen', { post: item })}
        />
      </>
    ) : (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('CommunityDetailScreen', {
            id: item.communityId._id,
          })
        }>
        <CommunityCard item={item} />
      </TouchableOpacity>
    );

  const Footer = () => {
    return <View style={{ height: 90 }}></View>;
  };

  const EmptyComponent = () => {
    return (
      <View
        style={{
          alignSelf: 'center',
          width: '100%',
          height: '100%',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: Fonts.gilroy_Bold,
            fontSize: 20,
            color: Colors.inputGrey,
            paddingVertical: 50,
          }}>
          {tabIndex == 0 ? 'No feeds available..' : 'No community available..'}
        </Text>
      </View>
    );
  };

  const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    setVideoVisible(viewableItems);
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  return (
    <>
      <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <SafeAreaView style={{ backgroundColor: Colors.white, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <FlatList
            data={tabIndex == 0 ? feeds : communityList}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            keyExtractor={item => item._id}
            contentContainerStyle={{ paddingBottom: 40 }}
            ListHeaderComponent={
              <FlatListHeader
                index={tabIndex}
                onPressAll={() => onSelectIndex(0)}
                onPressBookmark={() => onSelectIndex(2)}
                onPressCommunity={() => onSelectIndex(1)}
                onPressTab={() => selectIndex()}
                onPress={() => navigation.goBack()}
              />
            }
            ListFooterComponent={<Footer />}
            ListEmptyComponent={<EmptyComponent />}
            refreshing={false}
            onViewableItemsChanged={_onViewableItemsChanged}
            viewabilityConfig={_viewabilityConfig}
            onRefresh={pullToRefresh}
          />
        </View>
        {loader ? <Loader /> : null}
        {openReportModal ? (
          <ReportModal
            ReportPost={reason => onFinalReport(reason)}
            visible={openReportModal}
            onCancel={() => {
              setOpenReportModal(false), setReportCommunityId('');
            }}
          />
        ) : null}
      </SafeAreaView>
    </>
  );
};
export default CommunityHomeScreen;
