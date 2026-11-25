# 📋 RULES — Regras & Padrões do Projeto OpenBoard

Este documento estabelece as regras obrigatórias de desenvolvimento, arquitetura, acessibilidade, performance e fluxo de trabalho para o projeto **OpenBoard**.

---

## 1. 🌐 Regras de Idioma e Nomenclatura (Language & Naming Conventions)

A regra de ouro do projeto para código e escrita é:

> **Código técnico em Inglês, Conteúdo visual para o usuário em Português.**

### 1.1 Código (Strictly English)

Todos os identificadores no código devem ser escritos obrigatoriamente em **inglês**, incluindo:

- **Componentes**: `Jobs`, `Header`, `Hero`, `Testimonials`, `Newsletter`, `Footer`, `Button`, `Layout`, etc.
- **Funções e Métodos**: `toggleType`, `toggleArea`, `clearFilters`, `handleApply`, `handleSubmit`, `handleLoginClick`.
- **Hooks e Estados**: `selectedTypes`, `selectedAreas`, `isPending`, `startTransition`, `email`, `subscribed`, `error`.
- **Tipos, Interfaces e Enums**: `IJob`, `IJobType`, `IJobArea`, `IButtonProps`, `ITestimonial`.
- **Objetos, Constantes e Mappings**: `INITIAL_JOBS`, `TYPE_OPTIONS`, `AREA_OPTIONS`, `AREA_COUNTS`, `TYPE_LABELS`, `BASE_STYLES`, `VARIANTS`, `SIZES`.
- **Arquivos e Pastas**: `Jobs/`, `Testimonials/`, `JobCard.tsx`, `Newsletter.tsx`, `Home.tsx`.

### 1.2 Convenções de Caixa e Nomenclatura (Casing & Prefixes)

- **Interfaces (Prefixo Obrigatório `I`)**: Todas as interfaces TypeScript devem obrigatoriamente iniciar com o prefixo `I` em `PascalCase` (`IJob`, `ITestimonial`, `IButtonProps`, `IJobCardProps`, `IFilterOption`).
- **Componentes e Tipos (`type`)**: `PascalCase` (`JobCard.tsx`, `type IJobType = ...`).
- **Funções, Métodos, Variáveis e Hooks**: `camelCase` (`toggleType`, `clearFilters`, `hasActiveFilters`, `useJobs`).
- **Constantes Globais/Módulo**: `UPPER_SNAKE_CASE` (`INITIAL_JOBS`, `AREA_OPTIONS`, `AREA_COUNTS`).
- **Diretórios de Features**: `camelCase` para pastas de feature (`features/jobs/`, `features/newsletter/`) e suas subpastas funcionais (`components/`, `hooks/`, `types/`, `utils/`, `context/`, `data/`). Componentes dentro de features usam `PascalCase` (`JobCard.tsx`, `JobFiltersSidebar.tsx`). Componentes de design system ficam em `shared/ui/` e layout global em `shared/components/`.

### 1.3 Arquitetura de Componentes — Feature Folders

O projeto adota o padrão **Feature Folders**: cada domínio de negócio é uma "ilha" autossuficiente dentro de `src/features/`. Código verdadeiramente global fica em `src/shared/`.

#### Regras inegociáveis da arquitetura

1. **Features são ilhas isoladas**:
   - Uma feature **nunca importa diretamente** de outra feature (`jobs/` não importa de `newsletter/`).
   - Se dois domínios precisarem compartilhar algo, o artefato sobe para `src/shared/`.

2. **`index.ts` é a única fronteira pública**:
   - Fora de uma feature, importa-se exclusivamente via `index.ts` da mesma.
   - ✅ `import { Jobs } from "../features/jobs"`
   - ❌ `import { JobCard } from "../features/jobs/components/JobCard"` (caminho interno)

3. **Tipos e dados pertencem à feature**:
   - Interfaces, tipos e dados mockados vivem **dentro** da feature que os usa (`types/`, `data/`).
   - Não existem pastas globais `interfaces/`, `data/` ou `utils/` na raiz de `src/`.

4. **Componentização Atômica dentro de cada feature**:
   - Cada subcomponente tem responsabilidade única e bem definida (ex: `JobCard.tsx`, `JobFiltersSidebar.tsx`, `JobList.tsx`, `JobsEmptyState.tsx`).
   - Lógica de estado/efeito fica em hooks dedicados (`hooks/`), nunca misturada ao JSX.
   - Context API (`context/`) é usada dentro da feature para evitar prop drilling.

