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
      //ultimate: false,
      ownNames: false,
    };
  }

  render(){
    return (
      <View style={{flex: 1, backgroundColor:'#1d3557', justifyContent: 'space-around', alignItems: 'center'}}>
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
          {/*<View style={{ flexDirection:'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                      <CheckBox
                        title='Ultimate'
                        onPress={() => {this.setState(prevState => ({ultimate:!prevState.ultimate}));}}
                        checked={this.state.ultimate ? true : false}
                      />
                    </View>*/}
            <MyButton title="Start"
              disabled={this.state.nbPlayers == '' || (this.state.game == 'custom' && this.state.customGame == '')}
              onPress={() => this.props.navigation.navigate('Halve It', {
                nbPlayers:this.state.nbPlayers,
                //ultimate: this.state.ultimate,
                ownNames: this.state.ownNames,
              })}
            />
      </View>
    );
  }
};