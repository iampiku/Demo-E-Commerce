import { Card, CardHeader, CardBody } from "@nextui-org/react";

interface NotificationToastProps {
	showToast: boolean;
	type: "error" | "success" | "warning";
	message: {
		title: string;
		description: string;
	};
}

export function NotificationToast({
	type,
	message,
	showToast,
}: Readonly<NotificationToastProps>) {
	if (!showToast) return null;
	return (
		<Card>
			<CardHeader></CardHeader>
			<CardBody></CardBody>
		</Card>
	);
}
