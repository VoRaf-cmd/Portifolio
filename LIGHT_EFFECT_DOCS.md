# 💡 Documentação: Efeito de Luz que Segue o Mouse

## 🎯 Visão Geral

O efeito de luz é uma combinação de CSS avançado com JavaScript que cria um gradiente radial que segue o cursor do mouse em tempo real. Mantém o header sticky, a imagem e nome sempre visíveis.

## 📐 Arquitetura do Efeito

### 1. **HTML Structure** (`index.html`)

```html
<!-- Elemento de efeito de luz -->
<div class="mouse-light"></div>

<!-- Cursor customizado com brilho -->
<div class="cursor-follower"></div>
```

**Posição**: São os primeiros elementos da `<body>`, garantindo que fiquem por baixo de todo o conteúdo enquanto o `z-index` permite visualização.

### 2. **CSS Styling** (`css/styles.css`)

#### `.mouse-light`
```css
.mouse-light {
  position: fixed;              /* Fixo em relação à viewport */
  width: 400px;                 /* Tamanho do efeito */
  height: 400px;
  background: radial-gradient(
    circle,
    rgba(0, 168, 107, 0.15) 0%,      /* Centro brilhante */
    rgba(0, 168, 107, 0.05) 40%,     /* Transição */
    rgba(0, 168, 107, 0) 70%         /* Desaparece */
  );
  border-radius: 50%;           /* Formato circular */
  pointer-events: none;         /* Não interfere com cliques */
  z-index: 1;                   /* Fica embaixo do conteúdo */
  filter: blur(40px);           /* Borra para efeito suave */
  transform: translate(-50%, -50%);  /* Centra no cursor */
  mix-blend-mode: screen;       /* Aplica modo de blend */
  opacity: 0;                   /* Invisível por padrão */
  transition: opacity 0.3s ease; /* Animação de aparição */
}

body:hover .mouse-light {
  opacity: 1;                   /* Fica visível no hover */
}
```

#### `.cursor-follower`
```css
.cursor-follower {
  position: fixed;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    var(--primary) 0%,          /* Centro sólido */
    rgba(0, 168, 107, 0.5) 70%,
    transparent 100%
  );
  pointer-events: none;
  opacity: 0.8;
  z-index: 9999;                /* Fica por cima */
  transform: translate(-50%, -50%);
  box-shadow: 0 0 20px rgba(0, 168, 107, 0.6),   /* Glow */
              0 0 40px rgba(0, 168, 107, 0.3);
  animation: cursorGlow 2s ease-in-out infinite; /* Pulsa */
}

body:hover .cursor-follower {
  display: block;
}

@keyframes cursorGlow {
  0%, 100% { 
    box-shadow: 0 0 20px rgba(0, 168, 107, 0.6), 
                0 0 40px rgba(0, 168, 107, 0.3); 
  }
  50% { 
    box-shadow: 0 0 30px rgba(0, 168, 107, 0.8), 
                0 0 60px rgba(0, 168, 107, 0.4); 
  }
}
```

### 3. **JavaScript Logic** (`js/script.js`)

```javascript
// Elementos DOM
const cursor = document.querySelector('.cursor-follower');
const mouseLight = document.querySelector('.mouse-light');

// Event listener para movimento do mouse
document.addEventListener('mousemove', e => {
  const clientX = e.clientX;
  const clientY = e.clientY;
  
  // Atualiza posição do cursor follower
  if (cursor) {
    cursor.style.left = clientX + 'px';
    cursor.style.top = clientY + 'px';
  }
  
  // Atualiza posição da luz
  if (mouseLight) {
    mouseLight.style.left = clientX + 'px';
    mouseLight.style.top = clientY + 'px';
  }
});
```

**Execução**: 
- O event listener `mousemove` dispara continuamente enquanto o mouse se move
- Cada disparo atualiza a posição de ambos os elementos
- Usa coordenadas `clientX` e `clientY` (relativas à viewport)

## 🎨 Propriedades Customizáveis

### Para Intensidade do Efeito
```css
/* Aumente a opacidade para efeito mais visível */
.mouse-light {
  opacity: 0;           /* Mude para 0.3 para sempre visível */
}

/* Aumente o tamanho */
.mouse-light {
  width: 400px;         /* Ou 600px para maior */
  height: 400px;        /* Ou 600px para maior */
}

/* Aumente o desfoque para suavidade */
filter: blur(40px);     /* Ou 60px para mais suave */
```

