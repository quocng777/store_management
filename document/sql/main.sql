DROP TABLE IF EXISTS "user";
CREATE TABLE "user" (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    phone VARCHAR(10) NOT NULL,
    email VARCHAR(50),
    birthDate TIMESTAMP,
    avatar VARCHAR(200),
    gender BIT,
    businessId VARCHAR(50),
    verified BIT,
    addressId BIGINT
);

-- address table scheme

DROP TABLE IF EXISTS "address";
CREATE TABLE "address" (
    id BIGSERIAL PRIMARY KEY,
    houseNumber INTEGER,
    ward VARCHAR(50),
    district VARCHAR(50),
    city VARCHAR(50)
);

-- store table scheme

DROP TABLE IF EXISTS "store";
CREATE TABLE "store" (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(500),
    addressId BIGINT,
    phone VARCHAR(10),
    email VARCHAR(50)
);

-- relationship table scheme

DROP TABLE IF EXISTS "relationship";
CREATE TABLE "relationship" (
    id BIGSERIAL PRIMARY KEY,
    userId BIGINT,
    storeId BIGINT,
    roleId BIGINT,
    startDate TIMESTAMP,
    endDate TIMESTAMP
);

-- role table scheme

DROP TABLE IF EXISTS "role";
CREATE TABLE "role" (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50),
    description VARCHAR(500)
);

-- request table scheme

DROP TABLE IF EXISTS "request";
CREATE TABLE "request" (
    id BIGSERIAL PRIMARY KEY,
    requestByStore BIT,
    userId BIGINT,
    storeId BIGINT,
    status VARCHAR(20)
);

DROP TABLE IF EXISTS "verification_code";
CREATE TABLE "verification_code" (
    id BIGSERIAL PRIMARY KEY,
    userId BIGINT NOT NULL,
    token VARCHAR(24) NOT NULL,
    expireDate TIMESTAMP
);


ALTER TABLE "user" DROP CONSTRAINT IF EXISTS PK_user_address;
ALTER TABLE "user" 
ADD CONSTRAINT PK_user_address FOREIGN KEY (addressId)
REFERENCES address(id);

ALTER TABLE "relationship" DROP CONSTRAINT IF EXISTS PK_relationship_user;
ALTER TABLE "relationship"
ADD CONSTRAINT PK_relationship_user
FOREIGN KEY (userId)
REFERENCES "user"(id);


ALTER TABLE "relationship" DROP CONSTRAINT IF EXISTS PK_relationship_store;
ALTER TABLE "relationship"
ADD CONSTRAINT PK_relationship_store
FOREIGN KEY (storeId)
REFERENCES store(id);

ALTER TABLE "relationship" DROP CONSTRAINT IF EXISTS PK_relationship_role;
ALTER TABLE "relationship"
ADD CONSTRAINT 
PK_relationship_role
FOREIGN KEY (roleId)
REFERENCES role(id);

ALTER TABLE "request" DROP CONSTRAINT IF EXISTS PK_request_user;
ALTER TABLE "request"
ADD CONSTRAINT 
PK_request_user
FOREIGN KEY (userId)
REFERENCES "user"(id);

ALTER TABLE "request" DROP CONSTRAINT IF EXISTS PK_request_store;
ALTER TABLE "request"
ADD CONSTRAINT PK_request_store
FOREIGN KEY (storeId)
REFERENCES store(id);


ALTER TABLE "store" DROP CONSTRAINT IF EXISTS PK_store_address;
ALTER TABLE "store"
ADD CONSTRAINT PK_store_address
FOREIGN KEY (addressId)
REFERENCES address(id);

ALTER TABLE "verification_code" DROP CONSTRAINT IF EXISTS PK_verification_user;
ALTER TABLE "verification_code"
ADD CONSTRAINT PK_verification_user
FOREIGN KEY (userId)
REFERENCES "user"(id);