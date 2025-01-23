import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CaregiverProfile({ params }: { params: { id: string } }) {
  // In a real application, you would fetch this data based on the ID
  const caregiver = {
    id: params.id,
    name: "Alice Johnson",
    experience: "5 years",
    rating: 4.8,
    bio: "Compassionate caregiver with experience in elderly care and special needs.",
    services: ["Elderly Care", "Medication Management", "Meal Preparation"],
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>{caregiver.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            <strong>Experience:</strong> {caregiver.experience}
          </p>
          <p className="mb-4">
            <strong>Rating:</strong> {caregiver.rating}/5
          </p>
          <p className="mb-4">{caregiver.bio}</p>
          <h3 className="font-bold mb-2">Services Offered:</h3>
          <ul className="list-disc list-inside mb-6">
            {caregiver.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          <Button>Request Care</Button>
        </CardContent>
      </Card>
    </div>
  )
}

