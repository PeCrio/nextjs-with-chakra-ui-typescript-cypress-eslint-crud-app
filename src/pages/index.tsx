import { Box, Center, Container, Divider, Heading } from "@chakra-ui/react";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import TodoList from "../components/TodoList";

const Index = () => (
	<Center minH="100vh">
		<Container maxW="container.lg" bg="gray.50" p="4" rounded="md">
			<Heading mb="4" textAlign="center">
				Todo App
			</Heading>
			<Divider />
			<Box w="full" mt="2">
				<TodoList />
			</Box>
			<DarkModeSwitch />
		</Container>
	</Center>
);

export default Index;
