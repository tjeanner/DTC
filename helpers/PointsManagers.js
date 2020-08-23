import React from 'react';
import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Alert,
  Vibration,
  FlatList,
} from 'react-native';

import { CheckBox, Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

import NameChooser from '../components/NameChooser';
import CurrentPlayer from '../components/CurrentPlayer';
import Scores from '../components/Scores';

function sortScoresAsc(data){
  var newData = data.sort(function(a, b){return a.score - b.score});
  return newData;
}

function sortScoresDes(data){
  var newData = data.sort(function(a, b){return b.score - a.score});
  return newData;
}

function compute1Dart(dart){
    if(dart.double){
      return(dart.dart * 2);
    }
    else if(dart.triple){
      return(dart.dart * 3);
    }
    else{
      return dart.dart;
    }
  }

function compute3Darts(dart1, dart2, dart3){
  return compute1Dart(dart1) + compute1Dart(dart2) + compute1Dart(dart3);
}

/*function generateData(){
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

function  nameCallback(name, player){
    var data = this.state.data;
    data[player].name = name;
    this.setState(prevState => ({data: data, currentName: prevState.currentName + 1}));
  }


function  manageScoresCallBack(dart1, dart2, dart3){
    this.setState({hasProceed: true});
    let data = this.state.data;
    let currentPlayer = this.state.currentPlayer;
    let initialScore = data.find(x => x.player == currentPlayer).score;
    let nbPoints = this.computeModifier(dart1) + this.computeModifier(dart2) + this.computeModifier(dart3);
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
          data.find(x => x.player == currentPlayer).score = dart1.double ? currentScore :
                                                  dart2.double ? initialScore - (this.computeModifier(dart2) + this.computeModifier(dart3)) : 
                                                  dart3.double ? initialScore - this.computeModifier(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = dart1.double || dart2.double || dart3.double ? true : false;
        }
        else if (this.props.route.params.tripleIn && !this.props.route.params.doubleIn){
          data.find(x => x.player == currentPlayer).score = dart1.triple ? currentScore :
                                                  dart2.triple ? initialScore - (this.computeModifier(dart2) + this.computeModifier(dart3)) : 
                                                  dart3.triple ? initialScore - this.computeModifier(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = dart1.triple || dart2.triple || dart3.triple ? true : false;
        }
        else{
          data.find(x => x.player == currentPlayer).score = dart1.triple || dart1.double ? currentScore :
                                                  dart2.triple || dart2.double ? initialScore - (this.computeModifier(dart2) + this.computeModifier(dart3)) : 
                                                  dart3.triple || dart3.double ? initialScore - this.computeModifier(dart3) : this.props.route.params.game;
          data.find(x => x.player == currentPlayer).hasStarted = dart1.triple || dart2.triple || dart3.triple || dart1.double || dart2.double || dart3.double  ? true : false;
        }
      }
      else{
        data.find(x => x.player == currentPlayer).score = currentScore;
      }
    }
    var i = 0;
    while (this.props.route.params.killer && i < this.props.route.params.nbPlayers){
      if (initialScore - this.computeModifier(dart1) == data.find(x => x.player == i).score && i != currentPlayer){
        data.find(x => x.player == i).score = this.props.route.params.game.toString();
      }
      else if (initialScore - this.computeModifier(dart1) - this.computeModifier(dart2) == data.find(x => x.player == i).score && i != currentPlayer){
        data.find(x => x.player == i).score = this.props.route.params.game.toString();
      }
      else if (initialScore - this.computeModifier(dart1) - this.computeModifier(dart2) - this.computeModifier(dart3) == data.find(x => x.player == i).score && i != currentPlayer){
        data.find(x => x.player == i).score = this.props.route.params.game.toString();
      }
      i++;
    }
    data.sort(function(a, b){return a.score - b.score})
    this.setState(prevState=>({
      data: data
    }));
  }

function  changeOneScore(){
    let data = this.state.data;
    data.find(x => x.player == this.state.currentPlayer).score = this.state.editedScore;
    data.sort(function(a, b){return a.score - b.score})
    this.setState({editingScore: false, data:data});
    this.sortScores();
  }
*/
export { sortScoresAsc, sortScoresDes, compute1Dart, compute3Darts };
