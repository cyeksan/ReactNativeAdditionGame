import React from 'react';
import {View, Text} from 'react-native';

import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          width: Dimens.questionWidth,
          backgroundColor: 'transparent',
          marginVertical: Dimens.questionMarginVertical,
          alignItems: 'center',
        }}>
        <Text style={{color: 'white', fontSize: Dimens.questionFontSize}}>
          {Strings.questionFirstPart}
          {this.props.field1}
          {Strings.questionSecondPart}
          {this.props.field2}
          {Strings.questionMark}
        </Text>
      </View>
    );
  }
}
