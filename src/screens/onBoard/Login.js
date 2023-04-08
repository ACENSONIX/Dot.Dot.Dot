import React, {useEffect, useState} from 'react';

import {View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import Ripple from 'react-native-material-ripple';
import SplashScreen from 'react-native-splash-screen';
import CommonInput from '../../components/CommonInput';
import PrimaryButton from '../../components/PrimaryButton';
import styles from '../../styles/styles';
import constants from '../../utility/constants';
import {useForm} from 'react-hook-form';
import global from '../../utility/global';
import fonts from '../../utility/fonts';
import colors from '../../styles/colors';
import setOfStrings from '../../utility/screenStrings';
import TouchId from 'react-native-touch-id';

const apiKey = {
  USERTYPE: 'userType',
  USERNAME: 'username',
  PASSWORD: 'password',
};

export default function Login({route, navigation}) {
  const [isLoading, setLoading] = useState(false);
  // accept params from ChooseLanguage.js
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const doLogin = data => {
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3AmUo_wrn5FMYvbl4cm-QXM6StKVd1FLs_.%2F2wZdTVmrFCjoxFmSPaNNxG39EI2TbZoK5AzKLUfg2E',
    );

    var formdata = new FormData();
    formdata.append('email', data[apiKey.USERNAME]);
    formdata.append('password', data[apiKey.PASSWORD]);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://localhost:4000/cafe/login', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result) {
          global.storeItem(constants.USER_DATA, result);
          setTimeout(() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'MainStack'}],
            });
          }, 1000);
        } else {
          console.log(result);
        }
      })
      .catch(error => console.log('error', error));
  };

  const changeStack = () => {
    global.storeItem(constants.USER_DATA, 'null');
    setTimeout(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'MainStack'}],
      });
    }, 1000);
  };

  return (
    <View style={[styles.styleFull]}>
      <View style={{height: '25%'}}>
        <Image
          source={require('../../assets/images/logo_onboard.png')}
          style={internalstyles.image}
          resizeMode="contain"
        />
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={internalstyles.mainContainer}>
          <View style={internalstyles.centerLogin}>
            <Text style={styles.titleOnBoard}>{setOfStrings.login}</Text>
          </View>
          <View style={{paddingHorizontal: 22}}>
            <CommonInput
              name={apiKey.USERNAME}
              title={setOfStrings.username}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              otherTextInputProps={{
                editable: !isLoading,
                placeholder: `abcd123`,
              }}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_USERNAME}
            />

            <CommonInput
              name={apiKey.PASSWORD}
              title={setOfStrings.password}
              starMark={true}
              control={control}
              errors={errors}
              rules={{
                required: true,
                pattern: global.getPasswordRegex(),
              }}
              secureTextEntry={true}
              otherTextInputProps={{
                editable: !isLoading,
              }}
              textBoxStyle={{backgroundColor: colors.BACKGROUND}}
              style={{
                marginTop: 26,
              }}
              requiredError={constants.ERROR_PASSWORD}
              validationError={constants.ERROR_PASSWORDV}
            />
          </View>
          <View style={internalstyles.forgotPassword}>
            <Ripple onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={internalstyles.forgotPasswordText}>
                {setOfStrings.forgotPassword}
              </Text>
            </Ripple>
          </View>
          <View style={internalstyles.notSignedUp}>
            <Text style={internalstyles.notSignedUpText}>
              {setOfStrings.dontHaveAccount}
            </Text>
            <Ripple onPress={() => navigation.navigate('Signup')}>
              <Text style={internalstyles.signUpText}>
                {setOfStrings.signUp}
              </Text>
            </Ripple>
          </View>
          <View style={internalstyles.buttonLogin}>
            <PrimaryButton
              title={setOfStrings.login}
              onPress={handleSubmit(doLogin)}
            />
            <Ripple
              onPress={() =>
                TouchId.authenticate('Place your fingerprint!', {
                  title: 'Authentication',
                })
                  .then(() => {
                    Alert.alert('Authentication Successful!');
                    console.log('Done');
                    setTimeout(() => {
                      navigation.reset({
                        index: 0,
                        routes: [{name: 'MainStack'}],
                      });
                    }, 1000);
                  })
                  .catch(() => {
                    Alert.alert('Fingerprint Did not match');
                  })
              }
              style={{
                marginTop: '5%',
                borderColor: colors.PRIMARY,
                borderWidth: 1,
                borderRadius: 5,
                width: '90%',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: fonts._14, color: colors.BLACK}}>
                FingerPrint Login
              </Text>
            </Ripple>
          </View>
        </View>
      </ScrollView>
      {isLoading && global.getLoader()}
    </View>
  );
}

const internalstyles = StyleSheet.create({
  image: {
    width: 200,
    height: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: colors.BACKGROUND2,
    paddingBottom: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  centerLogin: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  forgotPassword: {
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: 20,
  },
  forgotPasswordText: {
    fontFamily: fonts.FONT_FAMILY.Regular,
    fontWeight: '200',
    fontSize: fonts._10,
    color: colors.PRIMARY,
  },
  notSignedUp: {
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  notSignedUpText: {
    fontFamily: fonts.FONT_FAMILY.Regular,
    fontWeight: '400',
    fontSize: fonts._14,
    color: colors.WHITE,
  },
  signUpText: {
    fontFamily: fonts.FONT_FAMILY.SemiBold,
    fontWeight: '600',
    fontSize: fonts._13,
    color: colors.PRIMARY,
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
  buttonLogin: {
    marginTop: '27%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
