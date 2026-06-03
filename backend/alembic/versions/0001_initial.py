"""initial

Revision ID: 0001_initial
Revises:
Create Date: 2026-06-03 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

# revision identifiers
revision: str = "0001_initial"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

# Native PostgreSQL enum type name
QUOTE_STATUS_ENUM = sa.Enum(
    "pending", "viewed", "contacted",
    name="quotestatus",
)


def upgrade() -> None:
    # 1. Yeh line sab se pehle purani enum type ko isi database se khatam karegi
    op.execute("DROP TYPE IF EXISTS quotestatus CASCADE;")
    # Create the native enum type in PostgreSQL
    QUOTE_STATUS_ENUM.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "quotes",
        sa.Column("id", sa.String(32), primary_key=True, index=True, nullable=False),
        sa.Column("client_name", sa.String(255), nullable=False),
        sa.Column("client_email", sa.String(255), nullable=False, index=True),
        sa.Column("client_phone", sa.String(20), nullable=False),
        sa.Column("property_address", sa.String(500), nullable=False),
        sa.Column("property_zip", sa.String(10), nullable=False),
        sa.Column("square_footage", sa.Integer(), nullable=False),
        sa.Column("property_age_range", sa.String(50), nullable=False),
        sa.Column("requested_services", sa.JSON(), nullable=False),
        sa.Column(
            "status",
            sa.Enum("pending", "viewed", "contacted", name="quotestatus", create_type=False),
            nullable=False,
            server_default="pending",
        ),
        sa.Column(
            "created_at",
            sa.DateTime(),
            nullable=False,
            server_default=sa.text("now()"),
        ),
    )


def downgrade() -> None:
    op.drop_table("quotes")
    QUOTE_STATUS_ENUM.drop(op.get_bind(), checkfirst=True)
