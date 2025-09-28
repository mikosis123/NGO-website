
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function AdminEventsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Events</CardTitle>
                    <CardDescription>Manage your organization's events.</CardDescription>
                </div>
                <Button size="sm" className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add Event
                </Button>
            </CardHeader>
            <CardContent>
                <p>A list or calendar of events will be displayed here, with management options.</p>
            </CardContent>
        </Card>
    )
}
