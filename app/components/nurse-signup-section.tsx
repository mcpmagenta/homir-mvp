import { Button } from "@/components/ui/button"
import Image from "next/image"

export function NurseSignupSection() {
  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[1fr,1fr] gap-12 lg:gap-24 items-center max-w-[1200px] mx-auto">
          {/* Content on the left */}
          <div className="max-w-xl">
            <h2 className="text-[32px] md:text-[40px] leading-[1.2] font-bold text-black mb-12">
              Provide care when you want, make what you need
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-none">
                  <div className="w-12 h-12 rounded-full bg-[#E8F0EB] flex items-center justify-center">
                    <span className="text-[#407A59] text-xl font-medium">1</span>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-black mb-2">Set your own schedule</h3>
                  <p className="text-[#5E5E5E] text-base leading-relaxed">
                    Work when it works for you. Choose your hours and availability to maintain the perfect work-life
                    balance.
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
                  <h3 className="text-xl font-semibold text-black mb-2">Competitive pay</h3>
                  <p className="text-[#5E5E5E] text-base leading-relaxed">
                    Earn what you deserve with transparent pricing and keep 100% of your tips. Weekly payments directly
                    to your account.
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
                  <h3 className="text-xl font-semibold text-black mb-2">Smart tools for care management</h3>
                  <p className="text-[#5E5E5E] text-base leading-relaxed">
                    Access our digital platform to manage appointments, track care plans, and communicate with clients
                    seamlessly.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button className="h-[52px] px-8 text-base bg-black hover:bg-black/90 text-white rounded-xl font-medium">
                Get started
              </Button>
              <p>
                <a href="/signin" className="sign-up-link hover:text-black">
                  Already have an account? Sign in
                </a>
              </p>
            </div>
          </div>

          {/* Image container on the right */}
          <div className="relative w-full max-w-[550px] aspect-square mx-auto md:mx-0">
            {/* Main image */}
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-[#F0F4F8]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Nurse-working-from-home-on-laptop%20copy.jpg-VHvNB3MeMkIZ7DvID8YXHQcjupH8PO.jpeg"
                alt="Healthcare professional working remotely on laptop"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 550px"
                priority
              />
            </div>

            {/* Dashboard overlay */}
            <div className="absolute md:-left-8 left-4 bottom-8 w-[280px] bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </div>
                <span className="font-medium">Active Clients</span>
              </div>
              <div className="space-y-2">
                <div className="h-2 bg-[#E8F0EB] rounded-full w-3/4"></div>
                <div className="h-2 bg-[#E8F0EB] rounded-full w-1/2"></div>
              </div>
            </div>

            {/* Earnings overlay */}
            <div className="absolute md:-right-8 right-4 top-8 w-[280px] bg-white rounded-xl shadow-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-[#F3F4F6] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    {/* Minimalistic dollar bill */}
                    <rect
                      x="2"
                      y="6"
                      width="20"
                      height="12"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="#E8F0EB"
                    />
                    {/* Small circles in corners to represent bill details */}
                    <circle cx="4" cy="8" r="1" fill="currentColor" />
                    <circle cx="20" cy="8" r="1" fill="currentColor" />
                    <circle cx="4" cy="16" r="1" fill="currentColor" />
                    <circle cx="20" cy="16" r="1" fill="currentColor" />
                  </svg>
                </div>
                <span className="font-medium">Weekly Earnings</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">$1,250</span>
                <span className="text-[#407A59] text-sm">+7.5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

