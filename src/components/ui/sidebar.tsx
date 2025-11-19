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
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Sidebar = ({ children, open: controlledOpen, onOpenChange }: SidebarProps) => {
  const [open, setOpen] = React.useState(() => {
    const storedValue = localStorage.getItem(SIDEBAR_COOKIE_NAME);
    return storedValue ? JSON.parse(storedValue) : true;
  });

  const isMobile = useIsMobile();

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
    onOpenChange?.(open);
    localStorage.setItem(SIDEBAR_COOKIE_NAME, JSON.stringify(open));
  };

  const toggle = () => {
    handleOpenChange(!open);
  };

  const context: SidebarContext = {
    state: open ? "expanded" : "collapsed",
    open,
    setOpen: handleOpenChange,
    toggle,
  };

  return (
    <SidebarContext.Provider value={context}>
      {children}
    </SidebarContext.Provider>
  );
};

interface SidebarTriggerProps {
  children: React.ReactNode;
}

const SidebarTrigger = ({ children }: SidebarTriggerProps) => {
  const { toggle } = useSidebar();

  return (
    <Button
      variant="ghost"
      onClick={toggle}
      aria-label="Toggle sidebar"
      className="w-9 h-9 p-0"
    >
      <PanelLeft size={20} />
      {children}
    </Button>
  );
};

interface SidebarContentProps {
  children: React.ReactNode;
}

const SidebarContent = ({ children }: SidebarContentProps) => {
  const { open, state } = useSidebar();
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={open}>
        <SheetContent side="left">
          {children}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-10 h-screen w-full bg-background",
        open && "block",
        !open && "hidden"
      )}
    >
      {children}
    </div>
  );
};

interface SidebarMainProps {
  children: React.ReactNode;
}

const SidebarMain = ({ children }: SidebarMainProps) => {
  const { open } = useSidebar();

  return (
    <div
      className={cn(
        "relative z-20 flex h-screen flex-col justify-between",
        open ? SIDEBAR_WIDTH : SIDEBAR_WIDTH_ICON
      )}
    >
      {children}
    </div>
  );
};

export { Sidebar, SidebarTrigger, SidebarContent, SidebarMain, useSidebar };