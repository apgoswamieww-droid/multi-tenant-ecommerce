import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Spinner } from '@/components/ui/spinner'
import { ArrowLeftIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router'

export const VerifyForgotOtpPage = () => {

    const location = useLocation();

    const email = (location.state as { email?: string })?.email

    const [otp, setOtp] = useState<string>("")
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [resetToken, setResetToken] = useState<string | null>(null)
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        setTimeout(() => {
            setIsSubmitting(false);
            setOtp("")

            navigate('/reset-password', {
                state: {
                    email: email,
                    resetToken: resetToken,
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

            <h2 className='text-2xl font-bold mt-6'>Enter Verification OTP</h2>
            <p className='text-muted-foreground mt-4 text-sm'>
                {
                    email ? (
                        <>
                            We Sent a 6 digit OTP to {""}
                            <span className="font-medium text-foreground">
                                {email}
                            </span>
                        </>
                    ) : (
                        <>
                            We Sent a 6 digit OTP to your registered Email Address
                        </>
                    )
                }
            </p>

            {error && (
                <div className="mt-4 rounded-md border border-red-500 bg-red-50 px-3 py-2 text-sm text-red-500">
                    {error}
                </div>
            )}


            <form className='mt-6' onSubmit={handleSubmit}>
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    className='w-full'
                    required
                    disabled={isSubmitting}
                >
                    <InputOTPGroup className='w-full'>
                        <InputOTPSlot index={0} className='w-full h-14 text-lg' />
                        <InputOTPSlot index={1} className='w-full h-14 text-lg' />
                        <InputOTPSlot index={2} className='w-full h-14 text-lg' />
                        <InputOTPSlot index={3} className='w-full h-14 text-lg' />
                        <InputOTPSlot index={4} className='w-full h-14 text-lg' />
                        <InputOTPSlot index={5} className='w-full h-14 text-lg' />
                    </InputOTPGroup>
                </InputOTP>

                <Button
                    type="submit"
                    className="mt-3 h-11 w-full"
                    disabled={isSubmitting}
                >
                    {isSubmitting ?
                        <>
                            <Spinner className="size-4" />
                            <span>Verifying...</span>
                        </>
                        : "Verify OTP"}
                </Button>
            </form>
        </div>
    )
}
