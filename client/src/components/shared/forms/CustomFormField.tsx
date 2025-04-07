import React from "react";
import {
	ControllerRenderProps,
	FieldValues,
	useFormContext,
} from "react-hook-form";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface FormFieldProps {
	name: string;
	label: string;
	type?: "text" | "email" | "number" | "password";
	placeholder?: string;
	options?: { value: string; label: string }[];
	className?: string;
	labelClassName?: string;
	inputClassName?: string;
	value?: string;
	disabled?: boolean;
	initialValue?: string | number | boolean | string[];
}

export const CustomFormField: React.FC<FormFieldProps> = ({
	name,
	label,
	type = "text",
	placeholder,
	options,
	className,
	inputClassName,
	labelClassName,
	disabled = false,
	initialValue,
}) => {
	const { control } = useFormContext();

	const renderFormControl = (
		field: ControllerRenderProps<FieldValues, string>
	) => {
		switch (type) {
			case "number":
				return (
					<Input
						type="number"
						id={name}
						placeholder={placeholder}
						{...field}
						className={`border-gray-200 p-4 ${inputClassName}`}
						disabled={disabled}
					/>
				);
			default:
				return (
					<Input
						id={name}
						type={type}
						placeholder={placeholder}
						{...field}
						className={`border-gray-200 p-4 ${inputClassName}`}
						disabled={disabled}
					/>
				);
		}
	};

	return (
		<FormField
			control={control}
			name={name}
			defaultValue={initialValue}
			render={({ field }) => (
				<FormItem className={`rounded-md relative ${className}`}>
					<FormLabel
						htmlFor={name}
						className={labelClassName}
					>
						{label}
					</FormLabel>
					<FormControl>
						{renderFormControl({
							...field,
							value: field.value !== undefined ? field.value : initialValue,
						})}
					</FormControl>
					<FormMessage className="text-red-400" />
				</FormItem>
			)}
		/>
	);
};
