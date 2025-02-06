import Image from "next/image"
import { Check } from "lucide-react"

export function SafetySection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1fr,1fr] gap-12 lg:gap-24 items-center max-w-[1200px] mx-auto">
          {/* Image and testimonial side */}
          <div className="relative w-full max-w-[550px] aspect-square rounded-2xl overflow-hidden bg-[#F0F4F8] mx-auto md:mx-0 order-2 md:order-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/FamilyMedicine02%20copy.jpg-ocK8Su7v6slRHSixqp8yoG04LSOZNL.jpeg"
              alt="Child with mother at doctor's appointment, holding teddy bear"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 550px"
              priority
            />
            <div className="absolute bottom-8 left-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-lg">
                <p className="text-base text-[#1E2330] mb-3">
                  "Homir connected me with caregivers that I can trust, and I had a variety of options to choose from.
                  It's reassuring to know they prioritize safety for our children."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#407A59] flex items-center justify-center text-white font-medium">
                    RP
                  </div>
                  <div>
                    <p className="font-medium text-[#1E2330]">Rachel P.</p>
                    <p className="text-sm text-[#5E5E5E]">Parent using Homir for Child Care</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content side */}
          <div className="max-w-xl order-1 md:order-2">
            <h2 className="text-[32px] md:text-[40px] leading-[1.2] font-bold text-black mb-12">
              Find peace of mind with safety resources
            </h2>

            <p className="text-[#5E5E5E] text-base leading-relaxed mb-8">
              Our Safety Pledge means we're dedicated to you and your safety.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center">
                    <Check className="h-6 w-6 text-[#407A59]" />
                  </div>
                </div>
                <div>
                  <p className="text-base text-[#5E5E5E] leading-relaxed">
                    All caregivers you can engage with on Homir are background checked
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center">
                    <Check className="h-6 w-6 text-[#407A59]" />
                  </div>
                </div>
                <div>
                  <p className="text-base text-[#5E5E5E] leading-relaxed">
                    Supplemental Background Check reports available for purchase
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center">
                    <Check className="h-6 w-6 text-[#407A59]" />
                  </div>
                </div>
                <div>
                  <p className="text-base text-[#5E5E5E] leading-relaxed">
                    Dedicated safety team reviews all job posts and caregiver profiles
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center">
                    <Check className="h-6 w-6 text-[#407A59]" />
                  </div>
                </div>
                <div>
                  <p className="text-base text-[#5E5E5E] leading-relaxed">
                    Learn more with dozens of articles and resources in our{" "}
                    <a href="/safety" className="sign-up-link hover:text-black">
                      trust and safety center
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

