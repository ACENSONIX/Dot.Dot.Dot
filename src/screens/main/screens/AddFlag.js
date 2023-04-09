import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {View} from 'react-native';
import Header from '../../../components/Header';
import colors from '../../../styles/colors';
import styles from '../../../styles/styles';
import constants from '../../../utility/constants';
import global from '../../../utility/global';
import PrimaryButton from '../../../components/PrimaryButton';
import CommonInput from '../../../components/CommonInput';
import CommonDropdown from '../../../components/CommonDropdown';

const apiKey = {
  TYPE: 'type',
  DESCRIPTION: 'description',
  REASON: 'reason',
  CAFEID: 'cafeId',
};

export default function AddFlag({navigation, route}) {
  const [isLoading, setLoading] = useState(false);
  const {userInfo} = route.params;

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header
          title={'Nihal Gupta'}
          showBackButton={true}
          navigation={navigation}
        />
      ),
    });
  }, []);

  const callApi = data => {
    global
      .getItem(constants.USER_DATA)
      .then(userData => {
        console.log('userData', userData.cafe.id);
        // store this id in a variable and use it in the api call
        var id = userData.cafe.id;
        console.log('id', id);
        var myHeaders = new Headers();
        myHeaders.append(
          'Cookie',
          'connect.sid=s%3AsVBEN_JxSDgi39TGHPEF-bnrZ69Kwc6n.nOPSnfWT8AWCufQY3Qv18zUnr5agpwmN3LTFNEJOfek',
        );

        var formdata = new FormData();
        formdata.append(apiKey.TYPE, data[apiKey.TYPE]);
        formdata.append(apiKey.DESCRIPTION, data[apiKey.DESCRIPTION]);
        formdata.append(apiKey.REASON, data[apiKey.REASON]);
        formdata.append(apiKey.CAFEID, id);
        console.log('formdata', formdata);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        fetch(
          'http://192.168.208.132:4000/user/flag/' + userInfo.id,
          requestOptions,
        )
          .then(response => response.text())
          .then(result => {
            console.log(result);
            global.showMessage('Flagged Successfully', false);
            navigation.goBack();
          })
          .catch(error => console.log('error', error));
      })
      .catch(err => {
        console.log('err', err);
      });
  };

  return (
    <View style={[styles.styleFull]}>
      <View style={{paddingHorizontal: 22}}>
        <CommonDropdown
          name={apiKey.TYPE}
          title={'Type'}
          starMark={true}
          control={control}
          errors={errors}
          data={[
            {label: 'Red Flag', value: '1'},
            {label: 'Yellow Flag', value: '3'},
            {label: 'Orange Flag', value: '2'},
            {label: 'Green Flag', value: '4'},
          ]}
          rules={{
            required: true,
          }}
          textBoxStyle={{backgroundColor: colors.BACKGROUND2}}
          otherTextInputProps={{
            editable: !isLoading,
            placeholder: `Select Type`,
          }}
          style={{
            marginTop: 26,
          }}
          requiredError={constants.ERROR_USERNAME}
        />
        <CommonInput
          name={apiKey.DESCRIPTION}
          title={'Description'}
          starMark={true}
          control={control}
          errors={errors}
          rules={{
            required: true,
          }}
          textBoxStyle={{backgroundColor: colors.BACKGROUND2}}
          otherTextInputProps={{
            editable: !isLoading,
            placeholder: `Description`,
          }}
          style={{
            marginTop: 26,
          }}
          requiredError={constants.ERROR_USERNAME}
        />
        <CommonInput
          name={apiKey.REASON}
          title={'Reason'}
          starMark={true}
          control={control}
          errors={errors}
          rules={{
            required: true,
          }}
          textBoxStyle={{backgroundColor: colors.BACKGROUND2}}
          otherTextInputProps={{
            editable: !isLoading,
            placeholder: `Reason`,
          }}
          style={{
            marginTop: 26,
          }}
          requiredError={constants.ERROR_USERNAME}
        />
        <PrimaryButton
          title={'Submit'}
          onPress={handleSubmit(callApi)}
          style={{width: '100%', marginTop: 26}}
        />
      </View>
    </View>
  );
}
