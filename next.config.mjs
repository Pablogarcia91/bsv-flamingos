/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: isGitHubPages ? 'export' : undefined,
  images: {
    unoptimized: isGitHubPages,
  },
  basePath: isGitHubPages ? '/bsv-flamingos' : '',
};

export default nextConfig;
