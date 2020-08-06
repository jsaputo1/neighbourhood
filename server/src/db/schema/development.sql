INSERT INTO neighbourhoods(name, time_created, coordinates, neighbourhood_photo)
VALUES
('Little Italy', '2020-06-02 19:10:25-07', '(43.655291, -79.413851)', 'https://i.imgur.com/MOIl0x1.png'),
('Queen West', '2020-07-02 10:43:55-14', '(43.645012, -79.414908)', 'https://i.imgur.com/1A54Bcl.png');


INSERT INTO users(neighbourhood_id, email, password, time_created, coordinates, first_name, last_name, phone_number, profile_photo, last_logout, bio, alert_types)
VALUES
(2, 'graham.mothersill@gmail.com', crypt('password', gen_salt('bf')), '2020-07-02 19:10:34-07', '(45.5020, 73.5675)', 'Graham', 'Mothersill', '17802464666', 'https://i.imgur.com/3tVgsra.jpg', '2020-08-02 10:43:55-14', 'Graham is one of the people who made this web-app.', 'Both'),
(1, 'jsaputo1@gmail.com', crypt('password', gen_salt('bf')), '2020-07-04 12:10:34-07', '(43.651895, -79.411866)', 'John', 'Saputo', '16472441907', 'https://i.imgur.com/FK8V841.jpg', '2020-08-02 10:43:55-14', 'John is one of the people who made this web-app.', 'Both'),
(1, 'samantha.gadet@gmail.com', crypt('password', gen_salt('bf')), '2020-07-03 14:10:31-07', '(45.5019, 73.5674)', 'Sam', 'Gadet', '15146233583', 'https://i.imgur.com/3tVgsra.jpg', '2020-08-02 10:43:55-14', 'Sam is one of the people who made this web-app.', 'Both');


INSERT INTO categories(name, category_type)
VALUES
('Emergencies', 'Alerts'),
('Notices', 'Alerts'),

('Childcare', 'Services'),
('Yardwork', 'Services'),
('Renovation, Plumbing, etc...', 'Services'),
('Professional Services', 'Services'),
('Lessons & Tutoring', 'Services'),
('Other', 'Services'),

('Garage Sale', 'Events'),
('Fundraiser', 'Events'),
('Music Jams', 'Events'),
('Arts & Crafts', 'Events'),
('Kids', 'Events'),
('Community Meeting', 'Events'),
('Party', 'Events'),
('Sports', 'Events'),
('Games', 'Events'),
('Other', 'Events');


INSERT INTO events(user_id, category_id, title, coordinates, time_created, description, event_start, event_end, event_photo)
VALUES
(1, 15, 'Party for no reason!!!', '(45.5020, 73.5675)', '2020-08-03 15:40:34-07', 'We are going to party because we are neighbours and we like each other!!! byob', '2020-08-15 17:00:00-07', '2020-08-15 23:30:00-07', 'https://i.imgur.com/T2WwVfS.png'),
(3, 12, 'Crafting Night at Sams!', '(45.5019, 73.5674)', '2020-08-03 14:40:34-07', 'Bring whatever crafting projects you are working on, or just bring random materials and make something up :D I will have snacks for everyone.', '2020-08-12 17:30:00-07', '2020-08-12 21:30:00-07', 'https://i.imgur.com/FK8V841.jpg'),
(2, 9, 'Garage Sale, mostly furniture', '(45.5021, 73.5676)', '2020-08-03 16:40:34-07', 'I got a new couch and also some other stuff. Gotta make room. Everything is in good condition.', '2020-08-13 09:30:00-07', '2020-08-13 18:30:00-07', 'https://i.imgur.com/okB9WKC.jpg');


INSERT INTO alerts(user_id, category_id, title, coordinates, time_created, description, alert_photo)
VALUES
(1, 1, 'I just saw a man trying to break into my car', '(45.5020, 73.5675)', '2020-08-03 15:40:34-07', 'Everyone keep an eye out and check your valuables in your cars tonight. He ran away when I opened my back door. He was tall, skinny, white, and he was wearing a navy sweater, jeans, and a black toque.', 'https://i.imgur.com/Nmx0Qxo.png'),
(2, 1, 'LOST DOG - Chocolate Lab named Paul', '(45.5020, 73.5675)', '2020-08-01 19:40:34-07', 'My dog, Paul, whom many of you may know, escaped this morning and we still cannot find him. Please message me on here if you see or find him!', 'https://i.imgur.com/iHq8K8Z.jpg'),
(3, 2, 'HUGE NEW POTHOLE', '(45.5020, 73.5674)', '2020-08-01 08:40:34-07', 'I drove into a nice big, new pothole here this morning. BE CAREFUL! IT IS REALLY BIG. I think it damaged my car...', 'https://i.imgur.com/3tVgsra.jpg');


INSERT INTO services(user_id, category_id, service_offer, title, coordinates, time_created, description, service_photo)
VALUES
(1, 4, false, 'Need help weeding my lawn', '(45.5020, 73.5675)', '2020-08-03 15:46:34-07', 'Hey everyone! I need to weed my lawn, but my sciatica is really acting up an I need some help. It should take around 2-3 hours, and I will pay $50', 'https://i.imgur.com/iHq8K8Z.jpg'),
(2, 7, true, 'Offering tutoring in HTML, CSS, and Javascript', '(45.5019, 73.5675)', '2020-08-01 18:46:34-07', 'I just completed an amazing Web Development Bootcamp with Lighthouse Labs. If any students are struggling with any coding curriculum, I am here to help! I charge $25/hour... for now.', 'https://i.imgur.com/okB9WKC.jpg'),
(3, 5, false, 'Leaky Kitchen Faucet', '(45.5019, 73.5674)', '2020-08-01 15:46:34-07', 'Does anybody know how to fix a leaky faucet? I do not want to call a plumber just for this...', 'https://i.imgur.com/LpaY82x.png');


INSERT INTO subscriptions(user_id, category_id)
VALUES
(1, 1),
(1, 2),
(1, 17),
(2, 1),
(2, 2),
(2, 10),
(3, 1),
(3, 2),
(3, 12);


INSERT INTO conversations(user_one, user_two)
VALUES
(1, 2),
(1, 3),
(2, 3);


INSERT INTO messages(conversation_id, sender_id, receiver_id, message_text, time_sent)
VALUES
(1, 1, 2, 'Hey John, Can you hold on to that old couch for me at your garage sale? I need a new one.', '2020-08-06T03:52:25.931Z'),
(1, 2, 1, 'Sure thing.', '2020-08-06T04:52:25.931Z'),
(2, 1, 3, 'Hello, Sam! Are you coming to my party?', '2020-08-06T02:52:25.931Z'),
(2, 3, 1, 'Yes, of course!', '2020-08-06T03:32:25.931Z'),
(3, 2, 3, 'Thank you for the warning about the pothole. I avoided it!', '2020-08-06T04:52:25.931Z'),
(3, 3, 2, 'My pleasure!', '2020-08-06T06:52:25.931Z7');