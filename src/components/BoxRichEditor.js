import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {RichEditor, RichToolbar, actions} from 'react-native-pell-rich-editor';
import colors from '../styles/colors';
import fonts from '../utility/fonts';
import {useController} from 'react-hook-form';
import global from '../utility/global';

export default function BoxRichEditor({
  titleNo,
  title,
  style = {},
  control,
  name,
  errors,
  requiredError = `Please enter ${title.toLowerCase()}`,
  rules = {},
  defaultValue = '',
  disabled,
}) {
  const rich = React.useRef();

  const {field} = useController({
    control: control,
    name: name,
    rules: rules,
    defaultValue: defaultValue,
  });
  return (
    <View style={[internalStyles.container, style]}>
      <Text style={internalStyles.text}>{title}</Text>

      <View style={[internalStyles.boxView]}>
        <RichToolbar
          editor={rich}
          actions={[
            actions.setBold,
            actions.setItalic,
            actions.setUnderline,
            actions.insertBulletsList,
            actions.insertOrderedList,
            actions.setStrikethrough,
            actions.insertLink,
            actions.keyboard,
          ]}
        />
        <RichEditor
          ref={rich}
          style={internalStyles.richEditor}
          useContainer={false}
          onChange={value => {
            field.onChange(value);
          }}
          editorStyle={{
            backgroundColor: colors.BACKGROUND,
          }}
          disabled={disabled}
          androidHardwareAccelerationDisabled={true}
          initialContentHTML={field.value}
        />

        {errors[name]?.type === 'required' &&
          global.getValidateText(requiredError)}
      </View>
    </View>
  );
}

const internalStyles = StyleSheet.create({
  text: {
    fontFamily: fonts.FONT_FAMILY.Regular,
    fontWeight: '400',
    fontSize: fonts._13,
    color: colors.BLACK,
    opacity:0.5
  },
  container: {
    backgroundColor: colors.BACKGROUND2,
    borderRadius: 8,
    paddingBottom: 8,
  },
  richEditor: {
    height: 180,
    marginTop: 2,
  },
  boxView: {
    marginTop: 2,
    marginHorizontal: 0,
  },
});
