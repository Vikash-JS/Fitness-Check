import React, { useState, useEffect, useRef, useCallback } from 'react';
import { SafeAreaView, View, Text, FlatList, Image, TextInput, TouchableOpacity, StyleSheet, Alert, Dimensions, DeviceEventEmitter, KeyboardAvoidingView } from 'react-native';
import imagesFile from '../../../../../assets/imagesFile';
import FlatListHeader from './FlatListHeader';
import CommentCard from './CommentCard';
import { Colors, Fonts } from '../../../../utils/Constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Get_Comment_List, Get_Replies_By_CommentId, deleteComment, delete_Replies, Post_Replies, Post_Comment, Get_All_Likes, Post_like_Api, Dislike_Post_Api } from '../../../../apiManager/comment/index';
import { Report_Post_Api, Add_Bookmark_Post } from '../../../../apiManager/community/index';
import Loader from '../../../commonComponents/Loader';
import { Toaster } from '../../../commonComponents/Toaster';
import ListLikeModal from '../../../modals/LikeListModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommunityHomeConstants } from '../CommunityConstants';
// import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReportPostMenu from '../../../commonComponents/ReportPostMenu';
import ReportModal from '../../../modals/ReportModal';
const windowWidth = Dimensions.get('window').width;
var like = false
const CommentScreen = () => {
    // const bottomTabHeight = useBottomTabBarHeight()
    const navigation = useNavigation()
    const route = useRoute()
    console.log("commentScreen pe aaya hai", route.params)
    const scrollRef = useRef(null)
    const likeRef = useRef(false)
    const [postData, setPostData] = useState(route.params.post)
    const [postId, setPostId] = useState(route.params.post._id)
    const [trainerId, setTrainerId] = useState(route.params.post.trainer[0]._id)
    const [loader, setLoader] = useState(false)
    const [commentList, setCommentList] = useState([]);
    const [replyList, setReplyList] = useState([])
    const [commentId, setCommentId] = useState('')
    const [commentTo, setCommentTo] = useState('')
    const [comment, setComment] = useState('')
    const [openReplies, setOpenReplies] = useState(false)
    const [checkId, setCheckId] = useState('')
    const [allPostLikes, setAllPostLikes] = useState([]);
    const [likeModalOpen, setLikeModalOpen] = useState(false)
    const [userId, setUserId] = useState('')
    const [ReportCommunityId, setReportCommunityId] = useState('')
    const [ReportPostId, setReportPostId] = useState('')
    const [openReportModal, setOpenReportModal] = useState(false)
    const [isVisibleVideo, setVideoVisible] = React.useState([]);

    useEffect(() => {
        console.log("Feeds=========***", route.params.post)
        let arr = []
        let obj = {
            index: 0,
        }
        arr.push(obj)
        setVideoVisible(arr);
        GetCommentList()
        setTimeout(() => {
            allLikes()
        }, 1000);
        GetUserId()

    }, [])

    const GetUserId = () => {
        AsyncStorage.getItem(CommunityHomeConstants.USER_DETAIL).then((value) => {
            let parse = JSON.parse(value)
            let userId = parse._id
            setUserId(userId)
            console.log("userDetail=========", userId)
        })
    }

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
            like = false
            Dislike_Post_Api(postId).then((response) => {
                if (response.status == 200) {
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
            like = true
            console.log("NotExist======")
            Post_like_Api(postId).then((response) => {
                if (response.status == 200) {
                    console.log("LikedResp==========", response)
                    arr1.push(response.data.likeFinal[0])

                    setAllPostLikes([...arr1])
                }
            }).catch((error) => {
                console.log("LikeErr======", error)
            })
        }
        setTimeout(() => {
            likeRef.current = false
        }, 500);

        // DeviceEventEmitter.emit('updateLike')
    }

    const allLikes = () => {
        Get_All_Likes(postId).then((response) => {
            if (response.status == 200) {
                console.log("AllLikes=========", response)
                setAllPostLikes(response.data.likesResult)
                response.data.likesResult.forEach(element => {
                    if (userId == element.likedBy.userId) {
                        like = true
                    }
                });
            }
        }).catch((error) => {
            console.log("allLikesErr======", error)
        })
    }

    const GetCommentList = () => {
        setLoader(true)
        Get_Comment_List(postId).then((response) => {
            // setReplyList([])
            if (response.status == 200) {
                setLoader(false)
                console.log("commentListResp=======", response)
                response.data.commentsResult.forEach(element => {
                    element["AllReplies"] = []
                });
                console.log("updatedCoList==========", response.data.commentsResult)
                setCommentList(response.data.commentsResult)
            }
        }).catch((error) => {
            setLoader(false)
            console.log("commentListErr========", error)
        })
    }
    const GetRepliesList = (id) => {
        setLoader(true)
        Get_Replies_By_CommentId(id).then((response) => {
            if (response.status == 200) {
                setLoader(false)
                console.log("repResp=======", response)
                response.data.repliesResult.forEach(element => {
                    element["parentId"] = id
                });
                let arr1 = commentList
                arr1.forEach(element => {
                    if (element._id == id) {
                        element.AllReplies = response.data.repliesResult
                    }
                });
                console.log("GetReplies========", arr1)
                // setReplyList(response.data.repliesResult)
                setCommentList([...arr1])
            }
        }).catch((error) => {
            setLoader(false)
            console.log("repliesListErr=======", error)
        })
    }

    const deleteCommentApi = (id, index) => {
        console.log("commentId========", id)
        let arr1 = commentList
        arr1.splice(index, 1)
        setCommentList([...arr1])
        setLoader(true)
        deleteComment(id).then((response) => {
            if (response.status == 200) {
                setLoader(false)
                Toaster(response.message)
                console.log("DeleteComment=======", response)
            }

        }).catch((error) => {
            setLoader(false)
            console.log('deleteCommentErr=======', error)
        })
    }

    const deleteReplies = (id, index, parentId) => {
        // let arr1 = replyList
        console.log("DeleteRepliesRes=======", id, index, parentId)
        let arr1 = commentList

        arr1.forEach(element => {
            if (element._id == parentId) {
                element.AllReplies.splice(index, 1)
                element.replies = element.replies - 1
            }
        });
        setCommentList([...arr1])
        // arr1.splice(index, 1)
        // setReplyList([...arr1])
        // let arr2 = commentList
        // arr2[commIndx].replies = arr2[commIndx].replies - 1
        // setCommentList([...arr2])
        setLoader(true)
        delete_Replies(id).then((response) => {
            if (response.status == 200) {
                setLoader(false)
                console.log("deleteRepliesResp=======", response)
                Toaster(response.message)
            }

        }).catch((error) => {
            setLoader(false)
            console.log("deleteRepliesErr======", error)
        })
    }

    const addReplies = (commentId, commentTo) => {
        setCommentId(commentId)
        setCommentTo(commentTo)
    }

    const onUnRelpyUser = () => {
        setCommentId('')
        setCommentTo('')
    }

    const CheckReplies = (id) => {
        if (checkId == '') {
            setCheckId(id)
            GetRepliesList(id)
            setOpenReplies(true)

        } else {
            setCheckId(id)
            GetRepliesList(id)
            setOpenReplies(true)
            //  setCheckId('')
        }
    }

    const sendComment = () => {
        console.log("postId=========?????", postId)
        //         if (comment == " " )
        // {
        //     Toaster("Please write a comment")
        //     return
        // }
        if (comment && comment.trim() !== "") {
            console.log("comment=========?????", comment)

            let raw = JSON.stringify({ "comment": comment });
            if (commentId != '') {
                setLoader(true)
                Post_Replies(commentId, raw).then((response) => {
                    if (response.status == 200) {
                        console.log("repliesResp======", response)
                        setComment('')
                        setCommentId('')
                        setCommentTo('')
                        setLoader(false)
                        response.data.commentFinal[0]["parentId"] = commentId
                        console.log("UpdateReplies=========", response.data.commentFinal[0])
                        let arr1 = commentList
                        arr1.forEach(element => {
                            if (element._id == commentId) {
                                element.replies = element.replies + 1
                                element.AllReplies.push(response.data.commentFinal[0])
                            }
                        });
                        console.log("UpdatedArr1======", arr1)
                        setCommentList([...arr1])
                    }
                }).catch((error) => {
                    setLoader(false)
                    console.log("AddrepliesErr======", error)
                })
            } else {
                setLoader(true)
                Post_Comment(postId, raw).then((response) => {
                    if (response.status == 200) {
                        console.log("addCommentResp========", response)
                        setComment('')
                        setLoader(false)
                        response.data.commentFinal[0]["AllReplies"] = []
                        let arr1 = commentList
                        arr1.push(response.data.commentFinal[0])
                        setCommentList([...arr1])
                    }
                }).catch((error) => {
                    setLoader(false)
                    console.log("addCommentErr======", error)
                })
            }
        } else {
            Toaster("Please include your comment")
        }
    }

    const onClickReport = (postId, communityId) => {
        console.log("CommunityReportId========", communityId, postId)
        setOpenReportModal(true)
        setReportCommunityId(communityId)
        setReportPostId(postId)
    }

    const onFinalReport = (reason) => {
        if (reason != "") {
            var raw = JSON.stringify({ "reason": reason, "communityId": ReportCommunityId });
            console.log("report11", raw)
            Report_Post_Api(ReportPostId, raw).then((response) => {
                if (response.status == 200) {
                    setOpenReportModal(false)
                    setReportCommunityId('')
                    setReportPostId('')
                    setTimeout(() => {
                        Toaster(response.message)
                    }, 1000);

                }
            }).catch((error) => {
                setOpenReportModal(false)
                console.log("reportPostErr======", error)
            })
        }
    }

    const onBookmarkPost = () => {
        console.log("yaha aa raha hai")
        Add_Bookmark_Post(postId, trainerId).then((response) => {
            if (response.status == 200) {
                Toaster('Bookmark successfully')
            }
        }).catch((error) => {
            console.log("addBookmarkErr=======", error)
        })
    }

    const renderItem = ({ item, index }) => (
        <CommentCard item={item}
            openReplies={openReplies}
            checkId={checkId}
            replyList={replyList}
            // getReplies={(commentId) => GetRepliesList(commentId)}
            getReplies={(commentId) => CheckReplies(commentId)}
            deleteComment={(commentId) => deleteCommentApi(commentId, index)}
            deleteReplies={(repliesId, index1, parentId) => deleteReplies(repliesId, index1, parentId)}
            addReplies={(commentId, commentTo) => addReplies(commentId, commentTo)}
        />
    )

    const onGoBacknavi = () => {
        DeviceEventEmitter.emit('updateLike')
        DeviceEventEmitter.emit('updateCommunity');
        navigation.goBack()
    }

    const Footer = () => {
        return (
            <View style={{ height: 150 }}></View>
        )
    }
    const EmptyComponent = () => {
        return (
            <View style={{ alignSelf: 'center', flex: 1 }}>
                <Text style={{ fontFamily: Fonts.gilroy_Bold, fontSize: 20, color: Colors.inputGrey, paddingVertical: 50 }}>Be the First to Comment..</Text>
            </View>
        )
    }

    const _onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
        console.log('viewableItems:', viewableItems);
        let arr = []
        let obj = {
            index: 0,
        }
        arr.push(obj)
        // setVideoVisible(viewableItems);

    }, []);

    const _viewabilityConfig = {
        itemVisiblePercentThreshold: 100,
    };

    return (
        <>
            <SafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
                <View style={{ flex: 1 }}>
                    <FlatList
                        ref={scrollRef}
                        data={commentList}
                        showsVerticalScrollIndicator={false}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListHeaderComponent={<FlatListHeader visibileVideo={isVisibleVideo}
                            index={0} isLike={like} onBookmark={() => onBookmarkPost()} onReportPost={(postId, communityId) => onClickReport(postId, communityId)} onLike={() => onSelectLike()} onLongPressLike={() => setLikeModalOpen(true)} item={postData} onPressback={() => onGoBacknavi()} />}
                        ListFooterComponent={<Footer />}
                        ListEmptyComponent={<EmptyComponent />}
                        onViewableItemsChanged={_onViewableItemsChanged}
                        viewabilityConfig={_viewabilityConfig}
                    />
                </View>
                <KeyboardAvoidingView

                    enabled={true}
                    behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
                >
                    <View style={{ flex: 1 }}>
                        {commentTo != "" ?
                            <View style={{ flexDirection: 'row', width: windowWidth - 25, bottom: 50, height: 50, position: 'absolute', backgroundColor: Colors.inputGrey, borderRadius: 10, alignItems: 'center', marginHorizontal: 10 }}>
                                <View style={{ width: 90, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ marginLeft: 10, fontFamily: Fonts.gilroy_Medium, fontSize: 12, color: Colors.black }}>Replying To</Text>
                                </View>
                                <View style={{ width: '63%' }}>
                                    <Text style={{ fontFamily: Fonts.gilroy_Bold, fontSize: 15, color: Colors.blue }}>@{commentTo}</Text>
                                </View>
                                <View style={{ flex: 1 }}></View>
                                <TouchableOpacity style={{ right: 20 }}
                                    onPress={() => onUnRelpyUser()}
                                >
                                    <Text style={{ fontSize: 25 }}>✘</Text>
                                </TouchableOpacity>
                            </View> : null}

                        <View style={styles.textInpMainCont}>
                            <View style={styles.textInpView}>
                                <TextInput
                                    style={{ width: "95%", borderRadius: 10, height: 30 }}
                                    placeholder="Write a comment..."
                                    value={comment}
                                    onChangeText={(text) => setComment(text)}
                                    onFocus={() =>
                                        setTimeout(() => {
                                            if (commentList.length > 0) {
                                                scrollRef?.current?.scrollToIndex({
                                                    index: commentList.length - 1,
                                                    animated: true,
                                                    // viewOffset?: number,
                                                    // viewPosition?: number,
                                                })
                                            } else {
                                                null
                                            }
                                            // scrollRef?.current?.scrollToEnd({ animated: true })

                                        }, 500)
                                    }
                                />
                            </View>
                            <TouchableOpacity style={styles.sendBtnView}
                                onPress={() => sendComment()}
                            >
                                <Text style={styles.sendBtnText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                {openReportModal ? <ReportModal ReportPost={(reason) => onFinalReport(reason)} visible={openReportModal} onCancel={() => { setOpenReportModal(false), setReportCommunityId('') }} /> : null}
                {likeModalOpen ? <ListLikeModal likeList={allPostLikes} cancelModal={() => setLikeModalOpen(false)} visible={likeModalOpen} /> : null}
                {loader ? <Loader /> : null}
            </SafeAreaView>
            {/* <View style={{backgroundColor:Colors.white,flexDirection:'row',height:50,bottom:80,justifyContent:'center',alignItems:'center',marginHorizontal:10}}>
            <View style={{borderColor:"#CECECE",width:'80%',borderRadius:15,height:40,borderWidth:1,justifyContent:'center',alignItems:'center'}}>
            <TextInput
            style={{width:"95%",borderRadius:10,height:30}}
            placeholder="Write a comment..."
            /> 
            </View>
            <TouchableOpacity style={{marginLeft:10,width:60,backgroundColor:Colors.black,height:40,justifyContent:'center',alignItems:'center',borderRadius:10}}>
                <Text style={{fontFamily:Fonts.gilroy_SemiBold,fontSize:14,color:Colors.white}}>Send</Text>
            </TouchableOpacity>
        </View> */}
        </>
    )
}

export default CommentScreen;

const styles = StyleSheet.create({
    textInpMainCont: {
        position: 'absolute',
        backgroundColor: Colors.white,
        flexDirection: 'row',
        height: 50,
        // bottom: 80,
        justifyContent: 'center',
        alignItems: 'center',
        // marginHorizontal: 10,
        paddingHorizontal: 10,
        width: '100%',
        bottom: 0
    },
    textInpView: {
        borderColor: "#CECECE",
        width: '80%',
        borderRadius: 15,
        height: 40,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white
    },
    sendBtnView: {
        marginLeft: 10,
        width: 60,
        backgroundColor: Colors.black,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    sendBtnText: {
        fontFamily: Fonts.gilroy_SemiBold,
        fontSize: 14,
        color: Colors.white
    }
})