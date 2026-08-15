"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { navigation } from "./navigation";

export default function StyleguideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar - Fixed */}
      <aside className="w-64 border-r bg-sidebar p-6 flex flex-col gap-6 fixed top-0 left-0 h-screen overflow-y-auto">
        <div className="flex flex-col gap-1">
          <Link href="/styleguide" className="text-xl font-bold tracking-tight">
            Cymatica
          </Link>
          <span className="text-xs text-muted-foreground">Design System</span>
        </div>

        <nav className="flex flex-col gap-6">
          {navigation.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                {section.title}
              </h3>
              {section.items.length === 0 ? (
                <p className="px-3 py-2 text-sm text-muted-foreground/70">
                  Em breve
                </p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "block px-3 py-2 rounded-md text-sm transition-colors",
                          pathname === item.href
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted",
                        )}
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        <div className="mt-auto">
          <ThemeToggle />
        </div>
      </aside>

      {/* Main content - offset by sidebar width */}
      <main className="flex-1 ml-64 overflow-auto">{children}</main>
    </div>
  );
}
