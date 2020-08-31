import React from 'react';
import {
  View,
} from 'react-native';

import { CheckBox, Input } from 'react-native-elements';
import {Picker} from '@react-native-community/picker';

import MyButton from '../components/MyButton';

export default class CricketConfigurationScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nbPlayers: 4,
      game: 'Standard',
      lowPitch: false,
      randomNumbers: false,
      ownNames: false,
    };
  }

  render(){
    var games = ['Standard', 'No Score', 'Cut Throat', 'Killer'];
    return (
      <View style={{flex: 1, alignItems: "center", justifyContent:'flex-start', backgroundColor:'#1d3557'}}>
          <Picker
            selectedValue={this.state.game}
            style={{ height: 50, width: 150, color:'white'}}
            onValueChange={(itemValue, itemIndex) => this.setState({game: itemValue})}
          >
            {games.map(function(num){
              return <Picker.Item label={num.toString()} value={num} key={num} />;
            })}
          </Picker>
          <View style={{ width:170 }}>
            <Input
              selectTextOnFocus={true}
              inputStyle={{color:'white'}}
              textAlign={'center'}
              value={this.state.nbPlayers.toString()}
              onChangeText={(text) => {
                this.setState({nbPlayers: text && text.length && text.match(/^-{0,1}\d+$/) && parseInt(text) != 0 ? parseInt(text) : ''});
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
            title='Low Pitch'
            onPress={() => {this.setState(prevState => ({
              randomNumbers: !prevState.randomNumbers ? false : !prevState.randomNumbers,
              lowPitch: !prevState.lowPitch}));}}
            checked={this.state.lowPitch}
          />
          <CheckBox
            title='Random Numbers'
            onPress={() => {this.setState(prevState => ({
              randomNumbers: !prevState.randomNumbers,
              lowPitch: prevState.lowPitch ? false : prevState.lowPitch}));}}
            checked={this.state.randomNumbers}
          />
          <CheckBox
            title='Choose players names'
            onPress={() => {this.setState(prevState => ({ownNames:!prevState.ownNames}));}}
            checked={this.state.ownNames ? true : false}
          />
        <View style={{ alignItems: 'center', justifyContent: 'flex-end', marginBottom:40 }}>
          <MyButton title="Start"
            disabled={this.state.nbPlayers == ''}
            onPress={() => this.props.navigation.navigate('Cricket', {
              nbPlayers:this.state.nbPlayers,
              game: this.state.game,
              lowPitch: this.state.lowPitch,
              randomNumbers: this.state.randomNumbers,
              ownNames: this.state.ownNames
            })}
          />
        </View>
      </View>
    );
  }
};