import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FadeInView from './FadeInView';

import Dimens from '../constants/dimens';
import Colors from '../constants/colors';

export default class Option extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={data => this.props.checkIfCorrect(data)}>
        <FadeInView>
          <View
            style={{
              width: Dimens.optionSize,
              height: Dimens.optionSize,
              backgroundColor: Colors.optionBg,
              margin: Dimens.optionMargin,
              justifyContent: 'center',
              borderWidth: Dimens.optionBorderWidth,
              borderColor: 'white',
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: Dimens.optionFontSize,
                alignSelf: 'center',
              }}>
              {this.props.option}
            </Text>
          </View>
        </FadeInView>
      </TouchableOpacity>
    );
  }
}
