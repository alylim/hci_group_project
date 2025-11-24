import { Link } from '@tanstack/react-router'

import { X, Minus, ChevronsLeftRight } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

function Window({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full border rounded-md">
      <div className="bg-gray-100 p-1 border-bottom">
        <div className="absolute flex flex-row gap-2 p-1">
          <div className="group h-3 w-3 rounded-full bg-[#FF5F57] flex items-center justify-center">
            <X className="hidden group-hover:block h-2.5 w-2.5" />
          </div>
          <div className="group h-3 w-3 rounded-full bg-[#FEBC2E] flex items-center justify-center">
            <Minus className="hidden group-hover:block h-2.5 w-2.5" />
          </div>
          <div className="group h-3 w-3 rounded-full bg-[#28C840] flex items-center justify-center">
            <ChevronsLeftRight className="hidden group-hover:block h-2.5 w-2.5 rotate-45" />
          </div>
        </div>
        <div className="flex flex-row justify-center">
          <div className="text-center font-semibold text-sm">Anki Improved</div>
        </div>
      </div>

      <div className="flex flex-row justify-center">
        <NavigationMenu className="border rounded-md border-t-0 shadow-sm">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={'/'}>Home</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={'/'}>Decks</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={'/'}>Add</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={'/'}>Browse</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={'/'}>Stats</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link to={'/'}>Sync</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="px-4 py-4">{children}</div>
    </div>
  )
}

export { Window }
