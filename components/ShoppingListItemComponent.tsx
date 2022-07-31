import { Flex, Box, Badge, IconButton, Input } from "@chakra-ui/react"
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons"
import { observer, useLocalObservable } from "mobx-react-lite"
import { ShoppingListItem } from "../models/ShoppingListItem"
import {
	deleteShoppingListItem,
	updateShoppingListItem,
} from "../dal/firebaseApp"

export const ShoppingListItemComponent = observer(
	(props: { item: ShoppingListItem }) => {
		const model = useLocalObservable(() => ({
			isEditing: false,
			editFieldFocus: "",
			title: props.item.title,
			category: props.item.category,
			submitEdit() {
				const title = this.title.trim()
				const category = this.category?.trim() || null
				updateShoppingListItem(props.item.id, {
					title,
					category,
				})
				this.isEditing = false
			},
			toggleEditTitle() {
				this.editFieldFocus = "title"
				this.isEditing = true
			},
			toggleEditCategory() {
				this.editFieldFocus = "category"
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
						autoFocus={model.editFieldFocus === "title"}
						value={model.title}
						onChange={(e) => model.setTitle(e.target.value)}
						placeholder="Title"
					/>
				) : (
					<Box flex={1} onPointerUp={model.toggleEditTitle}>
						{props.item.title || "Untitled"}
					</Box>
				)}

				{model.isEditing ? (
					<Input
						autoFocus={model.editFieldFocus === "category"}
						value={model.category ?? ""}
						onChange={(e) => model.setCategory(e.target.value)}
						placeholder="Category"
					/>
				) : props.item.category ? (
					<Badge
						onPointerUp={model.toggleEditCategory}
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
							onClick={() => deleteShoppingListItem(props.item.id)}
						/>
					)}
				</Flex>
			</Flex>
		)
	},
)
