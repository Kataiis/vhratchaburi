/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['profile.line-scdn.net'],
    },
    env: {
        pathUrl: `https://hyggemedicalservice.com/phpapi/api`,

      
        // HyggeOAliff: '2003391401-jDvm8MlZ', 
        
        // test //
        vhratchaburiliff: '2003826482-JZxe4b0A',
    }

};

module.exports = nextConfig