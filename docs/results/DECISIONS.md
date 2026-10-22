# Product Decisions & Assumptions — NueOne Results

**Version:** 0.1  
**Status:** Draft decision register

This document distinguishes provisional design decisions from assumptions that still require validation.

## Confirmed working decisions

| ID | Decision | Reason |
|---|---|---|
| D-001 | Use the existing repository `Nuke0140/nueone` as the documentation home for now | User supplied this repository and requested documentation first |
| D-002 | Keep Results-specific documentation under `docs/results/` | Avoid mixing it with general ERP/CRM/Finance/Marketing docs |
| D-003 | Define requirements before implementation | Reduce avoidable rework in a high-integrity academic workflow |
| D-004 | Treat the MVP as university + affiliated-college multi-tenant SaaS | Agreed initial product direction |
| D-005 | Prefer a modular monolith initially | Keep initial operations and costs manageable |
| D-006 | Do not hard-code university grading rules | Institutions' policies must be confirmed and represented explicitly |
| D-007 | Test Mode must not mutate result state; Live Mode must be separately authorized and auditable | Protect result integrity |

## Provisional technical choices

These are proposals, not irrevocable commitments:
- Frontend: reuse the existing Next.js/TypeScript frontend where feasible.
- Backend: reuse the existing FastAPI application where feasible.
- Database: PostgreSQL.
- Database migrations: Alembic if consistent with the existing backend.
- UI components: reuse current design system where suitable.
- Background processing: decide after workload and current Celery/Redis setup are reviewed.
- Tenant isolation: explicit tenant-scoped service/query patterns, with PostgreSQL RLS considered as defense in depth after connection and transaction handling are reviewed.

## Open decisions

| ID | Question | Owner to resolve | Blocking area |
|---|---|---|---|
| Q-001 | Which university academic regulations must MVP support first? | Pilot academic-policy owner | Result engine |
| Q-002 | Exact SGPA/CGPA and rounding formulas? | University examination authority | Result engine |
| Q-003 | Grace mark rules and precedence? | University examination authority | Result engine |
| Q-004 | Semantics of absent, withheld, malpractice, exemption, incomplete? | University examination authority | Marks and results |
| Q-005 | Required promotion/backlog/revaluation rules? | University examination authority | Academic outcomes |
| Q-006 | Who may test, run live, approve, publish, unpublish, and correct? | Product owner + university | Permissions/workflows |
| Q-007 | Required official documents and grade-card layouts? | Pilot institution | Reporting |
| Q-008 | Expected scale and peak examination load? | Pilot institution | Performance/operations |
| Q-009 | Required retention, privacy, and hosting constraints? | Product owner + institution | Security/operations |
| Q-010 | How much of existing auth, tenant model, and UI can be safely reused? | Engineering review | Architecture |

## Reference-material handling

RPS 2 manuals are being used to understand workflows and operational requirements. The implementation, product naming, visual design, code, and data model for NueOne Results must be developed independently. Any workflow adopted as a requirement must be expressed in our own specification and validated with the pilot institution.
