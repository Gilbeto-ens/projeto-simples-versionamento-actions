/** @type {import('next').NextConfig} */
const nextConfig = {
  // Gera o build "standalone" usado pela imagem Docker.
  // Na Vercel a opcao e ignorada sem efeito colateral.
  output: 'standalone',
  // Ancora o rastreio de arquivos nesta pasta; sem isso o Next pode subir a
  // arvore de diretorios atras de outro lockfile e avisar sobre a raiz.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
