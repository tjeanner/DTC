import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Vibration,
  FlatList,
  BackHandler,
} from 'react-native';

import { CheckBox, Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

import MyButton from '../components/MyButton';
import NameChooser from '../components/NameChooser';
import CurrentPlayer from '../components/CurrentPlayer';
import Scores from '../components/Scores';
import { sortScoresAsc, compute1Dart, compute3Darts } from '../helpers/PointsManagers';

class PointSelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {dart1: 0, double1: false, triple1: false};
    this.createData = this.createData.bind(this);
  }

  createData(){
    var dart1 = {dart:this.state.dart1, double: this.state.double1, triple: this.state.triple1};
    this.props.callBack(dart1);
  }


  render(){
    var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25];
  return(
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Picker
        selectedValue={this.state.dart1}
        style={{ height: 50, width: 150 }}
        onValueChange={(itemValue, itemIndex) => this.setState(prevState => ({dart1: itemValue, triple1: prevState.triple1 && itemValue == 25 ? false : prevState.triple1}))}
      >
      {nums.map(function(num){
        return <Picker.Item label={num.toString()} value={num} key={num} />;
      })}
      </Picker>
            <CheckBox
              title='Double'
              onPress={() => {this.setState(prevState => ({double1:!prevState.double1, triple1:!prevState.double1 ? false : !prevState.double1}));}}
              checked={this.state.double1 ? true : false}
            />
            <CheckBox
              title='Triple'
              onPress={() => {this.setState(prevState => ({triple1:!prevState.triple1 && this.state.dart1 == 25 ? false :  !prevState.triple1, double1:!prevState.triple1 ? false : !prevState.triple1}));}}
              checked={this.state.triple1 ? true : false}
            />
    </View>
    </View>
    <View style={{marginTop:60, marginBottom:40}}>
      <MyButton title="Proceed" onPress={() => {this.createData();Vibration.vibrate(100);}}/>
    </View>
    </View>
  );
}
}

