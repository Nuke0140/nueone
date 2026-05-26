# NueOne (Nue1)

A full-stack, modular business management platform combining **ERP**, **CRM**, **Finance**, and **Marketing** into a single unified application. Built with modern technologies for performance, scalability, and developer experience.

---

## Modules

| Module | Description |
|--------|-------------|
| **CRM** | Contacts, accounts, leads, deals, and dashboard analytics |
| **ERP** | Enterprise resource planning with inventory and order management |
| **Finance** | Financial tracking, invoicing, and reporting |
| **Marketing** | Campaign management, analytics, content planning, and collaboration |

Each module has its own layout, error boundaries, loading states, and module-branded UI theming for a consistent yet distinct experience.

---

## Tech Stack

### Frontend

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type-safe JavaScript |
| [Tailwind CSS 4](https://tailwindcss.com/) | Utility-first CSS |
| [shadcn/ui](https://ui.shadcn.com/) | Reusable UI components (Radix UI primitives) |
| [Zustand](https://zustand.docs.pmnd.rs/) | Lightweight state management |
| [TanStack Query](https://tanstack.com/query) | Server state management |
| [TanStack Table](https://tanstack.com/table) | Headless data tables |
| [Recharts](https://recharts.org/) | Charting and data visualization |
| [Framer Motion](https://motion.dev/) | Animations and transitions |
| [next-intl](https://next-intl.dev/) | Internationalization |
| [next-themes](https://github.com/pacocoursey/next-themes) | Dark/light theme support |
| [Zod](https://zod.dev/) | Schema validation |
| [React Hook Form](https://react-hook-form.com/) | Form management |
| [Vitest](https://vitest.dev/) | Unit testing |

### Backend

| Technology | Purpose |
|------------|---------|
| [FastAPI](https://fastapi.tiangolo.com/) | Async Python web framework |
| [SQLAlchemy 2.0](https://www.sqlalchemy.org/) | ORM with async support |
| [Alembic](https://alembic.sqlalchemy.org/) | Database migrations |
| [Pydantic v2](https://docs.pydantic.dev/) | Data validation and settings |
| [Celery](https://docs.celeryq.dev/) | Distributed task queue |
| [python-jose](https://github.com/mpdavis/python-jose) | JWT authentication |
| [asyncpg](https://magicstack.github.io/asyncpg/) | Async PostgreSQL driver |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| [PostgreSQL 16](https://www.postgresql.org/) | Primary database |
| [Redis 7](https://redis.io/) | Caching and message broker |
| [Nginx](https://nginx.org/) | Reverse proxy |
| [Docker Compose](https://docs.docker.com/compose/) | Container orchestration |

---

## Project Structure

```
Nue1/
├── backend/                  # FastAPI Python backend
│   ├── app/
│   │   ├── api/              # API route handlers
│   │   ├── core/             # Config, security, dependencies
│   │   ├── models/           # SQLAlchemy models
│   │   ├── schemas/          # Pydantic schemas
│   │   ├── services/         # Business logic layer
│   │   ├── utils/            # Utility functions
│   │   ├── main.py           # FastAPI application entry point
│   │   └── worker.py         # Celery worker configuration
│   ├── alembic/              # Database migrations
│   ├── tests/                # Backend test suite
│   ├── scripts/              # Seed and utility scripts
│   └── requirements.txt      # Python dependencies
├── frontend/                 # Next.js TypeScript frontend
│   ├── src/
│   │   ├── app/              # Next.js App Router pages
│   │   │   ├── crm/          # CRM module pages
│   │   │   ├── erp/          # ERP module pages
│   │   │   ├── finance/      # Finance module pages
│   │   │   └── marketing/    # Marketing module pages
│   │   ├── components/       # Shared UI components
│   │   │   └── global/       # Cross-module components
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility libraries
│   │   ├── modules/          # Module-specific components & logic
│   │   │   ├── crm/
│   │   │   ├── erp/
│   │   │   ├── finance/
│   │   │   └── marketing/
│   │   ├── stores/           # Zustand state stores
│   │   ├── types/            # TypeScript type definitions
│   │   └── middleware.ts     # NextAuth route protection
│   ├── public/               # Static assets
│   └── vitest.config.ts      # Test configuration
├── infra/                    # Infrastructure config (nginx.conf, etc.)
├── docs/                     # Project documentation
├── scripts/                  # Root-level utility scripts
├── shared/                   # Shared code between frontend & backend
├── skills/                   # AI skill definitions
├── docker-compose.yml        # Full-stack Docker orchestration
├── Makefile                  # Dev convenience commands
├── SWAGGER_TESTING.md        # API testing documentation
├── test-api.sh               # Quick API smoke test script
└── worklog.md                # Development work log
```

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
- (Optional) [Node.js 20+](https://nodejs.org/) and [Bun](https://bun.sh/) for local frontend development
- (Optional) [Python 3.11+](https://www.python.org/) for local backend development

### Quick Start

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nueera/Nue1.git
   cd Nue1
   ```

2. **Set up environment variables:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and replace the default secrets (`JWT_SECRET`, `NEXTAUTH_SECRET`) with strong random strings. You can generate one with:

   ```bash
   python3 -c "import secrets; print(secrets.token_urlsafe(32))"
   ```

3. **Start all services:**

   ```bash
   make setup
   ```

   This single command will:
   - Copy `.env.example` to `.env` (if not already present)
   - Build and start all Docker containers
   - Wait for the database to be ready
   - Run database migrations
   - Print the access URL

4. **Visit the application:**

   Open [http://localhost](http://localhost) in your browser.

### Manual Start

If you prefer more control:

```bash
# Start all services
make dev

# Or step by step
docker compose up --build -d    # Build and start containers
docker compose exec backend alembic upgrade head   # Run migrations
docker compose exec backend python -m scripts.seed  # Seed sample data
```

---

## Available Make Commands

| Command | Description |
|---------|-------------|
| `make help` | Show all available commands |
| `make dev` | Start all services (build + detached) |
| `make up` | Start services (no rebuild) |
| `make down` | Stop all services |
| `make build` | Build all Docker images |
| `make logs` | Tail logs for all services |
| `make migrate` | Run database migrations |
| `make seed` | Seed the database with sample data |
| `make lint` | Lint frontend and backend code |
| `make test` | Run all tests |
| `make setup` | First-time project setup |

---

## API Testing

### Quick Smoke Test

A shell script is included to test the most common API endpoints:

```bash
chmod +x test-api.sh
./test-api.sh
```

This script will:
1. Check backend health
2. Register a demo user
3. Log in and obtain a JWT token
4. Fetch the user profile
5. Create and list CRM contacts
6. Check ERP, Finance, and Marketing dashboards

### Swagger UI

When the backend is running, interactive API documentation is available at:

```
http://localhost:8000/docs
```

See [SWAGGER_TESTING.md](./SWAGGER_TESTING.md) for detailed API testing instructions.

---

## Environment Variables

All configuration is managed through environment variables. Copy `.env.example` to `.env` and customize:

| Variable | Default | Description |
|----------|---------|-------------|
| `APP_NAME` | `nuegrowth` | Application name |
| `APP_ENV` | `development` | Environment (development/production) |
| `FRONTEND_PORT` | `3000` | Frontend dev server port |
| `BACKEND_PORT` | `8000` | Backend API port |
| `DB_USER` | `nuegrowth` | PostgreSQL username |
| `DB_PASSWORD` | `nuegrowth` | PostgreSQL password |
| `DB_NAME` | `nuegrowth` | PostgreSQL database name |
| `REDIS_URL` | `redis://redis:6379/0` | Redis connection URL |
| `JWT_SECRET` | *(change required)* | Secret key for JWT tokens |
| `JWT_EXPIRATION_MINUTES` | `60` | Token expiration time |
| `NEXTAUTH_SECRET` | *(change required)* | NextAuth.js secret |
| `OPENAI_API_KEY` | *(optional)* | OpenAI API key for AI features |
| `ANTHROPIC_API_KEY` | *(optional)* | Anthropic API key for AI features |

> **Important:** Never commit your `.env` file. Always change the default secrets before deploying.

---

## Docker Services

The `docker-compose.yml` orchestrates six services:

| Service | Image | Port | Description |
|---------|-------|------|-------------|
| `db` | postgres:16-alpine | 5432 | PostgreSQL database |
| `redis` | redis:7-alpine | 6379 | Redis cache and message broker |
| `backend` | Custom (FastAPI) | 8000 | API server |
| `worker` | Custom (Celery) | - | Background task processor |
| `frontend` | Custom (Next.js) | 3000 | Web application |
| `nginx` | nginx:alpine | 80, 443 | Reverse proxy |

All services communicate over the `nueone-network` bridge network. Health checks are configured for `db`, `redis`, `backend`, and `nginx` to ensure proper startup ordering.

---

## Development History

The project has undergone active development with significant quality improvements:

### Task 3 — Frontend Bug Fixes (16 fixes)

Applied critical configuration and code bug fixes to the NueOne frontend:

1. Added missing Tailwind content path for `src/` directory to prevent CSS class stripping in production
2. Enabled TypeScript strict mode and React strict mode in Next.js config
3. Enabled `noImplicitAny` and updated ES target to ES2020 in tsconfig
4. Renamed package from `nextjs_tailwind_shadcn_ts` to `nueone-frontend`
5. Created `.env.example` with proper environment variable template
6. Copied auth middleware to correct location and expanded protected paths to cover all modules
7. Fixed hardcoded authenticated default state in auth store (security fix)
8. Fixed infinite re-render in CRM hooks by moving `addRecent` into `useEffect`
9. Fixed nested `setTimeout` memory leak in `AccentProgressBar` component
10. Replaced mutable render-body variable with `useRef` in `CrossModuleSearch` for React concurrent mode compatibility
11. Replaced `console.log` navigation stubs with actual `router.push()` in CRM pages
12. Fixed `strokeWidth` incorrectly embedded in className strings for icon components
13. Removed duplicate `cn()` utility definitions, replaced with shared `@/lib/utils` import
14. Made CRM dashboard padding responsive (`p-4 sm:p-6 lg:p-8`)
15. Made CRM contacts grid responsive (`grid-cols-1 sm:grid-cols-3`)
16. Fixed React reconciliation keys from index-based (`key={i}`) to label-based (`key={stat.label}`)

### Task 5 — UI/UX Consistency Fixes (14 fixes)

Applied module-wide error boundaries, loading states, and padding consistency:

1. Created reusable `ModuleErrorBoundary` class component with module branding
2. Added error boundary to ERP layout
3. Added error boundary to Finance layout
4. Added error boundary to Marketing layout
5. Added consistent `lg:p-8` padding to Finance `PageShell`
6. Added consistent `lg:p-8` padding to Marketing `PageShell`
7. Replaced cross-module imports in Marketing header with shared `@/` paths
8. Replaced cross-module imports in Finance header with shared `@/` paths
9. Created CRM `loading.tsx` with skeleton UI and pulse animations
10. Created ERP `loading.tsx` with matching skeleton pattern
11. Created CRM `error.tsx` with module-branded error display
12. Created ERP `error.tsx` with module-branded error display
13. Created Finance `error.tsx` with module-branded error display
14. Created Marketing `error.tsx` with module-branded error display

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

Please ensure all tests pass and linting is clean before submitting:

```bash
make lint
make test
```

---

## License

This project is licensed under the MIT License — see the [LICENSE](./LICENSE) file for details.
