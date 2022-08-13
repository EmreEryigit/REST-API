import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import getGoogleOauthUrl from "../../utils/getGoogleUrl";

export const createSessionSchema = object({
    email: string().min(1, "Email is required"),
    password: string().min(1, "Password is required"),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

function LoginPage() {
    const [loginError, setLoginError] = useState(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm<CreateSessionInput>({
        resolver: zodResolver(createSessionSchema),
    });

    const router = useRouter();
    async function onSubmit(values: CreateSessionInput) {
        try {
            await axios.post(
                `${process.env.NEXT_PUBLIC_SERVER_ENDPOINT}/api/sessions`,
                values,
                {
                    withCredentials: true
                }
            );
            router.push("/");
        } catch (e: any) {
            setLoginError(e.message);
        }
    }

    return (
        <>
            <p>{loginError}</p>
            <a href={getGoogleOauthUrl()}>login with google</a>
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
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        placeholder="******"
                        {...register("password")}
                    />
                </div>
                <p>{errors.password?.message}</p>

                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default LoginPage;
