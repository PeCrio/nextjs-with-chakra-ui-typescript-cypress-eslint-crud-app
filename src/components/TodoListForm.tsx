import React from "react";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import CustomInput from "@/components/Form/CustomInput";
import { Box, Button } from "@chakra-ui/react";
export type TodoStatus = "pending" | "completed";
export interface Todo {
	status: TodoStatus;
	description: string;
	id?: string;
}
interface TodoListFormProps {
	initialValues?: Todo;
	onSubmit?: (
		values: Todo,
		formikHelpers: FormikHelpers<Todo>
	) => void | Promise<any>;
}
function TodoListForm({ initialValues, onSubmit }: TodoListFormProps) {
	const validationSchema = Yup.object({
		description: Yup.string().required("Task name is required"),
		status: Yup.string().required("Status is required"),
	});
	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={validationSchema}
		>
			{({ isSubmitting, isValid, values }) => (
				<Form id="todo-form">
					<Box w="full">
						<CustomInput
							label="Description"
							name="description"
							fieldProps={{
								type: "text",
								placeholder: "Todo name",
							}}
						/>
						<CustomInput label="Status" name="status" type="select">
							<option>pending</option>
							<option>completed</option>
						</CustomInput>
					</Box>
					{values.id ? (
						<Button
							isDisabled={!isValid || isSubmitting}
							isLoading={isSubmitting}
							type="submit"
							colorScheme="purple"
							textTransform="capitalize"
						>
							Update
						</Button>
					) : (
						<Button
							isDisabled={!isValid || isSubmitting}
							isLoading={isSubmitting}
							type="submit"
							mt="4"
							w="full"
							colorScheme="purple"
							textTransform="capitalize"
						>
							Submit
						</Button>
					)}
				</Form>
			)}
		</Formik>
	);
}

export default TodoListForm;
