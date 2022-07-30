import {
	Box,
	Container,
	Divider,
	Flex,
	Heading,
	List,
	ListItem,
	Text,
} from "@chakra-ui/react"
import { observer } from "mobx-react-lite"
import type { NextPage } from "next"
import Head from "next/head"
import React from "react"
import { ShoppingListItemComponent } from "../components/ShoppingListItemComponent"
import { ShoppingList } from "../models/ShoppingList"
import { ShoppingListItem } from "../models/ShoppingListItem"
import { NewItemForm } from "../components/NewItemForm"

const list = new ShoppingList("local")

let id = 0
export const getId = () => (id++).toString()

list
	.addShoppingListItem(new ShoppingListItem(getId(), "Хлеб", "Булошки"))
	.addShoppingListItem(new ShoppingListItem(getId(), "Огурцы", "Фрукты/Овощи"))

const Home: NextPage = observer(() => {
	return (
		<Flex flexDirection="column" background={"#fafafa"} height="100vh">
			<Head>
				<title>My Shopping List</title>
				<meta name="description" content="Shopping list app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box as="main" flex={1}>
				<Container>
					<Heading mb={8}>my shopping list.</Heading>
				</Container>
				<Container px={2}>
					<List
						borderRadius="md"
						backgroundColor="InfoBackground"
						shadow={"base"}
						px={2}
					>
						{list.items.map((item) => (
							<ListItem key={item.id}>
								<ShoppingListItemComponent
									item={item}
									onDelete={() => list.removeShoppingListItem(item)}
								/>
								<Divider />
							</ListItem>
						))}
					</List>
					<NewItemForm list={list} />
				</Container>
			</Box>

			<footer>
				<Container py={2} textAlign="right">
					<Text color="GrayText">nanot1m</Text>
				</Container>
			</footer>
		</Flex>
	)
})

export default Home
