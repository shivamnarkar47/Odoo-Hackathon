import React from 'react'
import { Button } from "@/components/ui/button";

const Home = () => {
    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Home</h1>
            <Button onClick={() => alert("Hi!")}>Click me</Button>
        </div>
    )
}

export default Home