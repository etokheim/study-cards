import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper'
import Header from './Header'
import { handleAddDeck } from '../actions/decks'
import { updateFab } from '../actions/fab'
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
		const { dispatch, navigation } = this.props

		dispatch(handleAddDeck(deckName))
		navigation.navigate('Home')
	}

	componentDidMount() {
		this._unsubscribe = this.props.navigation.addListener('focus', () => {
			this.props.dispatch(updateFab(false))
		});

	}

	componentWillUnmount() {
		this._unsubscribe();
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
