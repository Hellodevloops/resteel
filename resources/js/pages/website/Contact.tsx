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
import {
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

// Brand color constants
const steelBlue = "#0076A8";
const charcoal = "#3C3F48";
const vibrantOrange = "#FF6600";

const ContactCTA = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    status: "pending", // hidden
    type: "Lead",       // hidden
    source: "Website Form", // preset
    value: "",          // hidden
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      status: "pending",
      type: "Lead",
      source: "Website Form",
      value: "",
    });
    setErrors({});
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axios.post("/contacts", {
        ...data,
        value: data.value ? parseFloat(data.value) : null, // still sent, default is null
      });
      reset();
      alert("Thank you for your inquiry! We will get back to you within 24 hours.");
    } catch (error: any) {
      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-section" className="py-20 bg-slate-200/80">
      <div className="container max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}
          >
            Expert Consultation
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold" style={{ color: charcoal }}>
            Ready to Build <span style={{ color: steelBlue }}>Something Great?</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Transform your vision into reality with our precision engineering and decades of expertise. Let's discuss your next industrial project.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 ">
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
                {/* Contact Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" value={data.name} onChange={handleChange} />
                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={data.phone} onChange={handleChange} />
                    {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={data.email} onChange={handleChange} />
                    {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input id="company" value={data.company} onChange={handleChange} />
                    {errors.company && <p className="text-sm text-red-500">{errors.company}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Message *</Label>
                  <Textarea id="message" value={data.message} onChange={handleChange} rows={5} />
                  {errors.message && <p className="text-sm text-red-500">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  className="w-full text-white mt-4"
                  style={{ backgroundColor: vibrantOrange }}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"} <Send className="ml-2 h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Info Sidebar */}
          <div className="space-y-6 mx-5">

            <Card className="p-6 flex items-start gap-4">
                 <div className="flex items-start gap-4">

              <div className="p-3 rounded-xl text-white"  style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}>
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Email Inquiries</p>
                <a href="mailto:Info@2ndhandholding.com" className="text-md hover:underline" style={{ color: steelBlue }}>
                  Info@2ndhandholding.com
                </a>
              </div>
              </div>
            </Card>

            <Card className="p-6 flex items-start gap-4">
                 <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl text-white"  style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}>
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <p className="font-semibold">Direct Consultation</p>
                <a href="tel:+31123456789" className="text-md hover:underline" style={{ color: steelBlue }}>
                  +31 (0) 123 456 789
                </a>
              </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl text-white"  style={{ backgroundColor: `${steelBlue}20`, color: steelBlue }}>
                  <MapPin className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-semibold">Visit Our Facility</p>
                  <p className="text-sm text-muted-foreground">Westerbeemd 2B, 5705 DN Helmond</p>
                  <a href="/contact" className="text-sm hover:underline" style={{ color: steelBlue }}>
                    Schedule Tour
                  </a>
                </div>
              </div>
              <iframe
                className="mt-4 w-full h-40 rounded-md border"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.123456789!2d5.6234567!3d51.4567890!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sWesterbeemd%202B%2C%205705%20DN%20Helmond%2C%20Netherlands!5e0!3m2!1sen!2sus!4v1234567890123"
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
