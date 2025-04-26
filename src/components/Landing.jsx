import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import RotatingText from "./ui/RotatingText/RotatingText";

const features = [
  { title: "Free Shipping", desc: "Free delivery on orders ₹499+", icon: "🚚" },
  { title: "24/7 Support", desc: "Always here to help.", icon: "📞" },
  { title: "Secure Payments", desc: "Safe and encrypted.", icon: "🔒" },
  { title: "Curated Collections", desc: "Handpicked products.", icon: "🛍️" },
  { title: "Easy Returns", desc: "7-day hassle-free returns.", icon: "↩️" },
  { title: "Member Offers", desc: "Exclusive deals & rewards.", icon: "🎁" },
];

export default function Landing() {
  return (
    <>
      <main className="bg-black min-h-screen text-white font-sans">
        {/* Hero Section */}
        <section className="w-full bg-black">
          <div className="container mx-auto flex flex-col md:flex-row items-center py-24 px-6 md:px-12 max-w-7xl">
            {/* Left: Text */}
            <div className="flex-1 space-y-6 text-center md:text-left md:pr-12">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Elevate Your Everyday with{" "}
                <RotatingText
                  texts={["UrbanNest"]}
                  mainClassName="px-2 sm:px-2 md:px-3 bg-cyan-300 text-black overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg mt-5"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={2000}
                />
              </h1>
              <p className="text-lg text-gray-400 max-w-xl mx-auto md:mx-0">
                Beauty, Fragrances, Furniture & Grocery delivered to your door.
              </p>
              <Link to={"/products"}>
                <Button className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-200 transition w-full md:w-auto mt-6 cursor-pointer">
                  Shop Now
                </Button>
              </Link>
            </div>
            {/* Right: Image */}
            <div className="flex-1 mt-12 md:mt-0 flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
                alt="Ecommerce showcase"
                className="rounded-xl shadow-2xl grayscale max-h-[400px] w-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-black">
          <h2 className="text-3xl font-semibold mb-12 text-center tracking-wide">
            Why Shop With Us?
          </h2>
          <div className="container mx-auto max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-10 px-6 md:px-12">
            {features.map((f) => (
              <Card
                key={f.title}
                className="h-full bg-black border border-gray-700 text-white shadow-lg hover:bg-gray-900 transition p-6 rounded-lg flex flex-col"
              >
                <CardHeader className="flex items-center space-x-4 pb-4 border-b border-gray-700">
                  <span className="text-4xl">{f.icon}</span>
                  <CardTitle className="text-xl font-semibold">
                    {f.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="mt-4 flex-grow">
                  <p className="text-gray-400">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20 px-6 md:px-72 max-w-7xl mx-auto">
          <Accordion type="single" collapsible className="max-w-full">
            {/* New FAQ Items */}

            <AccordionItem value="item-4">
              <AccordionTrigger>
                What categories of products do you sell?
              </AccordionTrigger>
              <AccordionContent>
                We offer a curated selection of Beauty, Fragrances, Furniture,
                and Grocery products to meet your everyday needs.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How fast is the delivery?</AccordionTrigger>
              <AccordionContent>
                Most orders are delivered within 2 to 5 business days, depending
                on your location.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>Do you offer free shipping?</AccordionTrigger>
              <AccordionContent>
                Yes, we provide free shipping on all orders over ₹499.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>

        {/* Footer */}
        <footer></footer>
      </main>
    </>
  );
}
