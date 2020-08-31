import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

export default class Button extends React.PureComponent {
	render() {
		return (
				<View style={{height: 40, minWidth: 80, marginTop:5, marginBottom:5}}>
					<TouchableOpacity onPress={this.props.onPress} disabled={this.props.disabled}>
						<View style={{height: 40, minWidth: 80, backgroundColor: this.props.disabled ? '#170507' : '#e63946', justifyContent:'center', alignItems:'center', borderRadius:20, padding:10}}>
							<Text style={{color: this.props.disabled ? 'white' : 'black'}}>
								{this.props.title}
							</Text>
						</View>
					</TouchableOpacity>
				</View>
		);
	}
}
