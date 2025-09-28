import ContactForm from "@/components/contact/contact-form";
import Map from "@/components/contact/map";
import { Mail, Phone, MapPin, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const location = {
    lat: 34.052235,
    lng: -118.243683,
  };

  return (
    <>
      <div className="container mx-auto px-4 py-12 md:py-20 pt-32 md:pt-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="font-headline text-4xl md:text-5xl font-bold">Get in Touch</h1>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground">
            We'd love to hear from you. Whether you have a question, a proposal, or just want to say hello, please don't hesitate to reach out.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-12">
            <div>
                <h2 className="font-headline text-3xl mb-6">Contact Information</h2>
                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <MapPin className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Our Office</h3>
                            <p className="text-muted-foreground">123 Charity Lane, Hope City, 90210, USA</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <Mail className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email Us</h3>
                            <p className="text-muted-foreground hover:text-primary"><a href="mailto:connect@empowerchange.org">connect@empowerchange.org</a></p>
                        </div>
                    </div>
                     <div className="flex items-start gap-4">
                        <div className="bg-primary/10 text-primary p-3 rounded-full">
                            <Phone className="h-6 w-6"/>
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Call Us</h3>
                            <p className="text-muted-foreground hover:text-primary"><a href="tel:+1234567890">+1 (234) 567-890</a></p>
                        </div>
                    </div>
                </div>
                 <h3 className="font-semibold text-lg mt-8 mb-4">Follow Us</h3>
                 <div className="flex space-x-4">
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter size={24} /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook size={24} /></Link>
                    <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram size={24} /></Link>
                </div>
            </div>

            <div>
                <h2 className="font-headline text-3xl mb-6">Send Us a Message</h2>
                <ContactForm />
            </div>
        </div>
      </div>
      <div className="w-full h-[400px] md:h-[500px] bg-muted">
        <Map center={location} />
      </div>
    </>
  );
}
