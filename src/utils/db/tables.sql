-- Table: public.product


CREATE TABLE IF NOT EXISTS product
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY,
    name varchar(100) NOT NULL,
    description text COLLATE NOT NULL,
    brand text COLLATE NOT NULL,
    image_url varchar(255) COLLATE NOT NULL,
    category text COLLATE NOT NULL,
    price integer NOT NULL,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
)
