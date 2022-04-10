import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	ButtonGroup,
	Center,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Table,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { FormikHelpers } from "formik";
import React, { useEffect, useRef, useState } from "react";
import {
	createTodo,
	deleteTodo,
	getTodoList,
	updateTodo,
} from "services/TodoServices";
import TodoListForm, { Todo } from "./TodoListForm";

const defaultTodo: Todo = {
	description: "",
	status: "pending",
};

function TodoList() {
	const toast = useToast();
	const cancelRef = useRef();
	const [loading, setLoading] = useState(false);
	const [todo, setTodo] = useState(defaultTodo);
	const [todos, setTodos] = useState<Todo[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();
	const {
		onOpen: openDeleteWarning,
		onClose: closeDeleteWarning,
		isOpen: deleteWarningIsOpen,
	} = useDisclosure();
	const [isDeleting, setIsDeleting] = useState(false);

	const editItem = (item) => {
		setTodo(item);
		onOpen();
	};
	const deleteItem = (item) => {
		setTodo(item);
		openDeleteWarning();
	};
	useEffect(() => {
		const fetchTodos = async () => {
			try {
				setLoading(true);
				const todoList = await getTodoList();
				setTodos(todoList);
			} catch (error) {
				setTodos([]);
				toast({
					position: "top-right",
					description: "An error occured fetching todos",
					status: "error",
					isClosable: true,
				});
			} finally {
				setTodo(defaultTodo);
				setLoading(false);
			}
		};
		fetchTodos();
	}, [toast]);

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await deleteTodo(todo.id);
			setTodos((prevTodos) => prevTodos.filter((item) => item.id !== todo.id));
			toast({
				position: "top-right",
				description: "Todo deleted successfully",
				status: "success",
				isClosable: true,
			});
			closeDeleteWarning();
		} catch (error) {
			toast({
				position: "top-right",
				description: "An error occured deleting this task",
				status: "error",
				isClosable: true,
			});
		} finally {
			setIsDeleting(false);
		}
	};
	const handleFormSubmission = async (
		values: Todo,
		formikProps: FormikHelpers<Todo>
	) => {
		const { setSubmitting, resetForm } = formikProps;
		let description = "";
		let status: "success" | "error" = "success";
		try {
			setSubmitting(false);
			let res: Todo;
			if (values.id) {
				res = await updateTodo(values);
				setTodos((prevTodos) => {
					const filteredItems = prevTodos.filter(
						(item) => item.id !== values.id
					);
					return [...filteredItems, res];
				});
				description = "Todo updated successfully";
				onClose();
			} else {
				res = await createTodo(values);
				setTodos([...todos, res]);
				description = "Todo created successfully";
				resetForm();
			}
		} catch (error) {
			description = "An error occured processing your request";
			status = "error";
		} finally {
			setSubmitting(false);
			toast({
				position: "top-right",
				description,
				status,
				isClosable: true,
			});
		}
	};

	return (
		<Box>
			{loading ? (
				<Center my="8">
					<Spinner />
				</Center>
			) : (
				<>
					<Flex mb="4" justify="space-between">
						<Button
							id="add-todo"
							onClick={() => {
								onOpen();
								setTodo(defaultTodo);
							}}
							colorScheme="purple"
							size="sm"
							borderColor="gray.700"
							variant="solid"
							leftIcon={<AddIcon w="3" fontWeight="bold" />}
						>
							Add Todo
						</Button>
					</Flex>
					<Box overflowX="auto" w="full">
						<Table size="sm" variant="unstyled" id="todo-list-table">
							<Thead bg="gray.100">
								<Tr>
									<Th py="4">SN</Th>
									<Th py="4">Description</Th>
									<Th py="4">Status</Th>
									<Th py="4">Action</Th>
								</Tr>
							</Thead>
							<Tbody>
								{todos.length > 0 ? (
									todos.map((item, index) => {
										const { id, description, status } = item;
										return (
											<Tr key={id}>
												<Td>
													<Text>{index + 1}</Text>
												</Td>
												<Td>{description}</Td>
												<Td>{status}</Td>
												<Td>
													<ButtonGroup>
														<Button
															id="edit-task-button"
															size="sm"
															onClick={() => editItem(item)}
														>
															<EditIcon />
														</Button>
														<Button
															id="delete-task-button"
															size="sm"
															onClick={() => deleteItem(item)}
														>
															<DeleteIcon />
														</Button>
													</ButtonGroup>
												</Td>
											</Tr>
										);
									})
								) : (
									<Tr>
										<Td py="4" textAlign="center" colSpan={6}>
											No tasks found
										</Td>
									</Tr>
								)}
							</Tbody>
						</Table>
					</Box>
				</>
			)}

			<AlertDialog
				isOpen={deleteWarningIsOpen}
				leastDestructiveRef={cancelRef}
				onClose={closeDeleteWarning}
			>
				<AlertDialogOverlay>
					<AlertDialogContent data-test-id="delete-warning-dialog">
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							Delete Task
						</AlertDialogHeader>

						<AlertDialogBody>
							Are you sure? You can&apos;t undo this action afterwards.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={closeDeleteWarning}>
								Cancel
							</Button>
							<Button
								colorScheme="purple"
								ml="3"
								isLoading={isDeleting}
								onClick={handleDelete}
								id="confirm-delete-button"
								textTransform="capitalize"
								leftIcon={<DeleteIcon />}
							>
								Delete
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
			<Modal isOpen={isOpen} onClose={onClose} size="lg">
				<ModalOverlay />
				<ModalContent>
					<ModalHeader textAlign="center" fontSize="2xl" mt="4">
						Todo Information
					</ModalHeader>
					<ModalCloseButton id="close-todo-form-button" />
					<ModalBody pb={6}>
						<TodoListForm
							initialValues={todo}
							onSubmit={handleFormSubmission}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</Box>
	);
}

export default TodoList;