export default class CricketScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      currentPlayer: 0,
      data: null,
      endOfGame:false,
      winner: 0,
      turn: 0,
      hasProceed: false,
      currentDart : 0,
      isChoosingNames: false,
      currentName: 0,
      numbers: null,
      editingScore: false,
      editedScore: 0,
    };
    this.generateData = this.generateData.bind(this);
    this.callBack = this.callBack.bind(this);
    this.manageScores = this.manageScores.bind(this);
    this.nameCallback = this.nameCallback.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
    this.changeOneScore = this.changeOneScore.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    if(this.props.route.params.ownNames){
      this.setState({isChoosingNames: true});
    }
    this.generateData();
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    if(this.state.editingScore){
      this.setState({editingScore: false});
    }
    else{
      Alert.alert(
        'Warning',
        "You're about to leave the game, continue ?",
        [
          {text:'Yes', onPress: () => {this.props.navigation.goBack();}},
          {text:'Cancel', style: 'cancel'}
        ],
        {cancelable: true}
      );
    }
    return true;
  }

    generateData(){
    var i = 0;
    var tmp = 0;
    var numbers = [];
    if(this.props.route.params.randomNumbers){
      while(i < 6){
        tmp = Math.floor(Math.random() * 20) + 1;
        if(!numbers.some(e => e.value === tmp)) {
          numbers[i] = {key: tmp.toString(), value: tmp};
          i++;
        }
      }
      numbers[i] = {key: '25', value: 25};
      numbers.sort(function(a, b){return a.value - b.value})
    }
    else if(this.props.route.params.game == 'Low Pitch'){
      numbers = [{key: '1', value: 1}, {key: '2', value: 2}, {key: '3', value: 3}, {key: '4', value: 4}, {key: '5', value: 5}, {key: '6', value: 6}, {key: '25', value: 25}];
    }
    else{
      numbers = [{key: '15', value: 15}, {key: '16', value: 16}, {key: '17', value: 17}, {key: '18', value: 18}, {key: '19', value: 19}, {key: '20', value: 20}, {key: '25', value: 25}];
    }
    i = 0;
    var data = [];
    while (i < this.props.route.params.nbPlayers){
      data[i] = ({key: i.toString(), player: i, score: 0, name: 'Player : ' + (i + 1).toString(), checkmarks:[0, 0, 0, 0, 0, 0, 0]});
      i++;
    }
    console.log(numbers);
    this.setState({isLoading: false, data:data, numbers: numbers})
  }

  manageScores(){
    let data = this.state.data;
    data.sort(function(a, b){return a.score - b.score})
    this.setState(prevState=>({
      currentPlayer:prevState.currentPlayer == this.props.route.params.nbPlayers - 1 ? 0 : prevState.currentPlayer + 1,
      turn: prevState.currentPlayer == this.props.route.params.nbPlayers - 1 ? prevState.turn + 1 : prevState.turn,
      hasProceed: false,
      data: data
    }));
  }

  nameCallback(name, player){
    var data = this.state.data;
    data[player].name = name;
    console.log(data);
    this.setState(prevState => ({data: data, currentName: prevState.currentName + 1}));
  }

  callBack(dart1){
    this.setState({hasProceed: true});
    let data = this.state.data;
    let currentPlayer = this.state.currentPlayer;
    let initialScore = data.find(x => x.player == currentPlayer).score;
    //let nbPoints = compute1Dart(dart1) + compute1Dart(dart2) + compute1Dart(dart3);
    //let currentScore = initialScore - nbPoints;
    /*if (currentScore == 0){
      if (this.props.route.params.doubleOut || this.props.route.params.tripleOut){
        if (this.props.route.params.doubleOut && !this.props.route.params.tripleOut){
          if((dart1.double && dart2.dart == 0 && dart3.dart == 0) || (dart2.double && dart3.dart == 0) || dart3.double){
            data.find(x => x.player == currentPlayer).score = 0;
            this.setState({endOfGame:true, winner:currentPlayer});
          }
        }
        else if (this.props.route.params.tripleOut && !this.props.route.params.doubleOut){
          if((dart1.triple && dart2.dart == 0 && dart3.dart == 0) || (dart2.triple && dart3.dart == 0) || dart3.triple){
            data.find(x => x.player == currentPlayer).score = 0;
            this.setState({endOfGame:true, winner:currentPlayer});
          }
        }
        else{
          if(((dart1.triple && dart2.dart == 0 && dart3.dart == 0) || (dart2.triple && dart3.dart == 0) || dart3.triple) ||
            ((dart1.double && dart2.dart == 0 && dart3.dart == 0) || (dart2.double && dart3.dart == 0) || dart3.double)){
            data.find(x => x.player == currentPlayer).score = 0;
            this.setState({endOfGame:true, winner:currentPlayer});
          }
        }
      }
      else{
        data.find(x => x.player == currentPlayer).score = currentScore;
        this.setState({endOfGame:true, winner:currentPlayer});
      }
    }
    else if (currentScore > 0 && currentScore < 3 && (this.props.route.params.doubleOut || this.props.route.params.tripleOut)){
        data.find(x => x.player == currentPlayer).score = this.props.route.params.doubleOut ? 2 : 3;
    }
    else if (currentScore > 0){
      if (!data.find(x => x.player == currentPlayer).hasStarted && (this.props.route.params.doubleIn || this.props.route.params.tripleIn)){
        if (this.props.route.params.doubleIn && !this.props.route.params.tripleIn){
          data.find(x => x.player == currentPlayer).score = dart1.double ? currentScore :
                                                  dart2.double ? initialScore - (compute1Dart(dart2) + compute1Dart(dart3)) : 
                                                  dart3.double ? initialScore - compute1Dart(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = dart1.double || dart2.double || dart3.double ? true : false;
        }
        else if (this.props.route.params.tripleIn && !this.props.route.params.doubleIn){
          data.find(x => x.player == currentPlayer).score = dart1.triple ? currentScore :
                                                  dart2.triple ? initialScore - (compute1Dart(dart2) + compute1Dart(dart3)) : 
                                                  dart3.triple ? initialScore - compute1Dart(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = dart1.triple || dart2.triple || dart3.triple ? true : false;
        }
        else{
          data.find(x => x.player == currentPlayer).score = dart1.triple || dart1.double ? currentScore :
                                                  dart2.triple || dart2.double ? initialScore - (compute1Dart(dart2) + compute1Dart(dart3)) : 
                                                  dart3.triple || dart3.double ? initialScore - compute1Dart(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = dart1.triple || dart2.triple || dart3.triple || dart1.double || dart2.double || dart3.double  ? true : false;
        }
      }
      else{
        data.find(x => x.player == currentPlayer).score = currentScore;
      }
      var i = 0;
      while (this.props.route.params.killer && i < this.props.route.params.nbPlayers){
        if (currentScore == data[i].score && i != currentPlayer){
          data[i].score = this.props.route.params.game.toString();
        }
        i++;
      }
    }*/
    this.setState(prevState => ({data:data, currentDart: prevState.currentDart == 2 ? 0 : prevState.currentDart + 1}));
  }

  changeOneScore(){
    let data = this.state.data;
    data.find(x => x.player == this.state.currentPlayer).score = this.state.editedScore;
    data = sortScoresAsc(data);
    this.setState({editingScore: false, data:data});
  }

  render(){
    if (this.state.isLoading)
    {
      return(<ActivityIndicator/>);
    }
    else if(this.state.endOfGame){
      return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#457b9d'}}>
          <Text style={{fontSize:24}}>Winner is player {this.state.winner + 1}</Text>
          <Scores data={this.state.data}/>
        </View>
      );
    }
    else if(this.state.isChoosingNames && this.state.currentName < this.props.route.params.nbPlayers){
      return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#457b9d'}}>
          <Text style={{fontSize:24}}>Choose player's {(this.state.currentName + 1).toString()} name</Text>
          <NamesChooser data={this.state.data} nameCallback={this.nameCallback} currentName={this.state.currentName}/>
        </View>
      );
    }
    else if(this.state.editingScore){
      return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#457b9d'}}>
          <Text style={{fontSize:24}}>Edit {this.state.data.find(x => x.player == this.state.currentPlayer).name}'s score</Text>
            <Input
              autoFocus={true}
              textAlign={'center'}
              value={this.state.editedScore.toString()}
              onChangeText={(text) => {this.setState({editedScore: text && text.length && text.match(/^-{0,1}\d+$/) && parseInt(text) != 0 ? parseInt(text) : ''});
              }}
              label="Score"
              keyboardType="phone-pad"
              maxLength={4}
              placeholderTextColor="#bbbbbb"
              keyboardAppearance="dark"
              returnKeyType="done"
              textContentType="none"
            />
            <MyButton title="Validate" onPress={() => {this.changeOneScore()}}/>
        </View>
      );
    }
    return(
      <View style={{flex: 1, backgroundColor:'#457b9d'}}>
      <View style={{ flex: 1, flexDirection:'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, flexDirection:'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ width:400, height:40, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Text style={{fontSize:24}}>Numbers : </Text>
      {this.state.numbers.map(function(num){
        return <Text style={{fontSize:24}}>{num == 25 ? (num.key) : (num.key + ', ')}</Text>;
      })}
          
        </View>
        </View>
        <View style={{ flex: 1, flexDirection:'row', alignItems: 'flex-end'}}>
          <Scores data={this.state.data}/>
        </View>
          <Text style={{fontSize:24}}>Turn : {((this.state.turn + 1).toString() + '\n')}</Text>
          <CurrentPlayer currentDart={this.state.currentDart} currentPlayer={this.state.currentPlayer} data={this.state.data}/>
          <View style={{ flex: 1 }}>
            <MyButton title="Edit current player's score" onPress={() => {this.setState({editingScore: true, editedScore: this.state.data.find(x => x.player == this.state.currentPlayer).score.toString()});}}/>
          </View>
      </View>
      <PointSelector callBack={this.callBack}/>
      <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'flex-end', marginBottom:40 }}>
        <MyButton title="Next" 
          disabled={!this.state.hasProceed}
          onPress={() => {
            Vibration.vibrate(100);
            this.manageScores();
          }}
        />
      </View>
      </View>
    );
  }
};