select * from farmer_detail.farmer;
select * from farmer_detail.sprayers;
DELETE FROM farmer_detail.order_feedback WHERE feedbackid = 'FB005';
DELETE FROM farmer_detail.feedback_sprayer WHERE feedbackid = 'FS001';
DELETE FROM farmer_detail.farmer WHERE email = 'lamn25482@gmail.com';
ALTER TABLE feedback_sprayer_table
DROP CONSTRAINT fkq3hew5oxtlhgvnldg2svi56g5;

ALTER TABLE feedback_sprayer_table
ALTER COLUMN feedbackid DROP NOT NULL;

UPDATE feedback_sprayer_table
SET feedbackid = NULL
WHERE sprayer_id = 'SS001';