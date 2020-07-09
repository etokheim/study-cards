import React from 'react'
import { Text, View } from 'react-native'

export default function Header({
	noMargin, text, backButton, style, handleOnLayout, navigation
}) {
	return (
		<View style={[{ marginTop: noMargin ? 16 : 128, marginBottom: 32 }, style]} onLayout={handleOnLayout ? (event) => handleOnLayout(event) : false}>
			<Text style={{ fontSize: 48 }}>
				<Text onPress={() => navigation.goBack()}>
					{ backButton
						? '< '
						: ''}
				</Text>
				{ text || 'Header'}
			</Text>
		</View>
	)
}
