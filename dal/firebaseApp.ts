// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import {
	getFirestore,
	collection,
	getDocs,
	getDoc,
	DocumentReference,
	onSnapshot,
	doc,
	query,
	CollectionReference,
	where,
	deleteDoc,
	setDoc,
	orderBy,
	updateDoc,
} from "firebase/firestore"
import { ShoppingList } from "../models/ShoppingList"
import { ShoppingListItem } from "../models/ShoppingListItem"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBzsbWp8isumVQKaHEhz4KFa7w67tt3utw",
	authDomain: "my-shopping-list-209a9.firebaseapp.com",
	projectId: "my-shopping-list-209a9",
	storageBucket: "my-shopping-list-209a9.appspot.com",
	messagingSenderId: "665814707484",
	appId: "1:665814707484:web:7b5e0102655c9ba8275ed9",
}

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig)
export const firestore = getFirestore(firebaseApp)

export async function getAllShoppingLists() {
	return []
}

const shoppingListItemCollection = collection(
	firestore,
	"shopping-list-items",
) as CollectionReference<{
	title: string
	category: string | null
	shoppingListId: string
	done: boolean
}>

export async function getShoppingList(listId: string) {
	const shoppingList = new ShoppingList(listId)
	const q = query(
		shoppingListItemCollection,
		where("shoppingListId", "==", listId),
	)
	const dispose = onSnapshot(q, (snapshot) => {
		snapshot.docChanges().forEach((change) => {
			if (change.type === "added") {
				const data = change.doc.data()
				const item = new ShoppingListItem(
					change.doc.id,
					data.title,
					data.category || null,
					data.done,
				)
				shoppingList.addShoppingListItem(item)
			}
			if (change.type === "modified") {
				const data = change.doc.data()
				shoppingList.updateShoppingListItem(
					change.doc.id,
					data.title,
					data.category,
					data.done,
				)
			}
			if (change.type === "removed") {
				shoppingList.removeShoppingListItemById(change.doc.id)
			}
		})
	})

	return {
		shoppingList,
		dispose,
	}
}

export function deleteShoppingListItem(itemId: string) {
	return deleteDoc(doc(shoppingListItemCollection, itemId))
}

export function addShoppingListItem(fields: {
	title: string
	category: string | null
	shoppingListId: string
}) {
	return setDoc(doc(shoppingListItemCollection), {
		title: fields.title,
		category: fields.category,
		shoppingListId: fields.shoppingListId,
		done: false,
	})
}

export function updateShoppingListItem(
	itemId: string,
	fields: Partial<{ title: string; category: string | null; done: boolean }>,
) {
	return updateDoc(doc(shoppingListItemCollection, itemId), fields)
}
