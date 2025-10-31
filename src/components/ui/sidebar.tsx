import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { VariantProps, cva } from "class-variance-authority";
import { PanelLeft } from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SIDEBAR_COOKIE_NAME = "sidebar:state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";
const SIDEBAR_WIDTH_ICON = "3rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContext = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  toggle: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

const useSidebar = () => {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a Sidebar");
  }
  return context;
};

interface SidebarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

const Sidebar = ({ open, onOpenChange, children, className }: SidebarProps) => {
  const isMobile = useIsMobile();

  const handleToggle = () => {
    onOpenChange(!open);
  };

  const context: SidebarContext = {
    state: open ? "expanded" : "collapsed",
    open,
    setOpen: onOpenChange,
    toggle: handleToggle,
  };

  return (
    <SidebarContext.Provider value={context}>
      {children}
    </SidebarContext.Provider>
  );
};

interface SidebarContentProps extends VariantProps<typeof sidebarVariants> {
  children: React.ReactNode;
  className?: string;
}

const sidebarVariants = cva(
  "transition-all duration-300 ease-in-out",
  {
    variants: {
      state: {
        expanded: "w-full",
        collapsed: "w-0",
      },
    },
    defaultVariants: {
      state: "collapsed",
    },
  }
);

const SidebarContent = ({ state, children, className }: SidebarContentProps) => {
  return (
    <div
      className={cn(
        sidebarVariants({ state }),
        className
      )}
    >
      {children}
    </div>
  );
};

interface SidebarTriggerProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarTrigger = ({ children, className }: SidebarTriggerProps) => {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      className={cn(className)}
      onClick={toggle}
    >
      {children}
    </Button>
  );
};

interface SidebarSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

const SidebarSheet = ({ open, onOpenChange, children }: SidebarSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        {children}
      </SheetContent>
    </Sheet>
  );
};

export { 
  Sidebar, 
  SidebarContent, 
  SidebarTrigger, 
  SidebarSheet, 
  useSidebar 
};