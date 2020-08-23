import React from 'react';
import {
	View,
	Text,
} from 'react-native';

import MyButton from '../components/MyButton';

function HomeScreen({navigation}) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around', backgroundColor:'#1d3557'}}>
			<MyButton title="New X01"
				onPress={() => navigation.navigate('Game Configuration')}
			/>
			<MyButton title="New Halve It"Shangai
				onPress={() => navigation.navigate('Halve It Configuration')}
			/>
			<MyButton title="New Shangai"
				onPress={() => navigation.navigate('Shangai Configuration')}
			/>
			<MyButton title="New Cricket"
				onPress={() => navigation.navigate('Cricket Configuration')}
			/>
			{/*<MyButton title="Scores"
								onPress={() => navigation.navigate('Scores')}
							/>*/}
		</View>
	);
};

export default HomeScreen;