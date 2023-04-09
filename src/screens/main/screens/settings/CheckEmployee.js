import React, {useEffect} from 'react';
import {View, StyleSheet, Text, ScrollView, Linking} from 'react-native';
import ImagePicker from '../../../../components/ImagePicker';
import constants from '../../../../utility/constants';
import styles from '../../../../styles/styles';
import global from '../../../../utility/global';
import {useForm} from 'react-hook-form';
import Header from '../../../../components/Header';
import PrimaryButton from '../../../../components/PrimaryButton';
import colors from '../../../../styles/colors';
import setOfStrings from '../../../../utility/screenStrings';

const apikey = {
  IMAGE: 'image',
};
export default function CheckEmployee({navigation}) {
  const [isLoading, setLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm();

  useEffect(() => {
    drawToolbar();
  }, []);

  const drawToolbar = () => {
    navigation.setOptions({
      header: () => <Header title={'Check Employee'} navigation={navigation} />,
    });
  };

  const check = data => {
    // const data2 = new FormData();
    // data2.append('image', data.image.uri);
    // console.log(data2);
    // global.isOnline().then(isNetworkAvailable => {
    //   if (!isNetworkAvailable)
    //     global.showMessage(constants.NO_INTERNET_SNACKBAR_MESSAGE, true, false);
    //   else {
    //     console.log('data2', data2);
    //     repos.doPredict(data2, onCheck);
    //   }
    // });
    // navigation.navigate('EmployeeDetails', {data: data.image.uri})
    // navigation.navigate('EmployeeDetails')
    var myHeaders = new Headers();
    myHeaders.append(
      'Cookie',
      'connect.sid=s%3AAB3Vjg-buznA_ihXmhLh48wIagY4CRh6.fy%2BGgmW5j6PrTQnza28jm05mDnSVvXFgbgQ2aPUwYZk',
    );

    var formdata = new FormData();
    formdata.append(apikey.IMAGE, {
      uri: data[apikey.IMAGE].uri,
      name: 'photo.png',
      filename: 'imageName.png',
      type: 'image/png',
    });
    formdata.append('Content-Type', 'image/png');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch('http://192.168.91.132:4000/user/search', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
    navigation.navigate('EmployeeDetails');
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.styleFull,
        {
          paddingTop: 10,
          paddingHorizontal: 15,
          marginBottom: 10,
        },
      ]}>
      <ImagePicker
        name={apikey.IMAGE}
        title={'Image'}
        control={control}
        errors={errors}
        rules={{
          required: true,
        }}
        recomText={setOfStrings.recomSize}
        style={{marginBottom: 17}}
        disabled={isLoading}
      />

      <PrimaryButton
        title="Check Employee"
        onPress={handleSubmit(check)}
        style={{marginBottom: 10, width: '100%'}}
      />
    </ScrollView>
  );
}

const internalStyles = StyleSheet.create({
  whiteBgView: {
    backgroundColor: colors.WHITE,
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  inRowAndEnd: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  inRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  keyView: {
    width: '25%',
  },
  key: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.BLACK,
  },
  valueView: {
    width: '75%',
  },
  value: {
    fontSize: 14,
    color: colors.BLACK,
  },
});
