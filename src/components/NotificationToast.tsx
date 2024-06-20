import { Notification } from "@/types";
import { Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { FaCircleInfo, FaCircleCheck } from "react-icons/fa6";
import { IoIosWarning, IoIosClose } from "react-icons/io";

type NotificationToastProps = Notification & {
	showToast: boolean;
	onClose: () => void;
};

export function NotificationToast({
	type,
	onClose,
	message,
	showToast,
}: Readonly<NotificationToastProps>) {
	if (!showToast) return null;

	const iconMap: { [key: string]: JSX.Element } = {
		error: <IoIosWarning />,
		success: <FaCircleCheck />,
		info: <FaCircleInfo />,
	};

	return (
		<Card className="fixed top-0 right-0 mt-4 mr-4 max-w-[400px] z-50 bg-green-100/85 backdrop-blur-md">
			<CardHeader className="text-2xl flex justify-between">
				<div className="flex items-center gap-2 text-green-700">
					<div>{iconMap[type]}</div>
					<p>{message.title}</p>
				</div>
				<Button size="sm" isIconOnly className="text-xl" onClick={onClose}>
					<IoIosClose />
				</Button>
			</CardHeader>
			<CardBody>{message.description}</CardBody>
		</Card>
	);
}
