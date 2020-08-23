import React from 'react';
import {
	View,
	Text,
} from 'react-native';

export default class CurrentPlayer extends React.Component {
	shouldComponentUpdate(nextProps, nextState){
		return nextProps != this.props;
	}

	render(){
		return(
			<View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
				<Text style={{fontSize:24}}>{this.props.data.find(x => x.player == this.props.currentPlayer).name}</Text>
				<Text style={{fontSize:24}}>Points : {this.props.data.find(x => x.player == this.props.currentPlayer).score.toString()}</Text>
			</View>
		);
	}
}