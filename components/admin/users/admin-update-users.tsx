import { getUserById } from '@/lib/actions/user.actions'
import { notFound } from 'next/navigation';
import React from 'react'
import UpdateUserForm from './update-user-form';

export default async function AdminUserUpdate({userId}: {userId: string}) {

    const user = await getUserById(userId);

    if(!user) return notFound();

    // console.log(user)

    return (
        <div className='space-y-8 max-w-lg mx-auto'>
            <h2 className='h2-bold'>Update User</h2>
            <UpdateUserForm user={user}/>
        </div>
    )
}
