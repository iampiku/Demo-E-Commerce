import { Notification } from "@/types";

import { NotificationToast } from "@/components/NotificationToast";

import { createContext, ReactNode, useCallback, useState } from "react";

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

	return (
		<NotificationContext.Provider value={{ showNotification }}>
			{children}
			{notification && showToast && (
				<NotificationToast
					type={notification.type}
					showToast={showToast}
					message={notification.message}
				/>
			)}
		</NotificationContext.Provider>
	);
};
