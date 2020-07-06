import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../components/Home'
import Deck from '../components/Deck'
import NewDeck from '../components/NewDeck'

const Stack = createStackNavigator()

export default function HomeStack() {
	return (
		<Stack.Navigator headerMode='screen'>
			<Stack.Screen name='Home' component={Home} />
			<Stack.Screen name='Deck' component={Deck} />
			<Stack.Screen name='New Deck' component={NewDeck} />
		</Stack.Navigator>
	)
}
