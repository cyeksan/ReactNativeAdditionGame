import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import FadeInView from './FadeInView';
import Dimens from '../constants/dimens';
import Strings from '../constants/strings';

export default class Question extends React.Component {
  constructor(props) {
    super(props);
  }

  showCorrectText() {
    if (this.props.visible === true) {
      return (
        <Text
          style={{color: 'white', fontSize: Dimens.resultWindowBottomFontSize}}>
          {Strings.theCorrectAnswer}
          {this.props.correctAnswer}
          {Strings.point}
        </Text>
      );
    } else {
      return null;
    }
  }

  render() {
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: this.props.bgColor,
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    return (
      <View style={styles.container}>
        <FadeInView style={styles.container}>
          <Text
            style={{color: 'white', fontSize: Dimens.resultWindowTopFontSize}}>
            {Strings.resultFirstPart}
            {this.props.selectedAnswer}
            {Strings.resultSecondPart}
            {this.props.trueOrFalse}
            {Strings.exclamationMark}
          </Text>
          {this.showCorrectText()}
        </FadeInView>
      </View>
    );
  }
}
