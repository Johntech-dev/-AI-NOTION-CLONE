'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs"

const Header = () => {
    const {user} = useUser();

  return (
    <div className="flex items-center justify-between p-6">
       {user && (
         <h1 className="text-2xl">
        {user?.firstName}
         {`'s`} space
         </h1>
       )
       }

       {/* Breadcrumbs */}

       <div>
        <SignedOut>
        <div className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 cursor-pointer transition-colors">
        <SignInButton />
    </div>
        </SignedOut>
        
        <SignedIn>
          <UserButton />
        </SignedIn>
      
       </div>

       
    </div>
  )
}

export default Header
