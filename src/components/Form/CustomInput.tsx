import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	InputProps,
	Select,
	SelectProps,
	Textarea,
	TextareaProps,
} from "@chakra-ui/react";
import { Field, FieldProps as FormikFieldProps } from "formik";
import React from "react";

type FieldType = "text" | "textarea" | "select";
type CustomInputFieldProps = TextareaProps | InputProps | SelectProps;

interface CustomInputProps {
	label: string;
	name: string;
	fieldProps?: CustomInputFieldProps;
	type?: FieldType;
	children?: JSX.Element | JSX.Element[];
}
function CustomInput({
	fieldProps,
	label,
	name,
	type,
	children,
}: CustomInputProps) {
	const pickFormField = ({ formikProps }: { formikProps }) => {
		const { field } = formikProps;
		switch (type) {
			case "textarea":
				return (
					<Textarea
						id={name}
						name={name}
						bg="white"
						{...field}
						{...fieldProps}
					></Textarea>
				);
			case "select":
				return (
					<Select id={name} name={name} bg="white" {...field} {...fieldProps}>
						{children}
					</Select>
				);

			default:
				return (
					<Input id={name} name={name} bg="white" {...field} {...fieldProps} />
				);
		}
	};
	return (
		<>
			<Field name={name}>
				{(formikProps: FormikFieldProps) => {
					const { form } = formikProps;
					const isInvalid = !!(form.errors[name] && form.touched[name]);
					return (
						<FormControl isInvalid={isInvalid}>
							<FormLabel mb="1" fontSize="sm" color="gray.500">
								{label}
							</FormLabel>
							{pickFormField({
								formikProps,
							})}

							<FormErrorMessage fontSize="xs" lineHeight="none">
								{form.errors[name]}
							</FormErrorMessage>
						</FormControl>
					);
				}}
			</Field>
		</>
	);
}

export default CustomInput;
