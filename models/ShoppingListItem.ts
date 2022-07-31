import { makeAutoObservable } from "mobx"

export class ShoppingListItem {
	readonly id: string

	title: string
	category: string | null

	constructor(id: string, title: string = "", category: string | null = null) {
		this.id = id
		this.title = title
		this.category = category
		makeAutoObservable(this)
	}

	setTitle(title: string) {
		this.title = title
	}

	setCategory(category: string | null) {
		this.category = category
	}
}
