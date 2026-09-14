import { FieldGroup, FieldLabel, Field } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useLocation, useNavigate } from "react-router";
import { CheckCircle2, ShieldCheckIcon } from "lucide-react";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import PasswordToggleInput from "@/components/PasswordToggleInput";

export function ResetPasswordPage() {

    const location = useLocation()
    const state = location.state as { email?: string, resetToken?: string } | null

    const email = state?.email || ""
    const resetToken = state?.resetToken
    const navigate = useNavigate()

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
    const [isDone, setIsDone] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);


    const misMatchError = password !== confirmPassword && confirmPassword.length > 0;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (misMatchError) return;
        // if (!resetToken || !email) {
        //     setError("Invalid Reset Link. Please request a new one.");
        //     return;
        // }
        setIsSubmiting(true);
        try {
            setTimeout(() => {
                setIsSubmiting(false);
                setPassword("")
                setConfirmPassword("")
                setIsDone(true)
            }, 2000)

        } catch (err) {
            setError(typeof err === "string" ? err : "Something went wrong")
        } finally {
            setIsSubmiting(false);
        }

    }

    if (isDone) {
        return (
            <div className="w-full max-w-sm">
                <div className="flex size-16 items-center justify-center rounded-full border-4 border-green-100 bg-green-50 mx-auto">
                    <CheckCircle2 className="size-8 text-green-500" />
                </div>
                <h2 className="mt-3 text-lg font-medium text-foreground text-center">Password Reset Successfully</h2>
                <p className="mt-1 text-sm text-muted-foreground text-center">You can now log in with your new password.</p>
                <Link to="/login">
                    <Button
                        className="mt-6 h-11 w-full bg-primary hover:bg-primary/90"
                    >
                        Back to Login
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="w-full max-w-sm">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
                {
                    email ? (
                        <>
                            New password for {""}
                            <span className="font-medium text-foreground">{email}</span>
                        </>
                    ) : (
                        "Choose a new password to reset your account's password"
                    )
                }
            </p>


            {error && (
                <div className="mt-4 rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-500">
                    {error}
                </div>
            )}

            <form className="mt-7" onSubmit={handleSubmit}>
                <FieldGroup>

                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="password">
                                New Password
                            </FieldLabel>

                        </div>
                        <PasswordToggleInput
                            id="password"
                            placeholder="********"
                            className="h-11"
                            autoComplete="new-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isSubmiting}
                        />
                    </Field>

                    <Field>
                        <div className="flex items-center justify-between">
                            <FieldLabel htmlFor="confirm-password">
                                Confirm Password
                            </FieldLabel>

                        </div>
                        <PasswordToggleInput
                            id="confirm-password"
                            placeholder="********"
                            className="h-11"
                            autoComplete="new-password"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isSubmiting}
                        />
                    </Field>
                    {
                        misMatchError && (
                            <p className="text-red-600 text-xs">Passwords do not match</p>
                        )
                    }


                    <Button
                        type="submit"
                        className="mt-3 h-11 w-full"
                        disabled={isSubmiting}
                    >
                        {isSubmiting ?
                            <>
                                <Spinner className="size-4" />
                                <span>Resetting...</span>
                            </>
                            : "Reset Password"}
                    </Button>
                </FieldGroup>
            </form>

        </div>
    )
}