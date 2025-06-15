import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Video } from "lucide-react";

const vibrantOrange = "#FF6600";
const steelBlue = "#0076A8";

const BuildingDetail = () => {
  return (
    <div className="bg-[#f8fbfe] min-h-screen pt-10 pb-20 px-4 md:px-10">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
        {/* Image + Thumbnails */}
        <div className="lg:col-span-2 space-y-4">
          <div className="aspect-video overflow-hidden rounded-xl">
            <img
              src="/images/hall1.jpg"
              className="w-full h-full object-cover"
              alt="Main Hall"
            />
          </div>
          <div className="flex gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-24 h-16 rounded-md overflow-hidden border-2 border-orange-400">
                <img
                  src={`/images/hall${i}.jpg`}
                  className="object-cover w-full h-full"
                  alt={`thumb-${i}`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <Card className="h-fit">
          <CardContent className="py-6 space-y-4">
            <h2 className="text-xl font-bold text-gray-800">
              Atlantis Sarabhai Road, Subhanpura
            </h2>
            <p className="text-lg text-orange-600 font-semibold">₹323123</p>
            <div className="text-sm text-slate-600 space-y-1">
              <p>📍 Vadodara, India</p>
              <p>🏗️ Built in 2023</p>
              <p>📐 Total Area: <strong>1231232 ft²</strong></p>
            </div>

            <Button className="w-full" style={{ backgroundColor: vibrantOrange }}>
              Contact for Details
            </Button>
            <div className="flex flex-col md:flex-row gap-2">
              <Button variant="outline" className="w-full">
                Request Information
              </Button>
              <Button variant="secondary" className="w-full">
                <Video className="h-4 w-4 mr-1" /> Watch Video
              </Button>
            </div>

            <div>
              <h4 className="text-sm text-slate-700 font-semibold">Key Features</h4>
              <ul className="text-sm mt-1 list-disc pl-5 text-slate-600">
                <li>25123</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Middle Section */}
      <div className="max-w-7xl mx-auto mt-10 grid md:grid-cols-2 gap-6">
        {/* Description */}
        <Card>
          <CardContent className="py-6 space-y-4">
            <h3 className="text-lg font-semibold text-slate-800">Description</h3>
            <p className="text-sm text-slate-600">
              vd dfdvdsfvdfvasdfvwetgqrew
            </p>
            <div>
              <p className="font-medium text-sm">Construction Details</p>
              <p className="text-slate-600 text-sm">24323sdf</p>
            </div>
            <div>
              <p className="font-medium text-sm">All Features</p>
              <ul className="text-sm mt-1 list-disc pl-5 text-slate-600">
                <li>25123</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Specifications */}
        <Card>
          <CardContent className="py-6 space-y-3">
            <h3 className="text-lg font-semibold text-slate-800">Specifications</h3>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Main Hall</span>
              <span className="font-semibold text-slate-800">432432</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Office Space</span>
              <span className="font-semibold text-slate-800">32424</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Loading Dock</span>
              <span className="font-semibold text-slate-800">4324324</span>
            </div>
            <div className="border-t pt-3 mt-3 flex justify-between font-semibold text-orange-600">
              <span>Total Building Area</span>
              <span>1231232 ft²</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto text-center mt-10">
        <Button variant="ghost" className="text-sm">
          <ArrowRight className="h-4 w-4 mr-1" /> View More Buildings
        </Button>
      </div>
    </div>
  );
};

export default BuildingDetail;
