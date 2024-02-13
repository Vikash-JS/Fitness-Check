import React,{useState, useEffect} from 'react';
import { SafeAreaView, View, Text, Image ,FlatList} from 'react-native';
import { MacrosConstants } from '../nutritionConstants';
import { useNavigation , useRoute} from '@react-navigation/native';
import imagesFile from '../../../../../../../../assets/imagesFile';
import FlatListHeader from './FlatListHeader';
import {Colors, Fonts} from '../../../../../../../utils/Constants';
import {styles} from './styles';

const DATA = [
    {
      id: '1',
      title: 'Protein(g)',
      target:'2300',
      total:'2276',
      left:26,
    },
    {
      id: '2',
      title: 'Cabs(g)',
      target:'201',
      total:'206',
      left:-5,
    },
    {
      id: '3',
      title: 'Fat(g)',
      target:'2300',
      total:'2276',
      left:26,
    },
    {
        id: '4',
        title: 'Fibre(g)',
        target:'2300',
      total:'2276',
      left:26,
      },
      {
        id: '5',
        title: 'Sodium(mg)',
        target:'2300',
      total:'2276',
      left:26,
      },
      {
        id: '6',
        title: 'Sugar(g)',
        target:'2300',
      total:'2276',
      left:-26,
      },
  ];
const Macros = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const [nutritionDetail, setNutritionDetail] = useState(route.params.data)

    useEffect(()=>{
      console.log("MacrosData=====",nutritionDetail)
    }, [route.params.data])

    const renderItem = ({item})=>(
        <View style={{flexDirection:'row',marginHorizontal:18,marginTop:12,justifyContent:'center',alignItems:'center'}}>
                <View style={{width:"30%"}}>
                    <Text style={styles.semiBold_12_black}>{item.microNutrientName}</Text>
                </View>
                <View style={{flex:0.5}}></View>
                <View>
                    <Text style={styles.medium_10_black}>{item.microNutrientValue.toFixed(2)}</Text>
                </View>
                <View style={{flex:0.4}}></View>
                <View>
                    <Text style={styles.medium_10_black}>{item.value.toFixed(2)}</Text>
                </View>
                <View style={{flex:0.4}}></View>
                <View>
                    <Text style={[styles.bold_10_multicolor,{color:item.left >0?Colors.green:Colors.deepRed}]}>{ item.left.toFixed(2)}</Text>
                </View>
            </View>
    )

    return (
        <SafeAreaView style={{ flex: 1 ,backgroundColor:Colors.white}}>
            <View style={{ flex: 1 }}>
                
                <FlatList
                    data={nutritionDetail}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListHeaderComponent={<FlatListHeader/>}
                />
            </View>
        </SafeAreaView>
    )
}

export default Macros;