# Especificação Técnica de Desenvolvimento (PRD)
## Landing Page Freestyle Store — Scrollytelling & Visual Experience

Este documento serve como **Prompt Estruturado / Especificação Técnica Completa** para ser consumido por IAs de IDE (Cursor, Windsurf, Copilot, etc.) no desenvolvimento da landing page da **Freestyle Store** (`freestyle_storeo`).

---

## 1. Visão Geral e Conceito do Projeto

A **Freestyle Store** é uma marca de streetwear e cultura skate jovem, urbana e estilosa. O objetivo do projeto é criar uma experiência web imersiva, limpa e de alto impacto (*Clean & Dark Urban Aesthetic*), onde o utilizador controla a animação do fundo da página através do rolamento (*scroll*).

### Elemento Visual Central:
- **Scrollytelling com Canvas:** Um vídeo transformado em sequência de frames onde a logomarca da Freestyle Store e roupas de skate giram em 360° no centro da tela, rodeadas por explosões dinâmicas de poeira colorida em néon e câmera lenta.
- **Interação:** Conforme o utilizador rola a página, a animação avança/recua proporcionalmente à posição do scroll.

---

## 2. Estrutura de Arquivos e Ativos (*Assets*)

A estrutura de arquivos do projeto deve mapear obrigatoriamente a seguinte organização na pasta pública:

```
public/
├── logo/
│   └── logo.jpg              # Logotipo oficial (letras brancas "Freestyle STORE" em fundo preto)
└── frames/
    └── 1/                    # Sequência de imagens extraídas do vídeo
        ├── frame_0001.webp   # (ou .jpg)
        ├── frame_0002.webp
        ├── frame_0003.webp
        └── ...               # Total de N frames da animação 360°
```

---

## 3. Guia de Design e Sistema Visual (*Design System*)

### 3.1. Paleta de Cores
- **Fundo Principal (Pitch Black):** `#080808` / `#000000`
- **Superfícies de Cards / Módulos:** `#121215` com bordas sutis em `#27272A`
- **Texto Primário:** `#FFFFFF` (Branco puro)
- **Texto Secundário / Legendas:** `#71717A` (Cinza neutro)
- **Cores de Acento (Néon da Poeira):**
  - Ciano Elétrico: `#06B6D4`
  - Magenta Vibrante: `#EC4899`
  - Violeta Profundo: `#8B5CF6`

### 3.2. Tipografia
- **Títulos / Headlines:** Estilo Display Bold, Urbana, Angular ou Script Heavy (ex: *Syne*, *Oswald* ou *Montserrat Extra Bold*).
- **Texto de Corpo / Interface:** Sans-Serif limpa e de alta legibilidade (ex: *Inter* ou *Plus Jakarta Sans*).

### 3.3. Estilo de Interface
- **Clean Dark Urban:** Linhas finas, alto contraste, sem excesso de elementos visuais desnecessários.
- **Efeitos:** Vidro fosco (*glassmorphism*) discreto na barra de navegação superior (`backdrop-blur`).
- **Espaçamento:** Amplo respiro visual, margens largas e tipografia espaçada (*letter-spacing*).

---

## 4. Arquitetura das Seções da Página

