'use client'
import { Button } from '@/components/ui/button'
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel } from '@/components/ui/alert-dialog';
import { useState, useTransition } from 'react';
import { toast  } from "sonner"

export default function DeleteDialog({id, action}: {
    id: string; 
    action: (id:string) => Promise<{success: boolean; message: string}>
}) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition()

    const handleDeleteClick = () => {
        startTransition(async () => {
            const res = await action(id)

            if(!res.success) {
                toast.error(res.message)
            } else {
                setOpen(false)
                toast.success(res.message)
            }
        })
    }

    return (
        // <Button variant='destructive' size='sm' className='ml-1'>Delete</Button>
        <AlertDialog
            open={open}
            onOpenChange={setOpen}
        >
            <AlertDialogTrigger asChild> 
                <Button variant='destructive' size='sm' className='ml-1'>Delete</Button>
            </AlertDialogTrigger>

            {/* Alert Content */}
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutly sure</AlertDialogTitle>
                    <AlertDialogDescription>This action can&apos;t be undone</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {/* The button in the dialog */}
                    <Button
                        variant='destructive'
                        size='sm'
                        disabled={isPending}
                        onClick={handleDeleteClick}
                    >
                        {
                            isPending ? 'Deleting' : 'Delete'
                        }
                    </Button>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    )
}
