
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export default function AdminResourcesPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Resources & Reports</CardTitle>
                    <CardDescription>Upload and manage documents.</CardDescription>
                </div>
                <Button size="sm" className="gap-1">
                    <Upload className="h-4 w-4" />
                    Upload File
                </Button>
            </CardHeader>
            <CardContent>
                <p>A table of uploaded documents will be displayed here.</p>
            </CardContent>
        </Card>
    )
}
