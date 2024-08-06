PGDMP                       |            hover_sprite    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16506    hover_sprite    DATABASE     �   CREATE DATABASE hover_sprite WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE hover_sprite;
                postgres    false                        2615    16507    farmer_detail    SCHEMA        CREATE SCHEMA farmer_detail;
    DROP SCHEMA farmer_detail;
                developer_user    false            �            1259    16552    farmer    TABLE       CREATE TABLE farmer_detail.farmer (
    id character varying(255) NOT NULL,
    email character varying(255),
    full_name character varying(255),
    home_address character varying(255),
    password character varying(255),
    phone_number character varying(255)
);
 !   DROP TABLE farmer_detail.farmer;
       farmer_detail         heap    developer_user    false    6            �            1259    16549    farms    TABLE        CREATE TABLE farmer_detail.farms (
    farmid character varying(255) NOT NULL,
    crop_type character varying(255),
    farm_area double precision NOT NULL,
    farm_location character varying(255),
    farmer_id character varying(255),
    CONSTRAINT farms_crop_type_check CHECK (((crop_type)::text = ANY ((ARRAY['CEREALS'::character varying, 'FRUITS'::character varying, 'VEGETABLES'::character varying, 'OILSEEDS'::character varying, 'LEGUMES'::character varying, 'TUBERS'::character varying])::text[])))
);
     DROP TABLE farmer_detail.farms;
       farmer_detail         heap    developer_user    false    6            �            1259    16513    receptionist    TABLE     8  CREATE TABLE farmer_detail.receptionist (
    id character varying(255) NOT NULL,
    email character varying(255),
    full_name character varying(255),
    home_address character varying(255),
    password character varying(255),
    phone_number character varying(255),
    username character varying(255)
);
 '   DROP TABLE farmer_detail.receptionist;
       farmer_detail         heap    developer_user    false    6            �            1259    16546    spray_services    TABLE     �   CREATE TABLE farmer_detail.spray_services (
    id integer NOT NULL,
    name_of_service character varying(255),
    price double precision NOT NULL,
    service_type character varying(255)
);
 )   DROP TABLE farmer_detail.spray_services;
       farmer_detail         heap    developer_user    false    6            �          0    16552    farmer 
   TABLE DATA           c   COPY farmer_detail.farmer (id, email, full_name, home_address, password, phone_number) FROM stdin;
    farmer_detail          developer_user    false    220   	       �          0    16549    farms 
   TABLE DATA           ^   COPY farmer_detail.farms (farmid, crop_type, farm_area, farm_location, farmer_id) FROM stdin;
    farmer_detail          developer_user    false    219   �       �          0    16513    receptionist 
   TABLE DATA           s   COPY farmer_detail.receptionist (id, email, full_name, home_address, password, phone_number, username) FROM stdin;
    farmer_detail          developer_user    false    216   �       �          0    16546    spray_services 
   TABLE DATA           Y   COPY farmer_detail.spray_services (id, name_of_service, price, service_type) FROM stdin;
    farmer_detail          developer_user    false    218   '       �   m   x�s300�L,NI,vH�M���K���9�S�)�`A�DC��$��� C�̤���Lw���
��H3#�ܔl�`#Gc_��,�3��Ԝp�?�=... �"      �      x������ � �      �   t   x�200�,JMN-(qH�M���K��������,NLqH,N!���Q������gR�e�GAJr�WPpH�ETRv~ix��S�qY�e���o�kNq����W�O�Y��ov%g���=... �%�      �      x������ � �     