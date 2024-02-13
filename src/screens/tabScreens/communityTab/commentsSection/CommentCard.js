import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import { Get_Replies_By_CommentId } from '../../../../apiManager/comment';
import { Colors, Fonts } from '../../../../utils/Constants';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommunityHomeConstants } from '../CommunityConstants';

const CommentCard = props => {

  const [userId, setUserId] = useState('');
  useEffect(() => {
    GetUserId();
  }, []);

  const GetUserId = () => {
    AsyncStorage.getItem(CommunityHomeConstants.USER_DETAIL).then(value => {
      let parse = JSON.parse(value);
      let userId = parse._id;
      setUserId(userId);
      console.log('userDetail=========', userId);
    });
  };

  const renderReplies = ({ item, index }) => (
    <>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 14,
          marginLeft: 58,
          marginRight: 18,
        }}>
        <View>
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={
              item?.commentBy?.profilePicture?.url
                ? { uri: item?.commentBy?.profilePicture?.url }
                : imagesFile.ic_imgPlaceholder
            }
          />
        </View>
        <View
          style={{
            padding: 12,
            flex: 1,
            backgroundColor: Colors.commentGrey,
            borderRadius: 10,
            marginLeft: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.bold_14_black}>
                {item.commentBy.fullName}
              </Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View>
              <Text style={styles.medium_12_opacity}>
                {moment(item.createdAt).fromNow()}
              </Text>
            </View>
          </View>
          <View style={{ width: '88%', marginTop: 6 }}>
            <Text style={styles.medium_11_black}>{item.comment}</Text>
          </View>
        </View>
      </View>
      <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 104 }}>
        {/* <View style={{ marginLeft: 19 }}>
                    <Text style={styles.semibold_12_black}>Like</Text>
                </View> */}
        {/* <View style={{ marginLeft: 17 }}>
                    <Text style={styles.semibold_12_black}>Reply</Text>
                </View> */}
        {userId == item.commentBy.userId ? (
          <TouchableOpacity
            style={{ marginLeft: 17 }}
            onPress={() => props.deleteReplies(item._id, index, item.parentId)}>
            <Image
              style={{ width: 20, height: 20 }}
              source={imagesFile.ic_delete}
            />
          </TouchableOpacity>
        ) : null}
      </View>
    </>
  );

  return (
    <View>
      <View style={{ flexDirection: 'row', marginTop: 6, marginHorizontal: 18 }}>
        <View>
          <Image
            style={{ width: 30, height: 30, borderRadius: 15 }}
            source={
              props?.item?.commentBy?.profilePicture?.url
                ? { uri: props?.item?.commentBy?.profilePicture?.url }
                : imagesFile.ic_imgPlaceholder
            }
          />
        </View>
        <View
          style={{
            padding: 12,
            flex: 1,
            backgroundColor: Colors.commentGrey,
            borderRadius: 10,
            marginLeft: 10,
          }}>
          <View style={{ flexDirection: 'row' }}>
            <View>
              <Text style={styles.bold_14_black}>
                {props.item.commentBy.fullName}
              </Text>
            </View>
            <View style={{ flex: 1 }}></View>
            <View>
              <Text style={styles.medium_12_opacity}>
                {moment(props.item.createdAt).fromNow()}
              </Text>
            </View>
          </View>
          <View style={{ width: '90%', marginTop: 6 }}>
            <Text style={styles.medium_11_black}>{props.item.comment}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          marginTop: 10,
          marginLeft: 64,
          alignItems: 'center',
        }}>
        {/* <View>
                    <Text style={styles.medium_12_opacity}>{moment(props.item.createdAt).fromNow()}</Text>
                </View> */}
        {/* <View style={{ marginLeft: 19 }}>
                    <Text style={styles.semibold_12_black}>Like</Text>
                </View> */}
        <TouchableOpacity
          style={{ marginLeft: 17 }}
          onPress={() =>
            props.item.replies > 0 ? props.getReplies(props.item._id) : {}
          }>
          <Text style={styles.semibold_12_black}>
            All reply {props.item.replies}
          </Text>
        </TouchableOpacity>
        {userId == props.item.commentBy.userId ? (
          <TouchableOpacity
            style={{ marginLeft: 17 }}
            onPress={() => props.deleteComment(props.item._id)}>
            <Image
              style={{ width: 20, height: 20 }}
              source={imagesFile.ic_delete}
            />
          </TouchableOpacity>
        ) : null}
        <TouchableOpacity
          style={{ marginLeft: 17 }}
          onPress={() =>
            props.addReplies(props.item._id, props.item.commentBy.fullName)
          }>
          <Text style={styles.semibold_12_black}>reply ➥</Text>
        </TouchableOpacity>
      </View>
      {props.openReplies ? (
        // {props.item.AllReplies.length > 0 ?
        props.item._id == props.checkId ? (
          <View style={{ flex: 1 }}>
            <FlatList
              data={props.item.AllReplies}
              renderItem={renderReplies}
              keyExtractor={item => item.id}
            />
          </View>
        ) : null
      ) : null}
    </View>
  );
};

export default CommentCard;

const styles = StyleSheet.create({
  bold_14_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 14,
    color: Colors.black,
  },
  medium_11_black: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 11,
    color: Colors.black,
  },
  medium_12_opacity: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 12,
    color: Colors.black,
    opacity: 0.5,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_Medium,
    fontSize: 12,
    color: Colors.black,
  },
});
