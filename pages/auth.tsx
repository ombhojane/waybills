import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AuthPage() {
    return (
        <div
          className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center"
          style={{ backgroundImage: 'url(https://i.ibb.co/2SSfcwJ/image.png)' }}
        >
          {/* Logo Section */}
          <div className="text-center mb-8">
            <Image src="https://play-lh.googleusercontent.com/cK_Iv4KP-EjMDsmCz5azetUX1_OPBaooqzGDd7i45ZOLWtRASni8iiLYiqR_Di9li4U=w240-h480-rw" alt="MNCL Logo" width={150} height={150} />
          </div>
    
          {/* Welcome Message */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Welcome To</h1>
            <h2 className="text-4xl font-bold text-green-600">MNCL Waybill Portal</h2>
            <p className="text-lg text-gray-700 mt-4">Designed & Developed by MNCL IT | All Rights Reserved. MNCL © 2024</p>
          </div>
    
          {/* Call-to-Action Button */}
          <div>
            <Link href="/auth" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300">
              Click Me to Proceed
            </Link>
          </div>
        </div>
      );
}
