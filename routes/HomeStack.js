import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from '../components/Home'
import Deck from '../components/Deck'
import NewDeck from '../components/NewDeck'
import NewCard from '../components/NewCard'
import Register from '../components/Register'

const Stack = createStackNavigator()

export default function HomeStack({ liftNavigation }) {
	return (
		<Stack.Navigator headerMode='none'>
			<Stack.Screen name='Home' component={Home} initialParams={{ liftNavigation }} />
			<Stack.Screen name='Deck' component={Deck} />
			<Stack.Screen name='New Deck' component={NewDeck} />
			<Stack.Screen name='New Card' component={NewCard} />
			<Stack.Screen name='Register' component={Register} />
		</Stack.Navigator>
	)
}
