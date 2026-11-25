# OpenBoard — Plano de Design

Este documento descreve as estilizações e decisões de design **já presentes no código-fonte** do projeto OpenBoard. Não é um plano futuro: é o registro do que foi implementado.

---

## 1. Assunto e público

- **Produto:** OpenBoard — índice aberto de vagas de startups de tecnologia
- **Público:** desenvolvedores, designers e PMs buscando vagas; startups que querem publicar vagas
- **Job primário:** buscar vagas por cargo, filtrar por área/regime e visualizar detalhes de cada oportunidade

---

## 2. Paleta de cores (tokens implícitos)

As cores são aplicadas diretamente com classes Tailwind (não há variáveis CSS `:root` centralizadas).

| Uso                             | Hex                                 | Onde aparece                                                                 |
| ------------------------------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| Background principal            | `#f8f9fa`                           | `body`, Header (com backdrop-blur), Footer, cards de vaga                    |
| Texto principal                 | `#0e1013`                           | Headings, nomes de empresa, títulos de vaga, links de navegação              |
| Texto secundário/muted          | `#5f6774`                           | Placeholders, metadados, descrições curtas, labels de rodapé                 |
| Borders / divisórias            | `#e2e5e9`                           | Inputs, cards, separadores, rodapé, linhas de conteúdo                       |
| Border sutil (transparente)     | `#e2e5e9/50`                        | Linhas entre seções internas dos cards                                       |
| **Cobalt (accent primário)**    | `#0047ff`                           | Botão `cobalt`, focus rings, badges `highlight`                              |
| Cobalt hover                    | `#003ad1`                           | Hover do botão `cobalt`                                                      |
| Cobalt com transparência        | `#0047ff/10`                        | Badge `highlight` background                                                 |
| Cobalt border com transparência | `#0047ff/20`                        | Badge `highlight` border                                                     |
| Cinza claro                     | `#e2e5e9`                           | Badge `outline` border                                                       |
| Cinza médio                     | `#ccd2d9`                           | Hover borders, badges desativados                                            |
| Fundo elevado                   | `#f1f3f5`                           | Hover de botões `outline`, Badge `muted`, ícones de estado vazio             |
| Fundo branco                    | `#ffffff`                           | Cards de vaga, fundo de seções alternadas, estados de carregamento/not found |
| Emergente (ping)                | `bg-emerald-400` / `bg-emerald-500` | Indicador de "Índice aberto" no Header                                       |
| Não há uso sistemático de       | cor de erro                         | Não há cor de erro definida no código                                        |

---

## 3. Tipografia

