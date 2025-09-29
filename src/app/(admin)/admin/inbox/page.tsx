
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const mockMessages = [
    {
        id: "1",
        name: "Jane Doe",
        email: "jane.doe@example.com",
        subject: "Volunteering Inquiry",
        message: "I'm interested in volunteering for your upcoming tree planting event. Can you provide more details?",
        date: "2024-07-28",
        read: false,
    },
    {
        id: "2",
        name: "John Smith",
        email: "john.smith@example.com",
        subject: "Donation Question",
        message: "I'd like to make a donation in honor of a loved one. How can I do that?",
        date: "2024-07-27",
        read: true,
    },
    {
        id: "3",
        name: "Maria Garcia",
        email: "maria.g@example.com",
        subject: "Partnership Proposal",
        message: "My company is interested in exploring a corporate partnership with your organization. Who should I speak with?",
        date: "2024-07-27",
        read: true,
    },
     {
        id: "4",
        name: "Chen Wei",
        email: "chen.wei@example.com",
        subject: "Question about your projects",
        message: "I was reading about your sustainable farming initiative and had a few questions about the impact.",
        date: "2024-07-26",
        read: true,
    }
]

export default function AdminInboxPage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Inbox</CardTitle>
                <CardDescription>View messages from your website's contact form.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="hidden w-[100px] sm:table-cell">
                            Status
                        </TableHead>
                        <TableHead>From</TableHead>
                        <TableHead>Subject</TableHead>
                        <TableHead className="hidden md:table-cell">
                            Received
                        </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockMessages.map(message => (
                            <TableRow key={message.id} className={!message.read ? 'bg-secondary/50 font-bold' : ''}>
                                <TableCell className="hidden sm:table-cell">
                                    {!message.read && <Badge variant="default">New</Badge>}
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{message.name}</div>
                                    <div className="text-xs text-muted-foreground">{message.email}</div>
                                </TableCell>
                                <TableCell>{message.subject}</TableCell>
                                <TableCell className="hidden md:table-cell">{message.date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