```
┌─────────────────────────────────────────────────────────────────────────┐
│ SEÇÃO 0: Header Fixo / Barra de Navegação (Minimalista & Transparente)  │
├─────────────────────────────────────────────────────────────────────────┤
│ SEÇÃO 1: Hero Section (Canvas Scrollytelling 360° + Logo + CTA)         │
│  - Animação de frames ancorada na rolagem da tela (400vh de scroll)     │
│  - Título principal e botão de chamada para ação                        │
├─────────────────────────────────────────────────────────────────────────┤
│ SEÇÃO 2: Manifesto da Marca / Conceito "Streetwear Culture"             │
│  - Bloco de texto limpo ressaltando a identidade skater/urbana          │
├─────────────────────────────────────────────────────────────────────────┤
│ SEÇÃO 3: Grade de Destaques / Novo Drop (Catálogo Limpo)                │
│  - Cards minimalistas de produtos (Hoodies Oversized, Tees, Calças)     │
├─────────────────────────────────────────────────────────────────────────┤
│ SEÇÃO 4: Destaques Visuais / Lookbook Galeria                           │
│  - Mosaico minimalista com imagens de estilo de vida skate              │
├─────────────────────────────────────────────────────────────────────────┤
│ SEÇÃO 5: Rodapé & Inscrição de Drops (Newsletter + Redes Sociais)       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Requisitos Funcionais e Comportamentais

### 5.1. Mecânica de Scroll & Canvas (Scrollytelling)
1. **Container de Fixação (*Sticky Container*):**
   - O container externo do Hero deve possuir uma altura estendida (ex: `400vh` a `500vh`) para dar sensibilidade e suavidade ao movimento de rolagem.
   - O elemento interno que contém o `<canvas>` deve ficar fixo (`position: sticky; top: 0`) cobrindo `100vw` e `100vh`.

2. **Cálculo de Proporção:**
   - Calcular a porcentagem do scroll percorrido na seção Hero de `0.0` (início) a `1.0` (fim).
   - Mapear a porcentagem diretamente para o índice do frame da pasta `public/frames/1/`.

3. **Performance e Renderização:**
   - As imagens dos frames devem ser pré-carregadas (*preload*) na memória durante a inicialização para evitar interrupções ou telas brancas durante a rolagem.
   - Renderizar as imagens no Canvas utilizando o algoritmo de ajuste proporcional `object-fit: cover` para garantir preenchimento total em telas mobile, tablet e desktop.
   - Utilizar `requestAnimationFrame` para garantir fluidez de 60 FPS sem travar a *thread* principal da aplicação.

### 5.2. Componente de Navegação (Header)
- Fixado no topo com z-index elevado.
- Exibe o logotipo localizado em `public/logo/logo.jpg` no canto esquerdo.
- Exibe links de navegação em caixa alta e fonte pequena com amplo espaçamento entre letras no canto direito:
  - `NOVO DROP`
  - `O CONCEITO`
  - `GALERIA`
  - `CONTATO`
- Efeito de transição: Fundo transparente no topo, adicionando um fundo escuro translúcido com `backdrop-filter: blur(12px)` conforme o utilizador rola para baixo.

### 5.3. Seção do Manifesto ("O Conceito")
- Apresentar o propósito da marca Freestyle Store com tipografia elegante.
- Destaque para frases curtas de impacto como:
  > *"Nascida no asfalto. Feita para quem transforma o movimento em estilo."*
- Layout limpo em 2 colunas ou texto centralizado de grande porte.

### 5.4. Grade de Produtos / Drops
- Estrutura de grid responsiva (1 coluna em mobile, 2 em tablet, 3 ou 4 em desktop).
- Cards com design minimalista:
  - Imagem do produto em proporção vertical (ex: 3:4).
  - Nome do produto (ex: *Oversized Hoodie "Dust Neon"*).
  - Categoria / Coleção.
  - Preço em destaque sutil.
  - Botão ou link discreto de "Ver Detalhes" ou "Adicionar".

### 5.5. Rodapé
- Caixa de entrada para captura de e-mail (Notificação de Novos Drops).
- Links para redes sociais (Instagram, TikTok, YouTube).
- Direitos autorais e assinatura da marca `Freestyle Store`.

---

## 6. Requisitos Não-Funcionais e Responsividade

1. **Mobile First & Touch Friendly:**
   - Em dispositivos móveis, a animação por scroll deve funcionar perfeitamente com gestos de toque (*touch scroll*).
   - Ajustar o tamanho da tipografia e o tamanho do Canvas automaticamente via evento `resize`.

2. **Otimização de Carregamento:**
   - Exibir uma tela ou barra de carregamento (*loader*) sutil enquanto as imagens dos frames estão a ser baixadas para o cache do navegador.
   - Assim que atinge o limiar mínimo de frames carregados, ocultar o loader e liberar o scroll.

3. **Acessibilidade & SEO:**
   - Tags semânticas HTML5 (`header`, `main`, `section`, `footer`).
   - Atributos `alt` adequados para todas as imagens.
   - Suporte a navegação por teclado e bons níveis de contraste para leitura.

---

## 7. Instruções Diretas para a IA da IDE

Ao implementar o código com base neste documento:
1. Siga uma arquitetura limpa de componentes e mantenha o código totalmente modular.
2. Certifique-se de que o caminho dos arquivos aponta rigorosamente para `/logo/logo.jpg` e `/frames/1/frame_XXXX.jpg`.
3. Garanta que o Canvas preenche 100% da viewport e redimensiona sem distorcer a proporção do vídeo original.
4. Mantenha os estilos focados numa estética escura, moderna, limpa e com tipografia marcante.