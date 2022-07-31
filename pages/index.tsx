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
import React, { useEffect, useState } from "react"
import { ShoppingListItemComponent } from "../components/ShoppingListItemComponent"
import { ShoppingList } from "../models/ShoppingList"
import { NewItemForm } from "../components/NewItemForm"
import { getShoppingList } from "../dal/firebaseApp"

const listId = "v9r5CmHA3uudq9rMw37i"

const Home: NextPage = observer(() => {
	const [list, setList] = useState<ShoppingList | null>(null)

	useEffect(() => {
		let dispose = () => {}
		getShoppingList(listId).then((res) => {
			setList(res.shoppingList)
			dispose = res.dispose
		})
		return () => {
			dispose()
		}
	}, [])

	return (
		<Flex flexDirection="column" backgroundColor="#fafafa">
			<Head>
				<title>My Shopping List</title>
				<meta name="description" content="Shopping list app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Box as="main" flex={1}>
				<Container>
					<Heading mb={8}>my shopping list.</Heading>
				</Container>
				{list && (
					<Container px={2}>
						<NewItemForm list={list} />
						<List
							borderRadius="md"
							backgroundColor="InfoBackground"
							shadow={"base"}
							px={2}
							mt={2}
						>
							{list.items.map((item) => (
								<ListItem key={item.id}>
									<ShoppingListItemComponent item={item} />
									<Divider />
								</ListItem>
							))}
						</List>
					</Container>
				)}
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
