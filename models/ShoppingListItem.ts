import { makeAutoObservable } from "mobx"

export class ShoppingListItem {
	readonly id: string

	title: string
	category: string | null

	constructor(id: string, title: string = "", category: string | null = null) {
		makeAutoObservable(this)
		this.id = id
		this.title = title
		this.category = category
	}

	setTitle(title: string) {
		this.title = title
	}

	setCategory(category: string) {
		this.category = category
	}
}
