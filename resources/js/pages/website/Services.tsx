import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Package, Truck, Wrench } from "lucide-react";

// Brand color constants
const steelBlue = "#0076A8";
const charcoal = "#3C3F48";
const vibrantOrange = "#FF6600";

const services = [
  {
    title: "Purchase & Sale",
    icon: <Package className="h-5 w-5" style={{ color: steelBlue }} />,
    description:
      "We specialize in the acquisition and resale of pre-owned agricultural and industrial buildings.",
    points: ["Agricultural Halls", "Industrial Buildings", "Steel Constructions"],
  },
  {
    title: "Assembly & Disassembly",
    icon: <Wrench className="h-5 w-5" style={{ color: steelBlue }} />,
    description:
      "Expert dismantling and reconstruction services, safely executed by experienced teams.",
    points: ["Expert Dismantling", "Careful Reassembly", "Structural Safety"],
  },
  {
    title: "Transport & Logistics",
    icon: <Truck className="h-5 w-5" style={{ color: steelBlue }} />,
    description:
      "End-to-end logistics solutions including secure transport across Europe.",
    points: ["Cross-border Shipping", "Load Planning", "Reliable Delivery"],
  },
  {
    title: "Equipment Trading",
    icon: <Building2 className="h-5 w-5" style={{ color: steelBlue }} />,
    description:
      "Machinery, forklifts, and surplus materials available for immediate use or resale.",
    points: ["Forklift Sales", "Machinery Deals", "Site Equipment"],
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2
            className="text-5xl font-bold"
            style={{ color: charcoal }}
          >
            What We{" "}
            <span style={{ color: steelBlue }}>
              Provide
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            From procurement and installation to logistics and equipment resale — Resteel delivers end-to-end solutions for 2nd-hand steel structures across Europe.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="bg-white border border-slate-200 transition-all hover:shadow-md hover:border-slate-500"

            >
              <CardHeader className="flex flex-col items-start gap-4 pb-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100">
                  {service.icon}
                </div>
                <CardTitle
                  className="text-base font-semibold"
                  style={{ color: charcoal }}
                >
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600 space-y-4">
                <p>{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.points.map((point, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      style={{
                        borderColor: steelBlue,
                        color: steelBlue,
                        backgroundColor: "#F0F9FF",
                      }}
                    >
                      {point}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
