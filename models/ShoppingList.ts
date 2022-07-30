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

	removeShoppingListItem(item: ShoppingListItem) {
		const idx = this.items.indexOf(item)
		if (idx > -1) {
			this.items.splice(-1, 1)
		}
		return idx > -1
	}
}
