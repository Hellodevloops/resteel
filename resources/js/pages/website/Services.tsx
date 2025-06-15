import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, Wrench, PackageCheck, Store } from "lucide-react"

const services = [
  {
    icon: <Store className="h-6 w-6 text-[var(--primary)]" />,
    title: "Premium Re-Sale",
    description: "Access a wide selection of vetted second-hand steel buildings ready for new purpose."
  },
  {
    icon: <Wrench className="h-6 w-6 text-[var(--primary)]" />,
    title: "Assembly & Disassembly",
    description: "From full dismounting to site setup, we manage both ends of the lifecycle."
  },
  {
    icon: <Truck className="h-6 w-6 text-[var(--primary)]" />,
    title: "Transport & Logistics",
    description: "International transport across Europe with partner fleets and freight planning."
  },
  {
    icon: <PackageCheck className="h-6 w-6 text-[var(--primary)]" />,
    title: "Equipment Tracking",
    description: "Get visibility, safety, and updates throughout your building’s relocation journey."
  }
]

export default function ServicesWeProvide() {
  return (
    <section className="py-20 px-6 bg-slate-100 ">
      <div className="mx-auto max-w-7xl text-center">
        <h2 className="mt-4 text-4xl md:text-5xl font-bold text-charcoal">
          Services <span className="text-[var(--primary)]">We Provide</span>
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
         More than just buying and selling — we help move, manage, and optimize every structure
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {services.map((service, idx) => (
            <Card key={idx} className="shadow-sm hover:shadow-md transition">
              <CardHeader className="flex flex-col items-center gap-2">
                {service.icon}
                <CardTitle className="text-md">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-center text-gray-600">
                {service.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
