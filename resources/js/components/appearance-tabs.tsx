import { cn } from '@/lib/utils';
import { Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

import { useAppearance } from '@/hooks/use-appearance';

export default function AppearanceTabs({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className={cn('inline-flex gap-1 rounded-lg bg-neutral-100 p-1', className)} {...props}>
            <button
                type="button"
                onClick={() => updateAppearance()}
                className={cn(
                    'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-all',
                    appearance === 'light' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black',
                )}
            >
                <Sun className="size-4" />
                Light
            </button>
        </div>
    );
}
