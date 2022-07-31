import { makeAutoObservable } from "mobx"

export class ShoppingListItem {
	readonly id: string

	title: string
	category: string | null
	done: boolean

	constructor(
		id: string,
		title: string = "",
		category: string | null = null,
		done = false,
	) {
		this.id = id
		this.title = title
		this.category = category
		this.done = done

		makeAutoObservable(this)
	}

	setTitle(title: string) {
		this.title = title
	}

	setCategory(category: string | null) {
		this.category = category
	}

	setDone(done: boolean) {
		this.done = done
	}
}
