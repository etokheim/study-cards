import React from 'react'
import { Text, View } from 'react-native'

export default function Header({ noMargin, text, backButton }) {
	return (
		<View style={{ marginTop: noMargin ? 16 : 128, marginBottom: 32 }}>
			<Text style={{ fontSize: 48 }}>
				{ backButton
					? '< '
					: ''}
				{ text || 'Header'}
			</Text>
		</View>
	)
}
