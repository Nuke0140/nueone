# Product Requirements Document (PRD) — NueOne Results

**Version:** 0.1  
**Status:** Draft — for requirements review  
**Owner:** NueEra / NueOne Product Team  
**Phase:** 0 — Product Foundation

## 1. Executive summary

NueOne Results is a proposed multi-tenant SaaS product for universities and their affiliated colleges to configure academic structures and examination cycles, collect and validate assessment marks, process academic outcomes using institution-approved rules, review and approve results, publish outcomes, and generate student-facing and administrative reports.

The product will be designed as a distinct product area within the existing NueOne repository. The existing project uses a Next.js frontend, FastAPI backend, and PostgreSQL-based stack according to its current README. Reuse of existing application components must be confirmed by code review before implementation.

## 2. Problem statement

University examination operations require coordinated academic data, curriculum/course mappings, exam configurations, marks, policy-driven computation, review, publication, and audit evidence. Errors in source data or policy configuration can create incorrect academic outcomes. The product must make readiness checks, processing history, authorization, and result provenance visible.

## 3. Product vision

Provide an auditable and configurable examination-to-results workflow for universities and their affiliated colleges, with strict institutional data boundaries and controlled publication.

## 4. Target customers and users

### Customers
- Universities
- Universities with affiliated colleges
- Colleges or institutions that manage examinations within an authorized university framework

### Proposed roles
- Platform Super Admin
- University Admin
- University Exam Staff
- College Admin
- College Staff
- Faculty / Evaluator
- Exam Invigilator
- Student
- Auditor / Read-only Reviewer (proposed role; validate during permissions design)

Role names and scope are provisional. Final permissions must be explicitly mapped to actions and data scope in MODULES.md.

## 5. Core product principles

1. **Tenant boundaries by design:** each request must be scoped to an authorized tenant and, where applicable, an institution.
2. **Policy configuration over hard-coding:** grading, grace marks, rounding, absent handling, backlog rules, SGPA/CGPA, and promotion must follow institution-approved policy configurations.
3. **Validate before computing:** prevent or clearly report incomplete or inconsistent source data.
4. **Test before live processing:** provide a non-persistent rehearsal path for reviewing proposed outcomes.
5. **Controlled publication:** only authorized users may approve and publish outcomes.
6. **Auditability:** retain processing runs, rule/configuration versions, approvals, corrections, publication history, and actor/time metadata.
7. **Safe corrections:** published results must not be silently overwritten; corrections should follow an approved reprocessing/versioning process.
8. **Privacy by default:** users should only access records required for their role and institution scope.

## 6. MVP scope

### 6.1 Tenant and access management
- Create and maintain university tenants.
- Associate affiliated colleges/institutions with a university tenant.
- Manage user accounts and memberships.
- Enforce role-based and scope-based access.
- Record administrative and access-control changes.

### 6.2 Academic structure
- Academic years.
- Programs and departments.
- Semesters/terms.
- Courses and curriculum mappings.
- Students and academic enrollments.

### 6.3 Examination operations
- Examination cycles.
- Assessment/exam components.
- Marks entry and CSV import.
- Row-level import validation and error reports.
- Mark verification and readiness reports.
- Absent and other approved assessment-status handling.

### 6.4 Result processing
- Institution-configurable policy sets.
- Preflight validation and readiness checks.
- Test Mode that does not alter user-visible or persisted result state.
- Authorized Live Mode.
- Per-run status, progress, step logs, errors, and summary counts.
- Course and semester outcomes, SGPA/CGPA and promotions where applicable and configured.

### 6.5 Review, publication, and documents
- Reviewable computed outcomes.
- Approval workflow with actor, timestamp, and decision.
- Controlled publication.
- Result history/version handling.
- Student access only to their own published results.
- Grade cards and essential CSV/PDF reports, with exact templates to be defined.

### 6.6 Audit and operations
- Audit events for consequential actions.
- Processing and import logs.
- Failed-task visibility.
- Basic backup and restore procedures documented before pilot.

## 7. Explicitly out of MVP scope

Unless later approved as a separate change:
- Full admissions CRM
- Fee collection and accounting
- Payroll and HR
- Hostel and transport operations
- Library management
- General-purpose ERP, inventory, and marketing modules
- Advanced AI-generated result decisions

AI may assist with development, diagnostics, or summarization later, but must not independently decide a student's academic result.

## 8. Core end-to-end workflow

1. Configure tenant, institutions, users, and access.
2. Configure academic year, programs, semesters, courses, and curriculum mappings.
3. Create an examination cycle and assessment components.
4. Confirm eligibility/enrollment and assessment configuration.
5. Enter or import marks.
6. Validate imports and resolve errors.
7. Run readiness checks.
8. Run Test Mode for a defined scope.
9. Review run logs, warnings, counts, and sample outcomes.
10. Run Live Mode only through authorized control.
11. Review and approve results.
12. Publish results.
13. Provide students access to their own published result and issue reports/documents.
14. Handle corrections through a controlled, auditable reprocessing flow.

