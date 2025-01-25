import sqlite3

def create_tables(conn: sqlite3.Connection):
    # Create loan table with username instead of foreign keys
    conn.execute("""
        CREATE TABLE IF NOT EXISTS loan (
            lid INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            loan_amount INTEGER,
            income INTEGER,
            property_value INTEGER,
            debt_to_income_ratio REAL,
            derived_race INTEGER,
            derived_sex INTEGER,
            occupancy_type INTEGER,
            loan_purpose INTEGER,
            action_taken INTEGER,
            status INTEGER NOT NULL,
            created_at TEXT DEFAULT (datetime('now'))
        )
    """)

def seed_tables(conn: sqlite3.Connection):
    # Sample loan data
    # status: 0 = pending, 1 = approved, 2 = denied
    # derived_race: 1 = White, 2 = Black, 3 = Asian, 4 = Hispanic
    # derived_sex: 1 = Male, 2 = Female
    # occupancy_type: 1 = Primary Residence, 2 = Secondary Residence, 3 = Investment Property
    # loan_purpose: 1 = Home Purchase, 2 = Refinancing, 3 = Home Improvement
    # action_taken: 1 = Approved, 2 = Denied
    seed_loans = [
        # username, loan_amount, income, property_value, debt_ratio, race, sex, occupancy, purpose, action, status
        ("Jane Doe", 350000, 95000, 400000, 0.28, 1, 2, 1, 1, 1, 1),
        ("Jane Doe", 275000, 85000, 300000, 0.32, 1, 2, 1, 2, 2, 2),
        ("John Doe", 425000, 115000, 500000, 0.25, 3, 1, 1, 1, 1, 1),
        ("John Doe", 180000, 65000, 200000, 0.38, 3, 1, 3, 3, 2, 2),
        ("Jane Doe", 550000, 150000, 600000, 0.22, 1, 2, 2, 1, 1, 1),
        ("John Doe", 320000, 89000, 350000, 0.29, 3, 1, 1, 2, 0, 0)
    ]

    # Insert loan data
    conn.executemany("""
        INSERT INTO loan (
            username, loan_amount, income, property_value, 
            debt_to_income_ratio, derived_race, derived_sex,
            occupancy_type, loan_purpose, action_taken, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, seed_loans)

    # Commit the changes
    conn.commit()

def drop_tables(conn: sqlite3.Connection):
    conn.execute("DROP TABLE IF EXISTS loan")

if __name__ == '__main__':
    conn = sqlite3.connect('loandb.db')
    drop_tables(conn)  # Clear existing tables
    create_tables(conn)  # Create fresh tables
    seed_tables(conn)   # Seed with initial data
    conn.close()
