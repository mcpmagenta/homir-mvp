import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SearchPage() {
  const caregivers = [
    { id: 1, name: "Alice Johnson", experience: "5 years", rating: 4.8 },
    { id: 2, name: "Bob Smith", experience: "3 years", rating: 4.5 },
    { id: 3, name: "Carol Williams", experience: "7 years", rating: 4.9 },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Find a Caregiver</h1>
      <div className="flex mb-6">
        <Input placeholder="Search by location or service" className="mr-2" />
        <Button>Search</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {caregivers.map((caregiver) => (
          <Card key={caregiver.id}>
            <CardHeader>
              <CardTitle>{caregiver.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Experience: {caregiver.experience}</p>
              <p>Rating: {caregiver.rating}/5</p>
              <Button className="mt-4">View Profile</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

