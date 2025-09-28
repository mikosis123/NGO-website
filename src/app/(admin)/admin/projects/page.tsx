
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProjectForm } from "./project-form";


export default function AdminProjectsPage() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Manage your organization's projects.</CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button size="sm" className="gap-1">
                            <PlusCircle className="h-4 w-4" />
                            Add Project
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle>Add a New Project</DialogTitle>
                        <DialogDescription>
                            Fill out the form below to create a new project.
                        </DialogDescription>
                        </DialogHeader>
                        <ProjectForm />
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <p>A table of projects will be displayed here, with options to add, edit, and delete.</p>
            </CardContent>
        </Card>
    )
}
