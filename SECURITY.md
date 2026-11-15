# Security Policy

## Scope
This starter currently serves static public course information. It has no authentication, payment processing, database, or privileged API.

## Required controls before production accounts or payments
- HTTPS-only hosting and HSTS.
- Content Security Policy restricted to the exact production origins.
- `X-Content-Type-Options: nosniff`.
- `Referrer-Policy: strict-origin-when-cross-origin`.
- `Permissions-Policy` disabling unused browser capabilities.
- Server-side input validation, output encoding and rate limiting.
- Managed authentication with MFA support and secure session cookies.
- Server-side authorisation and database row-level security.
- Secrets stored in deployment environment variables, never committed.
- Dependency updates, secret scanning and vulnerability scanning in CI.
- Data minimisation, retention schedule, export and deletion process.
- Security and privacy review before collecting learner information.

## Reporting
Add a monitored security contact address before production launch. Do not publish sensitive vulnerability details in public issues.
