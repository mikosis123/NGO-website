
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminDonationsPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Donations</CardTitle>
                <CardDescription>View donation records.</CardDescription>
            </CardHeader>
            <CardContent>
                <p>A table of all donations will be displayed here.</p>
            </CardContent>
        </Card>
    )
}
