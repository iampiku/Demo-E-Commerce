import { NotificationContext } from "@/context/NotificationContext";
import { useContext } from "react";

export default function useNotification() {
	const context = useContext(NotificationContext);
	if (!context)
		throw new Error(
			"useNotification must be used within a NotificationProvider"
		);
	return context;
}
