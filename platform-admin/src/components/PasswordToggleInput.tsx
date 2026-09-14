import React, { useState } from 'react'
import { Input } from './ui/input';
import { cn } from 'cn';
import { EyeIcon, EyeOff } from 'lucide-react';

const PasswordToggleInput = ({ className, type: _type, ...props }: React.ComponentProps<typeof Input>) => {

    const [visiblePassword, setVisiblePassword] = useState<boolean>(false);

    return (
        <div className="relative">
            <Input
                type={visiblePassword ? "text" : "password"}
                className={cn("pr-10", className)}
                {...props}
            />
            <button
                type='button'
                tabIndex={-1}
                onClick={() => setVisiblePassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
            >
                {
                    visiblePassword ? (
                        <EyeOff className='size-5' />
                    ) : (
                        <EyeIcon className='size-5' />
                    )
                }
            </button>
        </div>
    )
}

export default PasswordToggleInput