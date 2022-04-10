import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";
import { Todo } from "../components/TodoListForm";

export const createTodo = async (values: Todo) => {
	const res = await axios.post("/todos", values);
	return res.data;
};
export const getTodoList = async () => {
	const res = await axios.get("/todos");
	return res.data;
};
export const updateTodo = async (values: Todo) => {
	const res = await axios.put(`/todos/${values.id}`, values);
	return res.data;
};
export const deleteTodo = async (id: string) => {
	const res = await axios.delete(`/todos/${id}`);
	return res.data;
};