5. **`src/shared/` para o design system e layout**:
   - `shared/ui/` → componentes atômicos sem estado de negócio (`Button`, `Badge`, `FilterGroup`).
   - `shared/components/` → componentes de layout global (`Header`, `Footer`, `Hero`, `Layout`).
   - Componentes em `shared/` **podem** importar de `shared/ui/`, mas **nunca** de `features/`.

#### Estrutura de referência de uma feature

```
features/jobs/
├── components/   # Componentes React (apenas JSX + consumo de hooks/contexto)
├── context/      # Context + Provider (compartilhamento de estado interno)
├── hooks/        # Custom hooks (fetch, lógica, derivações)
├── types/        # Interfaces e tipos TypeScript (prefixo I obrigatório)
├── utils/        # Funções puras sem efeitos colaterais
└── index.ts      # Única exportação pública da feature
```

#### Adicionando uma nova feature

```bash
mkdir -p src/features/companies/{components,hooks,types}
# Crie os arquivos dentro — sem tocar em nada de jobs/ ou newsletter/
# Exporte apenas o necessário via src/features/companies/index.ts
```

### 1.4 Conteúdo do Usuário (UI / Copy em Português)

- Textos visíveis na tela, botões, labels, mensagens de sucesso, mensagens de erro e atributos acessíveis destinados ao leitor de tela (ex: `aria-label`) devem permanecer em **Português do Brasil (`pt-BR`)**.
- Exemplo:

  ```tsx
  <Button
    aria-label={`Candidatar-se à vaga ${job.title} na empresa ${job.company}`}
  >
    Candidatar-se →
  </Button>
  ```

---

## 2. ⚡ Padrões de Performance (Vercel React Best Practices)

O projeto segue rigorosamente o catálogo oficial de performance da Vercel:

1. **Eliminação de Waterfalls & Code Splitting (`async-` e `bundle-`)**:
   - Rotas principais devem ser carregadas dinamicamente com `React.lazy()` e encapsuladas em `<Suspense fallback={...}>`.
   - Evitar "barrel files" (exportações agregadoras em `index.ts` desnecessárias); importar componentes diretamente de seus arquivos.

2. **Otimização de Re-renderizações (`rerender-`)**:
   - **Zero `useEffect` para Estado Derivado**: Nunca sincronize estado derivado usando `useEffect`. Calcule valores derivados (como listas filtradas) diretamente durante o render.
   - **`useTransition`**: Ações que disparam atualizações de interface em listas (ex: alternar filtros) devem ser encapsuladas em `startTransition` para não bloquear a thread principal.
   - **Atualizações Funcionais de Estado**: Sempre que o próximo estado depender do anterior, use a forma funcional `setState(prev => ...)`.

3. **Performance de Renderização no Navegador (`rendering-`)**:
   - **`content-visibility: auto`**: Aplicar `[content-visibility:auto] [contain-intrinsic-size:96px]` em listas ou feeds para evitar cálculos desnecessários de layout e pintura fora da viewport.
   - **Operador Ternário Estrito**: Para renderizações condicionais, use ternário (`condition ? <Component /> : null`), evitando a armadilha do `0` renderizado na tela ao usar `&&`.
   - **Proibição de Ternários Aninhados (`no-nested-ternary` / `typescript:S3358`)**: *Ternary operators should not be nested*. É estritamente proibido aninhar operadores ternários (`cond1 ? a : cond2 ? b : c`). Extraia a lógica para uma instrução ou variável independente antes do retorno (*"Extract this nested ternary operation into an independent statement"*).

4. **Performance de JavaScript & Boas Práticas (`js-`)**:
   - **Proibição de APIs Obsoletas (`typescript:S1874`)**: *Deprecated APIs should not be used*. Nunca utilize métodos, funções, propriedades ou tipos marcados como deprecated pelo TypeScript, React ou bibliotecas externas. Utilize as alternativas modernas recomendadas.
   - **Lookups $O(1)$ com `Set` / `Map`**: Para comparações e filtros de múltiplos itens, converta arrays em `Set` antes de iterar, evitando buscas lineares $O(N)$ repetitivas.
   - **Saída Precoce (`js-early-exit`)**: Em filtros e predicados, retorne imediatamente `false` no primeiro critério não satisfeito.
   - **Hoisting Estático**: Constantes, estilos base, dicionários e contagens estáticas devem ser declarados fora do corpo dos componentes, no nível do módulo.

