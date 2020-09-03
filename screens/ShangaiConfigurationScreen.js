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
      ownNames: false,
    };
  }

  render(){
    return (
      <View style={{flex: 1, backgroundColor:'#1d3557', alignItems: "center", justifyContent:'space-around'}}>
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
            <CheckBox
              title='Choose players names'
              onPress={() => {this.setState(prevState => ({ownNames:!prevState.ownNames}));}}
              checked={this.state.ownNames ? true : false}
            />
            <MyButton title="Start"
              disabled={this.state.nbPlayers == '' || (this.state.game == 'custom' && this.state.customGame == '')}
              onPress={() => this.props.navigation.navigate('Shangai', {
                nbPlayers:this.state.nbPlayers,
                ownNames: this.state.ownNames,
              })}
            />
      </View>
    );
  }
};