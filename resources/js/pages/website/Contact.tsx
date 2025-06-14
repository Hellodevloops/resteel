import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "@inertiajs/react";
import {
  ArrowRight,
  Award,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
  Users,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";

// Brand color constants
const steelBlue = "#0076A8";
const charcoal = "#3C3F48";
const vibrantOrange = "#FF6600";

const ContactCTA = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact-section");
    if (element) observer.observe(element);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post("/contacts", {
      onSuccess: () => {
        reset();
        alert("Thank you for your inquiry! We will get back to you within 24 hours.");
      },
    });
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-50">
      <div className="container max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}
          >
            Expert Consultation
          </span>
          <h2
            className="mt-4 text-4xl md:text-5xl font-bold"
            style={{ color: charcoal }}
          >
            Ready to Build <span style={{ color: steelBlue }}>Something Great?</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Transform your vision into reality with our precision engineering and decades of expertise. Let's discuss your next industrial project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <Card className="shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold" style={{ color: steelBlue }}>
                Send us a message
              </CardTitle>
              <CardDescription className="text-md">
                We'll respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      className="mt-2"
                      placeholder="Your name"
                      value={data.name}
                      onChange={(e) => setData("name", e.target.value)}
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      className="mt-2"
                      placeholder="Phone number"
                      value={data.phone}
                      onChange={(e) => setData("phone", e.target.value)}
                    />
                    {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      className="mt-2"
                      type="email"
                      placeholder="Your email"
                      value={data.email}
                      onChange={(e) => setData("email", e.target.value)}
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      className="mt-2"
                      placeholder="Company name"
                      value={data.company}
                      onChange={(e) => setData("company", e.target.value)}
                    />
                    {errors.company && (
                      <p className="text-sm text-red-500 mt-1">{errors.company}</p>
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea
                    id="message"
                    className="mt-2"
                    placeholder="Tell us about your project requirements"
                    rows={5}
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full text-white mt-4"
                  style={{ backgroundColor: vibrantOrange }}
                >
                  Send Message <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 flex items-start gap-4 ">
                <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl text-white" style={{ backgroundColor: steelBlue }}>
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Email Inquiries</p>
                <a
                  href="mailto:Info@2ndhandholding.com"
                  className="text-sm hover:underline"
                  style={{ color: steelBlue }}
                >
                  Info@2ndhandholding.com
                </a>
              </div>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
                   <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl text-white" style={{ backgroundColor: steelBlue }}>
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Direct Consultation</p>
                <a
                  href="tel:+31123456789"
                  className="text-sm hover:underline"
                  style={{ color: steelBlue }}
                >
                  +31 (0) 123 456 789
                </a>
              </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl text-white" style={{ backgroundColor: steelBlue }}>
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Visit Our Facility</p>
                  <p className="text-sm text-muted-foreground">
                    Westerbeemd 2B, 5705 DN Helmond
                  </p>
                  <a
                    href="/contact"
                    className="text-sm hover:underline"
                    style={{ color: steelBlue }}
                  >
                    Schedule Tour
                  </a>
                </div>
              </div>
              <iframe
                className="mt-4 w-full h-40 rounded-md border"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.123456789!2d5.6234567!3d51.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWesterbeemd%202B%2C%205705%20DN%20Helmond%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1234567890123"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Resteel Location Map"
              />
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
