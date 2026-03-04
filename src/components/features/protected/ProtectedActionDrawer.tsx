import { Drawer, DrawerContent, DrawerTitle, DrawerClose } from "@/components/ui/drawer"
import ProtectedAuthWrapper from "./ProtectedAuthWrapper"
import { X } from 'lucide-react'
import { useState, useCallback, useRef } from "react";
import { useAuthContext } from "@/auth/useAuthContext";
import React from "react";

interface ClickableChildProps {
    onClick: (e?: React.MouseEvent) => void;
}

interface ProtectedActionDrawerProps {
  children: React.ReactNode; 
  trigger?: React.ReactElement<ClickableChildProps>;
  title?: string;
  description?: string;
  drawerClassName?: string;
  mode?: 'action' | 'view';
}

export const ProtectedActionDrawer = ({ 
    children, 
    trigger,
    title = "Authentication Required",
    description = "Please login to continue",
    drawerClassName = "backdrop-blur-sm min-h-[50vh] w-full p-6 items-center justify-center",
    mode = 'action'
}: ProtectedActionDrawerProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated } = useAuthContext();
    const hasExecutedRef = useRef(false);

    const handleInterceptClick = (e?: React.MouseEvent) => {
        hasExecutedRef.current = false;
        if (mode === 'view') {
            setIsOpen(true);
            return;
        }

        if (isAuthenticated) {

            const triggerEl = children as React.ReactElement<ClickableChildProps>;
            if (
                React.isValidElement(triggerEl)
                && typeof triggerEl.props.onClick === 'function'
            ) {
                triggerEl.props.onClick(e);
            }
        } else {
            e?.preventDefault();
            e?.stopPropagation();
            setIsOpen(true);
        }
    }

    const handleAuthSuccess = useCallback(() => {
        if (hasExecutedRef.current) return;

        if (mode === 'action') {
            hasExecutedRef.current = true;
            setIsOpen(false);

            setTimeout(() => {
                const childEl = children as React.ReactElement<ClickableChildProps>;
                if (
                    React.isValidElement(childEl) &&
                    typeof childEl.props.onClick === 'function'
                ) {
                    childEl.props.onClick();
                }
            }, 300);
        }
    }, [mode, children]);

    const ResolvedTrigger = mode === 'action' ? children : trigger;
    const TriggerElement = React.isValidElement(ResolvedTrigger)
        ? React.cloneElement(ResolvedTrigger as React.ReactElement<ClickableChildProps>, {
            onClick: handleInterceptClick
        })
        : null;

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
        {TriggerElement}
      <DrawerContent className={drawerClassName}>
        <DrawerTitle className="hidden">{title}</DrawerTitle>
        <ProtectedAuthWrapper description={description} onAuthSuccess={handleAuthSuccess}>
            {mode === 'view' ? children : (
            <div className="flex flex-col items-center justify-center text-center space-y-4">
                <h2 className="text-xl font-bold font-rajdhani uppercase tracking-widest">Authentication Success</h2>
                <p className="text-sm text-white/60">Your action is being processed...</p>
            </div>
           )}
        </ProtectedAuthWrapper>
        <DrawerClose asChild>
            <X className='absolute top-4 right-4 cursor-pointer backdrop-blur-lg card-border hover:text-white hover:bg-primary rounded-full p-1 transition-colors duration-300' />
        </DrawerClose>
      </DrawerContent>
    </Drawer>
  )
}

export default ProtectedActionDrawer
