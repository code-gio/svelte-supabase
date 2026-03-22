import { z } from "zod";
import { passwordSchema } from "./password.js";

export const signUpSchema = z.object({
	first_name: z.string().min(1, "First name is required").max(100, "First name is too long"),
	last_name: z.string().min(1, "Last name is required").max(100, "Last name is too long"),
	email: z.string().email("Please enter a valid email address"),
	password: passwordSchema,
});

export type SignUpSchema = z.infer<typeof signUpSchema>;
