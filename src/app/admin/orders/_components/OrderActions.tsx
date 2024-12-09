"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { deleteOrder } from "../../_actions/orders";

export function DeleteDropdownItem({ orderId }: { orderId: string }) {
	const [isPending, startTransition] = useTransition();
	const router = useRouter();

	return (
		<DropdownMenuItem
			className="focus:bg-destructive text-destructive focus:text-destructive-foreground"
			disabled={isPending}
			onClick={() =>
				startTransition(async () => {
					await deleteOrder(orderId);
					router.refresh();
				})
			}
		>
			Delete
		</DropdownMenuItem>
	);
}
