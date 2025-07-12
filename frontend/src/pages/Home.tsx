// HomePage.tsx - Skill Swap UI

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from "@/components/ui/pagination";

const users = [
    {
        name: "Marc Demo",
        skillsOffered: ["JavaScript", "Python"],
        skillsWanted: ["Photoshop", "Graphic Designer"],
        rating: 3.9,
    },
    {
        name: "Michell",
        skillsOffered: ["JavaScript", "Python"],
        skillsWanted: ["Photoshop", "Graphic Designer"],
        rating: 2.5,
    },
    {
        name: "Joe Wills",
        skillsOffered: ["JavaScript", "Python"],
        skillsWanted: ["Photoshop", "Graphic Designer"],
        rating: 4.0,
    },
];

const Home = () => {
    return (
        <main className="min-h-screen dark:bg-black bg-white dark:text-white text-black p-8">


            <div className="flex gap-4 mb-6">
                <Select>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                    </SelectContent>
                </Select>
                <Input placeholder="Search" className="w-full max-w-md" />
                <Button>Search</Button>
            </div>

            <div className="space-y-4">
                {users.map((user, index) => (
                    <Card key={index} className="dark:bg-zinc-900 dark:text-white">
                        <CardContent className="flex items-center gap-6 p-6">
                            <Avatar className="h-16 w-16">
                                <AvatarFallback>{user.name[0]}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <h2 className="text-lg font-semibold">{user.name}</h2>
                                <div className="mt-2 text-sm">
                                    <span className="text-green-400 font-medium">Skills Offered:</span>
                                    {user.skillsOffered.map((skill, i) => (
                                        <Badge key={i} variant="secondary" className="ml-2 dark:text-black dark:bg-white bg-gray-400">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                                <div className="mt-2 text-sm">
                                    <span className="text-blue-400 font-medium">Skills Wanted:</span>
                                    {user.skillsWanted.map((skill, i) => (
                                        <Badge key={i} variant="outline" className="ml-2">
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                            <div className="text-center">
                                <Button variant="default" className="mb-2">Request</Button>
                                <p className="text-sm">Rating: {user.rating}/5</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Pagination className="mt-6">
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    {[1, 2, 3, 4, 5, 6, 7].map((page) => (
                        <PaginationItem key={page}>
                            <Button variant={page === 1 ? "default" : "ghost"}>{page}</Button>
                        </PaginationItem>
                    ))}
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </main>
    );
}


export default Home;