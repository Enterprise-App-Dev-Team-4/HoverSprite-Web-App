PGDMP      ;                |            hover_sprite    16.3    16.3 	    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
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
                developer_user    false            �            1259    16508    farmer    TABLE     2  CREATE TABLE farmer_detail.farmer (
    id character varying(255) NOT NULL,
    email character varying(255),
    full_name character varying(255),
    home_address character varying(255),
    password character varying(255),
    phone_number character varying(255),
    username character varying(255)
);
 !   DROP TABLE farmer_detail.farmer;
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
       farmer_detail         heap    developer_user    false    6            �          0    16508    farmer 
   TABLE DATA           m   COPY farmer_detail.farmer (id, email, full_name, home_address, password, phone_number, username) FROM stdin;
    farmer_detail          developer_user    false    216   
       �          0    16513    receptionist 
   TABLE DATA           s   COPY farmer_detail.receptionist (id, email, full_name, home_address, password, phone_number, username) FROM stdin;
    farmer_detail          developer_user    false    217   �       �   �  x���ɒ�J@��W��53�T�Y�ޤ��� �|}�U����������\	���	�y\��� ��1��l[��\(�ٴ0��[�*(��7|ño)2��4��F��U�'u��KF0�NJ��Q�~2�k�Sb�{�=E3��~I�$#�)��P�Z�C�<�2�/�<�B>�!Ȭ�1;�T�N����@��0�M�����H��DS�� �)B1n�c��l�%7vqP��ƽ�wt��H���Z��|�&E���x�|?��,�z�QWm=�'9Ȯ��T-|'Byw�%1�E�\�\�QҖ����
r�%Y�����O7�Ӎ���ʷ���`�"{_���St�ؐ�.b�O)��1��H��"upZT�������?�S�	��8��i�	�fV+a�E6t�Ͷ�&�Dy����4	�S� 7| ��h��̥��B�hs��ͻX���4٢��ސvH��ڝs=��_h�4��hI���x}/�6;Ӱ��^��x�%�U;�1c+B����.���@�z ����VT}זK����@I�x?����펻����bC2����(��Ʊ/�u�"��shq�X��s�aFB}н,/�me>�(y�-=/�=����8����>����ܧ��
J�7�(4�ݭSo[��E	u�D�d�f�p�kW~�a�M��?��?��� ������1~��g���V��&\Sƒ�ZKպ�KK\"��%g �S�r�Sޟkxu.ŽV��E��ͤrL�P;�Q4y�r�t\.�z�Y�x3�d^���I}�=��]��7Ef��X���C	�f�l�p��
\�����B#�gGy�>X!��?GŋS���Y�����Q/X�A�u�a�dcQ-֩��$Yls��h���)W�{�ݒY�������g�iY~�j~ �T��kP$����4V�FQ������b"�#&�n����4'�t��P�ƫ@<����������"�      �   t   x�200�,JMN-(qH�M���K��������,NLqH,N!���Q������gR�e�GAJr�WPpH�ETRv~ix��S�qY�e���o�kNq����W�O�Y��ov%g���=... �%�     