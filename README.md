# Fontero

**Fontero** é um gerenciador de fontes personalizadas desenvolvido em [Next.js](https://nextjs.org), permitindo que você faça upload, visualize, gerencie e utilize diferentes fontes para criar e exportar designs personalizados. Ideal para designers, desenvolvedores e qualquer pessoa que deseje manipular textos com fontes customizadas diretamente no navegador.

## ✨ Funcionalidades

- **Upload de fontes personalizadas**: Suporte a formatos `.ttf`, `.woff`, `.woff2` e `.otf`.
- **Visualização instantânea**: Pré-visualize textos com as fontes carregadas.
- **Gerenciamento de fontes**: Adicione, remova e alterne entre fontes facilmente.
- **Edição de textos**: Crie múltiplos textos, ajuste tamanho, cor, peso e família tipográfica.
- **Exportação**: Baixe o design como SVG.
- **Tema claro/escuro**: Interface ajusta-se automaticamente ao tema do sistema.
- **Responsividade**: Otimizado para desktops — mensagem informativa é exibida em telas menores.

## 🚀 Começando

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/mariosalembe23/fontero.git
cd fontero
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador para ver o resultado.

## 🖼️ Como usar

1. **Adicione uma fonte**: Clique para fazer upload de um arquivo de fonte suportado.
2. **Crie um texto**: Adicione e edite textos, escolhendo fonte, tamanho, cor e peso.
3. **Gerencie e remova fontes**: Remova fontes carregadas ou altere as fontes dos textos facilmente.
4. **Exporte seu design**: Baixe como SVG para utilizar em outros projetos.

## 📦 Tecnologias Utilizadas

- [Next.js](https://nextjs.org) (React)
- [Redux Toolkit](https://redux-toolkit.js.org/) para gerenciamento de estado
- [opentype.js](https://github.com/opentypejs/opentype.js) para manipulação de fontes
- [Tailwind CSS](https://tailwindcss.com) para estilização
- [sonner](https://sonner.emilkowal.ski/) para notificações

## 📝 Observações

- O projeto utiliza [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) para otimização automática de fontes.
- Em telas menores, o uso é restrito e uma mensagem orienta o usuário a utilizar um dispositivo compatível.

## 🌎 Deploy

A maneira mais fácil de publicar sua aplicação Next.js é na [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Veja mais em [documentação de deploy do Next.js](https://nextjs.org/docs/app/building-your-application/deploying).

## 👤 Autor

[Mário Salembe](https://www.linkedin.com/in/m%C3%A1rio-salembe-5211792a6/)  
[GitHub](https://github.com/mariosalembe23)

---
