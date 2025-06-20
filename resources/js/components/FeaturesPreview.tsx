import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Globe, Hammer, ShieldCheck } from "lucide-react"

const features = [
  {
    icon: <Globe className="h-6 w-6 text-[var(--primary)]" />,
    title: "Europe-Wide Reach",
    description: "We advertise your listings across 20+ countries through our network of verified buyers and partners."
  },
  {
    icon: <Hammer className="h-6 w-6 text-[var(--primary)]" />,
    title: "End-to-End Support",
    description: "We manage the full lifecycle — disassembly, transport, and reassembly included."
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-[var(--primary)]" />,
    title: "20+ Years of Trust",
    description: "Since 2005, we’ve helped hundreds of industrial and agri businesses relocate or resell steel halls."
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 px-6 bg-slate-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-charcoal">Why Choose <span className="text-[var(--primary)]">Us</span></h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
         We combine decades of experience with a broad European network to make steel trading fast, transparent, and effective
        </p>
        {/* <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
          Combining experience with industry-specific knowledge, we make relocation, reuse, and resale simple and secure.
        </p> */}

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {features.map((feature, idx) => (
            <Card key={idx} className="shadow-md hover:shadow-lg transition bg-white duration-200">
              <CardHeader className="flex flex-col items-center">
                {feature.icon}
                <CardTitle className="text-lg mt-2">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-center text-gray-600">
                {feature.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
