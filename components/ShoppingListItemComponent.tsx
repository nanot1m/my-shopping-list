import { Flex, Box, Badge, IconButton, Input } from "@chakra-ui/react"
import { CheckIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { observer, useLocalObservable } from "mobx-react-lite"
import { ShoppingListItem } from "../models/ShoppingListItem"
import { runInAction } from "mobx"

export const ShoppingListItemComponent = observer(
	(props: { item: ShoppingListItem; onDelete: () => void }) => {
		const model = useLocalObservable(() => ({
			isEditing: false,
			title: props.item.title,
			category: props.item.category,
			submitEdit() {
				props.item.title = this.title.trim()
				props.item.category = this.category?.trim() || null
				this.isEditing = false
			},
			toggleEdit() {
				this.isEditing = true
			},
			setTitle(title: string) {
				this.title = title
			},
			setCategory(category: string) {
				this.category = category
			},
		}))

		return (
			<Flex alignItems="center" gap={2}>
				{model.isEditing ? (
					<Input
						value={model.title}
						onChange={(e) => model.setTitle(e.target.value)}
						placeholder="Title"
					/>
				) : (
					<Box flex={1} onPointerUp={model.toggleEdit}>
						{props.item.title || "Untitled"}
					</Box>
				)}

				{model.isEditing ? (
					<Input
						value={model.category ?? ""}
						onChange={(e) => model.setCategory(e.target.value)}
						placeholder="Category"
					/>
				) : props.item.category ? (
					<Badge
						onPointerUp={model.toggleEdit}
						variant={"subtle"}
						fontSize="x-small"
						colorScheme={"green"}
					>
						{props.item.category}
					</Badge>
				) : null}
				<Flex py={2}>
					{model.isEditing ? (
						<IconButton
							aria-label={"Submit"}
							icon={<CheckIcon />}
							onClick={model.submitEdit}
						/>
					) : (
						<IconButton
							aria-label={"Delete"}
							icon={<DeleteIcon />}
							onClick={props.onDelete}
						/>
					)}
				</Flex>
			</Flex>
		)
	},
)
