import { AppLoading, SplashScreen, Updates } from 'expo'
import { Asset } from 'expo-asset'
import Constants from 'expo-constants'
import React from 'react'
import {
	Animated, Button, StyleSheet, Text, View
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

// Instruct SplashScreen not to hide yet, we want to do this manually
SplashScreen.preventAutoHide()

export default function App() {
	return (
		<AnimatedAppLoader image={{ uri: Constants.manifest.splash.image }}>
			<MainScreen />
		</AnimatedAppLoader>
	)
}

function AnimatedAppLoader({ children, image }) {
	const [isSplashReady, setSplashReady] = React.useState(false)

	const startAsync = React.useMemo(
		// If you use a local image with require(...), use `Asset.fromModule`
		() => () => Asset.fromURI(image).downloadAsync(),
		[image]
	)

	const onFinish = React.useMemo(() => setSplashReady(true), [])

	if (!isSplashReady) {
		return (
			<AppLoading
				startAsync={startAsync}
				onError={console.error}
				onFinish={onFinish}
			/>
		)
	}

	return (
		<AnimatedSplashScreen image={image}>
			{children}
		</AnimatedSplashScreen>
	)
}

function AnimatedSplashScreen({ children, image }) {
	const animation = React.useMemo(() => new Animated.Value(1), [])
	const [isAppReady, setAppReady] = React.useState(false)
	const [isSplashAnimationComplete, setAnimationComplete] = React.useState(
		false
	)

	React.useEffect(() => {
		if (isAppReady) {
			Animated.timing(animation, {
				toValue: 0,
				duration: 200,
				useNativeDriver: true
			}).start(() => setAnimationComplete(true))
		}
	}, [isAppReady])

	const onImageLoaded = React.useMemo(() => async () => {
		SplashScreen.hide()
		try {
			// Load stuff
			await Promise.all([])
		} catch (e) {
			// handle errors
		} finally {
			setAppReady(true)
		}
	})

	return (
		<View style={{ flex: 1 }}>
			{isAppReady && children}
			{!isSplashAnimationComplete && (
				<Animated.View
					pointerEvents='none'
					style={[
						StyleSheet.absoluteFill,
						{
							backgroundColor: Constants.manifest.splash.backgroundColor,
							opacity: animation
						}
					]}
				>
					<Animated.Image
						style={{
							width: '100%',
							height: '100%',
							resizeMode: Constants.manifest.splash.resizeMode || 'contain',
							transform: [
								{
									scale: animation
								}
							]
						}}
						source={image}
						onLoadEnd={onImageLoaded}
						fadeDuration={0}
					/>
				</Animated.View>
			)}
		</View>
	)
}

function StackScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Text>Stack screen</Text>
		</View>
	)
}

function HomeScreen({ navigation }) {
	return (
		<View style={{ }}>
			<Text style={{ fontSize: 48 }}>Good morning, Erling</Text>
			<View
				style={{ marginTop: 32, height: 180, backgroundColor: 'white' }}
			>
				<Text
					onPress={() => navigation.navigate('Stack')}
					style={{ fontSize: 24 }}
				>
					Anatomy

				</Text>
				<Text>Not played through</Text>
			</View>
		</View>
	)
}

const HomeStack = createStackNavigator()

function HomeStackScreen() {
	return (
		<HomeStack.Navigator>
			<HomeStack.Screen name='Home' component={HomeScreen} />
			<HomeStack.Screen name='Stack' component={StackScreen} />
		</HomeStack.Navigator>
	)
}

function MainScreen() {
	return (
		<NavigationContainer>
			<HomeStackScreen />
		</NavigationContainer>
	)
}
