"""initial_schema_with_string_ids

Revision ID: 20260601_initial_schema_with_string_ids
Revises: 
Create Date: 2026-06-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '20260601_initial_schema_with_string_ids'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'agents',
        sa.Column('id', sa.String(length=32), nullable=False),
        sa.Column('name', sa.String(length=255), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False),
        sa.Column('phone', sa.String(length=20), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
    )
    op.create_index(op.f('ix_agents_email'), 'agents', ['email'], unique=True)
    op.create_index(op.f('ix_agents_id'), 'agents', ['id'], unique=False)

    op.create_table(
        'quotes',
        sa.Column('id', sa.String(length=32), nullable=False),
        sa.Column('client_name', sa.String(length=255), nullable=False),
        sa.Column('client_email', sa.String(length=255), nullable=False),
        sa.Column('client_phone', sa.String(length=20), nullable=False),
        sa.Column('property_address', sa.String(length=500), nullable=False),
        sa.Column('property_zip', sa.String(length=10), nullable=False),
        sa.Column('square_footage', sa.Integer(), nullable=False),
        sa.Column('property_age_range', sa.String(length=50), nullable=False),
        sa.Column('requested_services', sa.JSON(), nullable=False),
        sa.Column('agent_id', sa.String(length=32), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['agent_id'], ['agents.id']),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_quotes_agent_id'), 'quotes', ['agent_id'], unique=False)
    op.create_index(op.f('ix_quotes_client_email'), 'quotes', ['client_email'], unique=False)
    op.create_index(op.f('ix_quotes_id'), 'quotes', ['id'], unique=False)


def downgrade() -> None:
    op.drop_index(op.f('ix_quotes_id'), table_name='quotes')
    op.drop_index(op.f('ix_quotes_client_email'), table_name='quotes')
    op.drop_index(op.f('ix_quotes_agent_id'), table_name='quotes')
    op.drop_table('quotes')

    op.drop_index(op.f('ix_agents_id'), table_name='agents')
    op.drop_index(op.f('ix_agents_email'), table_name='agents')
    op.drop_table('agents')