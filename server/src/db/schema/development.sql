INSERT INTO neighbourhoods(name, time_created, coordinates, SW, SE, NE, NW, neighbourhood_photo)
VALUES
('Little Italy', '2020-06-02 19:10:25-07', '(43.655573, -79.415224)', '(43.649323, -79.420770)', '(43.652313, -79.405946)', '(43.661476, -79.409784)', '(43.658525, -79.424236)', 'https://i.imgur.com/MOIl0x1.png'),
('Queen West', '2020-07-02 10:43:55-14', '(43.655291, -79.413851)', '(45.535136, -73.645706)', '(45.531201, -73.621651)', '(45.539525, -73.61369)', '(45.546319, -73.637601)', 'https://i.imgur.com/1A54Bcl.png'),
('Jarry', '2020-07-02 10:43:55-14', '(45.539390, -73.631162)', '(45.535136, -73.645706)', '(45.531201, -73.621651)', '(45.539525, -73.61369)', '(45.546319, -73.637601)','https://i.imgur.com/1A54Bcl.png'),
('Villeray', '2020-07-02 10:43:55-14', '(45.547282, -73.620562)', '(45.539519, -73.613735)', '(45.547926, -73.607114)', '(45.554242, -73.621700)', '(45.546441, -73.637868)', 'https://i.imgur.com/1A54Bcl.png');

INSERT INTO users(neighbourhood_id, email, password, time_created, coordinates, first_name, last_name, phone_number, profile_photo, last_logout, bio)
VALUES
(2, 'graham.mothersill@gmail.com', crypt('password', gen_salt('bf')), '2020-07-02 19:10:34-07', '(45.542915, -73.634951)', 'Graham', 'Mothersill', '17802464666', 'https://i.imgur.com/3tVgsra.jpg', '2020-08-02 10:43:55-14', 'Graham is one of the people who made this web-app.'),
(1, 'jsaputo1@gmail.com', crypt('password', gen_salt('bf')), '2020-07-04 12:10:34-07', '(43.657603, -79.411882)', 'John', 'Saputo', '16472441907', 'https://i.imgur.com/FK8V841.jpg', '2020-08-02 10:43:55-14', 'John is one of the people who made this web-app.'),
(3, 'samantha.gadet@gmail.com', crypt('password', gen_salt('bf')), '2020-07-03 14:10:31-07', '(45.539652, -73.629813)', 'Sam', 'Gadet', '15146233583', 'https://i.imgur.com/3tVgsra.jpg', '2020-08-02 10:43:55-14', 'Sam is one of the people who made this web-app.'),
(2, 'corben.kushneryk@hotmail.com', crypt('password', gen_salt('bf')), '2020-07-03 14:10:31-07', '(45.542915, -73.634951)', 'Corben', 'Kushneryk', '17809189819', 'https://i.imgur.com/FK8V841.jpg', '2020-08-02 10:43:55-14', 'Corben did not make this app, but his phone was hijacked for testing-purposes');

INSERT INTO categories(name, category_type)
VALUES
('Emergencies', 'Alerts'),
('Notices', 'Alerts'),
('Lost animals', 'Alerts'),

('Childcare', 'Services'),
('Yardwork', 'Services'),
('Elder care', 'Services'),
('Renovation, Plumbing, etc...', 'Services'),
('Professional Services', 'Services'),
('Lessons & Tutoring', 'Services'),
('Pet sitting', 'Services'),
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


INSERT INTO events(user_id, category_id, neighbourhood_id, title, coordinates, time_created, description, event_start, event_time, event_photo)
VALUES
(1, 18, 2, 'Party for no reason!!!', '(43.658017, -79.414930)', '2020-08-03 15:40:34-07', 'We are going to party because we are neighbours and we like each other!!! byob', '2020-08-15', '17:00:00', 'https://i.imgur.com/T2WwVfS.png'),
(3, 15, 3, 'Crafting Night at Sams!', '(45.54098, -73.625174)', '2020-08-03 14:40:34-07', 'Bring whatever crafting projects you are working on, or just bring random materials and make something up :D I will have snacks for everyone.', '2020-08-15',  '17:00:00', 'https://i.imgur.com/FK8V841.jpg'),
(2, 12, 3, 'Garage Sale, mostly furniture', '(45.537536, -73.619220)', '2020-08-03 16:40:34-07', 'I got a new couch and also some other stuff. Gotta make room. Everything is in good condition.', '2020-08-16', '13:00:00', 'https://i.imgur.com/okB9WKC.jpg'),
(2, 21, 3, 'Cinema en plein air: Back to the future!', '(45.538950, -73.626219)', '2020-08-03 16:40:34-07', 'Nous installons un ecran géant dans notre cour arrière, et allons visionner le film Retour vers le futur, vintage!. Places limitées à 30, écrivez-moi pour réserver la votre!', '2020-08-22', '19:00:00', 'https://i.imgur.com/okB9WKC.jpg');

INSERT INTO alerts(user_id, category_id,  neighbourhood_id, title, coordinates, time_created, description, alert_photo)
VALUES
(1, 1, 2, 'I just saw a man trying to break into my car', '(43.652495, -79.412900)', '2020-08-03 15:40:34-07', 'Everyone keep an eye out and check your valuables in your cars tonight. He ran away when I opened my back door. He was tall, skinny, white, and he was wearing a navy sweater, jeans, and a black toque.', 'https://i.imgur.com/Nmx0Qxo.png'),
(2, 1, 2, 'LOST DOG - Chocolate Lab named Paul', '(45.542615, -73.636909)', '2020-08-01 19:40:34-07', 'My dog, Paul, whom many of you may know, escaped this morning and we still cannot find him. Please message me on here if you see or find him!', 'https://i.imgur.com/iHq8K8Z.jpg'),
(3, 2, 3, 'HUGE NEW POTHOLE', '(45.538166, -73.635435)', '2020-08-01 08:40:34-07', 'I drove into a nice big, new pothole here this morning. BE CAREFUL! IT IS REALLY BIG. I think it damaged my car...', 'https://i.imgur.com/3tVgsra.jpg');


INSERT INTO services(user_id, category_id, neighbourhood_id, service_offer, title, coordinates, time_created, description, service_photo )
VALUES
(1, 4, 2, false, 'Need help weeding my lawn', '(45.539441, -73.621180)', '2020-08-03 15:46:34-07', 'Hey everyone! I need to weed my lawn, but my sciatica is really acting up an I need some help. It should take around 2-3 hours, and I will pay $50', 'https://i.imgur.com/iHq8K8Z.jpg'),
(2, 7, 1, true, 'Offering tutoring in HTML, CSS, and Javascript', '(43.656917, -79.422268)', '2020-08-01 18:46:34-07', 'I just completed an amazing Web Development Bootcamp with Lighthouse Labs. If any students are struggling with any coding curriculum, I am here to help! I charge $25/hour... for now.', 'https://i.imgur.com/okB9WKC.jpg'),
(3, 5, 3, false, 'Leaky Kitchen Faucet', '(45.537540, 73.621922)', '2020-08-01 15:46:34-07', 'Does anybody know how to fix a leaky faucet? I do not want to call a plumber just for this...', 'https://i.imgur.com/LpaY82x.png');


INSERT INTO subscriptions(user_id, category_id)
VALUES
(1, 1),
(2, 1),
(3, 1),

(1, 4),
(2, 4),
(3, 4),

(1, 12),
(2, 12),
(3, 12),

(1, 2),
(4, 2),

(1, 5),
(4, 5),

(1, 13),
(4, 13);


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