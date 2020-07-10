import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'study-cards:notifications'

export async function clearLocalNotification() {
	const remove = await AsyncStorage.removeItem(NOTIFICATION_KEY)

	Notifications.cancelAllScheduledNotificationsAsync()

	return remove
}

export function createNotification() {
	return {
		title: 'Remember to study!',
		body: 'Don\'t forget to run through your daily quiz! 🤓',
		ios: {
			sound: true
		},
		android: {
			sound: true,
			priority: 'high',
			sticky: 'false',
			vibrate: 'true'
		}
	}
}

export async function setLocalNotification() {
	let notifications = await AsyncStorage.getItem(NOTIFICATION_KEY)
	notifications = JSON.parse(notifications)

	if (notifications === null) {
		const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS)

		if (permission === 'granted') {
			Notifications.cancelAllScheduledNotificationsAsync()

			const tomorrow = new Date()
			tomorrow.setDate(tomorrow.getDate() + 1)
			tomorrow.setHours(20)
			tomorrow.setMinutes(0)

			Notifications.scheduleLocalNotificationAsync(
				createNotification(),
				{
					time: tomorrow,
					repeat: 'day'
				}
			)

			AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
		}
	}
}
