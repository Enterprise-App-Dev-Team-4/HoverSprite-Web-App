PGDMP                      |            hover_sprite    16.3    16.3                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    16598    hover_sprite    DATABASE     �   CREATE DATABASE hover_sprite WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE hover_sprite;
                postgres    false                        2615    16599    farmer_detail    SCHEMA        CREATE SCHEMA farmer_detail;
    DROP SCHEMA farmer_detail;
                postgres    false            �            1259    16665    farmer    TABLE     .  CREATE TABLE farmer_detail.farmer (
    id character varying(255) NOT NULL,
    email character varying(255),
    first_name character varying(255),
    full_name character varying(255),
    home_address character varying(255),
    last_name character varying(255),
    password character varying(255),
    phone_number character varying(255),
    role character varying(255),
    token character varying(255),
    CONSTRAINT farmer_role_check CHECK (((role)::text = ANY ((ARRAY['Farmer'::character varying, 'Receptionist'::character varying])::text[])))
);
 !   DROP TABLE farmer_detail.farmer;
       farmer_detail         heap    postgres    false    6            �            1259    16683    farms    TABLE        CREATE TABLE farmer_detail.farms (
    farmid character varying(255) NOT NULL,
    crop_type character varying(255),
    farm_area double precision NOT NULL,
    farm_location character varying(255),
    farmer_id character varying(255),
    CONSTRAINT farms_crop_type_check CHECK (((crop_type)::text = ANY ((ARRAY['CEREALS'::character varying, 'FRUITS'::character varying, 'VEGETABLES'::character varying, 'OILSEEDS'::character varying, 'LEGUMES'::character varying, 'TUBERS'::character varying])::text[])))
);
     DROP TABLE farmer_detail.farms;
       farmer_detail         heap    postgres    false    6            �            1259    16680 	   feedbacks    TABLE     �   CREATE TABLE farmer_detail.feedbacks (
    feedbackid character varying(255) NOT NULL,
    content character varying(255),
    rating_score double precision NOT NULL,
    farmer_id character varying(255),
    order_id character varying(255)
);
 $   DROP TABLE farmer_detail.feedbacks;
       farmer_detail         heap    postgres    false    6            �            1259    16677    orders    TABLE     +  CREATE TABLE farmer_detail.orders (
    orderid character varying(255) NOT NULL,
    date character varying(255),
    order_status character varying(255),
    service_time_slot character varying(255),
    total_cost double precision NOT NULL,
    farmer_id character varying(255),
    receptionist_id character varying(255),
    service_id character varying(255),
    CONSTRAINT orders_order_status_check CHECK (((order_status)::text = ANY ((ARRAY['REJECTED'::character varying, 'PENDING'::character varying, 'ACCEPTED'::character varying])::text[])))
);
 !   DROP TABLE farmer_detail.orders;
       farmer_detail         heap    postgres    false    6            �            1259    16668    receptionist    TABLE     :  CREATE TABLE farmer_detail.receptionist (
    id character varying(255) NOT NULL,
    email character varying(255),
    first_name character varying(255),
    full_name character varying(255),
    home_address character varying(255),
    last_name character varying(255),
    password character varying(255),
    phone_number character varying(255),
    role character varying(255),
    token character varying(255),
    CONSTRAINT receptionist_role_check CHECK (((role)::text = ANY ((ARRAY['Farmer'::character varying, 'Receptionist'::character varying])::text[])))
);
 '   DROP TABLE farmer_detail.receptionist;
       farmer_detail         heap    postgres    false    6            �            1259    16712    spray_services    TABLE     M  CREATE TABLE farmer_detail.spray_services (
    id character varying(255) NOT NULL,
    crop_type character varying(255),
    description character varying(255),
    price double precision NOT NULL,
    service_name character varying(255),
    service_type character varying(255),
    time_slot1 integer NOT NULL,
    time_slot2 integer NOT NULL,
    time_slot3 integer NOT NULL,
    time_slot4 integer NOT NULL,
    time_slot5 integer NOT NULL,
    time_slot6 integer NOT NULL,
    CONSTRAINT spray_services_crop_type_check CHECK (((crop_type)::text = ANY ((ARRAY['CEREALS'::character varying, 'FRUITS'::character varying, 'VEGETABLES'::character varying])::text[]))),
    CONSTRAINT spray_services_service_name_check CHECK (((service_name)::text = ANY ((ARRAY['UrbanSpraying'::character varying, 'IndustrialSpraying'::character varying, 'EnvironmentalSpraying'::character varying, 'SafetySpraying'::character varying])::text[]))),
    CONSTRAINT spray_services_service_type_check CHECK (((service_type)::text = ANY ((ARRAY['CONSULT'::character varying, 'SPRAYING'::character varying])::text[])))
);
 )   DROP TABLE farmer_detail.spray_services;
       farmer_detail         heap    postgres    false    6            �            1259    16674    sprayers    TABLE     c  CREATE TABLE farmer_detail.sprayers (
    sprayer_id character varying(255) NOT NULL,
    sprayer_expertise character varying(255),
    CONSTRAINT sprayers_sprayer_expertise_check CHECK (((sprayer_expertise)::text = ANY ((ARRAY['ExpertSprayer'::character varying, 'AppretienceSprayer'::character varying, 'AdeptSprayer'::character varying])::text[])))
);
 #   DROP TABLE farmer_detail.sprayers;
       farmer_detail         heap    postgres    false    6            �            1259    16706    order_sprayer    TABLE     �   CREATE TABLE public.order_sprayer (
    order_id character varying(255) NOT NULL,
    sprayer_id character varying(255) NOT NULL
);
 !   DROP TABLE public.order_sprayer;
       public         heap    postgres    false            �            1259    16621    spray_services_seq    SEQUENCE     |   CREATE SEQUENCE public.spray_services_seq
    START WITH 1
    INCREMENT BY 50
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.spray_services_seq;
       public          postgres    false                      0    16665    farmer 
   TABLE DATA           �   COPY farmer_detail.farmer (id, email, first_name, full_name, home_address, last_name, password, phone_number, role, token) FROM stdin;
    farmer_detail          postgres    false    217   W+                 0    16683    farms 
   TABLE DATA           ^   COPY farmer_detail.farms (farmid, crop_type, farm_area, farm_location, farmer_id) FROM stdin;
    farmer_detail          postgres    false    222   �/                 0    16680 	   feedbacks 
   TABLE DATA           b   COPY farmer_detail.feedbacks (feedbackid, content, rating_score, farmer_id, order_id) FROM stdin;
    farmer_detail          postgres    false    221   �/                 0    16677    orders 
   TABLE DATA           �   COPY farmer_detail.orders (orderid, date, order_status, service_time_slot, total_cost, farmer_id, receptionist_id, service_id) FROM stdin;
    farmer_detail          postgres    false    220   �/                 0    16668    receptionist 
   TABLE DATA           �   COPY farmer_detail.receptionist (id, email, first_name, full_name, home_address, last_name, password, phone_number, role, token) FROM stdin;
    farmer_detail          postgres    false    218   	0                 0    16712    spray_services 
   TABLE DATA           �   COPY farmer_detail.spray_services (id, crop_type, description, price, service_name, service_type, time_slot1, time_slot2, time_slot3, time_slot4, time_slot5, time_slot6) FROM stdin;
    farmer_detail          postgres    false    224   �0                 0    16674    sprayers 
   TABLE DATA           H   COPY farmer_detail.sprayers (sprayer_id, sprayer_expertise) FROM stdin;
    farmer_detail          postgres    false    219   Q1                 0    16706    order_sprayer 
   TABLE DATA           =   COPY public.order_sprayer (order_id, sprayer_id) FROM stdin;
    public          postgres    false    223   n1                  0    0    spray_services_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.spray_services_seq', 1, false);
          public          postgres    false    216            x           2606    16723    orders orders_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY farmer_detail.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (orderid);
 C   ALTER TABLE ONLY farmer_detail.orders DROP CONSTRAINT orders_pkey;
       farmer_detail            postgres    false    220            v           2606    16735    sprayers sprayers_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY farmer_detail.sprayers
    ADD CONSTRAINT sprayers_pkey PRIMARY KEY (sprayer_id);
 G   ALTER TABLE ONLY farmer_detail.sprayers DROP CONSTRAINT sprayers_pkey;
       farmer_detail            postgres    false    219            y           2606    16724 %   feedbacks fkbdhoov2mv332ks2m84owt5tv3    FK CONSTRAINT     �   ALTER TABLE ONLY farmer_detail.feedbacks
    ADD CONSTRAINT fkbdhoov2mv332ks2m84owt5tv3 FOREIGN KEY (order_id) REFERENCES farmer_detail.orders(orderid);
 V   ALTER TABLE ONLY farmer_detail.feedbacks DROP CONSTRAINT fkbdhoov2mv332ks2m84owt5tv3;
       farmer_detail          postgres    false    4728    221    220            z           2606    16736 )   order_sprayer fk7vut01bs63tbqpyia59dmbn6b    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_sprayer
    ADD CONSTRAINT fk7vut01bs63tbqpyia59dmbn6b FOREIGN KEY (sprayer_id) REFERENCES farmer_detail.sprayers(sprayer_id);
 S   ALTER TABLE ONLY public.order_sprayer DROP CONSTRAINT fk7vut01bs63tbqpyia59dmbn6b;
       public          postgres    false    223    4726    219            {           2606    16729 )   order_sprayer fkbc477jve307yr7tf620pjmi6k    FK CONSTRAINT     �   ALTER TABLE ONLY public.order_sprayer
    ADD CONSTRAINT fkbc477jve307yr7tf620pjmi6k FOREIGN KEY (order_id) REFERENCES farmer_detail.orders(orderid);
 S   ALTER TABLE ONLY public.order_sprayer DROP CONSTRAINT fkbc477jve307yr7tf620pjmi6k;
       public          postgres    false    223    4728    220               *  x���Y��H��9�����Ae�ked��23� R�@)��=vN���$=I-���z���$)��A��	iN�%����?�c�-��LC+*��y������H��A��o�B_(�[X"s�wM�rz/_rg	v�N�����e��|K��M��4�������$����WF!��{E��	?�w��Yq�x�	e����$(���,I�n�ԻƯἝP^$��u�(3XqB}T��y����/����p�1���鱫M���յs�����'.�u�Ր�3��=^�P�tl�(S�2�w�x�T��˧�	њ����
�nufe�QL'��;��w3Q�!�\xcҐŎx��H~�%A�F_���MU�m��0Ǫ?�; �����g�	%�r�o�n�X<��壕A(��`����c�/j��'�*A(2f��"F2�@3'�T,F]8��O%��!�t¢��H��v����q�\��s�fl+��A�z�Ұ?��?�cA�kP�PM�i.��Q{OE�RPf�
pԅ|Z��=���"���h'<HV�-�D�ۨ�)A���%<�� �a�@N�sI��� l���=�O�'���Ή��zqH���$�n�}��b��<�V����s�A�;��J���C� Q��T��O?���#i����7F���e��I�@�Ŵ����o���4Q�YmZ�������-���#�w�d���U�	�&s����|�z=9�aj���>h���1����r���G�h�#G�~�7��GWk4�'@�X�{s83�`v�{K��eegiJ�`r;��Z�.^���-`�뿫)"�N	-�����i������^N��f�ZLg�V3��WKȅ3�U` ����l�d�����hG�v!^��$浚���spO�6G���Ǚ4��,;�dj�z��9��Ɍ��3ۛӖ���O�g�,i�[ٞ�
����U��]5�.t:${u�,����]��
meYr�{��>^��s�끿��Rp���i�������d0=��,�w����dog4\Ͷ؇��{��I����CX�         .   x�ss400�tvru�	�440����t�q�e���q��qqq \Y            x������ � �            x������ � �         �   x�200�L����b����Ԣ₢̒T���\N� ��g^��/�U���X�B`i���Q����J�Eq�O�k�e�W�kb^�^i�q�N������YVj��[XN^dP�sQyp��qY~eQ"����1q��W� ,.         �   x��н
�0����*zr��Z%�B�i�%%�j"1*�{]�:Ģ|��!ư�˴ h�U#B�*i��d�M�˓C�~�q�s�Q��wZ�A<�an�Ys����O{���]�`�/�U�	�G�F��m���<�4�5�y���Y�'�d�{1�^ِ�            x������ � �            x������ � �     