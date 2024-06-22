import { Button, ButtonGroup } from "@nextui-org/react";
import { MdAdd, MdDelete } from "react-icons/md";
import { FaMinus } from "react-icons/fa6";

interface QuantityCounterProps {
	count: number;
	onChange: (type: "increment" | "decrement") => void;
}

export default function QuantityCounter({
	count,
	onChange,
}: Readonly<QuantityCounterProps>) {
	return (
		<ButtonGroup size="sm">
			<Button onClick={() => onChange("increment")} isIconOnly>
				<MdAdd />
			</Button>
			<Button isIconOnly>{count}</Button>
			<Button
				isIconOnly
				onClick={() => onChange("decrement")}
				color={count === 1 ? "danger" : "default"}
			>
				{count === 1 ? <MdDelete /> : <FaMinus />}
			</Button>
		</ButtonGroup>
	);
}
