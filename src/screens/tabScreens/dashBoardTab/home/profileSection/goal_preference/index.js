import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, Text, Alert, ScrollView} from 'react-native';
import ProfileHeader from '../profile/ProfileHeader';
import {GoalConstants} from '../ProfileConstants';
import imagesFile from '../../../../../../../assets/imagesFile';
import {Colors, Fonts} from '../../../../../../utils/Constants';
import {
  TimingCard,
  FitnessGoalCard,
  WorkoutHistoryCard,
  DiataryHabitCard,
  LifestyleCard,
  MedicalHistoryCard,
  HeightWeightCardTemplate,
} from './GoalsCard';
import TimingModal from '../../../../../modals/TimingModal';
import FitnessGoalModal from '../../../../../modals/FitnessGoalModal';
import WorkOutHistoryModal from '../../../../../modals/WorkOutHistoryModal';
import DietaryHabitModal from '../../../../../modals/DietaryHabitModal';
import LifestyleModal from '../../../../../modals/LifestyleModal';
import MedicalHistoryModal from '../../../../../modals/MedicalHistoryModal';
import {useNavigation} from '@react-navigation/native';
import {
  GetGoalsPreference,
  UpdateGoalsPreference,
} from '../../../../../../apiManager/profile/index';
import MyStatusBar from '../../../../../commonComponents/MyStatusBar';
import Loader from '../../../../../commonComponents/Loader';
import moment from 'moment';
import {Toaster} from '../../../../../commonComponents/Toaster';
import WeightAndHeigthModal from '../../../../../modals/WeightAndHeightModal';

