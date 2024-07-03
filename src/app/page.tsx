import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
        <header className="bg-white shadow-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="flex items-center">
          <Image src="https://play-lh.googleusercontent.com/cK_Iv4KP-EjMDsmCz5azetUX1_OPBaooqzGDd7i45ZOLWtRASni8iiLYiqR_Di9li4U=w240-h480-rw" alt="MNCL Logo" width={60} height={60} />
            </div>
            <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><Link href="/" className="text-xl text-blue-600 hover:text-green-500 font-semibold ">Home</Link></li>
            <li><Link href="/about" className="text-xl text-blue-600 hover:text-green-500 font-semibold">About</Link></li>
            <li><Link href="/services" className="text-xl text-blue-600 hover:text-green-500 font-semibold">Services</Link></li>
            <li><Link href="/contact" className="text-xl text-blue-600 hover:text-green-500 font-semibold">Contact</Link></li>
          </ul>
            </nav>
            <div className="md:hidden">
          {/* Mobile menu button */}
            <button className="text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to MNCL Waybill Portal</h1>
          <p className="text-xl mb-12 max-w-2xl mx-auto">Revolutionize your logistics operations with our cutting-edge waybill management system. Streamline processes, reduce errors, and boost efficiency.</p>
          <div className="flex justify-center space-x-6">
            <Link href="/register-client" className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Get Started
            </Link>
            <Link href="/login-client" className="bg-white text-blue-600 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Login
            </Link>
          </div>
        </div>
      </section>

      {/* Access Waybill Section */}
      <section id="access-waybill" className="py-24 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-6">Access Waybill Portal</h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Choose your role to get started with our advanced waybill management system
          </p>
          <div className="flex flex-col md:flex-row gap-12 items-stretch">
            {/* Delivery Partner */}
            <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
              <div className="h-48 bg-blue-600 relative">
                <Image 
                  src="/delivery-partner-banner.jpg" 
                  alt="Delivery Partner" 
                  layout="fill" 
                  objectFit="cover" 
                  className="opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/delivery-icon.svg" 
                    alt="Delivery Icon" 
                    width={80} 
                    height={80} 
                    className="filter drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-blue-600">Delivery Partner</h3>
                <p className="text-gray-600 mb-6">Streamline your delivery operations, manage routes efficiently, and update delivery statuses in real-time.</p>
                <div className="space-y-4">
                  <Link href="/register-delivery" className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out">
                    Register as Delivery Partner
                  </Link>
                  <Link href="/login-delivery" className="block w-full bg-white border-2 border-blue-600 text-blue-600 font-bold py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out hover:bg-blue-50">
                    Login as Delivery Partner
                  </Link>
                </div>
              </div>
            </div>

            {/* Client */}
            <div className="flex-1 bg-white rounded-3xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2">
              <div className="h-48 bg-green-600 relative">
                <Image 
                  src="/client-banner.jpg" 
                  alt="Client" 
                  layout="fill" 
                  objectFit="cover" 
                  className="opacity-75"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image 
                    src="/client-icon.svg" 
                    alt="Client Icon" 
                    width={80} 
                    height={80} 
                    className="filter drop-shadow-lg"
                  />
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-semibold mb-4 text-green-600">Client</h3>
                <p className="text-gray-600 mb-6">Track your shipments in real-time, manage multiple orders, and access detailed reports and analytics.</p>
                <div className="space-y-4">
                  <Link href="/register-client" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out">
                    Register as Client
                  </Link>
                  <Link href="/login-client" className="block w-full bg-white border-2 border-green-600 text-green-600 font-bold py-3 px-4 rounded-lg text-center transition duration-300 ease-in-out hover:bg-green-50">
                    Login as Client
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Easy Registration", desc: "Quick and simple registration process for both clients and delivery personnel.", icon: "M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" },
              { title: "Real-time Tracking", desc: "Track your shipments in real-time with our advanced GPS-enabled tracking system.", icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" },
              { title: "Secure Login", desc: "Ensure the safety of your data with our secure multi-factor authentication system.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
            ].map((feature, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2">
                <div className="text-green-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {[
              { name: "John Doe", role: "Logistics Manager", quote: "MNCL Waybill Portal has transformed our shipping process. It's intuitive, fast, and incredibly reliable." },
              { name: "Jane Smith", role: "Supply Chain Director", quote: "The real-time tracking feature has significantly improved our customer satisfaction. Highly recommended!" },
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-500 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-600 py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Ready to Revolutionize Your Logistics?</h2>
          <p className="text-xl text-white mb-12 max-w-2xl mx-auto">Join thousands of satisfied clients who have streamlined their operations with MNCL Waybill Portal.</p>
          <div className="space-x-6">
            <Link href="/register-delivery" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Register as Delivery Person
            </Link>
            <Link href="/register-client" className="bg-white text-green-500 font-bold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110">
              Register as Client
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-semibold mb-6">MNCL Waybill Portal</h3>
              <p className="mb-4">Streamlining logistics operations since 2024</p>
              <div className="flex space-x-4">
                {/* Social media icons */}
                {['M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22', 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z', 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z', 'M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z'].map((d, i) => (
                  <a key={i} href="#" className="hover:text-green-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={d} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {['Home', 'About', 'Services', 'Contact', 'Register Delivery Person', 'Login as Delivery Person', 'Client Register', 'Client Login'].map((link, i) => (
                  <li key={i}><Link href={`/${link.toLowerCase().replace(/ /g, '-')}`} className="hover:text-green-500">{link}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Us</h3>
              <p className="mb-4">123 Logistics Lane,<br />Shipment City, SC 12345</p>
              <p>Email: info@mnclwaybill.com</p>
              <p>Phone: +1 (123) 456-7890</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-6">Newsletter</h3>
              <p className="mb-4">Stay updated with our latest news and offers.</p>
              <form className="flex">
                <input type="email" placeholder="Enter your email" className="py-2 px-4 rounded-l-full w-full text-gray-800" />
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-r-full">Subscribe</button>
              </form>
            </div>
          </div>
        </div>
      </footer>
      <div className="bg-gray-900 text-white py-4 text-center">
        <p>&copy; 2024 MNCL Waybill Portal. All rights reserved.</p>
      </div>
    </div>
  );
}