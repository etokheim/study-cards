import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper'
import Header from './Header'
import { handleNewDeck } from '../actions/decks'
import { connect } from 'react-redux'

const mapStateToProps = ({ decks }) => { return { decks } }

export default connect(mapStateToProps)(class NewDeck extends Component {
	state = {
		deckName: ""
	}

	handleTextInput = (property, text) => {
		this.setState({
			[property]: text
		})
	}

	handleSubmit = () => {
		const { deckName } = this.state

		this.props.dispatch(handleNewDeck(deckName))
	}

	render() {
		const { deckName } = this.state
		return (
			<View>
				<Header backButton text='Create deck' />
				<TextInput placeholder='Anatomy' label='Deck name' onChangeText={ (text) => this.handleTextInput("deckName", text)} value={ deckName } />
				<Button
					mode='contained'
					onPress={ this.handleSubmit }
					style={{
						width: 200, marginTop: 8
					}}
				>
					Submit
				</Button>
			</View>
		)
	}
})
