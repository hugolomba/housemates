"use client";

import { auth } from "@/lib/auth";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
} from "@heroui/react";

import { signOut } from "@/lib/actions/auth-actions";
import { ThemeSwitcher } from "./theme-switcher";

type Session = typeof auth.$Infer.Session;

export default function App({ session }: { session: Session | null }) {
  return (
    <Navbar isBordered shouldHideOnScroll maxWidth="xl">
      <NavbarBrand>
        <Link href="/" className="flex items-center gap-2">
          <p className="font-bold text-2xl text-foreground hover:scale-105 transition bg-clip-text">
            HO .alpha
          </p>
        </Link>
      </NavbarBrand>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          {session ? (
            <NavbarWithSession session={session} />
          ) : (
            <div className="flex items-center gap-3">
              <Button as={Link} color="default" href="/auth" variant="solid">
                Sign Up / Login
              </Button>
            </div>
          )}
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}

export function NavbarWithSession({ session }: { session: Session }) {
  return (
    <NavbarContent as="div" className="items-center" justify="end">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name={session.user?.name || "User"}
            size="md"
            src={session.user?.image || ""}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="signed-in-as" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{session.user?.name || ""}</p>
          </DropdownItem>
          <DropdownItem key="my-profile">
            <Link href={`/user/${session.user?.id}`}>My Profile</Link>
          </DropdownItem>
          <DropdownItem key="settings">
            <Link href="/settings">Settings</Link>
          </DropdownItem>
          <DropdownItem key="logout" color="danger" onPress={() => signOut()}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  );
}
