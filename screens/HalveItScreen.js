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
import { sortScoresDes } from '../helpers/PointsManagers';

const nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25];
const targets = ['12', '13', '14', 'Double', '15', '16', '17', 'Triple', '18', '19', '20', 'Bull', ];

class PointSelector extends React.Component {
  constructor(props){
    super(props);
    this.state = {special1: 0, special2: 0, special3: 0, simple1: false, double1:false, triple1:false, simple2: false, double2:false, triple2:false, simple3: false, double3:false, triple3:false};
    this.createData = this.createData.bind(this);
    this.createSpecialData = this.createSpecialData.bind(this);
  }

  createData(){
    var dart1 = {simple: this.state.simple1, double: this.state.double1, triple: this.state.triple1};
    var dart2 = {simple: this.state.simple2, double: this.state.double2, triple: this.state.triple2};
    var dart3 = {simple: this.state.simple3, double: this.state.double3, triple: this.state.triple3};
    this.props.manageScoresCallBack(dart1, dart2, dart3);
    this.setState({simple1: false, double1:false, triple1:false, simple2: false, double2:false, triple2:false, simple3: false, double3:false, triple3:false});
  }

  createSpecialData(){
    var dart1 = {score: this.state.special1};
    var dart2 = {score: this.state.special2};
    var dart3 = {score: this.state.special3};
    this.props.manageSpecialScoresCallBack(dart1, dart2, dart3);
    this.setState({special1: 0, special2: 0, special3: 0});
  }

  render(){
    if(this.props.target == 'Double' || this.props.target == 'Triple'){
      return(
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Picker
          selectedValue={this.state.special1}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState(prevState => ({special1: itemValue}))}
        >
        {nums.map(function(num){
          return <Picker.Item label={num.toString()} value={num} key={num} />;
        })}
        </Picker>
      </View>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Picker
          selectedValue={this.state.special2}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState(prevState => ({special2: itemValue}))}
        >
        {nums.map(function(num){
          return <Picker.Item label={num.toString()} value={num} key={num} />;
        })}
        </Picker>
      </View>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Picker
          selectedValue={this.state.special3}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState(prevState => ({special3: itemValue}))}
        >
        {nums.map(function(num){
          return <Picker.Item label={num.toString()} value={num} key={num} />;
        })}
        </Picker>
      </View>
        </View>
        <View style={{marginTop:60, marginBottom:40}}>
          <MyButton title="Proceed" onPress={() => {this.createSpecialData();Vibration.vibrate(100);}}/>
        </View>
      </View>
      );
    }
    return(
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <CheckBox
            title='Simple'
            onPress={() => {this.setState(prevState => ({simple1:!prevState.simple1, triple1:!prevState.simple1 ? false : !prevState.simple1, double1:!prevState.simple1 ? false : !prevState.simple1}));}}
            checked={this.state.simple1 ? true : false}
          />
          <CheckBox
            title='Double'
            onPress={() => {this.setState(prevState => ({double1:!prevState.double1, triple1:!prevState.double1 ? false : !prevState.double1, simple1:!prevState.double1 ? false : !prevState.double1}));}}
            checked={this.state.double1 ? true : false}
          />
          <CheckBox
            title='Triple'
            onPress={() => {this.setState(prevState => ({triple1:!prevState.triple1 && this.props.target == 'Bull' ? false :  !prevState.triple1, double1:!prevState.triple1 ? false : !prevState.triple1, simple1:!prevState.triple1 ? false : !prevState.triple1}));}}
            checked={this.state.triple1 ? true : false}
          />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <CheckBox
            title='Simple'
            onPress={() => {this.setState(prevState => ({simple2:!prevState.simple2, triple2:!prevState.simple2 ? false : !prevState.simple2, double2:!prevState.simple2 ? false : !prevState.simple2}));}}
            checked={this.state.simple2 ? true : false}
          />
          <CheckBox
            title='Double'
            onPress={() => {this.setState(prevState => ({double2:!prevState.double2, triple2:!prevState.double2 ? false : !prevState.double2, simple2:!prevState.double2 ? false : !prevState.double2}));}}
            checked={this.state.double2 ? true : false}
          />
          <CheckBox
            title='Triple'
            onPress={() => {this.setState(prevState => ({triple2:!prevState.triple2 && this.props.target == 'Bull' ? false :  !prevState.triple2, double2:!prevState.triple2 ? false : !prevState.triple2, simple2:!prevState.triple2 ? false : !prevState.triple2}));}}
            checked={this.state.triple2 ? true : false}
          />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          <CheckBox
            title='Simple'
            onPress={() => {this.setState(prevState => ({simple3:!prevState.simple3, triple3:!prevState.simple3 ? false : !prevState.simple3, double3:!prevState.simple3 ? false : !prevState.simple3}));}}
            checked={this.state.simple3 ? true : false}
          />
          <CheckBox
            title='Double'
            onPress={() => {this.setState(prevState => ({double3:!prevState.double3, triple3:!prevState.double3 ? false : !prevState.double3, simple3:!prevState.double3 ? false : !prevState.double3}));}}
            checked={this.state.double3 ? true : false}
          />
          <CheckBox
            title='Triple'
            onPress={() => {this.setState(prevState => ({triple3:!prevState.triple3 && this.props.target == 'Bull' ? false :  !prevState.triple3, double3:!prevState.triple3 ? false : !prevState.triple3, simple3:!prevState.triple3 ? false : !prevState.triple3}));}}
            checked={this.state.triple3 ? true : false}
          />
      </View>
        </View>
          <MyButton title="Proceed" onPress={() => {this.createData();Vibration.vibrate(100);}}/>
      </View>
    );
  }
}

