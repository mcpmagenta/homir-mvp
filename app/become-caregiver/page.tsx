"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, Baby, Calendar, ArrowRight, Shield, Briefcase } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

export default function BecomeCaregiver() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[#407A59]/5 py-16 md:py-24">
        <div className="container px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Find meaningful care jobs that fit your schedule
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl">
                  Join Homir to make a difference in people's lives while earning on your terms. Whether you're an
                  experienced caregiver or just starting, we have opportunities for you.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" className="bg-[#407A59] hover:bg-[#407A59]/90">
                  Get started today
                </Button>
              </div>
            </div>
            <div className="relative block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Home-Heatlh-Aide.jpg-B9omoklRZtJ63dsIzhWtd9PDLECjvc.jpeg"
                alt="Professional caregiver helping senior man in wheelchair"
                width={600}
                height={400}
                className="rounded-lg object-cover w-full h-full"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-4">Make a Difference, One Family at a Time</h2>
          <p className="text-center text-gray-500 mb-8 max-w-3xl mx-auto">
            With Homir, you choose how you care. Whether supporting seniors or nurturing children, you'll find flexible,
            rewarding opportunities that fit your skills and schedule.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="relative overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-[#407A59]/10 rounded-full">
                  <Heart className="w-8 h-8 text-[#407A59]" />
                </div>
                <h3 className="font-semibold text-xl">Senior Care</h3>
                <p className="text-sm text-gray-500">
                  Help older adults maintain their independent and quality of life by providing companionship, mobility
                  support, and daily assistance in the comfort of their homes.
                </p>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden transition-all hover:shadow-lg">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-[#407A59]/10 rounded-full">
                  <Baby className="w-8 h-8 text-[#407A59]" />
                </div>
                <h3 className="font-semibold text-xl">Child Care</h3>
                <p className="text-sm text-gray-500">
                  Create a safe, nurturing space for children to learn and grow. From babysitting to specialized care,
                  you'll provide families with the support they need.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold text-center mb-4">Get started with Homir</h2>
          <p className="text-center text-gray-500 mb-12">
            Join our community of caregivers in just a few simple steps:
          </p>
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="relative h-[300px] md:h-full md:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#407A59]/10 to-transparent rounded-3xl" />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3vijesh-datt-aWYbXKub0t0-unsplash%20copy.jpg-rgpeKZcxT10hMBLYoqt0fLeDFUBMea.jpeg"
                alt="Close-up of a professional medical stethoscope representing healthcare expertise"
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="space-y-8 md:order-1">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#407A59]/20 flex items-center justify-center text-[#407A59] font-semibold text-xl">
                    1
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Create Your Profile</h3>
                  <p className="text-gray-500">
                    Tell us about your skills, experience, and the types of caregiving jobs you're looking for.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#407A59]/20 flex items-center justify-center text-[#407A59] font-semibold text-xl">
                    2
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Complete Your Background Check</h3>
                  <p className="text-gray-500">Ensure safety and trust by submitting your secure background check.</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#407A59]/20 flex items-center justify-center text-[#407A59] font-semibold text-xl">
                    3
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Highlight Your Expertise</h3>
                  <p className="text-gray-500">
                    Showcase your availability, skills, and photo to attract families in need.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-[#407A59]/20 flex items-center justify-center text-[#407A59] font-semibold text-xl">
                    4
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-2">Start Earning</h3>
                  <p className="text-gray-500">
                    Browse jobs that fit your schedule and start making a difference today.
                  </p>
                </div>
              </div>

              <Button size="lg" className="w-full md:w-auto bg-[#407A59] hover:bg-[#407A59]/90">
                Sign up
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-4">Explore Opportunities That Fit Your Skills</h2>
          <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
            Whether you're seeking flexible part-time work or starting a new caregiving career, Homir connects you with
            local opportunities tailored to your expertise.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <Calendar className="w-10 h-10 text-[#407A59] mb-4" />
                <h3 className="font-semibold text-xl mb-2">Earn Your Way</h3>
                <p className="text-sm text-gray-500">
                  Access thousands of full-time, part-time, or gig-based jobs in your area.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <ArrowRight className="w-10 h-10 text-[#407A59] mb-4" />
                <h3 className="font-semibold text-xl mb-2">Boost Your Earnings</h3>
                <p className="text-sm text-gray-500">
                  Increase your potential by setting flexible schedules and taking high-demand jobs.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Briefcase className="w-10 h-10 text-[#407A59] mb-4" />
                <h3 className="font-semibold text-xl mb-2">Build a Career</h3>
                <p className="text-sm text-gray-500">
                  Turn your passion for caregiving into a fulfilling, sustainable career with Homir.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-4">Your Safety and Peace of Mind Come First</h2>
          <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
            Homir is dedicated to creating a secure platform for both caregivers and families. From verified profiles to
            24/7 support, we ensure a trustworthy environment so you can focus on what you do best—caring for others.
          </p>
          <div className="grid md:grid-cols-2 gap-8 items-center max-w-4xl mx-auto">
            <div className="order-2 md:order-1">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/aditya-romansa-5zp0jym2w9M-unsplash%20copy.jpg-itC96x7sRDnyqm7vuVxSA5UA8zeBHO.jpeg"
                alt="Close-up of adult hand holding baby's hand, representing care and trust"
                width={400}
                height={300}
                className="rounded-lg object-cover w-full"
              />
            </div>
            <div className="order-1 md:order-2">
              <div className="space-y-4">
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-[#407A59] mt-1" />
                  <p className="text-sm text-gray-500">
                    Verified Profiles: Work with families who pass our verification process.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-[#407A59] mt-1" />
                  <p className="text-sm text-gray-500">
                    Insurance Protection: Enjoy peace of mind with coverage options available for certain jobs.
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <Shield className="w-5 h-5 text-[#407A59] mt-1" />
                  <p className="text-sm text-gray-500">
                    Real-Time Support: 24/7 support team ready to assist you with any concerns.
                  </p>
                </div>
              </div>
              <Button className="mt-6 bg-[#407A59] hover:bg-[#407A59]/90">Learn More About Our Safety Measures</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Helpful Resources</h2>
          <div className="hidden md:grid grid-cols-4 gap-6 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home_healthcare%20copy.jpg-uFA0xWmsbPY76BshcvH5kBv4SkkVFe.jpeg"
                  alt="Healthcare worker providing home care services"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 object-cover w-full aspect-[3/2]"
                />
                <h3 className="font-semibold text-lg mb-2">Caregiving with Homir</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Your guide to starting as a caregiver on Homir—from background checks to earning tips.
                </p>
                <Link href="#" className="text-[#407A59] text-sm font-medium hover:underline">
                  Read article →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KCHH-Trusting-Nurse-and-Child.jpg-0dtdrZjKH4rGDNuXNHi4aANO9dx8Mr.jpeg"
                  alt="Healthcare professional interacting with a child"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 object-cover w-full aspect-[3/2]"
                />
                <h3 className="font-semibold text-lg mb-2">Exploring Child Care</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Discover opportunities and tips for providing care to families with young children.
                </p>
                <Link href="#" className="text-[#407A59] text-sm font-medium hover:underline">
                  Read article →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Holding%20hands%20and%20comforting%20copy.jpg-PzfgcnhO7Prbktmfb8J9pqTi5rCM5q.jpeg"
                  alt="Caring hands holding each other in support"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 object-cover w-full aspect-[3/2]"
                />
                <h3 className="font-semibold text-lg mb-2">How to Find Care on Homir</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Learn how our platform connects caregivers and care recipients with ease.
                </p>
                <Link href="#" className="text-[#407A59] text-sm font-medium hover:underline">
                  Read article →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bench-accounting-C3V88BOoRoM-unsplash%20copy%202.jpg-MZk7XDOTYGpjSJhdzVBmT3ct4mp4bU.jpeg"
                  alt="Person working on laptop representing career development"
                  width={300}
                  height={200}
                  className="rounded-lg mb-4 object-cover w-full aspect-[3/2]"
                />
                <h3 className="font-semibold text-lg mb-2">Building Your Caregiving Career</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Grow your skills and expertise through Homir's helpful tips and tools.
                </p>
                <Link href="#" className="text-[#407A59] text-sm font-medium hover:underline">
                  Read article →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Mobile Carousel */}
          <div className="md:hidden relative">
            <Carousel className="w-full" opts={{ loop: true }}>
              <CarouselContent>
                <CarouselItem>
                  <Card>
                    <CardContent className="p-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home_healthcare%20copy.jpg-uFA0xWmsbPY76BshcvH5kBv4SkkVFe.jpeg"
                        alt="Healthcare worker providing home care services"
                        width={300}
                        height={200}
                        className="rounded-lg mb-4 object-cover w-full aspect-[3/2]"
                      />
                      <h3 className="font-semibold text-lg mb-2">Caregiving with Homir</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Your guide to starting as a caregiver on Homir—from background checks to earning tips.
                      </p>
                      <Link href="#" className="text-[#407A59] text-sm font-medium hover:underline">
                        Read article →
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="p-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/KCHH-Trusting-Nurse-and-Child.jpg-0dtdrZjKH4rGDNuXNHi4aANO9dx8Mr.jpeg"
                        alt="Healthcare professional interacting with a child"
                        width={300}
                        height={200}
                        className="rounded-lg mb-4 object-cover w-full aspect-[3/2]"
                      />
                      <h3 className="font-semibold text-lg mb-2">Exploring Child Care</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Discover opportunities and tips for providing care to families with young children.
                      </p>
                      <Link href="#" className="text-[#407A59] text-sm font-medium hover:underline">
                        Read article →
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="p-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Holding%20hands%20and%20comforting%20copy.jpg-PzfgcnhO7Prbktmfb8J9pqTi5rCM5q.jpeg"
                        alt="Caring hands holding each other in support"
                        width={300}
                        height={200}
                        className="rounded-lg mb-4 object-cover w-full aspect-[3/2]"
                      />
                      <h3 className="font-semibold text-lg mb-2">How to Find Care on Homir</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Learn how our platform connects caregivers and care recipients with ease.
                      </p>
                      <Link href="#" className="text-[#407A59] text-sm font-medium hover:underline">
                        Read article →
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
                <CarouselItem>
                  <Card>
                    <CardContent className="p-6">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bench-accounting-C3V88BOoRoM-unsplash%20copy%202.jpg-MZk7XDOTYGpjSJhdzVBmT3ct4mp4bU.jpeg"
                        alt="Person working on laptop representing career development"
                        width={300}
                        height={200}
                        className="rounded-lg mb-4 object-cover w-full aspect-[3/2]"
                      />
                      <h3 className="font-semibold text-lg mb-2">Building Your Caregiving Career</h3>
                      <p className="text-sm text-gray-500 mb-4">
                        Grow your skills and expertise through Homir's helpful tips and tools.
                      </p>
                      <Link href="#" className="text-[#407A59] text-sm font-medium hover:underline">
                        Read article →
                      </Link>
                    </CardContent>
                  </Card>
                </CarouselItem>
              </CarouselContent>
              <div className="flex items-center justify-center gap-2 mt-4">
                <CarouselPrevious className="static translate-y-0 translate-x-0" />
                <CarouselNext className="static translate-y-0 translate-x-0" />
              </div>
            </Carousel>
          </div>
          <div className="text-center mt-8">
            <Button size="lg" className="bg-[#407A59] hover:bg-[#407A59]/90">
              View all resources
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container px-4 md:px-6">
          <h2 className="text-2xl font-bold text-center mb-8">Frequently asked questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="hover:no-underline text-left">
                  What types of jobs are available on Homir?
                </AccordionTrigger>
                <AccordionContent>
                  Homir offers a variety of caregiving jobs, including home care, senior care, and child care. Whether
                  you're looking for part-time, full-time, or one-time gigs, there's a wide range of opportunities to
                  fit your skills and preferences.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="hover:no-underline text-left">
                  Do I need caregiving experience?
                </AccordionTrigger>
                <AccordionContent>
                  No caregiving experience? No problem! Homir welcomes caregivers at all levels. For those new to
                  caregiving, the platform offers resources and support to help you get started. Experienced caregivers
                  can highlight their skills to access specialized opportunities.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="hover:no-underline text-left">How does payment work?</AccordionTrigger>
                <AccordionContent>
                  Payments are handled securely through the Homir platform. You'll know your earnings upfront before
                  accepting a job, and there are flexible withdrawal options to transfer funds to your account. Homir
                  ensures you get paid on time, every time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="hover:no-underline text-left">
                  How do I find jobs in my area?
                </AccordionTrigger>
                <AccordionContent>
                  Homir makes it easy to find jobs near you. Use location filters to browse opportunities in your area
                  and set up job alerts to get notified about new postings that match your preferences.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="hover:no-underline text-left">
                  What safety measures does Homir offer for caregivers?
                </AccordionTrigger>
                <AccordionContent>
                  Your safety is Homir's top priority. All families are verified, and in-app messaging keeps your
                  personal information private. Homir also offers 24/7 support, background checks, and optional
                  liability coverage to ensure a safe experience for caregivers.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-12 md:py-16">
        <div className="container px-4 md:px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-gray-500 mb-6 max-w-2xl mx-auto">
            Take control of your schedule and your career. Join thousands of caregivers who trust Homir to connect them
            with meaningful jobs.
          </p>
          <Button size="lg" className="bg-[#407A59] hover:bg-[#407A59]/90">
            Sign Up and Start Earning
          </Button>
        </div>
      </section>
    </div>
  )
}

