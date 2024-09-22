CREATE TABLE users (
    u_id BIGINT PRIMARY KEY NOT NULL,
    username varchar DEFAULT NULL,
    firstname varchar DEFAULT NULL,
    type varchar NOT NULL,
    is_bot BOOLEAN NOT NULL,
    language_code varchar NOT NULL,
    is_premium BOOLEAN DEFAULT FALSE NOT NULL,
    is_new BOOLEAN NOT NULL DEFAULT TRUE,
    u_ip varchar DEFAULT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);


CREATE TABLE referral (
    user_id BIGINT primary key NOT NULL REFERENCES users(u_id) ON DELETE CASCADE,
    refree integer DEFAULT NULL,
    ref_count INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE rewards (
    user_id BIGINT primary key NOT NULL REFERENCES users(u_id) ON DELETE CASCADE,
    time_spent INTEGER NOT NULL,  -- Represents time spent in seconds
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
