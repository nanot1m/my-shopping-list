import { makeAutoObservable } from "mobx"
import { ShoppingListItem } from "./ShoppingListItem"

export class ShoppingList {
	readonly id: string
	items: ShoppingListItem[] = []

	constructor(id: string) {
		this.id = id
		makeAutoObservable(this)
	}

	addShoppingListItem(item: ShoppingListItem) {
		this.items.push(item)
		return this
	}

	removeShoppingListItemById(itemId: string) {
		const idx = this.items.findIndex((x) => x.id === itemId)
		if (idx > -1) {
			this.items.splice(idx, 1)
		}
		return idx > -1
	}
}
