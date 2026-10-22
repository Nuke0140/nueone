# NueOne Results — Documentation Hub

**Status:** Phase 0 — Product Foundation  
**Version:** 0.1 (Draft)  
**Product type:** Multi-tenant SaaS for university examinations and results processing  
**Parent repository:** [NueOne](https://github.com/Nuke0140/nueone)

## Purpose

This folder contains the product-specific documentation for NueOne Results. It is deliberately isolated from the existing ERP, CRM, Finance, and Marketing modules in the parent repository.

## Document index

| Document | Purpose | Status |
|---|---|---|
| [PRD.md](./PRD.md) | Product vision, users, scope, requirements, acceptance criteria | Draft v0.1 |
| [MODULES.md](./MODULES.md) | Modules, submodules, screens, actions, roles and permission matrix | Planned |
| [WORKFLOWS.md](./WORKFLOWS.md) | Examination-to-result workflows, processing modes, approvals and failure handling | Planned |
| [ERD.md](./ERD.md) | Entities, relationships, tenancy keys, constraints and data lifecycle | Planned |
| [SECURITY.md](./SECURITY.md) | Authentication, authorization, tenant isolation, audit and operational security | Planned |
| [ROADMAP.md](./ROADMAP.md) | Implementation phases, test gates, pilot and release criteria | Planned |
| [DECISIONS.md](./DECISIONS.md) | Architecture decisions, assumptions and unresolved policy questions | Planned |

## Source-of-truth rules

1. Product requirements are documented here before implementation.
2. RPS 2 manuals supplied for this project are reference material for understanding workflows; they are not authorization to copy proprietary code, branding, or assets.
3. Clearly separate verified source requirements, product decisions, assumptions, and questions awaiting university policy confirmation.
4. Do not hard-code grading, grace marks, promotion, rounding, or publication policies until configurable requirements and test cases are documented.
5. Every requirement that affects results must have testable acceptance criteria.
6. Never store real student personal data or production secrets in documentation, sample fixtures, or commits.

## Phase 0 definition of done

- [ ] Product Requirements Document reviewed
- [ ] Module and role/permission matrix reviewed
- [ ] Core workflows and state transitions documented
- [ ] ERD and tenant-isolation model reviewed
- [ ] Security and audit requirements reviewed
- [ ] Roadmap and pilot acceptance criteria reviewed
- [ ] University-specific policy gaps identified and assigned for confirmation