export default class HalveItScreen extends React.Component {
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
    };
    this.generateData = this.generateData.bind(this);
    this.manageScoresCallBack = this.manageScoresCallBack.bind(this);
    this.manageSpecialScoresCallBack = this.manageSpecialScoresCallBack.bind(this);
    this.computeModifier = this.computeModifier.bind(this);
    this.computeSpecialModifier = this.computeSpecialModifier.bind(this);
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
    var data = [];
    while (i < this.props.route.params.nbPlayers){
      data[i] = ({
        key: i.toString(),
        player: i,
        name: 'Player : ' + (i + 1).toString(),
        score: 0,
      });
      i++;
    }
    this.setState({isLoading: false, data:data})
  }

  computeModifier(target, dart){
    if(dart.double){
      return(target * 2);
    }
    else if(dart.triple){
      return(target * 3);
    }
    else if(dart.simple){
      return target;
    }
    return 0;
  }

  computeSpecialModifier(target, dart){
    if(target == 'Double'){
      return(dart.score * 2);
    }
    else if(target == 'Triple'){
      return(dart.score * 3);
    }
    else if(target == 'Bull'){
      return(dart.score * 25);
    }
    return 0;
  }

  nameCallback(name, player){
    var data = this.state.data;
    data[player].name = name;
    this.setState(prevState => ({data: data, currentName: prevState.currentName + 1}));
  }

  manageData(){
    let data = this.state.data;
    data = sortScoresDes(data);
    if(this.state.turn == 11 && this.state.currentPlayer == this.props.route.params.nbPlayers - 1){
      this.setState(prevState=>({
        hasProceed: false,
        data: data,
        endOfGame: true,
        winner: data[0].player,
      }));
    }
    else{
      this.setState(prevState=>({
        currentPlayer:prevState.currentPlayer == this.props.route.params.nbPlayers - 1 ? 0 : prevState.currentPlayer + 1,
        turn: prevState.currentPlayer == this.props.route.params.nbPlayers - 1 ? prevState.turn + 1 : prevState.turn,
        hasProceed: false,
        data: data
      }));
    }
  }

  manageScoresCallBack(dart1, dart2, dart3){
    this.setState({hasProceed: true});
    let data = this.state.data;
    let target = targets[this.state.turn];
    let currentPlayer = this.state.currentPlayer;
    let initialScore = data.find(x => x.player == currentPlayer).score;
    if (target == 'Bull' && (dart1.simple || dart1.double || dart2.simple || dart2.double || dart3.simple || dart3.double)){
      data.find(x => x.player == currentPlayer).score = initialScore + parseInt(this.computeModifier(25, dart1)) + parseInt(this.computeModifier(25, dart2)) + parseInt(this.computeModifier(25, dart3));
    }
    else if(target != 'Bull' && (dart1.simple || dart1.double || dart1.triple || dart2.simple || dart2.double || dart2.triple || dart3.simple || dart3.double || dart3.triple)){
      data.find(x => x.player == currentPlayer).score = initialScore + parseInt(this.computeModifier(target, dart1)) + parseInt(this.computeModifier(target, dart2)) + parseInt(this.computeModifier(target, dart3));
    }
    else{
      data.find(x => x.player == currentPlayer).score = this.props.route.params.mode == 'Easy' ? initialScore : this.props.route.params.mode == 'Hard' ? initialScore - target : (initialScore - (initialScore % 2)) / 2;
    }
    data = sortScoresDes(data);
    this.setState({
      data: data
    });
  }

  manageSpecialScoresCallBack(dart1, dart2, dart3){
    this.setState({hasProceed: true});
    let data = this.state.data;
    let target = targets[this.state.turn];
    let currentPlayer = this.state.currentPlayer;
    let initialScore = data.find(x => x.player == currentPlayer).score;
    if(dart1.score|| dart2.score || dart3.score){
      data.find(x => x.player == currentPlayer).score = initialScore + parseInt(this.computeSpecialModifier(target, dart1)) + parseInt(this.computeSpecialModifier(target, dart2)) + parseInt(this.computeSpecialModifier(target, dart3));
    }
    else{
      data.find(x => x.player == currentPlayer).score = this.props.route.params.mode == 'Easy' ? initialScore : this.props.route.params.mode == 'Hard' ? target == 'Double' || target == 'Triple' ? initialScore - 0 : target == 'Bull' ? initialScore - 25 : initialScore - target : (initialScore - (initialScore % 2)) / 2;
    }
    data = sortScoresDes(data);
    this.setState({
      data: data
    });
  }

  changeOneScore(){
    let data = this.state.data;
    data.find(x => x.player == this.state.currentPlayer).score = this.state.editedScore;
    data = sortScoresDes(data);
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
          <Scores data={this.state.data}/>
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
      <View style={{ flex: 1, backgroundColor:'#457b9d'}}>
      <View style={{ flex: 1, flexDirection:'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <View style={{ flex: 1, flexDirection:'column', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Text style={{fontSize:24}}>Turn: {((this.state.turn + 1).toString() + '\n')}</Text>
          <Text style={{fontSize:24}}>Target: {((targets[this.state.turn]).toString() + '\n')}</Text>
          <CurrentPlayer currentPlayer={this.state.currentPlayer} data={this.state.data}/>
        </View>
        <View style={{ flex: 1, flexDirection:'column', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <Scores data={this.state.data}/>
            <MyButton title="Edit current player's score" onPress={() => {this.setState({editingScore: true, editedScore: this.state.data.find(x => x.player == this.state.currentPlayer).score.toString()});}}/>
        </View>
      </View>
        <PointSelector manageScoresCallBack={this.manageScoresCallBack} manageSpecialScoresCallBack={this.manageSpecialScoresCallBack} target={targets[this.state.turn]}/>
      <View style={{alignItems: 'center'}}>
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