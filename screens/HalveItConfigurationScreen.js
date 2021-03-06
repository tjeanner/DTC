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
      nbPlayers: 4,
      mode: 'Normal',
      ownNames: false,
    };
  }

  render(){
    var modes = ['Easy', 'Normal', 'Hard'];
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
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={{color:'white', fontSize: 17}}>Difficulty : </Text>
          <Picker
            selectedValue={this.state.mode}
            style={{ height: 50, width: 150, color:'white'}}
            onValueChange={(itemValue, itemIndex) => this.setState({mode: itemValue})}
          >
            {modes.map(function(difficulty){
              return <Picker.Item label={difficulty} value={difficulty} key={difficulty} />;
            })}
          </Picker>
          </View>
            <CheckBox
              title='Choose players names'
              onPress={() => {this.setState(prevState => ({ownNames:!prevState.ownNames}));}}
              checked={this.state.ownNames ? true : false}
            />
            <MyButton title="Start"
              disabled={this.state.nbPlayers == '' || (this.state.game == 'custom' && this.state.customGame == '')}
              onPress={() => this.props.navigation.navigate('Halve It', {
                nbPlayers:this.state.nbPlayers,
                ownNames: this.state.ownNames,
                mode: this.state.mode
              })}
            />
      </View>
    );
  }
};