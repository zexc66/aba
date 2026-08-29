# Investor Data Room

Documents in this directory are served — authenticated only — via:

- `POST /api/vault/auth` (email + director-issued access key)
- `GET /api/vault/documents` (Bearer session token)
- `GET /api/vault/documents/:name`

## Adding documents

Place files directly in this directory. Rules enforced by the server:

- Plain files only (no subdirectories), filenames must not start with `.`
- Everything here is treated as confidential — only verified institutions
  with a director-issued access key can list or download
- Contents are gitignored; never commit real documents

## Issuing access (director)

Set two server environment variables (see `.env.example`):

```
VAULT_ACCESS_KEYS="executive@fund.com:ISSUED-KEY-1,analyst@dfa.gov:ISSUED-KEY-2"
VAULT_SESSION_SECRET="<random 32+ char string>"
```

Keys are verified in constant time; sessions last 8 hours. Rotate keys by
updating the variable and restarting the server.
