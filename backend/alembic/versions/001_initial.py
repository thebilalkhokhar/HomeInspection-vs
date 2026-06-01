"""Initial migration - create agents and quotes tables

Revision ID: 001_initial
Revises: 
Create Date: 2026-06-01 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '001_initial'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Create agents table
    op.create_table(
        'agents',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('email', sa.String(255), nullable=False),
        sa.Column('phone', sa.String(20), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
    )
    op.create_index(op.f('ix_agents_email'), 'agents', ['email'], unique=True)
    op.create_index(op.f('ix_agents_id'), 'agents', ['id'], unique=False)

    # Create quotes table
    op.create_table(
        'quotes',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('client_name', sa.String(255), nullable=False),
        sa.Column('client_email', sa.String(255), nullable=False),
        sa.Column('client_phone', sa.String(20), nullable=False),
        sa.Column('property_address', sa.String(500), nullable=False),
        sa.Column('property_zip', sa.String(10), nullable=False),
        sa.Column('square_footage', sa.Integer(), nullable=False),
        sa.Column('property_age_range', sa.String(50), nullable=False),
        sa.Column('requested_services', sa.JSON(), nullable=False, server_default='[]'),
        sa.Column('agent_id', sa.Integer(), nullable=True),
        sa.Column('status', sa.String(50), nullable=False, server_default='pending'),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['agent_id'], ['agents.id'], ),
        sa.PrimaryKeyConstraint('id'),
    )
    op.create_index(op.f('ix_quotes_agent_id'), 'quotes', ['agent_id'], unique=False)
    op.create_index(op.f('ix_quotes_client_email'), 'quotes', ['client_email'], unique=False)
    op.create_index(op.f('ix_quotes_id'), 'quotes', ['id'], unique=False)


def downgrade() -> None:
    # Drop indices
    op.drop_index(op.f('ix_quotes_id'), table_name='quotes')
    op.drop_index(op.f('ix_quotes_client_email'), table_name='quotes')
    op.drop_index(op.f('ix_quotes_agent_id'), table_name='quotes')
    
    # Drop tables
    op.drop_table('quotes')
    
    op.drop_index(op.f('ix_agents_id'), table_name='agents')
    op.drop_index(op.f('ix_agents_email'), table_name='agents')
    op.drop_table('agents')