| Papel                    | Fonte                                                                       | Pesos                                                                                               | Tamanhos                                                                                                                 |
| ------------------------ | --------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Headings** (`h1`–`h6`) | `Plus Jakarta Sans`                                                         | `font-bold` (700+)                                                                                  | `text-4xl` → `text-6xl` (h1 Hero), `text-3xl` (JobDetail h1), `text-2xl` → `text-3xl` (h2), `text-base` / `text-lg` (h3) |
| **Body/UI**              | `Inter` (fallback: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto`) | `font-medium`, `font-normal`, `font-semibold`                                                       | `text-xs`, `text-sm`, `text-lg`, `text-xl`, `text-2xl`                                                                   |
| **Mono / Dados**         | `JetBrains Mono`                                                            | `font-mono`                                                                                         | `text-xs`, `text-sm`                                                                                                     |
| **Tracking**             | —                                                                           | `tracking-tight` (headings), `tracking-normal` (mono logo), `tracking-wide` (label "Index ao vivo") | —                                                                                                                        |
| **Leading**              | —                                                                           | `leading-[1.08]` (h1 Hero), `leading-relaxed` (parágrafos)                                          | —                                                                                                                        |

**Tratamentos observados no código:**

- **Zero ALL-CAPS** em labels (exceto `uppercase` no `JobFiltersSidebar` para o título "Filtros")
- **Middle-dot `·`** usado como separador entre empresa e data no `JobCard`, e entre links no `Footer`
- **`→` em botões** (ex: "Candidatar-se →", "Voltar para as vagas ←") e `←` em botões de retorno
- **Line-height**: `leading-[1.08]` para h1 Hero, `leading-relaxed` para corpo de texto

---

## 4. Componentes de UI

### Button (`src/shared/ui/Button.tsx`)

Variantes disponíveis:

| Variant     | Background                    | Texto            | Hover                        |
| ----------- | ----------------------------- | ---------------- | ---------------------------- |
| `primary`   | `#0e1013`                     | `text-white`     | `#1f242c`                    |
| `secondary` | `#e2e5e9`                     | `text-[#0e1013]` | `#d6dbe0`                    |
| `outline`   | `bg-white` + border `#e2e5e9` | `text-[#0e1013]` | `#f1f3f5` + border `#ccd2d9` |
| `cobalt`    | `#0047ff`                     | `text-white`     | `#003ad1`                    |
| `ghost`     | transparente                  | `text-[#0e1013]` | `#e2e5e9/50`                 |

Tamanhos: `sm`, `md`, `lg`  
Estados compartilhados: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047ff]`, `active:scale-[0.98]`, `disabled:opacity-50 disabled:pointer-events-none`, `motion-reduce:transition-none motion-reduce:active:scale-100`

### Badge (`src/shared/ui/Badge.tsx`)

| Variant     | Estilo                                                                              |
| ----------- | ----------------------------------------------------------------------------------- |
| `highlight` | `font-mono font-semibold bg-[#0047ff]/10 text-[#0047ff] border border-[#0047ff]/20` |
| `muted`     | `text-[#5f6774] bg-[#f1f3f5]`                                                       |
| `outline`   | `text-[#5f6774] border border-[#e2e5e9]`                                            |

Tamanho fixo: `text-xs px-2 py-0.5 rounded`

### FilterGroup (`src/shared/ui/FilterGroup.tsx`)

- `<fieldset>` sem border, padding 0, margin 0
- `<legend>` com `text-xs font-medium text-[#5f6774] mb-1`
- Opções como `<button>` com `aria-pressed`
- Estados: `selected` (`bg-[#0e1013] text-white shadow-xs` ou `bg-[#0047ff] text-white shadow-xs`) vs `idle` (`bg-[#f8f9fa] text-[#5f6774] border border-[#e2e5e9] hover:border-[#ccd2d9] hover:text-[#0e1013]`)
- Variantes: `dark` ou `primary` (afetam cor de seleção)
- Contador opcional (`showCount`) com badge `text-[10px] font-mono px-1.5 py-0.5 rounded`
- Focus: `focus-visible:outline-2 focus-visible:outline-[#0047ff]`

### SearchBar (`src/features/jobs/components/SearchBar.tsx`)

- Wrapper `.search-wrapper w-full sm:max-w-xs`
- Label `sr-only` ("Buscar vagas por cargo")
- Input com classes `.input pr-10` (padding direito para ícone)
- Ícone SVG de lupa absoluto à direita (`className="search-icon"`)
- Placeholder: "Buscar por cargo (ex: design, engineer, manager...)"

### JobCard (`src/features/jobs/components/JobCard.tsx`)

- Layout: `group flex flex-col md:flex-row md:items-center justify-between p-4 sm:p-5 hover:bg-[#f8f9fa] transition-colors motion-reduce:transition-none gap-4`
- Otimização: `[content-visibility:auto] [contain-intrinsic-size:96px]`
- Avatar: inicial da empresa, `w-11 h-11 rounded bg-[#0e1013] text-white font-bold text-sm shadow-xs select-none`
- Badges: salário (`highlight`), workplace type (`muted`), type de contrato (`outline`)
- Botão "Candidatar-se" com `→`, `group-hover:border-[#0047ff] group-hover:text-[#0047ff]`

### JobFiltersSidebar (`src/features/jobs/components/JobFiltersSidebar.tsx`)

- `aside sticky top-20` (desktop)
- Título "Filtros" em `text-xs font-mono uppercase tracking-wider font-semibold text-[#0e1013]`
- Botão "Limpar" em `text-xs text-[#0047ff] hover:underline cursor-pointer`
- Dois `FilterGroup`: Área de atuação e Regime de contratação
- Separador `h-px bg-[#e2e5e9]` entre grupos

### JobsEmptyState (`src/features/jobs/components/JobsEmptyState.tsx`)

- Container `bg-white border border-[#e2e5e9] rounded-lg p-12 text-center`
- Ícone `/` em `w-10 h-10 rounded-full bg-[#f1f3f5] text-[#5f6774] flex items-center justify-center mx-auto mb-3 text-lg font-mono`
- Título `text-base font-semibold text-[#0e1013] mb-1`
- Texto `text-sm text-[#5f6774] mb-4 max-w-sm mx-auto`
- Botão `outline` "Limpar todos os filtros"

### Hero (`src/shared/components/Hero.tsx`)

- Container `pt-14 pb-12 sm:pt-20 sm:pb-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#e2e5e9]`
- Título `text-4xl sm:text-5xl lg:text-6xl font-bold text-[#0e1013] tracking-tight leading-[1.08] mb-6`
- Parágrafo `text-lg sm:text-xl text-[#5f6774] leading-relaxed mb-8 max-w-2xl font-normal`
- Botão `primary` "Publicar vaga por R$ 299"
- Link "Explorar vagas abertas ↓" com hover `text-[#0e1013] hover:bg-[#e2e5e9]/50`

### Header (`src/shared/components/Header.tsx`)

- `sticky top-0 z-40 bg-[#f8f9fa]/90 backdrop-blur-md border-b border-[#e2e5e9]`
- Logo "OB" em `w-7 h-7 rounded bg-[#0e1013] text-white flex items-center justify-center text-xs font-mono font-bold tracking-normal`
- Status "Índice aberto" com ping animado `animate-ping bg-emerald-400` + ponto `bg-emerald-500`
- Link "Entrar" e botão `cobalt` "Publicar vaga R$ 299"

### Footer (`src/shared/components/Footer.tsx`)

- `border-t border-[#e2e5e9] bg-[#f8f9fa] py-8 text-xs text-[#5f6774]`
- Links com `hover:text-[#0e1013] transition-colors`
- Separador `·` entre marca e descrição

### JobDetail (`src/pages/JobDetail.tsx`)

- Layout centralizado `max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12`
- Avatar da empresa `w-16 h-16 rounded bg-[#0e1013]`
- Título da vaga `text-3xl font-bold text-[#0e1013]`
- Salário `font-mono text-2xl font-bold text-[#0047ff]`
- Botão `cobalt` "Candidatar-se a esta vaga"
- Navegação entre vagas: botões `outline` "Anterior" / "Próxima" com `←` / `→`
- Estado vazio: `?` em círculo, "Vaga não encontrada"

### NotFound (`src/pages/NotFound.tsx`)

- `min-h-[60vh] flex items-center justify-center`
- "404" em `w-20 h-20 rounded-full bg-[#f1f3f5] text-[#5f6774] flex items-center justify-center mx-auto mb-6 text-5xl font-bold`
- Botão `cobalt` "← Voltar para a página inicial"

---

## 5. Layout e espaçamento

| Elemento                  | Classes                                                      | Observação                             |
| ------------------------- | ------------------------------------------------------------ | -------------------------------------- |
| Container principal       | `max-w-6xl mx-auto px-4 sm:px-6 lg:px-8`                     | Largura máxima 6xl, padding responsivo |
| Hero section              | `pt-14 pb-12 sm:pt-20 sm:pb-16 border-b`                     | Padding generoso + borda inferior      |
| Cards / seções com border | `border border-[#e2e5e9] rounded-lg`                         | Borda sutil + raio médio               |
| Grid de vagas             | `grid grid-cols-1 lg:grid-cols-4 gap-8 items-start`          | 1 coluna mobile, 4 desktop             |
| Sidebar de filtros        | `lg:col-span-1 sticky top-20 bg-white border rounded-lg p-5` | Fixa no desktop, empilha no mobile     |
| Header                    | `h-16`                                                       | Altura fixa de 64px                    |
| Espaçamento interno       | `p-4 sm:p-5`, `px-4 py-2.5`                                  | Padrão de componentes                  |
| Seção de detalhes         | `p-8 space-y-8`                                              | Espaçamento vertical entre blocos      |

---

## 6. Estados e interações

- **Focus visível:** `outline-2 outline-offset-2 outline-[#0047ff]` em todos os elementos interativos
- **Hover em botões:** transição de cor de fundo (`duration-150`)
- **Hover em cards:** `hover:bg-[#f8f9fa]`
- **Active:** `active:scale-[0.98]`
- **Reduced motion:** `motion-reduce:transition-none`, `motion-reduce:active:scale-100`
- **Disabled:** `disabled:opacity-50 disabled:pointer-events-none`
- **Animação ping:** `animate-ping` no indicador de índice aberto (escondido com `motion-reduce:hidden`)

---

## 7. Acessibilidade (observável no código)

- `aria-label` em filtros, botões sem texto visível, ícones
- `aria-pressed` em botões de seleção (FilterGroup)
- `aria-invalid` e `aria-describedby` em inputs com erro (Newsletter)
- `aria-live="polite"` + `aria-atomic="true"` no contador de vagas filtradas
- `aria-labelledby` em cards de vaga
- `sr-only` labels em inputs sem label visível
- `aria-hidden="true"` em elementos decorativos
- `role="alert"` em mensagens de erro
- `role="status"` em estados vazios
- `aria-busy="true"` em estados de carregamento

---

## 8. Diferenças entre plano anterior e código real

O plano anterior foi descartado. Este documento reflete estritamente o código-fonte atual:

| Item                              | Plano anterior (deletado) | Código real do projeto                       |
| --------------------------------- | ------------------------- | -------------------------------------------- |
| Tokens CSS `:root` centralizados  | Sim                       | Não — classes Tailwind inline                |
| Cor `amber` para salários         | Sim                       | Não — salário usa Badge `highlight` (cobalt) |
| Fontes com `clamp()` fluid        | Sim                       | Não — tamanhos fixos Tailwind                |
| Variantes `btn-ghost` etc. no CSS | Sim                       | Não — variantes estão no `Button.tsx`        |
| Badge `new` animada               | Sim                       | Não — não existe no projeto                  |

---

## 9. Como usar este plano

Ao adicionar componentes ou estilizar novas telas:

1. Reuse as variantes existentes do `Button`, `Badge`, `FilterGroup` antes de criar novas
2. Mantenha a paleta `#0e1013`, `#0047ff`, `#5f6774`, `#e2e5e9`, `#f8f9fa`
3. Use `Plus Jakarta Sans` para headings, `Inter` para body, `JetBrains Mono` para dados
4. Mantenha focus visible com `outline-[#0047ff]`
5. Respeite `motion-reduce` para usuários com movimento reduzido
