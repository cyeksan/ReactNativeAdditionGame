import React from 'react';
import {View, Text} from 'react-native';
import RNRestart from 'react-native-restart';

import Question from './components/Question';
import Option from './components/Option';
import PlayButton from './components/PlayButton';
import ResultWindow from './components/ResultWindow';

import Dimens from './constants/dimens';
import Colors from './constants/colors';
import Strings from './constants/strings';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    let riddle = this.playGame();
    this.state = {riddle};
  }

  randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  generateRandomOptions(sum) {
    let resultArray = [];
    let randomNumberArray = [];

    while (randomNumberArray.length <= 2) {
      let randomNumber = this.randomNumber(1, 19);
      if (randomNumberArray.indexOf(randomNumber) > -1) continue; // Bu satır aynı random number'ın array'e atılmasını engelliyor.
      randomNumberArray.push(randomNumber);
    }

    console.log(randomNumberArray);

    for (let i = 0; i < 3; i++) {
      let addedOrSubtractedValue = this.randomNumber(0, 1);

      let result = sum;

      if (addedOrSubtractedValue === 0) {
        result -= randomNumberArray[i]; //Subtracted
        resultArray.push(result);
      } else {
        result += randomNumberArray[i]; //Added
        resultArray.push(result);
      }
    }

    return resultArray;
  }

  playGame() {
    let mField1 = this.randomNumber(20, 50);
    let mField2 = this.randomNumber(20, 50);
    let result = mField1 + mField2;
    let resultArray = this.generateRandomOptions(result);

    resultArray.push(result);
    resultArray.sort(function(a, b) {
      return 0.5 - Math.random(); // Bu satır şıkların random yerleşmesini (sort edilmesini) sağlıyor.
    });

    console.log(resultArray);

    let riddle = {
      optionsArray: resultArray,
      field1: mField1,
      field2: mField2,
      answer: mField1 + mField2,
      gameOver: false,
      correctVisible: null,
      resultBg: null,
      trueOrFalse: null,
      selectedAnswer: null,
    };

    return riddle;
  }

  checkResults(selectedOption) {
    clearInterval(this.timeID);

    if (selectedOption === this.state.riddle.answer) {
      this.setGameOver(
        false,
        Colors.correctBg,
        Strings.correct,
        selectedOption,
      );
    } else {
      this.setGameOver(true, Colors.wrongBg, Strings.wrong, selectedOption);
    }
  }

  setGameOver(vis, bg, trueOrFalse, selectedOption) {
    this.setState({
      riddle: {
        ...this.state.riddle,
        gameOver: true,
        correctVisible: vis,
        resultBg: bg,
        trueOrFalse: trueOrFalse,
        selectedAnswer: selectedOption,
      },
    });

    this.showResultWindow();
  }

  showResultWindow() {
    if (this.state.riddle.gameOver) {
      this.timeID = setInterval(() => {
        this.setState({
          riddle: {
            ...this.state.riddle,
            gameOver: false,
          },
        });
      }, 4000);

      return (
        <ResultWindow
          correctAnswer={this.state.riddle.answer}
          visible={this.state.riddle.correctVisible}
          bgColor={this.state.riddle.resultBg}
          trueOrFalse={this.state.riddle.trueOrFalse}
          selectedAnswer={this.state.riddle.selectedAnswer}></ResultWindow>
      );
    } else {
      return null;
    }
  }

  playAgain() {
    RNRestart.Restart(); // Restart the game
  }

  componentWillUnmount(){
    let riddle = {}
    this.state = {riddle};
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            margin: Dimens.gameAreaMargin,
            backgroundColor: Colors.gameBg,
            alignItems: 'center',
          }}>
          <Question
            field1={this.state.riddle.field1}
            field2={this.state.riddle.field2}></Question>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Option
              option={this.state.riddle.optionsArray[0]}
              checkIfCorrect={() =>
                this.checkResults(this.state.riddle.optionsArray[0])
              }></Option>
            <Option
              option={this.state.riddle.optionsArray[1]}
              checkIfCorrect={() =>
                this.checkResults(this.state.riddle.optionsArray[1])
              }></Option>
          </View>

          <View style={{flexDirection: 'row'}}>
            <Option
              option={this.state.riddle.optionsArray[2]}
              checkIfCorrect={() =>
                this.checkResults(this.state.riddle.optionsArray[2])
              }></Option>
            <Option
              option={this.state.riddle.optionsArray[3]}
              checkIfCorrect={() =>
                this.checkResults(this.state.riddle.optionsArray[3])
              }></Option>
          </View>
          <PlayButton click={this.playAgain}></PlayButton>
        </View>
        {this.showResultWindow()}
      </View>
    );
  }
}
