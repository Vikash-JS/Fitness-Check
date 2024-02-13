import React, { useState, useRef } from 'react';
import { Image, View, Text, StyleSheet, Dimensions } from 'react-native';
import imagesFile from '../../../assets/imagesFile';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Colors } from '../../utils/Constants'
const SLIDER_WIDTH = Dimensions.get('window').width
// const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)
const ITEM_WIDTH = Dimensions.get('window').width
const data = [
    {
        imgUrl: imagesFile.ic_carousel,
    },
];
const CarouselView = (props) => {
    const isCarousel = useRef(null)
    const [index, setIndex] = useState(0)
    const CarouselCardItem = ({ item, index }) => {
        return (
            <View style={styles.container} key={index}>
                <Image
                    // source={{ uri: item.image.url} }
                    source={item.imgUrl}
                    style={styles.image}
                />
                <Image style={{ height: "100%", position: 'absolute', bottom: 0, width: ITEM_WIDTH }} source={imagesFile.ic_blurRec} />
            </View>
        )
    }

    return (
        <View style={{ backgroundColor: Colors.white, width: ITEM_WIDTH, height: 320 }}>
            <Carousel
                //  swipeThreshold={10}
                layout={'default'}
                //  layoutCardOffset={9}
                ref={isCarousel}
                // data={props?.adsList}
                data={data}
                //  autoplay={true}
                //  loop={true}
                //  enableSnap={true}
                //  snapToStart={true}
                renderItem={CarouselCardItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                //  inactiveSlideShift={0}
                onSnapToItem={(index) => setIndex(index)}
            //   useScrollView={true}
            />
            <Pagination
                dotsLength={props?.adsList?.length}
                activeDotIndex={index}
                carouselRef={isCarousel}
                dotStyle={{
                    width: 15,
                    height: 5,
                    borderRadius: 5,
                    marginHorizontal: 0,
                    backgroundColor: '#707070'
                }}
                inactiveDotStyle={{
                    width: 10,
                    height: 10,
                    backgroundColor: '#707070'
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
                tappableDots={true}
            />
        </View>
    )

}

export default CarouselView;

const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
        backgroundColor: 'white',
        // borderRadius: 8,
        width: ITEM_WIDTH,
    },
    image: {
        width: ITEM_WIDTH,
        height: 320,
    },
    header: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20
    },
    body: {
        color: "#222",
        fontSize: 18,
        paddingLeft: 20,
        paddingLeft: 20,
        paddingRight: 20
    }
})