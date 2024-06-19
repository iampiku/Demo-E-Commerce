import { Skeleton, Card, CardHeader, CardBody } from "@nextui-org/react";

export default function ProductSkeletonLoader() {
	return (
		<Card>
			<CardHeader>
				<Skeleton className="w-full rounded-lg h-[300px]"></Skeleton>
			</CardHeader>
			<CardBody>
				<Skeleton className="w-full rounded-lg h-[20px] mb-4"></Skeleton>
				<div className="flex gap-2 flex-col mb-4">
					<Skeleton className="w-full max-w-[85px] rounded-lg h-[20px]"></Skeleton>
					<div className="flex justify-between">
						<Skeleton className="w-full max-w-[70px] rounded-lg h-[20px]"></Skeleton>
						<Skeleton className="w-full max-w-[70px] rounded-lg h-[20px]"></Skeleton>
					</div>
				</div>

				<div className="flex gap-4">
					<Skeleton className="w-full max-w-[80px] rounded-lg h-[20px]"></Skeleton>
					<Skeleton className="w-full rounded-lg h-[20px]"></Skeleton>
				</div>
			</CardBody>
		</Card>
	);
}
