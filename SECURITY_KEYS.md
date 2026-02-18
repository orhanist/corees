# Security Key Generation and Rotation

## Generate secure secrets

Use a secure shell on your deployment machine:

```bash
openssl rand -base64 48   # AUTH_SECRET
openssl rand -base64 48   # INVITE_TOKEN_SIGNING_KEY_V1
openssl rand -base64 48   # FIELD_ENCRYPTION_KEY_V1
```

PowerShell alternative:

```powershell
[Convert]::ToBase64String((1..48 | ForEach-Object {Get-Random -Maximum 256}))
```

## Rotation policy
- `INVITE_TOKEN_SIGNING_KEY_*`: rotate every 90 days.
- `FIELD_ENCRYPTION_KEY_*`: rotate every 12 months.
- `AUTH_SECRET`: rotate annually or after security incident.

## Versioned key format
- Keep active key and at least one previous key during transition.
- Use version suffixes in env names:
  - `INVITE_TOKEN_SIGNING_KEY_V1`
  - `INVITE_TOKEN_SIGNING_KEY_V2`
  - `FIELD_ENCRYPTION_KEY_V1`

## Storage rules
- Never commit secrets to Git.
- Restrict file permissions (`chmod 600` for env files).
- Store backup copy in encrypted password manager / secret vault.
