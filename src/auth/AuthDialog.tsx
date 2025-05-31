import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AuthInputs } from './authInputs'
import { ArrowUpRight } from 'lucide-react'



const AuthDialog = () => {
  return (
    <Dialog >
            <DialogTrigger asChild>
                <div className='cursor-pointer w-full h-full flex items-center justify-center'>
                    <ArrowUpRight/>Get Auth
                </div>
            </DialogTrigger>
            <DialogContent>
                    <DialogHeader>
                        <DialogTitle></DialogTitle>
                        <AuthInputs />
                        {/* <DialogDescription>
                            
                        </DialogDescription> */}
                    </DialogHeader>
            </DialogContent>
    </Dialog>

  )
}

export default AuthDialog