---

## 3. ♿ Padrões de Acessibilidade (WCAG 2.1 AA)

A acessibilidade é requisito inegociável em todos os componentes:

1. **HTML Semântico sobre ARIA (`typescript:S6819`)**:
   - *Prefer tag over ARIA role*: Sempre prefira elementos HTML semânticos nativos (`<button>`, `<nav>`, `<aside>`, `<main>`, `<article>`, `<header>`, `<footer>`, `<dialog>`) em vez de aplicar atributos `role="..."` equivalentes em elementos genéricos como `<div>` ou `<span>`. Use `role` apenas quando o HTML5 nativo não oferecer um elemento equivalente (ex: `role="status"` ou `role="feed"`).

2. **Formulários**:
   - Todo `<input>` deve ter um `<label>` explicitamente conectado via `htmlFor` e `id`. Se visualmente oculto, use a classe `sr-only`.
   - Campos obrigatórios devem declarar `aria-required="true"`.
   - Mensagens de erro devem ser vinculadas ao campo via `aria-describedby` e possuir `role="alert"`. O input em estado de erro deve receber `aria-invalid="true"`.

2. **Navegação & Semântica**:
   - Proibido usar `<div>` ou `<span>` com `onClick` para ações; utilize `<button>` nativo com `type="button"` ou `type="submit"`.
   - Links devem usar a tag `<a>` com `href` válido.
   - Fornecer **Skip Link** no layout principal (`<a href="#main-content" className="sr-only focus:not-sr-only ...">`) para usuários de teclado.
   - Botões de alternância (tags de filtro) devem utilizar `aria-pressed={isSelected}` e ser agrupados com `<div role="group" aria-label="...">`.

3. **Leitores de Tela**:
   - Atualizações assíncronas ou filtros em tempo real devem usar `aria-live="polite"` e `aria-atomic="true"`.
   - Elementos decorativos (ícones, separadores `·`, marcadores visuais `●`, monogramas visuais) devem conter `aria-hidden="true"`.

4. **Movimento Reduzido (Motion Safety)**:
   - Respeitar a preferência do sistema operacional via `@media (prefers-reduced-motion: reduce)` no CSS global e classes `motion-reduce:transition-none motion-reduce:active:scale-100`.

---

## 4. 🎨 Padrões de Design e UI ("The Open Index")

O design do OpenBoard foge de templates genéricos e adota o conceito editorial de alta agência:

- **Paleta Mineral**:
  - `Ink Paper`: `#0e1013` (texto principal e contrastes profundos)
  - `Clean Chalk`: `#f8f9fa` (fundo limpo mineral)
  - `Slate Wire`: `#e2e5e9` (linhas de separação e bordas cirúrgicas)
  - `Cobalt Signal`: `#0047ff` (acento singular para salários, focos e destaques)
  - `Muted Graphite`: `#5f6774` (metadados secundários e timestamps)
- **Tipografia**:
  - Títulos: `Plus Jakarta Sans`
  - Corpo: `Inter`
  - Dados tabulares e salários: `JetBrains Mono`
- **Foco Visível**:
  - Anéis de foco claros e padronizados em todos os botões e links: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0047ff]`.

---

## 5. 📦 Fluxo Git & Convenção de Commits

1. **Padrão Conventional Commits (em Português)**:
   - `feat(...)`: nova funcionalidade
   - `fix(...)`: correção de defeito
   - `perf(...)`: melhoria de performance
   - `style(...)`: ajustes visuais, formatação, CSS ou tokens
   - `refactor(...)`: refatoração sem alteração de funcionalidade
   - `chore(...)`: configurações, scripts, skills ou dependências
   - `docs(...)`: documentação ou regras
2. **Commits Pequenos e Atômicos**:
   - Cada commit deve representar uma unidade lógica e independente de trabalho.
3. **Quality Gate Obrigatório**:
   - Antes de qualquer commit, a suíte de verificação deve passar com **0 erros**:

     ```bash
     npm run lint && npm run build
     ```
