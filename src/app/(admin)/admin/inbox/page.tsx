
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { collection, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { format } from 'date-fns';

type Message = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdAt: Date;
    read: boolean;
}

export default function AdminInboxPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, 'contacts'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const messagesData = snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    ...data,
                    createdAt: data.createdAt.toDate(),
                } as Message;
            });
            setMessages(messagesData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching messages: ", error);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const handleRowClick = async (message: Message) => {
        setSelectedMessage(message);
        if (!message.read) {
            const docRef = doc(db, "contacts", message.id);
            await updateDoc(docRef, { read: true });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Inbox</CardTitle>
                <CardDescription>View messages from your website's contact form.</CardDescription>
            </CardHeader>
            <CardContent>
                <Dialog onOpenChange={(open) => !open && setSelectedMessage(null)}>
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
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Loading messages...</TableCell>
                                </TableRow>
                            ) : messages.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">No messages yet.</TableCell>
                                </TableRow>
                            ) : (
                                messages.map(message => (
                                    <DialogTrigger asChild key={message.id}>
                                        <TableRow 
                                            onClick={() => handleRowClick(message)}
                                            className={!message.read ? 'bg-secondary/50 font-bold cursor-pointer' : 'cursor-pointer'}
                                        >
                                            <TableCell className="hidden sm:table-cell">
                                                {!message.read && <Badge variant="default">New</Badge>}
                                            </TableCell>
                                            <TableCell>
                                                <div className="font-medium">{message.name}</div>
                                                <div className="text-xs text-muted-foreground">{message.email}</div>
                                            </TableCell>
                                            <TableCell>{message.subject}</TableCell>
                                            <TableCell className="hidden md:table-cell">
                                                {format(message.createdAt, 'PPp')}
                                            </TableCell>
                                        </TableRow>
                                    </DialogTrigger>
                                ))
                            )}
                        </TableBody>
                    </Table>
                    {selectedMessage && (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{selectedMessage.subject}</DialogTitle>
                                <DialogDescription>
                                    From: {selectedMessage.name} &lt;{selectedMessage.email}&gt;
                                    <br />
                                    Received: {format(selectedMessage.createdAt, 'PPp')}
                                </DialogDescription>
                            </DialogHeader>
                            <div className="prose prose-sm mt-4 max-w-full">
                                <p>{selectedMessage.message}</p>
                            </div>
                        </DialogContent>
                    )}
                </Dialog>
            </CardContent>
        </Card>
    )
}
