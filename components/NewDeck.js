import React, { Component } from 'react'
import { ScrollView, Text } from 'react-native'
import { TextInput, HelperText, Button } from 'react-native-paper'
import Header from './Header'
import { handleAddDeck } from '../actions/decks'
import { updateFab } from '../actions/fab'
import { connect } from 'react-redux'
import globalStyles from '../styles/global'

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
		const { navigation } = this.props
		return (
			<ScrollView style={[globalStyles.main]}>
				<Header navigation={navigation} backButton text='Create deck' />
				<TextInput placeholder='Anatomy' label='Deck name' onChangeText={ (text) => this.handleTextInput("deckName", text)} value={ deckName } />
				<Button
					mode='contained'
					onPress={ this.handleSubmit }
					style={{
						width: 200, marginTop: 8
					}}
				>
					Create deck
				</Button>
			</ScrollView>
		)
	}
})
