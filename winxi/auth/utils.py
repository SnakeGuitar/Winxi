from datetime import datetime, timedelta, timezone
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()


def get_utc_now():
    return datetime.now(timezone.utc)


def get_expiration_date():
    return datetime.now(timezone.utc) + timedelta(days=7)
