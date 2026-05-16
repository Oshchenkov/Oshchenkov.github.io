# About ME portfolio website with dark mode(by default)

## Project Structure Convention

```
app/
├── layout.tsx          # Root layout
├── page.tsx            # Root page
├── global-error.tsx    # Global error boundary
├── globals.css         # Global styles
├── blog/
│   ├── layout.tsx      # Nested layout
│   ├── page.tsx        # /blog
│   └── [slug]/
│       ├── page.tsx    # /blog/[slug]
│       └── error.tsx   # Route error boundary
src/
├── features/
│   ├── auth/
│   │   ├── components/     # LoginForm, RegisterForm
│   │   ├── hooks/          # useAuth, useLogin
│   │   ├── services/       # authAPI.ts
│   │   ├── types/          # auth.types.ts
│   │   └── index.ts        # Public API (re-exports)
│   ├── posts/
│   │   ├── components/     # PostList, PostItem
│   │   ├── hooks/          # usePosts, usePost
│   │   ├── services/       # postsAPI.ts
│   │   ├── types/          # post.types.ts
│   │   └── index.ts
│   └── dashboard/
│       ├── components/
│       ├── hooks/
│       └── index.ts
├── components/             # Shared/UI components
│   ├── Button.tsx
│   ├── Modal.tsx
│   └── Layout.tsx
├── hooks/                  # Global shared hooks
│   └── useTheme.ts
├── services/               # Global services
│   └── axiosInstance.ts
├── shared/                 # Cross-cutting concerns
│   ├── ui/                 # Common components
│   ├── lib/                # Utilities
│   └── config/
├── types/                  # Global types
│   └── common.types.ts
├── utils/                  # Shared utilities
└── store/                  # State management (Zustand/Redux)
```
