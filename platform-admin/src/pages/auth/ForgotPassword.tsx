import { Button } from '@/components/ui/button'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { ArrowLeftIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

export const ForgotPasswordPage = () => {

    const [email, setEmail] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        setTimeout(() => {
            setIsSubmitting(false);
            setError("Invalid email or password");

            navigate('/verify-otp', {
                state: {
                    email: email
                }
            })
        }, 2000)

    }

    return (

        <div className='w-full max-w-sm'>
            <Link to={"/login"}
                aria-label="Back to Login Page"
                className='mb-4 inline-flex text-foreground items-center gap-2'
            >
                <ArrowLeftIcon className='size-5' />
                Back
            </Link>

            <h2 className='text-2xl font-bold mt-6'>Forgot Password</h2>
            <p className='text-muted-foreground mt-4 text-sm'>
                Enter your registered email address. We will send you a reset link.
            </p>

            {error && (
                <div className="mt-4 rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-500">
                    {error}
                </div>
            )}


            <form className='mt-6' onSubmit={handleSubmit}>
                <Field>
                    <FieldLabel htmlFor='email'>
                        Email Address
                    </FieldLabel>
                    <Input
                        id='email'
                        type='email'
                        placeholder='You@mail.com'
                        autoComplete='username'
                        className='h-11 w-full'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isSubmitting}
                        required
                    />
                </Field>

                <Button
                    type="submit"
                    className="mt-3 h-11 w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ?
                        <>
                            <Spinner className="size-4" />
                            <span>Sending OTP</span>
                        </>
                        : "Send OTP"}
                </Button>
            </form>
        </div>
    )
}
