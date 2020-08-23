import 'react-native-gesture-handler';
import React from 'react';
import {
	SafeAreaView,
	StatusBar,
	Button,
	Alert,
	View,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './screens/HomeScreen';
import GameConfigurationScreen from './screens/GameConfigurationScreen';
import GameScreen from './screens/GameScreen';
import HalveItConfigurationScreen from './screens/HalveItConfigurationScreen';
import HalveItScreen from './screens/HalveItScreen';
import ShangaiConfigurationScreen from './screens/ShangaiConfigurationScreen';
import ShangaiScreen from './screens/ShangaiScreen';
import CricketConfigurationScreen from './screens/CricketConfigurationScreen';
import CricketScreen from './screens/CricketScreen';
//import ScoresScreen from './screens/ScoresScreen';

const Stack = createStackNavigator();

class App extends React.Component {
	constructor(props){
		super(props);
	}

	componentDidMount(){
		StatusBar.setBackgroundColor('#a8dadc', true);
	}

	render(){
		return (
			<NavigationContainer>
				<StatusBar/>
				<SafeAreaView style={{flex:1}}>
					<Stack.Navigator initialRouteName="Home">
						<Stack.Screen
							name="Home"
							component={HomeScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								}
							}}
						/>
						<Stack.Screen
							name="Game Configuration"
							component={GameConfigurationScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								}
							}}
						/>
						<Stack.Screen
							name="Game"
							component={GameScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								},
								headerLeft: (null)
							}}
						/>
						<Stack.Screen
							name="Halve It Configuration"
							component={HalveItConfigurationScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								}
							}}
						/>
						<Stack.Screen
							name="Halve It"
							component={HalveItScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								},
								headerLeft: (null)
							}}
						/>
						<Stack.Screen
							name="Shangai Configuration"
							component={ShangaiConfigurationScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								}
							}}
						/>
						<Stack.Screen
							name="Shangai"
							component={ShangaiScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								},
								headerLeft: (null)
							}}
						/>
						<Stack.Screen
							name="Cricket Configuration"
							component={CricketConfigurationScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								},
								headerLeft: (null)
							}}
						/>
						<Stack.Screen
							name="Cricket"
							component={CricketScreen}
							options={{
								headerStyle: {
									backgroundColor: '#a8dadc',
								},
								headerLeft: (null)
							}}
						/>
						{/*<Stack.Screen name="Scores" component={ScoresScreen} />*/}
					</Stack.Navigator>
				</SafeAreaView>
			</NavigationContainer>
		);
	}
}

export default App;