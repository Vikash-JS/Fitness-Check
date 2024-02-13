import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import imagesFile from '../../../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import moment from 'moment';

const SepratorView = () => {
  return (
    <View style={{borderWidth: 1, borderColor: Colors.Goal_BorderGrey}}></View>
  );
};
const CommonHeader = props => {
  return (
    <View style={styles.headerView}>
      <View>
        <Text style={styles.bold_16_black}>{props.Heading}</Text>
      </View>
      <View style={{flex: 1}}></View>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={imagesFile.ic_edit} />
      </TouchableOpacity>
    </View>
  );
};

// const CommonObjectView = ()=>{
//     return(

//     )
// }
export const TimingCard = props => {
  return (
    <View style={styles.mainContianer}>
      <CommonHeader Heading={props.Heading} onPress={props.onPress} />
      <SepratorView />
      <View style={{paddingLeft: 16, paddingTop: 13, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading}</Text>
        </View>
        <View>
          {props?.repeat?.map((data, index) => {
            return (
              <View style={{marginTop: 10}}>
                <Text style={styles.semibold_12_black}>{data}, </Text>
              </View>
            );
          })}
        </View>

        <View style={{marginTop: 12}}>
          <Text style={styles.semibold_12_black}>
            {props?.startTime
              ? moment(props?.startTime).format('hh:mm a')
              : '--/--'}{' '}
            to{' '}
            {props?.endTime
              ? moment(props?.endTime).format('hh:mm a')
              : '--/--'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const FitnessGoalCard = props => {
  return (
    <View style={styles.mainContianer}>
      <CommonHeader Heading={props.Heading} onPress={props.onPress} />
      <SepratorView />
      <View style={{paddingLeft: 16, paddingTop: 13, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading}</Text>
        </View>
        <View>
          {props?.fitnessGoal?.map((data, index) => {
            return (
              <View style={{marginTop: 10}}>
                <Text style={styles.semibold_12_black}>{data} </Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export const WorkoutHistoryCard = props => {
  return (
    <View style={styles.mainContianer}>
      <CommonHeader Heading={props.Heading} onPress={props.onPress} />
      <SepratorView />
      <View style={{paddingLeft: 16, paddingTop: 13, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {/* {props?.workout?.map((data, index) => {
                        return ( */}
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>{props?.workout} </Text>
          </View>
          {/* )
                    })} */}
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading1}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>{props?.frequency} </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const DiataryHabitCard = props => {
  return (
    <View style={styles.mainContianer}>
      <CommonHeader Heading={props.Heading} onPress={props.onPress} />
      <SepratorView />
      <View style={{paddingLeft: 16, paddingTop: 13, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>{props?.prefer} </Text>
          </View>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading1}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>{props?.caffine} </Text>
          </View>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading2}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>{props?.mealsPerDay} </Text>
          </View>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading3}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>
              {props?.supplement == false ? 'No' : 'Yes'}{' '}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const LifestyleCard = props => {
  return (
    <View style={styles.mainContianer}>
      <CommonHeader Heading={props.Heading} onPress={props.onPress} />
      <SepratorView />
      <View style={{paddingLeft: 16, paddingTop: 13, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          {props?.habits?.map((data, index) => {
            return (
              <View style={{marginTop: 10}}>
                <Text style={styles.semibold_12_black}>{data}, </Text>
              </View>
            );
          })}
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading1}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>
              {props?.gymAccess ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading2}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>{props?.travelFre} </Text>
          </View>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading3}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>{props?.sleepHours} </Text>
          </View>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading4}</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginTop: 10}}>
            <Text style={styles.semibold_12_black}>{props?.sleepQuality} </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export const MedicalHistoryCard = props => {
  return (
    <View style={styles.mainContianer}>
      <CommonHeader Heading={props.Heading} onPress={props.onPress} />
      <SepratorView />
      <View style={{paddingLeft: 16, paddingTop: 13, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.semibold_12_black}>{props.differentlyAbled}</Text>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading1}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.semibold_12_black}>{props.allergies} </Text>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading2}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.semibold_12_black}>{props.medicalIssues} </Text>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading3}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.semibold_12_black}>
            {props.otherInstructions}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};

export const HeightWeightCardTemplate = props => {
  return (
    <View style={styles.mainContianer}>
      <CommonHeader Heading={props.Heading} onPress={props.onPress} />
      <SepratorView />
      <View style={{paddingLeft: 16, paddingTop: 13, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.semibold_12_black}>{props.currentHeight} </Text>
        </View>
      </View>
      <View style={{paddingLeft: 16, paddingTop: 2, paddingBottom: 18}}>
        <View>
          <Text style={styles.semibold_10_opacity}>{props.SubHeading1}</Text>
        </View>
        <View style={{marginTop: 10}}>
          <Text style={styles.semibold_12_black}>{props.currentWeight} </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainContianer: {
    // borderWidth:1,
    marginHorizontal: 18,
    borderRadius: 10,
    backgroundColor: Colors.lightGrey,
  },
  bold_16_black: {
    fontFamily: Fonts.gilroy_Bold,
    fontSize: 16,
    color: Colors.black,
  },
  semibold_10_opacity: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 10,
    color: Colors.black,
    opacity: 0.4,
  },
  semibold_12_black: {
    fontFamily: Fonts.gilroy_SemiBold,
    fontSize: 12,
    color: Colors.black,
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    paddingLeft: 16,
    paddingRight: 12,
  },
  sepratorView: {},
});
