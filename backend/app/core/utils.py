import secrets


def generate_prefixed_id(prefix: str) -> str:
    """Generate a short, unguessable identifier with the given prefix."""
    return f"{prefix}{secrets.token_hex(4)}"