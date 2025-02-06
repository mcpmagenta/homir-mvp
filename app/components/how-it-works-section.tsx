import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HowItWorksSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1fr,1fr] gap-12 lg:gap-24 items-center max-w-[1200px] mx-auto">
          {/* Image - on the left for desktop, below for mobile */}
          <div className="relative w-full max-w-[550px] aspect-square rounded-2xl overflow-hidden bg-[#F0F4F8] mx-auto md:mx-0 order-last md:order-first">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/home-care-s1-BAfTl6dked6IE3VDptrnwQqyTbkeRC.png"
              alt="Professional caregiver with a welcoming smile arriving at a client's home"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 550px"
              priority
            />
          </div>

          {/* Content - on the right for desktop, above for mobile */}
          <div className="max-w-xl order-first md:order-last">
            <h2 className="text-[32px] md:text-[40px] leading-[1.2] font-bold text-black mb-12">
              Get care when and where you need it
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center">
                    <span className="text-[#407A59] text-xl font-medium">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">Tell us what you need</h3>
                  <p className="text-[#5E5E5E] text-base leading-relaxed">
                    Share your care needs, schedule a time, and get matched with caregivers who specialize in what
                    you're looking for.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center">
                    <span className="text-[#407A59] text-xl font-medium">2</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">Book instantly or connect first</h3>
                  <p className="text-[#5E5E5E] text-base leading-relaxed">
                    Choose to book right away or start conversations with caregivers, ask questions, and find the best
                    fit.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center">
                    <span className="text-[#407A59] text-xl font-medium">3</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">Access reliable support anytime</h3>
                  <p className="text-[#5E5E5E] text-base leading-relaxed">
                    Need assistance? Our support team is available 24/7 to help every step of the way.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button className="h-[52px] px-8 text-base bg-black hover:bg-black/90 text-white rounded-xl font-medium w-auto">
                Log in to your account
              </Button>
              <p className="text-left">
                <a href="/signup" className="sign-up-link hover:text-black">
                  Don't have a Homir account? Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

