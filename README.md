# Rafael Carlesso's Portfolio

Um portfólio moderno e interativo com efeito de luz que segue o mouse, design minimalista e animações suaves.

## ✨ Features

- 🎯 **Efeito de Luz Dinâmico**: Gradiente radial que segue o movimento do mouse
- 💫 **Cursor Follower Aprimorado**: Ponteiro com brilho e glow animado
- 📱 **Design Responsivo**: Totalmente adaptado para todos os dispositivos
- 🎨 **Animações Suaves**: Transições e efeitos visuais elegantes
- 🌓 **Tema Claro/Escuro**: Toggle de tema com persistência local
- 🔄 **Parallax 3D**: Efeito de profundidade interativo na seção hero
- 📊 **API REST**: Backend com endpoints para dados do portfólio
- ⚡ **Performance Otimizada**: Carregamento rápido e animações fluidas

## 📋 Estrutura do Projeto

```
├── index.html           # Página principal
├── css/
│   └── styles.css       # Estilos e animações
├── js/
│   └── script.js        # Lógica interativa
├── img/                 # Imagens e ícones
├── server.js            # Backend Node.js/Express
├── package.json         # Dependências
└── README.md            # Este arquivo
```

## 🚀 Como Rodar

### Opção 1: Com Node.js (Recomendado)

```powershell
# 1. Instalar dependências
npm install

# 2. Rodar o servidor
npm start

# 3. Abrir no navegador
# http://localhost:3000
```

### Opção 2: Com Python

```powershell
python -m http.server 8000
# http://localhost:8000
```

### Opção 3: Abrir Diretamente

Simplesmente abra `index.html` no navegador (alguns recursos podem necessitar de servidor).

## 🎮 Interações Principais

- **Mouse Light Effect**: Passe o mouse sobre a página para ver o efeito de luz radial
- **Cursor Glow**: Cursor especial com brilho que segue o ponteiro
- **Parallax 3D**: Mova o mouse sobre a seção hero para ver o efeito 3D
- **Tema**: Clique no ícone da lua para alternar entre tema claro e escuro
- **Smooth Scroll**: Links de navegação têm scroll suave

## 📡 API Endpoints

O backend fornece vários endpoints:

```
GET  /api/light-config         → Configuração do efeito de luz
GET  /api/portfolio            → Dados do portfólio
GET  /api/analytics/light-effect → Análise do efeito
GET  /api/health               → Status do servidor
POST /api/track-mouse          → Rastrear posição do mouse (opcional)
```

## 🛠️ Tecnologias

- **Frontend**:
  - HTML5
  - CSS3 (Grid, Flexbox, Gradientes, Animações)
  - JavaScript Vanilla (ES6+)
  - CSS Filters e Blend Modes

- **Backend**:
  - Node.js
  - Express.js
  - REST API

## 💡 Customização

### Cores
Edite as variáveis CSS em `css/styles.css`:
```css
:root {
  --primary: #00A86B;
  --primary-dark: #008B5A;
  --bg: #FFFFFF;
  /* ... mais variáveis */
}
```

### Efeito de Luz
Modifique em `css/styles.css`:
```css
.mouse-light {
  width: 400px;              /* Tamanho */
  background: radial-gradient(...) /* Cor e gradiente */
  filter: blur(40px);        /* Desfoque */
  opacity: 0;                /* Opacidade */
}
```

### Dados do Portfólio
Edite `index.html` para adicionar:
- Seu nome e descrição
- Imagem de perfil
- Projetos
- Skills
- Informações de contato

## 📱 Browser Support

- Chrome/Chromium (últimas versões)
- Firefox (últimas versões)
- Safari (últimas versões)
- Edge (últimas versões)

## 📄 Licença

MIT License - Sinta-se livre para usar e modificar

## 👤 Autor

**Rafael Carlesso**
- Designer & Developer
- Focado em criar experiências visuais minimalistas e interativas

---

Para contribuições ou sugestões, sinta-se à vontade para abrir um issue ou pull request!
