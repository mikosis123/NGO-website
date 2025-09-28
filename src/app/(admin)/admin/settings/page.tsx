
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AdminSettingsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Manage general site settings.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
                <div className="grid gap-2">
                    <Label htmlFor="mission">Mission Statement</Label>
                    <Textarea id="mission" placeholder="Your organization's mission..." />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="banner">Homepage Banner Image URL</Label>
                    <Input id="banner" placeholder="https://example.com/image.jpg" />
                </div>
                 <div className="grid gap-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input id="contact-email" type="email" placeholder="contact@example.com" />
                </div>
                <Button>Save Settings</Button>
            </CardContent>
        </Card>
    )
}
