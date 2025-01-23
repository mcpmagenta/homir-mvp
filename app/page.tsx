import { ServiceCategory } from "./components/service-category"
import { LocationInput } from "./components/location-input"
import { Map } from "./components/map"
import { Button } from "@/components/ui/button"
import { Calendar, Clock } from "lucide-react"

export default function Home() {
  // Dakota County, Minneapolis coordinates
  const defaultLocation = { lat: 44.7677, lng: -93.2405 }

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <div className="flex-1 p-8">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold mb-8">Care anywhere with Homir</h1>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <ServiceCategory type="HOME_CARE" label="Home Care" />
            <ServiceCategory type="SENIOR_CARE" label="Senior Care" />
            <ServiceCategory type="CHILD_CARE" label="Child Care" />
          </div>

          <div className="space-y-4">
            <LocationInput defaultValue="4217 Juniper Pt, St Paul, MN" />

            <div className="flex space-x-4">
              <Button variant="outline" className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                Today
              </Button>
              <Button variant="outline" className="flex items-center">
                <Clock className="mr-2 h-4 w-4" />
                Now
              </Button>
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90">See prices</Button>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <Map center={defaultLocation} />
      </div>
    </div>
  )
}

