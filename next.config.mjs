/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera o build "standalone" usado pela imagem Docker.
  // Na Vercel a opcao e ignorada sem efeito colateral.
  output: 'standalone',
};

export default nextConfig;
