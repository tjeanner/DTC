import React from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Alert,
  Vibration,
  BackHandler,
} from 'react-native';

import { CheckBox, Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

import MyButton from '../components/MyButton';
import NameChooser from '../components/NameChooser';
import CurrentPlayer from '../components/CurrentPlayer';
import CricketScores from '../components/CricketScores';
import { sortScoresDes } from '../helpers/PointsManagers';

class PointSelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {dart: 0, double: false, triple: false};
    this.createData = this.createData.bind(this);
  }

  createData(){
    Vibration.vibrate(100);
    var dart = {dart:this.state.dart, double: this.state.double, triple: this.state.triple};
    this.props.manageScoresCallBack(dart);
    this.setState({dart: 0, double: false, triple: false});
  }


  render(){
  return(
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Picker
        selectedValue={this.state.dart}
        style={{ height: 50, width: 150, marginTop:100 }}
        onValueChange={(itemValue, itemIndex) => this.setState(prevState => ({dart: itemValue, triple: prevState.triple && itemValue == 25 ? false : prevState.triple}))}
      >
        <Picker.Item label="0" value={0} key="0" />
      {this.props.nums.map(function(num){
        return <Picker.Item label={num.key} value={num.value} key={num.key} />;
      })}
      </Picker>
            <CheckBox
              title='Double'
              onPress={() => {this.setState(prevState => ({double:!prevState.double, triple:!prevState.double ? false : !prevState.double}));}}
              checked={this.state.double}
            />
            <CheckBox
              title='Triple'
              onPress={() => {this.setState(prevState => ({triple:!prevState.triple && this.state.dart == 25 ? false :  !prevState.triple, double:!prevState.triple ? false : !prevState.triple}));}}
              checked={this.state.triple}
            />
    </View>
    <View style={{flex: 10, }}>
      <MyButton title="Proceed" onPress={() => {this.createData();}} disabled={this.props.disabled}/>
    </View>
    </View>
  );
}
}

