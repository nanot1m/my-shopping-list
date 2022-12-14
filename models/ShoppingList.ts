import { makeAutoObservable } from "mobx"
import { ShoppingListItem } from "./ShoppingListItem"

export class ShoppingList {
	readonly id: string
	items: ShoppingListItem[] = []

	get sortedItems() {
		return this.items
			.slice()
			.sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
	}

	constructor(id: string) {
		this.id = id
		makeAutoObservable(this)
	}

	addShoppingListItem(item: ShoppingListItem) {
		this.items.push(item)
		return this
	}

	updateShoppingListItem(
		itemId: string,
		title: string,
		category: string | null,
		done: boolean,
	) {
		const item = this.items.find((item) => item.id === itemId)
		if (item) {
			item.setTitle(title)
			item.setCategory(category)
			item.setDone(done)
		}
	}

	removeShoppingListItemById(itemId: string) {
		const idx = this.items.findIndex((x) => x.id === itemId)
		if (idx > -1) {
			this.items.splice(idx, 1)
		}
		return idx > -1
	}
}