const GoalsPreferernceScreen = () => {
  const navigation = useNavigation();
  const [isTimingModal, setTimingModal] = useState(false);
  const [isFitnessModal, setFitnesssModal] = useState(false);
  const [isWorkoutModal, setWorkoutModal] = useState(false);
  const [isDiataryModal, setDiataryModal] = useState(false);
  const [isListstyleModal, setLifestyleModal] = useState(false);
  const [isMedicalHistoryModal, setMedicalHistoryModal] = useState(false);
  const [heightWeight, setHeightWeightModal] = useState(false);
  const [fitnessData, setFitnessData] = useState({});
  const [loader, setLoader] = useState(false);
  const [extDate, setExtDate] = useState(new Date());
  const [iPrefer, setIprefer] = useState('');
  const [caffine, setCaffine] = useState('');
  const [mealsPerDay, setMealPerDay] = useState('');
  const [supplement, setSupplement] = useState(false);
  const [supp1, setSup1] = useState(false);
  const [repeatDays, setRepeatDays] = useState([]);
  const [fitnessGoal, setFitnessGoal] = useState([]);
  const [workoutHistory, setWorkoutHistory] = useState('');
  const [updateWorkout, setUpdateWorkout] = useState('');
  const [workoutFrequency, setWorkoutFrequency] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [habitList, setHabitList] = useState([]);
  const [gymAccess, setGymAccess] = useState(false);
  const [gymBoolean, setGymBoolean] = useState(false);
  const [travelFre, setTravelFre] = useState('');
  const [sleepHours, setSleepHours] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [fitnessIntrest, setFitnessIntrest] = useState([]);
  const [targetWeight, setTargetWeight] = useState('');
  const [bodyFat, setBodyFat] = useState('');
  const [workoutFreq, setWorkoutFreq] = useState('');
  const [foodPreference, setFoodPreference] = useState('');
  const [differentlyAbled, setDifferentlyAbled] = useState('');
  const [allergies, setAllergies] = useState('');
  const [medicalIssues, setMedicalIssues] = useState('');
  const [otherInstructions, setOtherInstruction] = useState('');
  const currentHeightRef = React.useRef(null);
  const currentWeightRef = React.useRef(null);
  const workoutHistoryRef = React.useRef(null);
  const diffAbledRef = React.useRef(null);
  const allAlergiesListRef = React.useRef(null);
  const anyMedicalIssueRef = React.useRef(null);
  const anyOtherInstructionsRef = React.useRef(null);

  useEffect(() => {
    GetFitness();
  }, []);

  const GetFitness = () => {
    setLoader(true);
    GetGoalsPreference()
      .then(response => {
        if (response.status == 200) {
          setLoader(false);
          let data = response.data.fitness;
          setFitnessData(response.data.fitness);
          setFitnessIntrest(data.fitnessInterests);
          setRepeatDays(data.timing.repeat);
          setFitnessGoal(data.fitnessGoal);
          workoutHistoryRef.current = data.workoutHistory.previousWorkout;
          setWorkoutFrequency(data.workoutHistory.workoutFrequency);
          setIprefer(data.dietaryHabits.dietPreference);
          setCaffine(data.dietaryHabits.caffeineConsumption);
          setMealPerDay(data.dietaryHabits.mealPerDay);
          setSupplement(
            data.dietaryHabits.hadSupplement == true ? 'Yes' : 'No',
          );
          setHabitList(data.lifestyle.habits);
          setGymAccess(data.lifestyle.gymAccess);
          setTravelFre(data.lifestyle.travelFrequency);
          setSleepHours(data.lifestyle.sleepHours);
          setSleepQuality(data.lifestyle.sleepQuality);
          setStartTime(data.timing.startTime);
          setEndTime(data.timing.endTime);
          currentHeightRef.current = data.currentHeight;
          currentWeightRef.current = data.currentWeight;
          setTargetWeight(data.targetWeight);
          setBodyFat(data.bodyFat);
          setWorkoutFreq(data.workoutFrequency);
          setFoodPreference(data.foodPreference);
          diffAbledRef.current = data.medicalHistory.differentlyAbled;
          allAlergiesListRef.current = data.medicalHistory.allergies;
          anyMedicalIssueRef.current = data.medicalHistory.medicalIssues;
          anyOtherInstructionsRef.current =
            data.medicalHistory.otherInstructions;
          setDifferentlyAbled(data.medicalHistory.differentlyAbled);
          setAllergies(data.medicalHistory.allergies);
          setMedicalIssues(data.medicalHistory.medicalIssues);
          setOtherInstruction(data.medicalHistory.otherInstructions);
        }
      })
      .catch(error => {
        console.log('FitnessErr========', error);
        setLoader(false);
      });
  };
  const onTimingModalDone = (startDate, endDate) => {
    UpdateGoals();
    setTimingModal(false);
  };
  const fitnessModalDone = () => {
    UpdateGoals();
    setFitnesssModal(false);
  };
  const onWorkoutmodalDone = (onend, frequency) => {
    workoutHistoryRef.current = onend;
    setWorkoutFrequency(frequency);
    UpdateGoals();
    setWorkoutModal(false);
  };

  const onDietaryModalDone = () => {
    UpdateGoals();
    setDiataryModal(false);
  };
  const onMedicalModalDone = (
    medicalIssue,
    allergies,
    differentlyAbled,
    other,
  ) => {
    // setDifferentlyAbled(differentlyAbled)
    // setMedicalIssues(medicalIssue)
    // setAllergies(allergies)
    // setOtherInstruction(other)
    diffAbledRef.current = differentlyAbled;
    allAlergiesListRef.current = allergies;
    anyMedicalIssueRef.current = medicalIssue;
    anyOtherInstructionsRef.current = other;
    UpdateGoals();
    setMedicalHistoryModal(false);
  };

  const onHeightWeightDone = () => {
    UpdateGoals();

    setHeightWeightModal(false);
  };

  const onLifeStyleModalDone = data => {
    UpdateGoals(data);
    setLifestyleModal(false);
  };

  const onSelectDays = (days, index) => {
    let newArr = repeatDays;
    let Filter = newArr.includes(days);

    if (Filter) {
      let index = newArr.indexOf(days);

      newArr.splice(index, 1);
    } else {
      newArr.push(days);
    }

    setExtDate(new Date());
    setRepeatDays(newArr);
  };

  const onSelectStartDate = date => {
    console.log('startdate========', date);
    setStartTime(date);
  };

  const onSelectEndDate = date => {
    console.log('endDate=======', date);
    setEndTime(date);
  };

  const onSelectGoal = goal => {
    let newArr = fitnessGoal.filter(item => item !== '');
    let Filter = newArr.includes(goal);

    if (Filter) {
      let index = newArr.indexOf(goal);

      newArr.splice(index, 1);
    } else {
      newArr.push(goal);
    }

    setExtDate(new Date());
    console.log('fififififi', newArr);
    setFitnessGoal(newArr);
  };

  const onSelectDiet = (option, id) => {
    console.log('id========', option, id);
    if (id == 1) {
      setIprefer(option);
    } else if (id == 2) {
      setCaffine(option);
    } else if (id == 3) {
      setMealPerDay(option);
    } else {
      if (option == 'Yes') {
        setSup1(true);
      } else {
        setSupplement(false);
        setSup1(false);
      }
      setSupplement(option);
    }
  };

  const onSelectLifeStyle = data => {
    setGymAccess(data.gymAccess);
    setTravelFre(data.travelFre);
    setSleepHours(data.sleepHours);
    setSleepQuality(data.sleepQuality);
    setHabitList(data.habitList);
  };

  const UpdateGoals = data => {
    const raw = JSON.stringify({
      fitnessInterests: fitnessIntrest,
      fitnessGoal: fitnessGoal,
      currentHeight: currentHeightRef.current,
      currentWeight: currentWeightRef.current,
      targetWeight: targetWeight,
      bodyFat: bodyFat,
      workoutFrequency: workoutFreq,
      foodPreference: foodPreference,
      dietaryHabits: {
        dietPreference: iPrefer,
        caffeineConsumption: caffine,
        mealPerDay: mealsPerDay,
        hadSupplement: supp1,
      },
      workoutHistory: {
        previousWorkout: workoutHistoryRef.current,
        workoutFrequency: workoutFrequency,
      },
      lifestyle: {
        habits: data?.habitList || habitList,
        gymAccess: data?.gymAccess === undefined ? gymAccess : data?.gymAccess,
        travelFrequency: data?.travelFre || travelFre,
        sleepHours: data?.sleepHours || sleepHours,
        sleepQuality: data?.sleepQuality || sleepQuality,
      },
      medicalHistory: {
        differentlyAbled: diffAbledRef.current,
        allergies: allAlergiesListRef.current,
        medicalIssues: anyMedicalIssueRef.current,
        otherInstructions: anyOtherInstructionsRef.current,
      },
      timing: {repeat: repeatDays, startTime: startTime, endTime: endTime},
    });
    UpdateGoalsPreference(raw)
      .then(response => {
        if (response.status == 200) {
          Toaster(response.message);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <MyStatusBar backgroundColor={Colors.white} barStyle="dark-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
        <ScrollView style={{flex: 1}}>
          <ProfileHeader
            image={imagesFile.ic_back}
            Heading={GoalConstants.GOALS_PREFERENCES}
            goBack={() => navigation.goBack()}
          />
          <View>
            <TimingCard
              startTime={startTime}
              endTime={endTime}
              repeat={repeatDays}
              Heading={GoalConstants.TIMING}
              SubHeading={GoalConstants.MY_PREFERRED_TIMINGS}
              onPress={() => setTimingModal(true)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <FitnessGoalCard
              fitnessGoal={fitnessGoal}
              Heading={GoalConstants.FITNESS_GOALS}
              SubHeading={GoalConstants.MY_PRIMAL_GOALS}
              onPress={() => setFitnesssModal(true)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <WorkoutHistoryCard
              workout={workoutHistoryRef.current}
              frequency={workoutFrequency}
              Heading={GoalConstants.WORKOUT_HISTORY}
              SubHeading={GoalConstants.MY_WORKOUT_IS_PRIMARILY}
              SubHeading1={GoalConstants.I_WORKOUT}
              onPress={() => setWorkoutModal(true)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <DiataryHabitCard
              prefer={iPrefer}
              caffine={caffine}
              mealsPerDay={mealsPerDay}
              supplement={supplement}
              Heading={GoalConstants.DIETARY_HABITS}
              SubHeading={GoalConstants.I_PREFER}
              SubHeading1={GoalConstants.MY_DAILY_CAFFEINE_CONSUMPTION_IS}
              SubHeading2={GoalConstants.MY_HABITS}
              SubHeading3={GoalConstants.CONSUMED_SUPPLEMENTS}
              onPress={() => setDiataryModal(true)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <LifestyleCard
              gymAccess={gymAccess}
              travelFre={travelFre}
              habits={habitList}
              sleepHours={sleepHours}
              sleepQuality={sleepQuality}
              Heading={GoalConstants.LIFESTYLE_AND_SLEEP}
              SubHeading={GoalConstants.MY_HABITS}
              SubHeading1={GoalConstants.I_HAVE_ACCESS_TO_GYM}
              SubHeading2={GoalConstants.I_TRAVEL}
              SubHeading3={GoalConstants.I_SLEEP_FOR_AT_LEAST}
              SubHeading4={GoalConstants.MY_SLEEP_QUALITY}
              onPress={() => setLifestyleModal(true)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <MedicalHistoryCard
              differentlyAbled={diffAbledRef.current}
              allergies={allAlergiesListRef.current}
              medicalIssues={anyMedicalIssueRef.current}
              otherInstructions={anyOtherInstructionsRef.current}
              Heading={GoalConstants.MEDICAL_HISTORY}
              SubHeading={GoalConstants.DIFFERENTLY_ABLED}
              SubHeading1={GoalConstants.ALLERGIC_TO}
              SubHeading2={GoalConstants.MEDICAL_ISSUES}
              SubHeading3={GoalConstants.OTHER_INSTRUCTIONS}
              onPress={() => setMedicalHistoryModal(true)}
            />
          </View>
          <View style={{marginTop: 10}}>
            <HeightWeightCardTemplate
              currentHeight={currentHeightRef.current}
              currentWeight={currentWeightRef.current}
              Heading={GoalConstants.HEIGHT_WEIGHT}
              SubHeading={GoalConstants.CURRENT_HEIGHT}
              SubHeading1={GoalConstants.CURRENT_WEIGHT}
              onPress={() => setHeightWeightModal(true)}
            />
          </View>
          <View style={{height: 80}}></View>
        </ScrollView>
        {isTimingModal ? (
          <TimingModal
            onEndDateChange={date => onSelectEndDate(date)}
            onStartDateChange={date => onSelectStartDate(date)}
            extDate={extDate}
            SelectDays={(day, index) => onSelectDays(day, index)}
            startDate={startTime}
            endDate={endTime}
            repeat={repeatDays}
            visible={isTimingModal}
            doneModal={(startDate, endDate) =>
              onTimingModalDone(startDate, endDate)
            }
            cancelModal={() => setTimingModal(false)}
          />
        ) : null}
        {isFitnessModal ? (
          <FitnessGoalModal
            extDate={extDate}
            onSelectGoal={goal => onSelectGoal(goal)}
            fitnessGoal={fitnessGoal}
            visible={isFitnessModal}
            cancelModal={() => setFitnesssModal(false)}
            FitessModalDone={() => fitnessModalDone()}
          />
        ) : null}
        {isWorkoutModal ? (
          <WorkOutHistoryModal
            frequency={workoutFrequency}
            workout={workoutHistoryRef.current}
            visible={isWorkoutModal}
            cancelModal={() => setWorkoutModal(false)}
            onWorkoutmodalDone={() => onWorkoutmodalDone()}
            onDone={(onend, frequency) => onWorkoutmodalDone(onend, frequency)}
          />
        ) : null}
        {isDiataryModal ? (
          <DietaryHabitModal
            onSelectDiet={(option, id) => onSelectDiet(option, id)}
            prefer={iPrefer}
            caffine={caffine}
            mealsPerDay={mealsPerDay}
            supplement={supplement}
            visible={isDiataryModal}
            cancelModal={() => setDiataryModal(false)}
            DietaryModalDone={() => onDietaryModalDone()}
          />
        ) : null}
        {isListstyleModal ? (
          <LifestyleModal
            gymAccess={gymAccess}
            travelFre={travelFre}
            sleepHours={sleepHours}
            sleepQuality={sleepQuality}
            extDate={extDate}
            onSelectLifeStyle={data => {
              onSelectLifeStyle(data);
            }}
            habits={habitList}
            visible={isListstyleModal}
            cancelModal={() => setLifestyleModal(false)}
            onLifeStyleModalDone={data => onLifeStyleModalDone(data)}
            setExtDate={setExtDate}
          />
        ) : null}
        {isMedicalHistoryModal ? (
          <MedicalHistoryModal
            differentlyAbled={diffAbledRef.current}
            allergies={allAlergiesListRef.current}
            medicalIssues={anyMedicalIssueRef.current}
            otherInstructions={anyOtherInstructionsRef.current}
            visible={isMedicalHistoryModal}
            onDone={(medicalIssue, allergies, differentlyAbled, other) =>
              onMedicalModalDone(
                medicalIssue,
                allergies,
                differentlyAbled,
                other,
              )
            }
            cancelModal={() => setMedicalHistoryModal(false)}
          />
        ) : null}
        {heightWeight ? (
          <WeightAndHeigthModal
            currentHeight={currentHeightRef.current}
            currentWeight={currentWeightRef.current}
            visible={heightWeight}
            onDone={(height, weight) => {
              currentHeightRef.current = height;
              currentWeightRef.current = weight;
              onHeightWeightDone();
            }}
            cancelModal={() => setHeightWeightModal(false)}
          />
        ) : null}
        {loader ? <Loader /> : null}
      </SafeAreaView>
    </>
  );
};

export default GoalsPreferernceScreen;