export default class GameScreen extends React.Component {
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
      isChoosingNames: false,
      currentName: 0,
      editingScore: false,
      editedScore: 0,
      currentDart : 0,
      numbers: null,
      checkMarksClosed:[false, false, false, false, false, false, false],
    };
    this.generateData = this.generateData.bind(this);
    this.manageScoresCallBack = this.manageScoresCallBack.bind(this);
    this.manageData = this.manageData.bind(this);
    this.nameCallback = this.nameCallback.bind(this);
    this.changeOneScore = this.changeOneScore.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);
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
    else if(this.state.isChoosingNames && this.state.currentName > 0){
      this.setState(prevState => ({currentName: prevState.currentName - 1}));
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
    else if(this.props.route.params.lowPitch){
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
    this.setState({isLoading: false, data:data, numbers: numbers})
  }

  nameCallback(name, player){
    var data = this.state.data;
    data[player].name = name;
    this.setState(prevState => ({
      data: data,
      currentName: prevState.currentName + 1,
      isChoosingNames: prevState.currentName + 1 == this.props.route.params.nbPlayers ? false : prevState.isChoosingNames
    }));
  }

  manageData(){
    this.setState(prevState=>({
      currentPlayer:prevState.currentPlayer == this.props.route.params.nbPlayers - 1 ? 0 : prevState.currentPlayer + 1,
      turn: prevState.currentPlayer == this.props.route.params.nbPlayers - 1 ? prevState.turn + 1 : prevState.turn,
      hasProceed: false,
      currentDart: 0,
    }));
  }

  manageScoresCallBack(dart){
    const {game, nbPlayers} = this.props.route.params;
    const {data, numbers, currentPlayer} = this.state;
    const index = numbers.findIndex(item => item.value === dart.dart);
    if(index >= 0){
      var nbToAdd = dart.triple ? 3 : dart.double ? 2 : 1;
      var initialNbMarks = data.find(x => x.player == currentPlayer).checkmarks[index];
      var nbMarks = initialNbMarks + nbToAdd;
      if(data.find(x => x.player == currentPlayer).checkmarks[index] < 4){
        data.find(x => x.player == currentPlayer).checkmarks[index] = nbMarks >= 3 ? 3 : nbMarks;
      }
      let i = 0;
      while(nbMarks > 3 && game == 'Killer' && i < nbPlayers){
        if(i != currentPlayer && data.find(x => x.player == i).checkmarks[index] > 0 && data.find(x => x.player == i).checkmarks[index] < 3){
          data.find(x => x.player == i).checkmarks[index] = data.find(x => x.player == i).checkmarks[index] - (nbMarks - 3) < 0 ? 0 : data.find(x => x.player == i).checkmarks[index] - (nbMarks - 3);
        }
        i++;
      }
      i = 0;
      while(i < nbPlayers && data.find(x => x.player == i).checkmarks[index] == 3){
        i++;
      }
      if(i == nbPlayers){
        i = 0;
        while(i < nbPlayers){
          data.find(x => x.player == i).checkmarks[index] = 4;
          i++;
        }
      }
      if (game == 'Standard' && nbMarks > 3 && data.find(x => x.player == currentPlayer).checkmarks[index] < 4){
        data.find(x => x.player == currentPlayer).score = data.find(x => x.player == currentPlayer).score + (nbMarks - 3) * dart.dart;
      }
      else if (game == 'Cut Throat' && nbMarks > 3 && data.find(x => x.player == currentPlayer).checkmarks[index] < 4){
        i = 0;
        while(i < nbPlayers){
          if(i != currentPlayer && data.find(x => x.player == i).checkmarks[index] < 3){
            data.find(x => x.player == i).score = data.find(x => x.player == i).score + dart.dart * (nbMarks - 3);
          }
          i++;
        }
      }
      if(data.find(x => x.player == currentPlayer).checkmarks[0] >= 3 &&
          data.find(x => x.player == currentPlayer).checkmarks[1] >= 3 &&
          data.find(x => x.player == currentPlayer).checkmarks[2] >= 3 &&
          data.find(x => x.player == currentPlayer).checkmarks[3] >= 3 &&
          data.find(x => x.player == currentPlayer).checkmarks[4] >= 3 &&
          data.find(x => x.player == currentPlayer).checkmarks[5] >= 3 &&
          data.find(x => x.player == currentPlayer).checkmarks[6] >= 3){
        if(game == 'No Score' || game == 'Killer' || game == 'Standard' && sortScoresDes(data)[0].player == currentPlayer ||
          game == 'Cut Throat' && sortScoresAsc(data)[0].player == currentPlayer ){
          this.setState({data:data, endOfGame: true, winner: currentPlayer});
        }
      }
    }
    this.setState(prevState => ({data:data, currentDart: prevState.currentDart == 2 ? 0 : prevState.currentDart + 1, hasProceed: prevState.currentDart == 2 ? true : false}));
  }

  changeOneScore(){
    let data = this.state.data;
    data.find(x => x.player == this.state.currentPlayer).score = this.state.editedScore;
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
          <Text style={{fontSize:24}}>Winner is {this.state.data.find(x => x.player == this.state.winner).name}</Text>
          <CricketScores numbers={this.state.numbers} data={this.state.data}/>
        </View>
      );
    }
    else if(this.state.isChoosingNames && this.state.currentName < this.props.route.params.nbPlayers){
      return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'#457b9d'}}>
          <Text style={{fontSize:24}}>Choose player's {(this.state.currentName + 1).toString()} name</Text>
          <NameChooser data={this.state.data} nameCallback={this.nameCallback} currentName={this.state.currentName}/>
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
              onChangeText={(text) => {this.setState({editedScore: text && text.length && text.match(/^-{0,1}\d+$/) ? text : ''});
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
      <View style={{flex: 4, height:500,flexDirection:'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{flex: 7, height:500, marginTop:30,  flexDirection:'column', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <CricketScores numbers={this.state.numbers} data={this.state.data}/>
        </View>
          <Text style={{fontSize:24}}>Turn : {((this.state.turn + 1).toString())}</Text>
          <Text style={{fontSize:24}}>Dart : {((this.state.currentDart + 1).toString())}</Text>
          <CurrentPlayer currentDart={this.state.currentDart} currentPlayer={this.state.currentPlayer} data={this.state.data}/>
          <View style={{ flex: 2 }}>
            <MyButton title="Edit current player's score" onPress={() => {this.setState({editingScore: true, editedScore: this.state.data.find(x => x.player == this.state.currentPlayer).score.toString()});}}/>
          </View>
      </View>
      <View style={{flex: 2, alignItems: 'center', justifyContent: 'flex-end'}}>
      <PointSelector manageScoresCallBack={this.manageScoresCallBack} disabled={this.state.hasProceed && this.state.currentDart == 0}
        nums={this.state.numbers}
      />
      </View>
      <View style={{flex: 0.5, alignItems: 'center', justifyContent: 'flex-end'}}>
        <MyButton title="Next" 
          disabled={!this.state.hasProceed}
          onPress={() => {
            Vibration.vibrate(100);
            this.manageData();
          }}
        />
      </View>
      </View>
    );
  }
};