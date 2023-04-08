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
import ImagePicker from '../../components/ImagePicker';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';

const apiKey = {
  EMAIL: 'email',
  FirstName: 'firstName',
  LastName: 'lastName',
  LOCATION: 'location',
  ADDRESS: 'address',
  ZIPCODE: 'zip',
  PASSWORD: 'password',
  MOBILE_NUMBER: 'mobileNumber',
  AADHAR: 'aadhar',
  PAN: 'pan',
  Image: 'image',
};

export default function Signup({navigation}) {
  const [isLoading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    // drawToolbar();
  }, []);

  const doNavigate = () => {
    navigation.navigate('SignUp2');
  };

  const callApi = data => {
    var formData = new FormData();
    formData.append(apiKey.EMAIL, data.email);
    formData.append(apiKey.FirstName, data.firstName);
    formData.append(apiKey.LastName, data.lastName);
    formData.append(apiKey.MOBILE_NUMBER, data.mobileNumber);
    formData.append(apiKey.LOCATION, data.location);
    formData.append(apiKey.ADDRESS, data.address);
    formData.append(apiKey.ZIPCODE, data.zip);
    formData.append(apiKey.PASSWORD, data.password);
    formData.append(apiKey.AADHAR, data.aadhar);
    formData.append(apiKey.PAN, data.pan);
    formData.append(apiKey.Image, data.image);
    console.log(formData);
    // axios.post('http://192.168.208.132:4000/user/signup', formData)
    //   .then(res => {
    //     console.log(res);
    //   })
    //   .catch(err => {
    //     console.log(JSON.stringify(err));
    //   });
    console.log('api called');
    doNavigate();
  };

  return (
    <LinearGradient
      colors={[colors.BACKGROUND, colors.WHITE]}
      style={styles.styleFull}>
      <View style={{height: '25%', justifyContent: 'center', paddingLeft: 30}}>
        <Text
          style={{
            fontFamily: fonts.FONT_FAMILY.Regular,
            fontSize: fonts._23,
            color: colors.PRIMARY,
          }}>
          Hello,
        </Text>
        <Text
          style={{
            fontFamily: fonts.FONT_FAMILY.Bold,
            fontSize: fonts._27,
            color: colors.PRIMARY,
          }}>
          Let’s get Started
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
                width: '65%',
                alignItems: 'flex-start',
                flexDirection: 'row',
              }}>
              <Text
                style={[
                  styles.titleOnBoard,
                  {color: colors.WHITE, fontFamily: fonts.FONT_FAMILY.Regular},
                ]}>
                Start:{' '}
              </Text>
              <Text style={styles.titleOnBoard}>Sign Up</Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 22}}>
            <CommonInput
              name={apiKey.MOBILE_NUMBER}
              title={constants.TXT_MOBILE_NUMBER}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
                pattern: global.getValidPhoneNumberRegex(),
              }}
              otherTextInputProps={{
                editable: !isLoading,
                placeholder: `Enter ${constants.TXT_MOBILE_NUMBER}`,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_MOBILE}
              validationError={constants.ERROR_MOBILEV}
            />
            <CommonInput
              name={apiKey.EMAIL}
              title={constants.TXT_EMAIL_ADDRESS}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              otherTextInputProps={{
                editable: !isLoading,
                placeholder: `Enter ${constants.TXT_EMAIL_ADDRESS}`,
              }}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_USERNAME}
            />

            <CommonInput
              name={apiKey.PASSWORD}
              title={constants.TXT_PASSWORD}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
                pattern: global.getPasswordRegex(),
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              secureTextEntry={true}
              otherTextInputProps={{
                editable: !isLoading,
              }}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_PASSWORD}
              validationError={constants.ERROR_PASSWORDV}
            />
            <CommonInput
              name={apiKey.FirstName}
              title={constants.TXT_FIRST_NAME}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              otherTextInputProps={{
                editable: !isLoading,
                placeholder: `Enter ${constants.TXT_FIRST_NAME}`,
              }}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_NAME}
            />
            <CommonInput
              name={apiKey.LastName}
              title={constants.TXT_LAST_NAME}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              otherTextInputProps={{
                editable: !isLoading,
                placeholder: `Enter ${constants.TXT_LAST_NAME}`,
              }}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_NAME}
            />
            <CommonInput
              name={apiKey.ADDRESS}
              title={constants.TXT_ADDRESS}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              otherTextInputProps={{
                editable: !isLoading,
                placeholder: `Enter ${constants.TXT_ADDRESS}`,
              }}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_LOCATION}
            />
            <CommonInput
              name={apiKey.LOCATION}
              title={constants.TXT_LOCATION}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              otherTextInputProps={{
                editable: !isLoading,
                placeholder: `Eg. Mumbai`,
              }}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_LOCATION}
            />
            <CommonInput
              name={apiKey.ZIPCODE}
              title={constants.TXT_ZIP_CODE}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              otherTextInputProps={{
                editable: !isLoading,
                placeholder: `Enter ${constants.TXT_ZIP_CODE}`,
              }}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_LOCATION}
            />
            <ImagePicker
              name={apiKey.AADHAR}
              title={'Aadhar Card Image'}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              recomText={setOfStrings.recomSize}
              style={{marginVertical: 17, height: 150}}
              uploadBox={{height: 150}}
              disabled={isLoading}
            />
            <ImagePicker
              name={apiKey.PAN}
              title={'Pan Card Image'}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              recomText={setOfStrings.recomSize}
              style={{marginVertical: 17, height: 150}}
              uploadBox={{height: 150}}
              disabled={isLoading}
            />
            <ImagePicker
              name={apiKey.Image}
              title={'Upload Your Image'}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              recomText={setOfStrings.recomSize}
              style={{marginVertical: 17, height: 150}}
              uploadBox={{height: 150}}
              disabled={isLoading}
            />
          </View>
          <View style={internalstyles.buttonNext}>
            <PrimaryButton title="Next" onPress={callApi} />
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
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
    backgroundColor: colors.BACKGROUND2,
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
});
