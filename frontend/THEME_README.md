# Sistema de Temas - Light/Dark Mode

## Visão Geral

O dashboard agora possui um sistema completo de temas que permite alternar entre modo claro (light) e escuro (dark). O sistema é responsivo e se adapta automaticamente às preferências do usuário.

## Funcionalidades

### 🎨 Temas Disponíveis
- **Light Mode**: Tema claro com fundo branco e texto escuro
- **Dark Mode**: Tema escuro com fundo escuro e texto claro

### 🔄 Alternância Automática
- **Preferência do Sistema**: Detecta automaticamente a preferência do sistema operacional
- **Persistência**: Salva a escolha do usuário no localStorage
- **Transições Suaves**: Animações de transição entre os temas

### 🎯 Componentes Adaptados
- Cards e containers
- Tabelas de dados
- Formulários e inputs
- Modais e popups
- Gráficos (Chart.js)
- Botões e elementos interativos

## Como Usar

### Para o Usuário
1. **Botão de Tema**: Clique no botão circular no canto superior direito
2. **Ícones**: 
   - 🌙 Sol = modo escuro ativo (clique para ativar modo claro)
   - ☀️ Lua = modo claro ativo (clique para ativar modo escuro)
3. **Atalhos**: Use Enter ou Espaço no botão para alternar

### Para Desenvolvedores

#### 1. Serviço de Tema
```typescript
import { ThemeService } from './services/theme.service';

constructor(private themeService: ThemeService) {}

// Obter tema atual
const currentTheme = this.themeService.getCurrentTheme();

// Alternar tema
this.themeService.toggleTheme();

// Definir tema específico
this.themeService.setTheme('dark');

// Observar mudanças
this.themeService.theme$.subscribe(theme => {
  console.log('Tema alterado para:', theme);
});
```

#### 2. Variáveis CSS
O sistema usa variáveis CSS que se adaptam automaticamente:

```css
/* Light Mode */
:root {
  --bg-primary: #ffffff;
  --text-primary: #212529;
  --card-bg: #ffffff;
  --border-color: #dee2e6;
}

/* Dark Mode */
body.dark-mode {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --card-bg: #2d2d2d;
  --border-color: #404040;
}
```

#### 3. Adaptando Componentes
Para adaptar novos componentes ao tema:

```scss
.meu-componente {
  background-color: var(--card-bg);
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  transition: all 0.3s ease;
}
```

#### 4. Gráficos
Para gráficos Chart.js, use o método `updateChartTheme()`:

```typescript
private updateChartTheme(theme: Theme): void {
  const isDark = theme === 'dark';
  const textColor = isDark ? '#ffffff' : '#212529';
  const gridColor = isDark ? '#404040' : '#dee2e6';
  
  // Atualizar cores do gráfico
  this.chartOptions.plugins.legend.labels.color = textColor;
  this.chartOptions.scales.y.ticks.color = textColor;
  // ... outras configurações
}
```

## Estrutura de Arquivos

```
frontend/src/
├── app/
│   ├── components/
│   │   └── theme-toggle/
│   │       ├── theme-toggle.component.ts
│   │       ├── theme-toggle.component.html
│   │       └── theme-toggle.component.scss
│   └── services/
│       └── theme.service.ts
├── styles.scss (variáveis CSS globais)
└── main.ts (registro do locale)
```

## Personalização

### Cores Personalizadas
Para adicionar novas cores ao tema, adicione variáveis CSS:

```scss
:root {
  --minha-cor: #007bff;
}

body.dark-mode {
  --minha-cor: #0056b3;
}
```

### Novos Temas
Para adicionar novos temas, estenda o tipo `Theme`:

```typescript
export type Theme = 'light' | 'dark' | 'custom';
```

E adicione as classes CSS correspondentes.

## Compatibilidade

- ✅ Angular 15+
- ✅ Bootstrap 5
- ✅ Chart.js
- ✅ Todos os navegadores modernos
- ✅ Responsivo (mobile/desktop)

## Performance

- Transições suaves com CSS transitions
- Mudanças instantâneas sem recarregamento
- Persistência eficiente no localStorage
- Detecção automática de preferência do sistema 