import { Link } from '@tanstack/react-router'

import { ChevronsLeftRight, Minus, Volume2, VolumeX, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import { useAudioStore } from '@/stores/audio-store'
import { useLeaderboardStore } from '@/stores/leaderboard-store'

function Window({ children }: { children: React.ReactNode }) {
  const { isMuted, toggleMute } = useAudioStore()
  const showRankUpBadge = useLeaderboardStore((state) => state.showRankUpBadge)

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
          <div className="text-center font-semibold text-sm">GamiDeck</div>
        </div>
      </div>

      <div className="flex flex-row justify-center items-center gap-2">
        <NavigationMenu className="border rounded-md border-t-0 shadow-sm">
          <NavigationMenuList>
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
                className={cn(
                  navigationMenuTriggerStyle(),
                  'disabled hover:bg-white text-gray-500',
                )}
              >
                Add
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                {/* <Link to={'/challenge'}>Challenge</Link> */}
                <Link to={'/challenge'} className="flex items-center gap-2">
                  Challenge
                  {showRankUpBadge && (
                    <span className="flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                  )}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'disabled hover:bg-white text-gray-500',
                )}
              >
                Stats
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                className={cn(
                  navigationMenuTriggerStyle(),
                  'disabled hover:bg-white text-gray-500',
                )}
              >
                Sync
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <div className="px-4 py-4">{children}</div>

      <div className="flex justify-end p-2">
        <Button
          onClick={toggleMute}
          className="hover:bg-gray-100 rounded-md transition-colors p-2 text-gray-500"
          variant="ghost"
          size="icon"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </Button>
      </div>
    </div>
  )
}

export { Window }
