import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <CardTitle>Cymatica</CardTitle>
            <Badge variant="secondary">setup ok</Badge>
          </div>
          <CardDescription>
            Next.js + Tailwind v4 + shadcn/ui prontos para começar.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Separator />
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="voce@exemplo.com" />
          </div>
          <Button className="w-full rounded-full">Continuar</Button>
          <Button
            variant="ghost"
            className="w-full"
            render={<Link href="/styleguide" />}
          >
            Ver o design system →
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
