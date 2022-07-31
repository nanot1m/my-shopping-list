import { AddIcon } from "@chakra-ui/icons"
import { Flex, IconButton, Input } from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import React, { useCallback } from "react"
import { addShoppingListItem } from "../dal/firebaseApp"
import { ShoppingList } from "../models/ShoppingList"

export const NewItemForm = observer((props: { list: ShoppingList }) => {
	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault()
			const form = e.currentTarget
			const formData = new FormData(form)
			const title = formData.get("title")?.toString()
			if (title) {
				addShoppingListItem({
					title,
					category: formData.get("category")?.toString() ?? null,
					shoppingListId: props.list.id,
				})
			}
			form.reset()
		},
		[props.list],
	)

	return (
		<form onSubmit={handleSubmit}>
			<Flex gap={2} py={2}>
				<Input name="title" placeholder="Title" />
				<Input name="category" placeholder="Category" />
				<IconButton
					type="submit"
					aria-label="Submit new shopping list item"
					icon={<AddIcon />}
				/>
			</Flex>
		</form>
	)
})
