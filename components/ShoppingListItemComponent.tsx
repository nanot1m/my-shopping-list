import { Flex, Box, Badge, IconButton, Input, Checkbox } from "@chakra-ui/react"
import { CheckIcon, DeleteIcon } from "@chakra-ui/icons"
import { observer, useLocalObservable } from "mobx-react-lite"
import { ShoppingListItem } from "../models/ShoppingListItem"
import {
	deleteShoppingListItem,
	updateShoppingListItem,
} from "../dal/firebaseApp"
import type { FormEvent } from "react"

export const ShoppingListItemComponent = observer(
	(props: { item: ShoppingListItem }) => {
		const model = useLocalObservable(() => ({
			isEditing: false,
			editFieldFocus: "",
			title: props.item.title,
			category: props.item.category,
			submitEdit(e: FormEvent) {
				e.preventDefault()

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
			<form onSubmit={model.submitEdit}>
				<Flex alignItems="center" gap={2}>
					{model.isEditing === false && (
						<Checkbox
							px={1}
							size="lg"
							isChecked={props.item.done}
							onChange={(e) => {
								updateShoppingListItem(props.item.id, {
									done: e.target.checked,
								})
							}}
						/>
					)}
					{model.isEditing ? (
						<Input
							autoFocus={model.editFieldFocus === "title"}
							value={model.title}
							onChange={(e) => model.setTitle(e.target.value)}
							placeholder="Title"
						/>
					) : (
						<Box
							flex={1}
							onPointerUp={model.toggleEditTitle}
							textDecoration={props.item.done ? "line-through" : ""}
							color={props.item.done ? "GrayText" : ""}
						>
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
								type="submit"
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
			</form>
		)
	},
)
