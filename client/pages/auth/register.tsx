import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export const createUserSchema = object({
    name: string().min(1, "Name is required"),
    password: string({
        required_error: "Password is required",
    }).min(6, "Password too short"),
    passwordConfirmation: string({
        required_error: "PasswordConfirmation is required",
    }),
    email: string({
        required_error: "Email is required",
    }).email("Email is not valid"),
}).refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
});
type CreateUserInput = TypeOf<typeof createUserSchema>;

function RegisterPage() {
    const [registerError, setRegisterError] = useState(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateUserInput>({
        resolver: zodResolver(createUserSchema),
    });

    const router = useRouter();
    async function onSubmit(values: CreateUserInput) {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/users`,
                values
            );
            router.push("/")
        } catch (e: any) {
            setRegisterError(e.message);
        }
    }

    return (
        <>
            <p>{registerError}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-element">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="janedoe@example.com"
                        {...register("email")}
                    />
                </div>
                <p>{errors.email?.message}</p>

                <div className="form-element">
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        placeholder="Jane Doe"
                        {...register("name")}
                    />
                </div>
                <p>{errors.name?.message}</p>

                <div className="form-element">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="******"
                        {...register("password")}
                    />
                </div>
                <p>{errors.password?.message}</p>

                <div className="form-element">
                    <label htmlFor="passwordConfirmation">
                        Confirm Password
                    </label>
                    <input
                        id="passwordConfirmation"
                        type="password"
                        placeholder="*******"
                        {...register("passwordConfirmation")}
                    />
                </div>

                <p>{errors.passwordConfirmation?.message}</p>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default RegisterPage;
