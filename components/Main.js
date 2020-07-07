import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { connect } from 'react-redux'
import { PaperProvider, FAB } from 'react-native-paper'
import PropTypes from 'prop-types'
import HomeStack from '../routes/HomeStack'
import StatusBar from './StatusBar'

const mapStateToProps = ({ decks, liftNavigation }) => { return { decks, liftNavigation } }

export default connect(mapStateToProps)(class Main extends Component {
	static propTypes = {
		prop: PropTypes
	}

	state = {
		navigation: null
	}

	liftNavigation = (navigation) => {
		this.setState({
			navigation
		})
	}

	render() {
		const { FabVisible } = this.props
		const { navigation } = this.state
		return (
			<>
				<NavigationContainer>
					<StatusBar />
					<HomeStack liftNavigation={this.liftNavigation} />
				</NavigationContainer>
				<FAB
					icon='plus'
					label='Add new deck'
					onPress={() => { navigation.navigate('New Deck') }}
					visible={ FabVisible }
					style={{
						width: 180,
						bottom: 32,
						right: 32,
						position: 'absolute'
					}}
				/>
			</>
		)
	}
})