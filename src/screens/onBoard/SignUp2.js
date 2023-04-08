import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableHighlight,
  ScrollView,
} from 'react-native';
import {useForm} from 'react-hook-form';
import global from '../../utility/global';
import fonts from '../../utility/fonts';
import colors from '../../styles/colors';
import CommonInput from '../../components/CommonInput';
import PrimaryButton from '../../components/PrimaryButton';
import constants from '../../utility/constants';
import styles from '../../styles/styles';
import setOfStrings from '../../utility/screenStrings';
import {launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from '../../components/ImagePicker';
import BoxInput from '../../components/BoxInput';
import BoxRichEditor from '../../components/BoxRichEditor';
import Ripple from 'react-native-material-ripple';

const apiKey = {
  RESUME: 'resume',
};

export default function SignUp2({navigation}) {
  const [workExperienceSize, setWorkExperienceSize] = useState(0);
  const [workExperience, setWorkExperience] = useState([{}]);
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  const addWorkExperience = index => {
    const workKey = {
      COMPANYNAME: 'companyName',
      DESIGNATION: 'designation',
      STARTDATE: 'startDate',
      ENDDATE: 'endDate',
      DESCRIPTION: 'description',
    };
    return (
      <View>
        <Text style={internalstyles.title}>Work Experience {index + 1}</Text>
        <CommonInput
          name={workKey.COMPANYNAME}
          title={'Company Name'}
          starMark={true}
          control={control}
          errors={errors}
          rules={{
            required: true,
          }}
          textBoxStyle={{backgroundColor: colors.BACKGROUND}}
          otherTextInputProps={{
            editable: !isLoading,
            placeholder: `Enter Company Name`,
          }}
          style={{
            marginTop: 5,
          }}
          requiredError={constants.ERROR_NAME}
        />
        <CommonInput
          name={workKey.DESIGNATION}
          title={'Designation'}
          starMark={true}
          control={control}
          errors={errors}
          rules={{
            required: true,
          }}
          textBoxStyle={{backgroundColor: colors.BACKGROUND}}
          otherTextInputProps={{
            editable: !isLoading,
            placeholder: `Enter Designation`,
          }}
          style={{
            marginTop: 5,
          }}
          requiredError={constants.ERROR_NAME}
        />
        <CommonInput
          name={workKey.STARTDATE}
          title={'Start Date'}
          starMark={true}
          control={control}
          errors={errors}
          rules={{
            required: true,
          }}
          textBoxStyle={{backgroundColor: colors.BACKGROUND}}
          otherTextInputProps={{
            editable: !isLoading,
            placeholder: `Enter Start Date`,
          }}
          style={{
            marginTop: 5,
          }}
          requiredError={constants.ERROR_NAME}
        />
        <CommonInput
          name={workKey.ENDDATE}
          title={'End Date'}
          starMark={true}
          control={control}
          errors={errors}
          rules={{
            required: true,
          }}
          textBoxStyle={{backgroundColor: colors.BACKGROUND}}
          otherTextInputProps={{
            editable: !isLoading,
            placeholder: `Enter End Date`,
          }}
          style={{
            marginTop: 5,
          }}
          requiredError={constants.ERROR_NAME}
        />
        <BoxRichEditor
          title={workKey.DESCRIPTION}
          name={'description'}
          control={control}
          errors={errors}
          rules={{
            required: true,
          }}
          style={{
            marginTop: 5,
          }}
          requiredError={constants.ERROR_ADDRESS}
        />
        <PrimaryButton
          title={'Add More Work Experience'}
          onPress={() => {
            setWorkExperienceSize(workExperienceSize + 1);
            // append the new object got from input to the array workExperience
            // setWorkExperience([...workExperience, {
            //     companyName: ',
            // }]);
          }}
        />
      </View>
    );
  };
  return (
    <ImageBackground
      source={require('../../assets/images/background_onboard.jpg')}
      style={styles.styleFull}>
      <View style={{height: '25%', justifyContent: 'center', paddingLeft: 30}}>
        <Text
          style={{
            fontFamily: fonts.FONT_FAMILY.Regular,
            fontSize: fonts._23,
            color: colors.WHITE,
          }}>
          Your,
        </Text>
        <Text
          style={{
            fontFamily: fonts.FONT_FAMILY.Bold,
            fontSize: fonts._27,
            color: colors.WHITE,
          }}>
          Professional Details
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={internalstyles.mainContainer}>
          <View style={internalstyles.center}>
            <View style={{width: '25%', alignItems: 'center'}}>
              <TouchableHighlight
                style={[
                  internalstyles.btnBack,
                  {backgroundColor: colors.PRIMARY},
                ]}
                onPress={() => navigation.goBack()}
                underlayColor={colors.RIPPLE_EFFECT}>
                {global.drawIcon(
                  constants.IC_FEATHER,
                  'chevron-left',
                  20,
                  colors.WHITE,
                )}
              </TouchableHighlight>
            </View>
            <View
              style={{
                width: '75%',
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  styles.titleOnBoard,
                  {color: colors.BLACK, fontFamily: fonts.FONT_FAMILY.Regular},
                ]}>
                Add Professionl Experience
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 22}}>
            <ImagePicker
              name={apiKey.RESUME}
              title={'Add Resume Image'}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              recomText={setOfStrings.recomSize}
              style={{marginVertical: 17, height: 350}}
              uploadBox={{height: 350}}
              disabled={isLoading}
            />
            <View style={{marginTop: 20}}>
              {workExperienceSize > 0 ? (
                Array.from(Array(workExperienceSize).keys()).map(index => {
                  return addWorkExperience(index);
                })
              ) : (
                <PrimaryButton
                  title={'Add Work Experience'}
                  onPress={() => {
                    setWorkExperienceSize(1);
                  }}
                />
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const internalstyles = StyleSheet.create({
  center: {
    flexDirection: 'row',
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
    paddingBottom: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  buttonNext: {
    marginTop: '10%',
    width: '100%',
  },
  btnBack: {
    height: 25,
    width: 25,
    marginRight: 10,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -15,
  },
  title: {
    fontFamily: 'bold',
    fontSize: fonts._16,
    color: colors.BLACK,
  },
  btnPrimary: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 5,
    padding: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
