import React, {useState, useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  FlatList,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import FlatListHeader from './FlatListHeader';
import imagesFile from '../../../../../assets/imagesFile';
import AllCard from '../community/AllCard';
import PostCard from './PostCard';
import People from './People';
import {Colors, Fonts} from '../../../../utils/Constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  Get_Community_Detail,
  Get_Community_Member,
  Report_Post_Api,
} from '../../../../apiManager/community/index';
import Loader from '../../../commonComponents/Loader';
import ReportModal from '../../../modals/ReportModal';
import {Toaster} from '../../../commonComponents/Toaster';

const CommunityDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [tabIndex, setTabIndex] = useState(0);
  const [loader, setLoader] = useState(false);
  const [communityId, setCommunityId] = useState(route?.params?.id);
  const [headerData, setHeaderData] = useState({});
  const [feedsList, setFeedsList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [ReportCommunityId, setReportCommunityId] = useState('');
  const [ReportPostId, setReportPostId] = useState('');
  const [openReportModal, setOpenReportModal] = useState(false);
  const [isVisibleVideo, setVideoVisible] = React.useState([]);

  useEffect(() => {
    DeviceEventEmitter.addListener('updateLike', () => getCommunityDetail());
    getCommunityDetail();
  }, []);

  const getCommunityDetail = () => {
    setLoader(true);
    Get_Community_Detail(communityId)
      .then(response => {
        if (response.status == 200) {
          setLoader(false);
          setHeaderData(response.data.communityResult);
          setFeedsList(response.data.feeds);
          console.log('communityDetail========', response);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('commDetailErr========', error);
      });
  };

  const CommunityMember = () => {
    setLoader(true);
    Get_Community_Member(communityId)
      .then(response => {
        if (response.status == 200) {
          console.log('memberResp======', response);
          setMemberList(response.data.member);
          setLoader(false);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log('memberErr========', error);
      });
  };

  const onSelectIndex = id => {
    if (id == 2) {
      CommunityMember();
    }
    setTabIndex(id);
  };

  const onClickReport = (communityId, postId) => {
    setOpenReportModal(true);
    setReportCommunityId(communityId);
    setReportPostId(postId);
  };

  const onFinalReport = reason => {
    var raw = JSON.stringify({reason: reason, communityId: ReportCommunityId});
    Report_Post_Api(ReportPostId, raw)
      .then(response => {
        if (response.status == 200) {
          setOpenReportModal(false);
          setReportCommunityId('');
          setReportPostId('');
          setTimeout(() => {
            Toaster(response.message);
          }, 1000);
          getCommunityDetail()
        }
      })
      .catch(error => {
        setOpenReportModal(false);
        console.log('reportPostErr======', error);
      });
  };

  const renderItem = ({item, index}) =>
    // console.log("commentProps========",item),
    tabIndex == 0 ? (
      <PostCard
        visibileVideo={isVisibleVideo}
        index={index}
        onReportPost={(communityId, postId) =>
          onClickReport(communityId, postId)
        }
        item={item}
        onComment={() => navigation.navigate('CommentScreen', {post: item})}
      />
    ) : tabIndex == 2 ? (
      <People item={item} />
    ) : null;

  const Footer = () => {
    return <View style={{height: 90}}></View>;
  };
  const _onViewableItemsChanged = useCallback(({viewableItems, changed}) => {
    setVideoVisible(viewableItems);
  }, []);

  const _viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={{flex: 1}}>
        <FlatList
          data={tabIndex == 0 ? feedsList : tabIndex == 2 ? memberList : null}
          showsVerticalScrollIndicator={false}
          renderItem={renderItem}
          keyExtractor={item => item._id}
          onViewableItemsChanged={_onViewableItemsChanged}
          viewabilityConfig={_viewabilityConfig}
          ListHeaderComponent={
            <FlatListHeader
              headerData={headerData}
              index={tabIndex}
              onPressFeeds={() => onSelectIndex(0)}
              onPressAbout={() => onSelectIndex(1)}
              onPressPeople={() => onSelectIndex(2)}
              onPress={() => navigation.goBack()}
            />
          }
          ListFooterComponent={<Footer />}
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
  );
};

export default CommunityDetailScreen;