Detailed transitions and failure paths are specified in WORKFLOWS.md.

## 9. Functional requirements

| ID | Requirement | Priority |
|---|---|---|
| FR-001 | Manage university tenants and affiliated institutions | Must |
| FR-002 | Enforce tenant- and institution-scoped access on the server | Must |
| FR-003 | Maintain academic structure and student enrollments | Must |
| FR-004 | Configure examination cycles and assessment components | Must |
| FR-005 | Enter/import marks with row-level validation | Must |
| FR-006 | Track absent/withheld/other statuses according to approved policy | Must |
| FR-007 | Validate readiness before result computation | Must |
| FR-008 | Support non-persistent Test Mode | Must |
| FR-009 | Support authorized, logged Live Mode | Must |
| FR-010 | Configure grading and academic-outcome rules per institution/policy version | Must |
| FR-011 | Retain processing logs and rule/configuration provenance | Must |
| FR-012 | Require approval and controlled publication | Must |
| FR-013 | Let a student view only their own published results | Must |
| FR-014 | Export essential result and operations reports | Should |
| FR-015 | Record audit events for sensitive operations | Must |
| FR-016 | Provide controlled result correction/reprocessing flow | Must |

## 10. Non-functional requirements

### Security and privacy
- Authentication and authorization must be enforced server-side.
- Tenant context must be derived from a trusted authenticated membership, not blindly accepted from client input.
- Every tenant-owned query and mutation must enforce scope.
- PostgreSQL Row-Level Security (RLS) is a candidate defense-in-depth control, subject to architecture review and correct connection-pool/session handling.
- No secrets or real student data in Git.
- Log access to sensitive operations without writing passwords, tokens, or unnecessary personal data.

### Integrity and traceability
- Store marks and calculated scores using appropriate decimal/numeric types, not floating-point arithmetic for authoritative marks.
- Store the processing run and policy/configuration version that produced each outcome.
- Published results must have controlled version history.
- Repeated requests/retries must not duplicate or corrupt outcomes.

### Reliability and operations
- Database migrations must be version-controlled.
- Automated tests must cover tenant isolation, permissions, imports, processing modes, grading rules, approval and publication.
- Backups and restoration must be tested before production pilot.
- Long-running imports/processing may use background jobs; the need and implementation will be confirmed from expected workload.

### Usability
- Show validation errors with record/field context.
- Show processing status, progress, and actionable failure logs.
- Support accessible, responsive administrative screens.

## 11. Acceptance criteria for MVP

1. A user from Tenant A cannot read or mutate Tenant B's records through UI, API, exports, identifiers, or background jobs.
2. College users are limited to institutions explicitly assigned to them.
3. Import errors identify the row and field and do not silently accept invalid records.
4. A Test Mode run leaves persisted and published result data unchanged.
5. A failed Live Mode run is observable and safely recoverable without duplicate results.
6. The same inputs and same policy version produce deterministic results for deterministic configured rules.
7. Results cannot be published without required authorization and approvals.
8. A student can view only their own published outcomes.
9. A published correction retains the previous version and an audit trail.
10. Backup restoration and core security tests pass before pilot.

## 12. Success metrics for a controlled pilot

These are proposed measures; target thresholds are to be agreed with the pilot institution:
- Percentage of imports accepted without unresolved errors.
- Result processing runs completed successfully.
- Number of unexplained result mismatches against independently verified samples.
- Time from marks readiness to approved publication.
- Number of tenant-isolation or permission defects found.
- Percentage of consequential result changes with complete audit records.
- Successful backup restoration test.

## 13. Assumptions and open questions

The following decisions must be resolved with a university/college policy owner before the associated behaviour is finalized:
- Academic regulations and grading systems supported in the first pilot.
- Marks rounding and precision.
- Grace-mark eligibility, caps, precedence, and audit display.
- Absence, malpractice, withheld, incomplete, and exemption semantics.
- Backlog, carry-forward, revaluation, and result correction policy.
- SGPA/CGPA formulas, credit weighting, and rounding.
- Promotion rules between terms/academic years.
- Result approval hierarchy and delegation.
- Publication timing, unpublication, and correction notices.
- Required grade-card formats and official report templates.
- Expected number of tenants, institutions, students, marks, concurrent users, and peak processing volume.
- Data retention, privacy, and operational obligations required by the pilot institution.

## 14. Dependencies

- The existing repository architecture and authentication flow must be reviewed before implementation.
- University-specific academic policy must be supplied and approved.
- Test cases must be created from approved policy examples, including edge cases and boundary values.
- Pilot stakeholders must validate workflows and output documents.

## 15. Change control

Any scope change affecting marks, grading, academic standing, promotion, approval, publication, security, or data retention requires:
1. Documented rationale.
2. Impact assessment.
3. Updated requirements and acceptance tests.
4. Review by the product owner and relevant academic-policy owner.
