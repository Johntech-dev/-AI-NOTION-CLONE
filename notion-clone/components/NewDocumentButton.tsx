'use client';

import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { useState } from 'react';
import { createNewDocument } from '@/actions/actions';

const NewDocumentButton = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCreateNewDocument = async () => {
    setIsLoading(true);
    try {
      const { docId } = await createNewDocument(); 
      router.push(`/doc/${docId}`); 
    } catch (error) {
      console.error('Error creating document:', error);
      alert('Failed to create document. Please try again.');
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      <Button onClick={handleCreateNewDocument} disabled={isLoading}>
        {isLoading ? 'Creating...' : 'New Document'}
      </Button>
    </div>
  );
};

export default NewDocumentButton;