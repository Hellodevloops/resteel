import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ShieldCheck,
  Clock3,
  Wrench,
} from "lucide-react";

// Brand color constants
const steelBlue = "#0076A8";
const charcoal = "#3C3F48";
// const vibrantOrange = "#FF6600";

const features = [
  {
    title: "Precision Engineering",
    description: "Millimeter-perfect fabrication using advanced CAD/CAM systems.",
    icon: <Wrench className="h-8 w-8"/>,
  },
  {
    title: "On-Time Delivery",
    description: "Rigorous project management to keep your timelines secure.",
    icon: <Clock3 className="h-8 w-8"/>,
  },
  {
    title: "Reliable Structures",
    description: "Certified safety and reliability in every build.",
    icon: <ShieldCheck className="h-8 w-8" />,
  },
];

const FeaturesPreview = () => {
  return (
    <section className="bg-gradient-to-br from-slate-50 via-white to-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 xl:px-16">
        <div className="text-center mb-14">
          <h2 className="text-5xl  font-bold"  style={{ color: charcoal }}>
            Why Choose{" "}
            <span className=" " style={{ color: steelBlue }}>
            Us
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto" >
            Combining expertise with cutting-edge technology.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="text-slate-500 transition-transform hover:-translate-y-0.5 hover:shadow-xl border border-slate-200 bg-white rounded-2xl hover:border-slate-600"
            >
              <CardHeader className="flex flex-col items-center space-y-4 pt-6" style={{ color: steelBlue }}>
                {feature.icon}
                <CardTitle className="text-xl font-semibold text-slate-600 text-center">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-slate-600 px-4 pb-6">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesPreview;
