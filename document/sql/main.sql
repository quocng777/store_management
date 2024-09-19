DROP TABLE IF EXISTS "user" CASCADE;
CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(10) NOT NULL UNIQUE,
    email VARCHAR(50) UNIQUE,
    birth_date TIMESTAMP,
    avatar VARCHAR(200),
    gender BIT,
    business_id VARCHAR(50),
    verified BIT,
    address_id BIGINT,
    password VARCHAR(300)
);

-- address table scheme

DROP TABLE IF EXISTS "address" CASCADE;
CREATE TABLE "address" (
    id BIGSERIAL PRIMARY KEY,
    houseNumber INTEGER,
    ward VARCHAR(50),
    district VARCHAR(50),
    city VARCHAR(50)
);

-- store table scheme

DROP TABLE IF EXISTS "store" CASCADE;
CREATE TABLE "store" (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(500),
    address_id BIGINT,
    phone VARCHAR(10),
    email VARCHAR(50)
);

-- relationship table scheme

DROP TABLE IF EXISTS "relationship" CASCADE;
CREATE TABLE "relationship" (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT,
    store_id BIGINT,
    role_id BIGINT,
    start_date TIMESTAMP,
    end_date TIMESTAMP
);

-- role table scheme

DROP TABLE IF EXISTS "role" CASCADE;
CREATE TABLE "role" (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(500)
);

-- request table scheme

DROP TABLE IF EXISTS "request" CASCADE;
CREATE TABLE "request" (
    id BIGSERIAL PRIMARY KEY,
    requestByStore BIT,
    user_id BIGINT,
    store_id BIGINT,
    status VARCHAR(20)
);

DROP TABLE IF EXISTS "verification_code" CASCADE;
CREATE TABLE "verification_code" (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    token VARCHAR(24) NOT NULL,
    expireDate TIMESTAMP
);


ALTER TABLE "user" DROP CONSTRAINT IF EXISTS PK_user_address;
ALTER TABLE "user" 
ADD CONSTRAINT PK_user_address FOREIGN KEY (address_id)
REFERENCES address(id);

ALTER TABLE "relationship" DROP CONSTRAINT IF EXISTS PK_relationship_user;
ALTER TABLE "relationship"
ADD CONSTRAINT PK_relationship_user
FOREIGN KEY (user_id)
REFERENCES "user"(id);


ALTER TABLE "relationship" DROP CONSTRAINT IF EXISTS PK_relationship_store;
ALTER TABLE "relationship"
ADD CONSTRAINT PK_relationship_store
FOREIGN KEY (store_id)
REFERENCES store(id);

ALTER TABLE "relationship" DROP CONSTRAINT IF EXISTS PK_relationship_role;
ALTER TABLE "relationship"
ADD CONSTRAINT 
PK_relationship_role
FOREIGN KEY (role_id)
REFERENCES role(id);

ALTER TABLE "request" DROP CONSTRAINT IF EXISTS PK_request_user;
ALTER TABLE "request"
ADD CONSTRAINT 
PK_request_user
FOREIGN KEY (user_id)
REFERENCES "user"(id);

ALTER TABLE "request" DROP CONSTRAINT IF EXISTS PK_request_store;
ALTER TABLE "request"
ADD CONSTRAINT PK_request_store
FOREIGN KEY (store_id)
REFERENCES store(id);


ALTER TABLE "store" DROP CONSTRAINT IF EXISTS PK_store_address;
ALTER TABLE "store"
ADD CONSTRAINT PK_store_address
FOREIGN KEY (address_id)
REFERENCES address(id);

ALTER TABLE "verification_code" DROP CONSTRAINT IF EXISTS PK_verification_user;
ALTER TABLE "verification_code"
ADD CONSTRAINT PK_verification_user
FOREIGN KEY (user_id)
REFERENCES "user"(id);