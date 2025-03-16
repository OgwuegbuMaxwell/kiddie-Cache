
import { auth } from '@/auth';
import UserButtonClient from './user-button-client';


export default async function UserButtonContainer() {
  const session = await auth(); // Fetch session 

  return <UserButtonClient session={session} />;
}