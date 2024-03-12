/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    trailingSlash: true,
    // output: 'export',
    // basePath: '/vhratchaburi',
    images: {
        domains: ['profile.line-scdn.net'],
        unoptimized: true,
    },
    env: {
        pathUrl: `https://hyggemedicalservice.com/phpapi/api`,

        vhratchaburiliff: '2004052063-8vbYpYko',
        // test
        // vhratchaburiliff: '2003826482-JZxe4b0A',
    }

};

module.exports = nextConfig