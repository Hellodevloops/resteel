import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Building2 } from 'lucide-react';
import WarehouseForm from './Form';

export default function Create() {
    return (
        <AppLayout>
            <Head title="Create Warehouse - Admin" />
            {/* <AppSidebarHeader breadcrumbs={breadcrumbs} /> */}

            <div className="bg-background min-h-screen">
                {/* Header */}
                <div className="bg-background border-b">
                    <div className="container mx-auto px-4 py-4 sm:px-6 sm:py-6">
                        <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3">
                            <div className="bg-primary flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm">
                                <Building2 className="text-primary-foreground h-5 w-5" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <h1 className="text-lg font-semibold sm:text-xl">Create Warehouse</h1>
                                <p className="text-muted-foreground text-sm">Add a new warehouse to your inventory system</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content - Full Screen */}
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="h-full py-4 sm:py-6">
                        {/* <Card className="h-full rounded-sm"> */}
                        {/* <CardHeader className="pb-4">
                                <CardTitle className="text-lg font-medium">Warehouse Information</CardTitle>
                                <CardDescription>Fill in the details below to create your new warehouse</CardDescription>
                            </CardHeader> */}
                        {/* <Separator /> */}
                        {/* <CardContent className="p-6"> */}
                        <WarehouseForm />
                        {/* </CardContent> */}
                        {/* </Card> */}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
