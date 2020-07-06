import React from 'react'
import {
	PaperProvider, FAB, Card, Paragraph, TouchableRipple
} from 'react-native-paper'
import { Text, ScrollView } from 'react-native'

export default function Home({ navigation }) {
	const visible = true
	return (
		<>
			<ScrollView>
				<Text style={{ fontSize: 48 }}>Good morning, Erling</Text>
				<Card
					style={{ marginTop: 32, backgroundColor: 'white' }}
				>
					<TouchableRipple
						rippleColor='rgba(0, 0, 0, .32)'
						onPress={() => navigation.navigate('Deck')}
						style={{
							height: 180
						}}
					>
						<>
							<Card.Title title='Anatomy' />
							<Card.Content>
								<Paragraph>Not played through</Paragraph>
							</Card.Content>
						</>
					</TouchableRipple>
				</Card>
			</ScrollView>
			<FAB
				icon='plus'
				label='Add new deck'
				onPress={() => { navigation.navigate('New Deck') }}
				visible={visible}
				style={{
					width: 180,
					marginBottom: 32,
					marginLeft: 'auto',
					marginRight: 32
				}}
			/>
		</>
	)
}
