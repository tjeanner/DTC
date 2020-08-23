import React from 'react';
import {
	View,
	Text,
	FlatList,
} from 'react-native';

import { Icon } from 'react-native-elements';
const values = ['', 'minus', 'times', 'times-circle', 'circle'];

export default class Scores extends React.Component {
	constructor(props){
		super(props);
		this.getIcon = this.getIcon.bind(this);
	}
	shouldComponentUpdate(nextProps, nextState){
		return nextProps != this.props;
	}

	getIcon(num){
		if(num == 0){
			return null;
		}
		else if(num == 1){
			return(
				<View style={{transform: [{rotate: '45deg'}]}}>
				<Icon name={values[num]} type='font-awesome' />
				</View>
			);
		}
		return(
			<Icon name={values[num]} type='font-awesome' />
			);
	}

	render(){
		return(
			<View style={{ flex: 1}}>
        <View style={{ flex: 1, flexDirection:'row', width: 300, justifyContent: 'flex-start', alignItmes: 'space-around', marginBottom:15, left:-5}}>
							<View style={{flex: 4, justifyContent:'center', alignItems:'center'}}>
								<Text>Numbers :</Text>
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
								<Text>{this.props.numbers[0].value}</Text>
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
								<Text>{this.props.numbers[1].value}</Text>
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
								<Text>{this.props.numbers[2].value}</Text>
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
								<Text>{this.props.numbers[3].value}</Text>
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
								<Text>{this.props.numbers[4].value}</Text>
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
								<Text>{this.props.numbers[5].value}</Text>
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
								<Text>{this.props.numbers[6].value}</Text>
							</View>
			</View>
        <View style={{ flex: 10}}>
				<FlatList data={this.props.data}
					renderItem={({item, index}) =>
						<View style={{flex: 1, height:35, flexDirection:'row', justifyContent: 'flex-start', alignItmes: 'space-around'}}>
							<View style={{flex: 4, justifyContent:'center', alignItems:'center', borderWidth:2}}>
								<Text>{this.props.data.find(e => e.player == index).name}</Text>
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center', borderWidth:2}}>
								{this.getIcon(item.checkmarks[0])}
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center', borderWidth:2}}>
								{this.getIcon(item.checkmarks[1])}
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center', borderWidth:2}}>
								{this.getIcon(item.checkmarks[2])}
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center', borderWidth:2}}>
								{this.getIcon(item.checkmarks[3])}
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center', borderWidth:2}}>
								{this.getIcon(item.checkmarks[4])}
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center', borderWidth:2}}>
								{this.getIcon(item.checkmarks[5])}
							</View>
							<View style={{flex: 1, justifyContent:'center', alignItems:'center', borderWidth:2}}>
								{this.getIcon(item.checkmarks[6])}
							</View>
						</View>
					}
				/>
			</View>
			</View>
		);
	}
}