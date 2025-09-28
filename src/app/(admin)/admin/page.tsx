
import { HandCoins, Briefcase, Newspaper, Users } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const overviewCards = [
    { title: "Total Donations", value: "$125,430", icon: HandCoins },
    { title: "Active Projects", value: "12", icon: Briefcase },
    { title: "News Articles", value: "34", icon: Newspaper },
    { title: "Volunteers", value: "150", icon: Users },
]

export default function AdminDashboardPage() {
  return (
    <>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
            {overviewCards.map(card => (
                <Card key={card.title}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            {card.title}
                        </CardTitle>
                        <card.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{card.value}</div>
                    </CardContent>
                </Card>
            ))}
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
            <CardHeader>
                <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
                <p>Donation records will be displayed here.</p>
            </CardContent>
            </Card>
            <Card>
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <p>A feed of recent admin actions will be here.</p>
            </CardContent>
            </Card>
      </div>
    </>
  );
}