### Para Alterar a Cor
```css
/* Mude a cor primária em :root */
:root {
  --primary: #00A86B;   /* Verde atual */
  /* Opções: #FF6B6B (vermelho), #4D96FF (azul), #FFD700 (ouro) */
}

/* A cor será aplicada automaticamente */
background: radial-gradient(
  circle,
  rgba(0, 168, 107, 0.15) 0%,  /* Muda com --primary */
  ...
);
```

### Para Alterar Comportamento de Aparição
```css
/* Mostrar sempre (sem hover) */
body:hover .mouse-light {
  opacity: 1;
}
/* Mude para: */
.mouse-light {
  opacity: 0.5;         /* Sempre visível em 50% */
}

/* Mudar velocidade de aparição */
transition: opacity 0.3s ease;  /* Mude 0.3s para outro valor */
```

## 🔄 Modo Claro vs Escuro

No modo escuro, o efeito é automaticamente ajustado graças ao `mix-blend-mode: screen`:

- **Modo Claro**: A luz adiciona brilho (aditivo)
- **Modo Escuro**: A luz continua visível com ajustes de opacidade

Sistema de tema é controlado por:
```javascript
const themeBtn = document.getElementById('themeToggle');
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', ...);
});
```

## 📊 Backend API (`server.js`)

### Endpoint: GET `/api/light-config`

Retorna configuração do efeito:
```json
{
  "enabled": true,
  "intensity": 0.15,
  "radius": 400,
  "blurAmount": 40,
  "color": {
    "r": 0,
    "g": 168,
    "b": 107
  },
  "mixBlendMode": "screen"
}
```

Pode ser usado para:
- Pré-carregar configurações
- Personalizar por usuário
- Teste/Debug

### Endpoint: POST `/api/track-mouse`

Rastreia movimento (opcional):
```javascript
document.addEventListener('mousemove', e => {
  // Enviar dados (de forma throttled)
  fetch('/api/track-mouse', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now()
    })
  });
});
```

## ⚡ Performance Otimizações

1. **pointer-events: none** - Elementos não interceptam eventos do mouse
2. **fixed positioning** - Mais eficiente que absolute em viewport fixa
3. **hardware acceleration** - `transform` usa GPU (mais rápido que top/left)
4. **CSS gradients** - Renderizados eficientemente
5. **Event listener único** - Não cria múltiplas listeners

## 🎬 Animações Associadas

### Cursor Glow (Pulsante)
```css
@keyframes cursorGlow {
  0%, 100% { box-shadow: ... }    /* Min */
  50% { box-shadow: ... }         /* Max */
}
```
O cursor pulsa continuamente para efeito vivo.

## 📱 Responsividade

O efeito funciona em:
- Desktop (testado em 1920x1080, 2560x1440)
- Tablets (com mouse acoplado ou touchpad)
- Não é visível em dispositivos touch-only (sem cursor)

## 🔗 Integração com Outras Animações

Funciona em conjunto com:
- **Parallax 3D**: O efeito de luz não interfere com rotação do hero
- **Smooth Scroll**: Ativa automaticamente ao scroll
- **Tema Dinâmico**: Cores adaptam ao tema selecionado

## 📝 Exemplo de Customização Avançada

Para criar variações do efeito:

```javascript
// Deixar múltiplos focos de luz
const lights = document.querySelectorAll('.mouse-light, .mouse-light-alt');
document.addEventListener('mousemove', e => {
  lights.forEach((light, idx) => {
    const offset = idx * 20;
    light.style.left = (e.clientX + offset) + 'px';
    light.style.top = (e.clientY - offset) + 'px';
  });
});
```

## 🐛 Debugging

Para visualizar os elementos:
```css
.mouse-light {
  border: 1px solid red;  /* Vê o tamanho */
  opacity: 0.5;           /* Aumenta visibilidade */
}
```

## 📚 Referências

- [Radial Gradient MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient())
- [Mix Blend Mode MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
- [Transform Performance](https://web.dev/transform-performance/)
- [Event Throttling Techniques](https://developer.mozilla.org/en-US/docs/Glossary/Throttle)

---

**Versão**: 1.0  
**Última atualização**: Fevereiro 2026  
**Status**: ✅ Produção
