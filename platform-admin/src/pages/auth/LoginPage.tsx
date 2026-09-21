import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useAppDispatch} from "../../hooks/use-store";
import { fetchLogin } from "@/store/auth/authSlice";
import { getApiErrorMessage } from "@/lib/api.error";
import type { loginResponse } from "@/api/auth";

export default function LoginPage() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSubmiting(true);
        setError(null);

        try {
            const result:any = await dispatch(fetchLogin({
                email:email,
                password:password
             }))

             const response = result?.payload as loginResponse;

             if(response.accessToken && response.refreshToken && response.userType){

                 navigate("/dashboard");
             }else {
                setError(getApiErrorMessage(result,result?.payload));
             }
            setIsSubmiting(false);
        } catch (error) {
           setError(getApiErrorMessage(error, "An error occurred while logging in"));
        } finally {
            setIsSubmiting(false);
        }

    }

    return (
        <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold">Sign In</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">Login to your account to get started.</p>


            {error && (
                <div className="mt-4 rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-500">
                    {error}
                </div>
            )}

            <form className="mt-7" onSubmit={handleSubmit}>
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="email">
                            Work Email
                        </FieldLabel>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@platform.com"
                            autoCapitalize="username"
                            className="h-11"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isSubmiting}
                        />
                    </Field>
                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">
                                Password
                            </FieldLabel>
                            <Link to="/forgot-password" className="text-sm text-primary font-medium hover:underline">Forgot your password?</Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="********"
                            className="h-11"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmiting}
                        />
                    </Field>



                    <Button
                        type="submit"
                        className="mt-3 h-11 w-full"
                        disabled={isSubmiting}
                    >
                        {isSubmiting ?
                            <>
                                <Spinner className="size-4" />
                                <span>Signing In...</span>
                            </>
                            : "Sign In"}
                    </Button>
                </FieldGroup>
            </form>
            <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                <ShieldCheckIcon className="size-3.5" />
                Protected by SSO and 2-Factor Authentication
            </div>
        </div>
    )
}