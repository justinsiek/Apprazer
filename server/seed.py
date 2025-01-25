import sqlite3

def create_tables(conn: sqlite3.Connection):
    conn.execute('''
        CREATE TABLE IF NOT EXISTS banker (
            bid INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL       
        );
    ''')

    conn.execute('''
        CREATE TABLE IF NOT EXISTS client (
            cid INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL      
        );
    ''')

    conn.execute('''
        CREATE TABLE IF NOT EXISTS loan (
            lid INTEGER PRIMARY KEY AUTOINCREMENT,
            cid INTEGER NOT NULL,
            bid INTEGER NOT NULL,
            load_data TEXT NOT NULL,
            status INTEGER NOT NULL,
            FOREIGN KEY (cid) REFERENCES client(cid),
            FOREIGN KEY (bid) REFERENCES banker(bid)
        );
    ''')

def seed_tables(conn: sqlite3.Connection):
    seed_bankers = [
        ("Jane Street", "admin"),
        ("Hudson Rivers", "admin")
    ]

    seed_clients = [
        ("Jane Doe", "client"),
        ("John Doe", "client")
    ]

    conn.executemany("INSERT INTO banker (username, password) VALUES (?, ?)", seed_bankers)
    conn.executemany("INSERT INTO client (username, password) VALUES (?, ?)", seed_clients)

def drop_tables(conn: sqlite3.Connection):
    conn.execute("DROP TABLE IF EXISTS banker")
    conn.execute("DROP TABLE IF EXISTS client")
    conn.execute("DROP TABLE IF EXISTS loan")

if __name__ == '__main__':
    conn = sqlite3.connect('loandb.db')
    create_tables(conn)
    seed_tables(conn)
    conn.close()