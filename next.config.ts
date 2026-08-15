import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // O Next 16 passou a aceitar só `[75]` por padrão e recomprime toda imagem
    // nessa qualidade. Nas apresentações de projeto, exibidas em largura
    // total, isso sujava tipografia e fotografia mesmo com a origem íntegra.
    // A origem já vem em q95; reencodar no mesmo patamar mantém a segunda
    // passagem visualmente transparente.
    qualities: [75, 95],
    // As lâminas chegam a 4000px. Sem esta largura no conjunto, a maior
    // variante gerada seria 3840 e telas grandes em densidade dupla ficariam
    // com imagem ampliada.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 4000],
  },
};

export default nextConfig;
