
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Logo } from "@/components/logo"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary/50">
        <Card className="mx-auto max-w-sm">
        <CardHeader className="text-center">
            <Logo className="mb-4 justify-center" />
            <CardTitle className="text-2xl font-headline">Admin Login</CardTitle>
            <CardDescription>
            Enter your credentials to access the dashboard
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                    Forgot your password?
                </Link>
                </div>
                <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                Login
            </Button>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
