import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';

export default class Scores extends React.Component {
  shouldComponentUpdate(nextProps, nextState){
    return nextProps != this.props;
  }

  render(){
    return(
      <View style={{ flex: 1}}>
        {/*<FlatList data={this.props.data}
          renderItem={({item, index}) => <Text style={{}}>{item.name} is #{index + 1} with {item.score} points.</Text>}
        />*/}
        <FlatList data={this.props.data}
          renderItem={({item, index}) => <Text style={{}}>{item.name} has {item.score} points.</Text>}
        />
      </View>
    );
  }
}