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
    this.state = {dart1: 0, dart2: 0, dart3: 0, double1:false, triple1:false, double2:false, triple2:false, double3:false, triple3:false};
    this.createData = this.createData.bind(this);
  }

  createData(){
    var dart1 = {dart:this.state.dart1, double: this.state.double1, triple: this.state.triple1};
    var dart2 = {dart:this.state.dart2, double: this.state.double2, triple: this.state.triple2};
    var dart3 = {dart:this.state.dart3, double: this.state.double3, triple: this.state.triple3};    
    this.props.manageScoresCallBack(dart1, dart2, dart3);
    this.setState({dart1: 0, dart2: 0, dart3: 0, double1:false, triple1:false, double2:false, triple2:false, double3:false, triple3:false});
  }


  render(){
    var nums = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25];
    return(
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Picker
          selectedValue={this.state.dart1}
          style={{ height: 50, width: 100 }}
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
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Picker
          selectedValue={this.state.dart2}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState(prevState => ({dart2: itemValue, triple2: prevState.triple2 && itemValue == 25 ? false : prevState.triple2}))}
        >
        {nums.map(function(num){
          return <Picker.Item label={num.toString()} value={num} key={num} />;
        })}
        </Picker>
          <CheckBox
            title='Double'
            onPress={() => {this.setState(prevState => ({double2:!prevState.double2, triple2:!prevState.double2 ? false : !prevState.double2}));}}
            checked={this.state.double2 ? true : false}
          />
          <CheckBox
            title='Triple'
            onPress={() => {this.setState(prevState => ({triple2:!prevState.triple2 && this.state.dart2 == 25 ? false :  !prevState.triple2, double2:!prevState.triple2 ? false : !prevState.triple2}));}}
            checked={this.state.triple2 ? true : false}
          />
      </View>
      <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Picker
          selectedValue={this.state.dart3}
          style={{ height: 50, width: 100 }}
          onValueChange={(itemValue, itemIndex) => this.setState(prevState => ({dart3: itemValue, triple3: prevState.triple3 && itemValue == 25 ? false : prevState.triple3}))}
        >
        {nums.map(function(num){
          return <Picker.Item label={num.toString()} value={num} key={num} />;
        })}
        </Picker>
          <CheckBox
            title='Double'
            onPress={() => {this.setState(prevState => ({double3:!prevState.double3, triple3:!prevState.double3 ? false : !prevState.double3}));}}
            checked={this.state.double3 ? true : false}
          />
          <CheckBox
            title='Triple'
            onPress={() => {this.setState(prevState => ({triple3:!prevState.triple3 && this.state.dart3 == 25 ? false :  !prevState.triple3, double3:!prevState.triple3 ? false : !prevState.triple3}));}}
            checked={this.state.triple3 ? true : false}
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
        score: parseInt(this.props.route.params.game),
        hasStarted: !this.props.route.params.doubleIn && !this.props.route.params.tripleIn
      });
      i++;
    }
    this.setState({isLoading: false, data:data})
  }

  nameCallback(name, player){
    var data = this.state.data;
    data[player].name = name;
    this.setState(prevState => ({data: data, currentName: prevState.currentName + 1}));
  }

  manageData(){
    let data = sortScoresAsc(this.state.data);
    this.setState(prevState=>({
      currentPlayer:prevState.currentPlayer == this.props.route.params.nbPlayers - 1 ? 0 : prevState.currentPlayer + 1,
      turn: prevState.currentPlayer == this.props.route.params.nbPlayers - 1 ? prevState.turn + 1 : prevState.turn,
      hasProceed: false,
      data: data
    }));
  }

  manageScoresCallBack(dart1, dart2, dart3){
    this.setState({hasProceed: true});
    let data = this.state.data;
    let currentPlayer = this.state.currentPlayer;
    let initialScore = data.find(x => x.player == currentPlayer).score;
    let nbPoints = compute3Darts(dart1, dart2, dart3);
    let currentScore = initialScore - nbPoints;
    if (currentScore == 0){
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
      if(currentScore == 2 && this.props.route.params.doubleOut){
        data.find(x => x.player == currentPlayer).score = currentScore;
      }
    }
    else if (currentScore > 0){
      if (!data.find(x => x.player == currentPlayer).hasStarted && (this.props.route.params.doubleIn || this.props.route.params.tripleIn)){
        if (this.props.route.params.doubleIn && !this.props.route.params.tripleIn){
          data.find(x => x.player == currentPlayer).score = (dart1.double && dart1.dart > 0) ? currentScore :
                                                  (dart2.double && dart2.dart > 0) ? initialScore - (compute1Dart(dart2) + compute1Dart(dart3)) : 
                                                  (dart3.double && dart3.dart > 0) ? initialScore - compute1Dart(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = (dart1.double && dart1.dart > 0) || (dart2.double && dart2.dart > 0) || (dart3.double && dart3.dart > 0) ? true : false;
        }
        else if (this.props.route.params.tripleIn && !this.props.route.params.doubleIn){
          data.find(x => x.player == currentPlayer).score = (dart1.triple && dart1.dart > 0) ? currentScore :
                                                  (dart2.triple && dart2.dart > 0) ? initialScore - (compute1Dart(dart2) + compute1Dart(dart3)) : 
                                                  (dart3.triple && dart3.dart > 0) ? initialScore - compute1Dart(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = (dart1.triple && dart1.dart > 0) || (dart2.triple && dart2.dart > 0) || (dart3.triple && dart3.dart > 0) ? true : false;
        }
        else{
          data.find(x => x.player == currentPlayer).score = (dart1.triple && dart1.dart > 0) || (dart1.double && dart1.dart > 0) ? currentScore :
                                                  (dart2.triple && dart2.dart > 0) || (dart2.double && dart2.dart > 0) ? initialScore - (compute1Dart(dart2) + compute1Dart(dart3)) : 
                                                  (dart3.triple && dart3.dart > 0) || (dart3.double && dart3.dart > 0) ? initialScore - compute1Dart(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = (dart1.triple && dart1.dart > 0) || (dart2.triple && dart2.dart > 0) || (dart3.triple && dart3.dart > 0) || (dart1.double && dart1.dart > 0) || (dart2.double && dart2.dart > 0) || (dart3.double && dart3.dart > 0)  ? true : false;
        }
      }
      else{
        data.find(x => x.player == currentPlayer).score = currentScore;
      }
    }
    var i = 0;
    while (this.props.route.params.killer && i < this.props.route.params.nbPlayers){
      if (initialScore - compute1Dart(dart1) == data.find(x => x.player == i).score && i != currentPlayer){
        data.find(x => x.player == i).score = this.props.route.params.game.toString();
      }
      else if (initialScore - compute1Dart(dart1) - compute1Dart(dart2) == data.find(x => x.player == i).score && i != currentPlayer){
        data.find(x => x.player == i).score = this.props.route.params.game.toString();
      }
      else if (initialScore - compute1Dart(dart1) - compute1Dart(dart2) - compute1Dart(dart3) == data.find(x => x.player == i).score && i != currentPlayer){
        data.find(x => x.player == i).score = this.props.route.params.game.toString();
      }
      i++;
    }
    data = sortScoresAsc(data);
    this.setState(prevState=>({
      data: data
    }));
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
          <Text style={{fontSize:24}}>Turn {((this.state.turn + 1).toString() + '\n')}</Text>
          <CurrentPlayer currentPlayer={this.state.currentPlayer} data={this.state.data}/>
          <View style={{ flex: 1 }}>
            <MyButton title="Edit current player's score" onPress={() => {this.setState({editingScore: true, editedScore: this.state.data.find(x => x.player == this.state.currentPlayer).score.toString()});}}/>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection:'column', alignItems: 'flex-end', justifyContent: 'space-between'}}>
          <Scores data={this.state.data}/>
        </View>
      </View>
      <PointSelector manageScoresCallBack={this.manageScoresCallBack} />
      <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'flex-end', marginBottom:40 }}>
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