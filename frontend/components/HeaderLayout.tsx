import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export default function HeaderLayout() {
  return (
    <header className="px-8 py-4 bg-first mb-12 lg:mb-20">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem className="text-white">
            <Link href={"/"} className="hover:text-third">
              Acortar URL gratis ⊷ acortador de link URLs seguro rápido y simple
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}
