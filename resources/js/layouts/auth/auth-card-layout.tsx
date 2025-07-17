import AppLogoIcon from '@/components/app-logo-icon';
import { PropsWithChildren } from 'react';

export default function AuthCardLayout({ children }: PropsWithChildren) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <AppLogoIcon className="size-9 fill-current text-black" />
                </div>
                <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Resteel</h1>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">{children}</div>
            </div>
        </div>
    );
}
