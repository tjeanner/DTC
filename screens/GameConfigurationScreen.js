import React from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
} from 'react-native';

import { CheckBox, Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

import { fontMaker } from '../components/fontMaker';
import MyButton from '../components/MyButton';

export default class GameConfigurationScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nbPlayers:4,
      game: '301',
      doubleIn: false,
      tripleIn: false,
      doubleOut: false,
      tripleOut: false,
      killer: false,
      customGame: 301,
      ownNames: false,
    };
  }

  render(){
    var games = ['301', '501', '601', '701', '801', '901', 'custom'];
    return (
      <View style={{flex: 1, backgroundColor:'#1d3557'}}>
      <View style={{flex: 1, paddingTop: 40, alignItems: "center", justifyContent:'flex-start'}}>
      <Picker
        selectedValue={this.state.game}
        style={{ height: 50, width: 150, color:'white'}}
        onValueChange={(itemValue, itemIndex) => {this.setState({game: itemValue});}}
      >
      {games.map(function(num){
        return <Picker.Item label={num.toString()} value={num} key={num} />;
      })}
      </Picker>
      <View style={{height: this.state.game != 'custom' ? 0 : 150, overflow:'hidden'}}>
            <Input
              inputStyle={{color:'white'}}
              disabled={this.state.game != 'custom'}
              textAlign={'center'}
              value={this.state.customGame.toString()}
              onChangeText={(text) => {this.setState({customGame: text && text.length && text.match(/^-{0,1}\d+$/) && parseInt(text) != 0 ? parseInt(text) : ''});} }
              label="Custom points"
              keyboardType="phone-pad"
              maxLength={4}
              placeholderTextColor="#bbbbbb"
              keyboardAppearance="dark"
              returnKeyType="done"
              textContentType="none"
            />
      </View>
    </View>
        <View style={{ flex: 8, alignItems: 'center', justifyContent: 'space-between', marginTop:80 }}>
          <View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start' }}>
          <View style={{ width:170, flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <Input
              inputStyle={{color:'white'}}
              textAlign={'center'}
              value={this.state.nbPlayers.toString()}
              onChangeText={(text) => {this.setState({nbPlayers: text && text.length && text.match(/^-{0,1}\d+$/) && parseInt(text) != 0 ? parseInt(text) : ''});
              }}
              label="Nombre de Joueurs"
              keyboardType="phone-pad"
              maxLength={2}
              placeholderTextColor="#bbbbbb"
              keyboardAppearance="dark"
              returnKeyType="done"
              textContentType="none"
            />
          </View>
            <CheckBox
              title='Choose players names'
              onPress={() => {this.setState(prevState => ({ownNames:!prevState.ownNames}));}}
              checked={this.state.ownNames ? true : false}
            />
          </View>
          <View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <CheckBox
              title='DoubleIn'
              onPress={() => {this.setState(prevState => ({doubleIn:!prevState.doubleIn}));}}
              checked={this.state.doubleIn ? true : false}
            />
            <CheckBox
              title='TripleIn'
              onPress={() => {this.setState(prevState => ({tripleIn:!prevState.tripleIn}));}}
              checked={this.state.tripleIn ? true : false}
            />
          </View>
          <View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <CheckBox
              title='DoubleOut'
              onPress={() => {this.setState(prevState => ({doubleOut:!prevState.doubleOut}));}}
              checked={this.state.doubleOut ? true : false}
            />
            <CheckBox
              title='TripleOut'
              onPress={() => {this.setState(prevState => ({tripleOut:!prevState.tripleOut}));}}
              checked={this.state.tripleOut ? true : false}
            />
          </View>
          <View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start' }}>
            <CheckBox
              title='Killer'
              onPress={() => {this.setState(prevState => ({killer:!prevState.killer}));}}
              checked={this.state.killer ? true : false}
            />
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom:40 }}>
            <MyButton title="Start"
              disabled={this.state.nbPlayers == '' || (this.state.game == 'custom' && this.state.customGame == '')}
              onPress={() => this.props.navigation.navigate('Game', {
                nbPlayers:this.state.nbPlayers,
                game: this.state.game == 'custom' ? this.state.customGame: this.state.game,
                doubleIn: this.state.doubleIn,
                tripleIn: this.state.tripleIn,
                doubleOut: this.state.doubleOut,
                tripleOut: this.state.tripleOut,
                killer: this.state.killer,
                ownNames: this.state.ownNames,
              })}
            />
          </View>
        </View>
      </View>
    );
  }
};