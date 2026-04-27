# � Guia de Instalação e Setup - Portfolio v2.0

## Opção 1: Node.js + Express (Recomendado) ⭐

### Pré-requisitos
- **Node.js** v14+ (https://nodejs.org) - escolha versão LTS
- **npm** 6+ (incluído no Node.js)
- **Git** (opcional, para versionamento)

### Passo a Passo

#### 1. Verificar instalação do Node
```powershell
node --version    # deve mostrar v14.x.x ou superior
npm --version     # deve mostrar 6.x.x ou superior
```

#### 2. Navegar até a pasta
```powershell
cd "c:\Users\devRafa\Desktop\Workspace"
```

#### 3. Instalar dependências
```powershell
npm install
```

> Instala Express, CORS, Body Parser etc.

#### 4. Rodar servidor
```powershell
npm start
```

#### 5. Acessar no navegador
**http://localhost:3000**

#### 6. Parar servidor
```
Pressionar Ctrl + C
```

---

## Opção 2: Estático Sem Backend

### Com Python (mais fácil)
```powershell
# Python 3
cd "c:\Users\devRafa\Desktop\Workspace"
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Acesse: **http://localhost:8000**

### Direto no Navegador
```powershell
# Apenas abrir arquivo - sem servidor
start "c:\Users\devRafa\Desktop\Workspace\index.html"
```

---

## Opção 3: VS Code Live Server

### Instalação:
1. Abrir VS Code
2. **Ctrl+Shift+X** (Extensions)
3. Buscar "Live Server"
4. Instalar (por Ritwick Dey)

### Uso:
1. Clique direito em `index.html`
2. "Open with Live Server"
3. Pronto! Auto-reload em tempo real 🔄

---

## ✨ O que Você Verá

✅ **Efeito de Luz** - Gradiente radial segue seu cursor  
✅ **Cursor Animado** - Glow brilhante e dinâmico  
✅ **Animações Scroll** - Elementos aparecem com suavidade  
✅ **Tema Escuro/Claro** - Toggle button com persistência  
✅ **Parallax 3D** - Efeito perspectiva na foto de perfil  
✅ **Validação Form** - Mensagens de erro em tempo real  
✅ **Responsivo** - Adapta perfeitamente em mobile  

---

## 🔧 Troubleshooting

| Problema | Solução |
|----------|---------|
| "npm not found" | Instale Node.js de https://nodejs.org |
| Porta 3000 em uso | Use `node --version` e veja se tem outra rodando, ou altere PORT em server.js |
| Arquivo não encontra | Verifique caminhos em index.html |
| CSS/JS não estão | Limpe cache: Ctrl+Shift+Delete |
| "Cannot find module" | execute `npm install` novamente |
| Erro de CORS | Servidor Express já deve estar rodando |

---

## 🎨 Estrutura de Arquivos

```
workspace/
├── index.html                 # Página principal
├── css/
│   └── styles.css            # Estilos (2000+ linhas)
├── js/
│   └── script.js             # Lógica interativa (480+ linhas)
├── img/                      # Imagens/ícones
├── server.js                 # Backend Express (380 linhas)
├── package.json              # Dependências npm
├── README.md                 # Documentação principal
├── INSTALL.md                # Este arquivo
├── PROFESSIONAL_DOCS.md      # Docs avançadas
└── LIGHT_EFFECT_DOCS.md      # Docs efeito de luz
```

---

## 🚀 Verificar Tudo Funciona

### 1. Servidor iniciou?
```
Deve aparecer:
╔═══════════════════════════════╗
║ 🎨 Rafael Carlesso Portfolio  ║
║ Server running on port 3000   ║
╚═══════════════════════════════╝
```

### 2. Página carregou?
- ✅ CSS tem cores
- ✅ Imagens aparecem
- ✅ Botão tema escuro funciona
- ✅ Mouse tem efeito de luz

### 3. Form funciona?
- Tente submeter form de contato
- Deve validar em tempo real
- Mensagem de sucesso aparece

### 4. DevTools (F12)
- Abrir DevTools
- Console deve estar limpo (sem erros)
- Network: todos arquivos com status 200

---

## 💡 Customizações Rápidas

### Alterar Seu Nome
Arquivo: `index.html`
```html
<h1>Rafael Carlesso</h1>  <!-- Mude aqui -->
```

### Alterar Email
Arquivo: `index.html`
```html
<a href="mailto:rafael@example.com">rafael@example.com</a>
```

### Alterar Cores Principais
Arquivo: `css/styles.css`
```css
:root {
  --primary: #00A86B;     /* Verde - mude aqui */
  --secondary: #00D4B4;   /* Teal - mude aqui */
}
```

### Adicionar Novo Projeto
Arquivo: `index.html`
Na seção Projects:
```html
<div class="project-card">
  <h3>Seu Projeto</h3>
  <p>Descrição</p>
  <span class="tech">React</span>
  <a href="#">Ver Projeto →</a>
</div>
```

---

## 🌐 API Endpoints (se rodar com Node.js)

```
GET  http://localhost:3000/                  Página inicial
GET  http://localhost:3000/api/portfolio     Dados do portfólio
GET  http://localhost:3000/api/skills        Skills detalhados
GET  http://localhost:3000/api/projects      Lista de projetos
POST http://localhost:3000/api/contact       Submeter formulário
GET  http://localhost:3000/api/health        Status do servidor
```

### Exemplo com curl:
```powershell
# Testar API
curl http://localhost:3000/api/portfolio
```

---

## 📦 Dependências (package.json)

```json
{
  "name": "portfolio",
  "version": "2.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2"
  }
}
```

Para instalar: `npm install`

---

## 🔐 Segurança

### Em Desenvolvimento (localhost)
```javascript
// CORS liberado para testes
app.use(cors());
```

### Em Produção
```javascript
// Restringir apenas seu domínio
app.use(cors({
  origin: 'https://seudominio.com'
}));
```

---

## 📊 Performance

### Verificar Lighthouse
1. Abrir DevTools (F12)
2. Aba "Lighthouse"
3. Clicar "Analyze page load"
4. Score deve estar 85+ para v2.0

---

## ✅ Checklist Final

- [ ] Node.js instalado? (npm --version)
- [ ] npm install rodou sem erros?
- [ ] npm start iniciou servidor?
- [ ] Acessou http://localhost:3000?
- [ ] Página carregou com cores?
- [ ] Mouse effect funciona?
- [ ] Tema escuro/claro alterna?
- [ ] Form valida corretamente?
- [ ] F12 Console sem erros?
- [ ] Responsivo no mobile? (F12 + device toggle)

---

## 🆘 Precisa de Ajuda?

### Verificar Erros
```powershell
# Rodar com logs mais detalhados
$env:DEBUG=*; npm start
```

### Resetar Tudo
```powershell
# Limpar cache e reinstalar
rm -r node_modules
rm package-lock.json
npm install
npm start
```

### Mais Info
- Veja: `PROFESSIONAL_DOCS.md` (docs completas)
- Veja: `LIGHT_EFFECT_DOCS.md` (efeito de luz)
- Veja: `README.md` (overview geral)

---

## 🎓 Próximos Passos

1. ✅ Servidor rodando?
2. customizar dados pessoais
3. adicionar seus projetos
4. testar em mobile real
5. fazer deploy (Netlify, Vercel, etc)
6. compartilhar no portfolio! 🚀

---

**Última atualização:** Fevereiro 2026  
**Versão:** 2.0 Professional  
**Status:** ✅ Production Ready
