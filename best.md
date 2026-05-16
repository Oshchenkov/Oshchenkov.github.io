# Next.js 16 App Router Best Practices

Source: Next.js v16.2.2 documentation via Context7 (Benchmark: 88.51)

---

## 1. Server Components by Default

**Default rendering**: All layouts and pages in the `app/` directory are **Server Components** by default. No build step needed — server and client code share the same codebase.

**Why**: Server Components let you fetch data and render parts of your UI on the server, optionally cache the result, and stream it to the client. This reduces client-side JS bundle size.

```tsx
// app/page.tsx — Server Component (no directive needed)
async function getPosts() {
  const res = await fetch('https://...')
  const posts = await res.json()
  return posts
}

export default async function Page() {
  const posts = await getPosts()
  return <HomePage posts={posts} />
}
```

---

## 2. Client Components: When and How

Use `'use client'` only when you need:
- React state or hooks (`useState`, `useEffect`, etc.)
- Browser APIs
- Event handlers
- Interactivity

**Pattern**: Create a thin Server Component page that fetches data and passes it as props to a Client Component.

```tsx
// app/components/interactive.tsx
'use client'

import { useState } from 'react'

export default function LikeButton({ likes }: { likes: number }) {
  const [count, setCount] = useState(likes)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

```tsx
// app/page.tsx — Server Component
import LikeButton from './components/interactive'

export default async function Page() {
  const initialLikes = 42
  return <LikeButton likes={initialLikes} />
}
```

**Key rule**: `'use client'` must be the first line in the file. Client Components receive data as props from parent Server Components — they should not fetch data directly.

---

## 3. Data Fetching Patterns

Replace `getServerSideProps` / `getStaticProps` with the fetch API + async components.

### Static (default, cached until manually invalidated)
```tsx
const data = await fetch('https://...', { cache: 'force-cache' })
```

### Per-request (like `getServerSideProps`)
```tsx
const data = await fetch('https://...', { cache: 'no-store' })
```

### Time-based revalidation (like `getStaticProps` with `revalidate`)
```tsx
const data = await fetch('https://...', { next: { revalidate: 10 } })
```

### Shared cache (Next.js 16 feature — `use cache`)
```tsx
async function BlogPosts() {
  'use cache'
  cacheLife('hours')
  cacheTag('posts')
  // ...fetch and render
}
```

---

## 4. Streaming with Suspense

Wrap components that fetch dynamic data in `Suspense` for granular streaming:

```tsx
import { Suspense } from 'react'

export default function Page() {
  return (
    <>
      {/* Static content — prerendered immediately */}
      <header><h1>My Blog</h1></header>

      {/* Cached dynamic content */}
      <BlogPosts />

      {/* Runtime dynamic content — streams at request time */}
      <Suspense fallback={<p>Loading posts...</p>}>
        <LatestPosts />
      </Suspense>
    </>
  )
}
```

---

## 5. Root Layout and Pages

```tsx
// app/layout.tsx — Root Layout (wraps all routes)
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

// app/page.tsx — Root Page
export default function HomePage() {
  return <div>Hello</div>
}
```

- `layout.tsx`: Must accept `children` prop, define `html` and `body` tags.
- `page.tsx`: The default export renders at the route.
- Both are Server Components by default.

---

## 6. Error Boundaries

### Per-route error boundary
```tsx
// app/error.tsx
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}
```

### Global error boundary (`app/global-error.tsx`)
Must be a Client Component and include `html`/`body` tags:

```tsx
'use client'

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <html>
      <body>
        <h2>Something went wrong!</h2>
        <button onClick={() => unstable_retry()}>Try again</button>
      </body>
    </html>
  )
}
```

---

## 7. Dynamic Routes and Params in Client Components

```tsx
// app/blog/[slug]/page.tsx — Server Component
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  return <BlogPost slug={slug} />
}
```

```tsx
// app/blog/[slug]/BlogPost.tsx — Client Component
'use client'
import { use } from 'react'

export default function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = use(params)
  return <div>{slug}</div>
}
```

---

## 8. Navigation in Client Components

Use `next/navigation` hooks (only in Client Components):

```tsx
'use client'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Nav() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  return <button onClick={() => router.push('/about')}>About</button>
}
```

---

## 9. Server Actions

```tsx
async function createPost(formData: FormData) {
  'use server'
  await db.post.create({ data: { title: formData.get('title') } })
  updateTag('posts') // revalidate cache
}

// Usage in a Client Component:
// <form action={createPost}><input name="title" /></form>
```

---

## 10. Project Structure Convention

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
├── components/
│   ├── interactive.tsx # 'use client'
│   └── static.tsx      # Server Component
└── ui/                 # Reusable UI (Client Components)
```

- **`app/`**: File-system routing. Each folder = route segment.
- **`components/`**: Mixed Server/Client Components.
- **`ui/`**: Client-only reusable components (buttons, inputs, etc.).
- **`loading.tsx`**: Loading UI for a route segment.
- **`not-found.tsx`**: Custom 404 for a route segment.

---

## 11. Key Rules Summary

| Rule | Details |
|------|---------|
| Default to Server Components | Only add `'use client'` when necessary |
| Fetch in Server Components | Use fetch API with appropriate cache options |
| Pass data as props | Server → Client data flow is one-way |
| Use Suspense for streaming | Wrap dynamic content, provide fallbacks |
| `params` is a Promise | Always `await params` or use `use(params)` |
| Error boundaries reset state | Use `reset` to restore UI after errors |
| `'use cache'` for shared data | Use `cacheLife` and `cacheTag` for granular control |
| Server Actions for mutations | Use `'use server'` directive inside async functions |

---

*Generated from Next.js v16.2.2 docs via Context7 MCP.*
