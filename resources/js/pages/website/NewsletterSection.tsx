import { Mail, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Clock, Users, Zap } from "lucide-react";

// Brand color constants
const steelBlue = "#0076A8";
const charcoal = "#3C3F48";
const vibrantOrange = "#FF6600";

const features = [
  { icon: Clock, text: "24/7 Project Support" },
  { icon: Users, text: "500+ Satisfied Clients" },
  { icon: Zap, text: "Weekly updates" },
];

const NewsletterSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-slate-100 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left - Text */}
          <div className="space-y-5">
            <h2 className="text-4xl font-bold" style={{ color: charcoal }}>
              Stay Updated with{" "}
            </h2>
            <h2 className="text-4xl font-bold" style={{ color: steelBlue }}>
              Industry Insights
            </h2>
            <p className="text-lg text-slate-600 max-w-md">
              Get the latest updates on steel solutions, trends, and engineering
              innovation—delivered to your inbox every week.
            </p>
          </div>

          {/* Right - Form & Stats */}
          <div className="space-y-6">
            <Card className="p-6 md:p-8 border border-slate-200 bg-white shadow-sm">
              <form className="flex flex-col sm:flex-row items-center gap-4">
                <div className="relative w-full">
                  <Mail className="absolute left-3 top-2 h-5 w-5" style={{ color: steelBlue }} />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="text-white transition"
                  style={{
                    background: `linear-gradient(to right, ${vibrantOrange}, #e65c00)`,
                  }}
                >
                  Subscribe
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              {features.map((feature, index) => (
                <Card key={index} className="p-4 text-center bg-white shadow-md">
                  <div
                    className="mb-2 mx-auto w-10 h-10 flex items-center justify-center rounded-full"
                    style={{ backgroundColor: steelBlue }}
                  >
                    <feature.icon className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">{feature.text}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
