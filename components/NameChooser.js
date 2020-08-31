import React from 'react';
import {
	View,
	Vibration
} from 'react-native';

import { Input } from 'react-native-elements';

import MyButton from '../components/MyButton';

export default class NameChooser extends React.Component {
	constructor(props){
		super(props);
		this.state = {name: ''};
		this.manageData = this.manageData.bind(this);
	}

	shouldComponentUpdate(nextProps, nextState){
		return nextState != this.state;
	}

	manageData(){
		this.props.nameCallback(this.state.name, this.props.currentName);
		Vibration.vibrate(100);
		this.textInput.clear();
	}

	render(){
		return(
			<View style={{ flex: 1, width:300, flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
				<Input
					autoFocus={true}
					ref={input => { this.textInput = input }}
					textAlign={'center'}
					value={this.state.name}
					onChangeText={(text) => {this.setState({name: text ? text : ''});}}
					label="Name"
					maxLength={20}
					placeholderTextColor="#bbbbbb"
					keyboardAppearance="dark"
					textContentType="none"
				/>
				<View style={{marginTop:60, marginBottom:40}}>
					<MyButton
						title="Proceed"
						disabled={!this.state.name.length}
						onPress={() => {this.manageData();}}
					/>
				</View>
			</View>
		);
	}
}