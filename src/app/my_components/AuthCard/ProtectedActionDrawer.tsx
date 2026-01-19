import { Drawer, DrawerContent, DrawerTrigger, DrawerTitle, DrawerClose } from "@/components/ui/drawer"
import ProtectedAuthWrapper from "./ProtectedAuthWrapper"
import { X } from 'lucide-react'
import { useState } from "react";
import { useAuthContext } from "@/auth/useAuthContext";
import React from "react";

interface ClickableChildProps {
    onClick: (e?: React.MouseEvent) => void;
}

interface ProtectedActionDrawerProps {
  children: React.ReactElement<ClickableChildProps>; 
  title?: string;
  drawerClassName?: string;
}

export const ProtectedActionDrawer = ({ 
    children, 
    title = "Authentication Required",
    drawerClassName = "backdrop-blur-sm min-h-[50vh] w-full p-6 items-center justify-center"
}: ProtectedActionDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuthContext();

    const handleInterceptClick = (e?: React.MouseEvent) => {
        if (isAuthenticated) {
            if (
                React.isValidElement(children) &&
                typeof children.props.onClick === 'function'
            ) {
                children.props.onClick(e);
            }
        } else {
            e?.preventDefault();
            e?.stopPropagation();
            setIsOpen(true);
        }
    }

    const handleAuthSuccess = () => {
        setIsOpen(false);

        setTimeout(() => {
            if (
                React.isValidElement(children) &&
                typeof children.props.onClick === 'function'
            ) {
                children.props.onClick();
            }
        }, 2000);
    }

    const TriggerElement = React.cloneElement(children, {
        onClick: handleInterceptClick
    });

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
        {TriggerElement}
      <DrawerContent className={drawerClassName}>
        <DrawerTitle className="hidden">{title}</DrawerTitle>
        <ProtectedAuthWrapper onAuthSuccess={handleAuthSuccess}>
           <div className="flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="text-xl font-bold font-rajdhani uppercase tracking-widest">Authentication Success</h2>
              <p className="text-sm text-white/60">Your action is being processed...</p>
           </div>
        </ProtectedAuthWrapper>
        <DrawerClose asChild>
            <X className='absolute top-4 right-4 cursor-pointer backdrop-blur-lg card-border hover:text-white hover:bg-primary rounded-full p-1 transition-colors duration-300' />
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}

export default ProtectedActionDrawer
