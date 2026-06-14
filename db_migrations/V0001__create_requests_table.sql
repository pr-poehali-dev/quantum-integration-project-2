CREATE TABLE IF NOT EXISTS requests (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    service VARCHAR(255),
    details TEXT,
    estimated_price VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);