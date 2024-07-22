/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {

    env: {
        TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
        TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
        TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
        EMAIL_USER: process.env.EMAIL_USER,
      },


    images: {
        
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'play-lh.googleusercontent.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'itat.mnclgroup.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'i.ibb.co',
            port: '',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'ibb.co',
            port: '',
            pathname: '/**',
          },
        ],
        }
};


export default nextConfig;
