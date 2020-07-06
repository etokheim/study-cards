import React from 'react'
import { Text, View } from 'react-native'

export default function Header(props) {
	return (
		<View style={{ marginTop: 128, marginBottom: 32 }}>
			<Text style={{ fontSize: 48 }}>
				{ props.backButton
					? '< '
					: ''}
				{ props.text
					? props.text
					: 'Header'}
			</Text>
		</View>
	)
}
