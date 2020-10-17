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

export default class ShoutOutConfigurationScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      nbPlayers: 4,
      nbPoints: 5,
      ownNames: false,
    };
  }

  render(){
    return (
      <View style={{flex: 1, backgroundColor:'#1d3557', justifyContent: 'space-around', alignItems: 'center'}}>
            <Input
              selectTextOnFocus={true}
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
            <Input
              selectTextOnFocus={true}
              inputStyle={{color:'white'}}
              textAlign={'center'}
              value={this.state.nbPoints.toString()}
              onChangeText={(text) => {this.setState({nbPoints: text && text.length && text.match(/^-{0,1}\d+$/) && parseInt(text) != 0 ? parseInt(text) : ''});
              }}
              label="Nombre de Points"
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
              disabled={this.state.nbPlayers == '' || this.state.nbPoints == ''}
              onPress={() => this.props.navigation.navigate('Halve It', {
                nbPlayers:this.state.nbPlayers,
                nbPoints:this.state.nbPoints,
                ownNames: this.state.ownNames,
              })}
            />
      </View>
    );
  }
};