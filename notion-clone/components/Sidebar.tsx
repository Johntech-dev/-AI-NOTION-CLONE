'use client'; // Mark this component as a client component

import React, { useEffect, useState } from 'react';
import NewDocumentButton from './NewDocumentButton';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useUser } from '@clerk/nextjs';
import { collectionGroup, query, where } from 'firebase/firestore';
import { db } from '@/firebase';
import SidebarOption from './SidebarOption';

interface RoomDocument {
  createdAt: string;
  role: 'owner' | 'editor';
  roomId: string;
  userId: string;
}

const Sidebar = () => {
  const { user } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    user
      ? query(
          collectionGroup(db, 'rooms'),
          where('userId', '==', user.emailAddresses[0]?.emailAddress || '')
        )
      : null
  );

  useEffect(() => {
    if (!data) return;

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>(
      (acc, curr) => {
        const roomData = curr.data() as RoomDocument;
        if (roomData.role === 'owner') {
          acc.owner.push({
            id: curr.id,
            ...roomData,
          });
        } else {
          acc.editor.push({
            id: curr.id,
            ...roomData,
          });
        }
        return acc;
      },
      { owner: [], editor: [] }
    );

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = () => (
    <>
      <NewDocumentButton />
      <div className='flex flex-col space-y-4 py-4 md:max-w-36'>
        {/* My Documents */}
        {groupedData.owner.length === 0 ? (
          <h2 className='text-sm font-semibold text-gray-500'>No Documents Found</h2>
        ) : (
          <>
            <h2 className='text-sm font-semibold text-gray-500'>My Documents</h2>
            {groupedData.owner.map((doc) => (
              <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
            ))}
          </>
        )}
      </div>

      {/* Shared With Me */}
      {groupedData.editor.length > 0 && (
        <div className='flex flex-col space-y-4 py-4 md:max-w-36'>
          <h2 className='text-sm font-semibold text-gray-500'>Shared With Me</h2>
          {groupedData.editor.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`} />
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className='bg-gray-200 p-2 md:p-5'>
      <div className='md:hidden'>
        <Sheet>
          <SheetTrigger>
            <MenuIcon className='rounded-lg p-2 hover:opacity-30' size={40} />
          </SheetTrigger>
          <SheetContent side='left'>
            <SheetHeader>
              <SheetTitle>MENU</SheetTitle>
              <div>{menuOptions()}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
      <div className='hidden md:inline'>{menuOptions()}</div>
    </div>
  );
};

export default Sidebar;