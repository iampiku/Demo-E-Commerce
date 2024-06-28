import { Notification } from "@/types";

import { NotificationToast } from "@/components/NotificationToast";

import {
	useMemo,
	useState,
	ReactNode,
	useCallback,
	createContext,
} from "react";

interface NotificationContextProps {
	showNotification: (payload: Notification) => void;
}

export const NotificationContext =
	createContext<NotificationContextProps | null>(null);

export const NotificationProvider = ({
	children,
}: Readonly<{ children: ReactNode }>) => {
	const [showToast, setShowToast] = useState(false);
	const [notification, setNotification] = useState<Notification | null>(null);

	const showNotification = useCallback((notification: Notification) => {
		setNotification(notification);
		setShowToast(true);

		setTimeout(() => {
			setShowToast(false);
			setNotification(null);
		}, 5000);
	}, []);

	const onClose = () => setShowToast(false);

	const value: NotificationContextProps = useMemo(
		() => ({ showNotification }),
		[showNotification]
	);

	return (
		<NotificationContext.Provider value={value}>
			{children}
			{notification && showToast && (
				<NotificationToast
					onClose={onClose}
					showToast={showToast}
					type={notification.type}
					message={notification.message}
				/>
			)}
		</NotificationContext.Provider>
	);
};
