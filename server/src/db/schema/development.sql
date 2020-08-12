INSERT INTO neighbourhoods(name, time_created, coordinates, SW, SE, NE, NW, neighbourhood_photo)
VALUES
('Little Italy', '2020-06-02 19:10:25-07', '(43.655573, -79.415224)', '(43.649323, -79.420770)', '(43.652313, -79.405946)', '(43.661476, -79.409784)', '(43.658525, -79.424236)', '/images/neighbourhoods/Littleitaly.png'),
('Queen West', '2020-07-02 10:43:55-14', '(43.646315, -79.408272)', '(43.642611, -79.415444)', '(43.645224, -79.403392)', '(43.649405, -79.404865)', '(43.646979, -79.416889)', 'https://i.imgur.com/zUA8beg.png'),
('Jarry', '2020-07-02 10:43:55-14', '(45.539390, -73.631162)', '(45.535136, -73.645706)', '(45.531201, -73.621651)', '(45.539525, -73.61369)', '(45.546319, -73.637601)','/images/neighbourhoods/Jarry.png'),
('Villeray', '2020-07-02 10:43:55-14', '(45.547282, -73.620562)', '(45.539519, -73.613735)', '(45.547926, -73.607114)', '(45.554242, -73.621700)', '(45.546441, -73.637868)', '/images/neighbourhoods/Villeray.png');

INSERT INTO users(neighbourhood_id, email, password, coordinates, first_name, last_name, phone_number, profile_photo, bio)
VALUES

-- Developer Accounts

(2, 'graham.mothersill@gmail.com', crypt('password', gen_salt('bf')), '(45.542915, -73.634951)', 'Graham', 'Mothersill', '17802464666', 'https://i.imgur.com/3tVgsra.jpg', 'Graham is one of the people who made this web-app.'),

(1, 'jsaputo1@gmail.com', crypt('password', gen_salt('bf')), '(43.657603, -79.411882)', 'John', 'Saputo', '16472441907', '/images/users/john.jpg', 'John is one of the people who made this web-app.'),

(3, 'samantha.gadet@gmail.com', crypt('password', gen_salt('bf')), '(45.539652, -73.629813)', 'Sam', 'Gadet', '15146233583', '/images/users/Sam.JPG', 'Sam is one of the people who made this web-app.'),

-- Neighbourhood 1 Users 

(1, 'brigette.presley@gmail.com', crypt('password', gen_salt('bf')), '(43.65125, -79.41975)', 'Brigette', 'Presley', '14161234567', '/images/users/w1.png', 'New to the neighbourhood, looking to find some cool events'),

(1, 'tiffany.caruso@gmail.com', crypt('password', gen_salt('bf')), '(43.65903, -79.41303)', 'Tiffany', 'Caruso', '14161234567', '/images/users/w2.jpg', 'New to the neighbourhood, looking to find some cool events'),

(1, 'joseph.martin@gmail.com', crypt('password', gen_salt('bf')), '(43.6541, -79.40807)', 'Joseph', 'Martin', '14161234567', '/images/users/m1.png', 'New to the neighbourhood, looking to find some cool events'),

(1, 'stephanie.nimmo@gmail.com', crypt('password', gen_salt('bf')), '(43.655573, -79.415224)', 'Stephanie', 'Nimmo', '14161234567', '/images/users/w3.jpg', 'New to the neighbourhood, looking to find some cool events'),

(1, 'ethan.moreau@gmail.com', crypt('password', gen_salt('bf')), '(43.65878, -79.42172)', 'Ethan', 'Moreau', '15141234567', '/images/users/m6.png', 'New to the neighbourhood, looking to find some cool events'),

(1, 'zachary.lopez@gmail.com', crypt('password', gen_salt('bf')), '(43.65277, -79.41584)', 'Zachary', 'Lopez', '15141234567', '/images/users/m7.png', 'New to the neighbourhood, looking to find some cool events'),

(1, 'mia.goodman@gmail.com', crypt('password', gen_salt('bf')), '(43.65768, -79.41084)', 'Mia', 'Goodman', '15141234567', '/images/users/w8.jpg', 'New to the neighbourhood, looking to find some cool events'),

(1, 'kara.garner@gmail.com', crypt('password', gen_salt('bf')), '(43.65322, -79.41035)', 'Kara', 'Garner', '15141234567', '/images/users/w6.jpg', 'New to the neighbourhood, looking to find some cool events'),

(1, 'ella.lamb@gmail.com', crypt('password', gen_salt('bf')), '(43.65732, -79.4167)', 'Ella', 'Lamb', '15141234567', '/images/users/w7.jpg', 'New to the neighbourhood, looking to find some cool events'),

(1, 'rosie.cruz@gmail.com', crypt('password', gen_salt('bf')), '(43.65528, -79.42037)', 'Rosie', 'Cruz', '14161234567', '/images/users/w4.jpg', 'New to the neighbourhood, looking to find some cool events'),

(1, 'tyler.johnson@gmail.com', crypt('password', gen_salt('bf')), '(43.65257, -79.41342)', 'tyler', 'Johnson', '14161234567', '/images/users/m2.png', 'New to the neighbourhood, looking to find some cool events'),

(1, 'corben.kushneryk@hotmail.com', crypt('password', gen_salt('bf')), '(43.65522, -79.41749)', 'Corben', 'Kushneryk', '17809189819', 'https://i.imgur.com/FK8V841.jpg', 'Corben did not make this app, but his phone was hijacked for testing-purposes'),

-- Neighbourhood 2 Users

(2, 'corben.kushneryk@hotmail.com', crypt('password', gen_salt('bf')), '(45.542915, -73.634951)', 'Corben', 'Kushneryk', '17809189819', 'https://i.imgur.com/FK8V841.jpg', 'Corben did not make this app, but his phone was hijacked for testing-purposes'),

(2, 'tyler.johnson@gmail.com', crypt('password', gen_salt('bf')), '(43.646315, -79.408272)', 'tyler', 'Johnson', '14161234567', '/images/users/m2.png', 'New to the neighbourhood, looking to find some cool events'),

(2, 'richard.dupont@gmail.com', crypt('password', gen_salt('bf')), '(43.646315, -79.408272)', 'Richard', 'Dupont', '14161234567', '/images/users/m3.png', 'New to the neighbourhood, looking to find some cool events'),

(2, 'rosie.cruz@gmail.com', crypt('password', gen_salt('bf')), '(43.646315, -79.408272)', 'Rosie', 'Cruz', '14161234567', '/images/users/w4.jpg', 'New to the neighbourhood, looking to find some cool events'),

(2, 'julia.york@gmail.com', crypt('password', gen_salt('bf')), '(43.646315, -79.408272)', 'Julia', 'York', '14161234567', '/images/users/w5.jpg', 'New to the neighbourhood, looking to find some cool events'),

--Neighbourhood 3 Users

(3, 'p.lacroix@gmail.com', crypt('password', gen_salt('bf')), '(45.541441, -73.635646)', 'Pauline', 'Lacroix', '15146233583', 'https://i.imgur.com/3tVgsra.jpg', 'Bonjour tout le monde! heureuse de faire partie de ce quartier! tellement de belles personnes y vivent!'),

(3, 'james.petit@gmail.com', crypt('password', gen_salt('bf')), '(45.539390, -73.631162)', 'James', 'Petit', '15141234567', '/images/users/m4.png', 'New to the neighbourhood, looking to find some cool events'),

(3, 'alex.girard@gmail.com', crypt('password', gen_salt('bf')), '(45.539390, -73.631162)', 'Alex', 'Girard', '15141234567', '/images/users/m5.png', 'New to the neighbourhood, looking to find some cool events'),

(3, 'kara.garner@gmail.com', crypt('password', gen_salt('bf')), '(45.539390, -73.631162)', 'Kara', 'Garner', '15141234567', '/images/users/w6.jpg', 'New to the neighbourhood, looking to find some cool events'),

(3, 'ella.lamb@gmail.com', crypt('password', gen_salt('bf')), '(45.539390, -73.631162)', 'Ella', 'Lamb', '15141234567', '/images/users/w7.jpg', 'New to the neighbourhood, looking to find some cool events'),

--Neighbourhood 4 Users

(4, 'ethan.moreau@gmail.com', crypt('password', gen_salt('bf')), '(45.539390, -73.631162)', 'Ethan', 'Moreau', '15141234567', '/images/users/m6.png', 'New to the neighbourhood, looking to find some cool events'),

(4, 'zachary.lopez@gmail.com', crypt('password', gen_salt('bf')), '(45.539390, -73.631162)', 'Zachary', 'Lopez', '15141234567', '/images/users/m7.png', 'New to the neighbourhood, looking to find some cool events'),

(4, 'mia.goodman@gmail.com', crypt('password', gen_salt('bf')), '(43.65125, -79.41975)', 'Mia', 'Goodman', '15141234567', '/images/users/w8.jpg', 'New to the neighbourhood, looking to find some cool events'),

(4, 'sara.costa@gmail.com', crypt('password', gen_salt('bf')), '(45.539390, -73.631162)', 'Sara', 'Costa', '15141234567', '/images/users/w9.png', 'New to the neighbourhood, looking to find some cool events');

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

--Neighbourhood 1 Events
(2, 18, 1, 'Film screening: back to the future!!!', '(43.657603, -79.411882)', '2020-08-04 15:40:34-07', 'Come join us to watch Back to the future. We have installed a giant screen in our backyard. Places limited to 15, write me a message to book your spot!', '2020-08-21', '20:00:00', '/images/events/party-film-screening.jpg'),

(4, 15, 1, 'Macrame workshop!', '(43.65125, -79.41975)', '2020-08-02 14:40:34-07', 'Come and join me for a macrame workshop. I just ask for a 5$ participation for the material and you will come back home with a nice plant holder! I will have snacks for everyone.', '2020-08-16',  '14:00:00', '/images/events/crafts-macrame.jpg'),

(5, 12, 1, 'Garage Sale, mostly furniture', '(43.65903, -79.41303)', '2020-08-01 16:40:34-07', 'I got a new couch and also some other stuff. Gotta make room. Everything is in good condition.', '2020-08-15', '12:00:00', '/images/events/Garage-Sale-1.jpg'),

(6, 19, 1, 'Basketball', '(43.65125, -79.41975)', '2020-08-09 16:40:34-07', 'We need some more people to play basketball on saturdays. We are beginners, so no worries, everybody is accepted!', '2020-08-15', '16:00:00', '/images/events/sports-basketball.jpg'),

(8, 14, 1, 'Music jams on fridays!', '(43.65878, -79.42172)', '2020-08-07 16:40:34-07', 'We are looking for a guitarist for our band, we are very rock 90s, just leave me a message if you want to join us!', '2020-08-14', '19:00:00', '/images/events/music-jam-2.jpg'),

(9, 16, 1, 'Kids party with pinata', '(43.65277, -79.41584)', '2020-08-01 16:40:34-07', 'It is Mathias 10th birthday, and for the occasion we are bying his first pinata. kids and their parents are invited to jave fun with us! Lots of candies!', '2020-08-23', '13:00:00', '/images/events/kids-pinata.jpg'),

(10, 20, 1, 'Chest for seniors', '(43.65768, -79.41084)', '2020-08-03 16:40:34-07', 'We are organising chest games for seniors one sunday a month at the Saint Gregoire church, but anyone can join, we don t discriminate on age. ;)', '2020-08-30', '13:00:00', '/images/events/games-chest-senior.jpg'),

(11, 15, 1, 'Painting nights', '(43.65322, -79.41035)', '2020-08-05 16:40:34-07', 'I am learning aquarelle, and would love to have some company to learn from each other. Leave me a message!;)', '2020-08-26', '17:00:00', '/images/events/crafts-painting.jpg'),


--Neighbourhood 2 Events

(1, 18, 2, 'Party for no reason!!!', '(43.658017, -79.414930)', '2020-08-03 15:40:34-07', 'We are going to party because we are neighbours and we like each other!!! byob', '2020-08-15', '17:00:00', 'https://i.imgur.com/T2WwVfS.png'),

--Neighbourhood 3 Events

(3, 15, 3, 'Crafting Night at Sams!', '(45.54098, -73.625174)', '2020-08-03 14:40:34-07', 'Bring whatever crafting projects you are working on, or just bring random materials and make something up :D I will have snacks for everyone.', '2020-08-15',  '17:00:00', 'https://i.imgur.com/FK8V841.jpg'),

(16, 12, 3, 'Garage Sale, mostly furniture', '(45.537536, -73.619220)', '2020-08-03 16:40:34-07', 'I got a new couch and also some other stuff. Gotta make room. Everything is in good condition.', '2020-08-16', '13:00:00', 'https://i.imgur.com/okB9WKC.jpg'),

(15, 21, 3, 'Cinema en plein air: Back to the future!', '(45.538950, -73.626219)', '2020-08-03 16:40:34-07', 'Nous installons un ecran géant dans notre cour arrière, et allons visionner le film Retour vers le futur, vintage!. Places limitées à 30, écrivez-moi pour réserver la votre!', '2020-08-22', '19:00:00', 'https://i.imgur.com/okB9WKC.jpg');

--Neighbourhood 4 Events

INSERT INTO alerts(user_id, category_id,  neighbourhood_id, title, coordinates, time_created, description, alert_photo)
VALUES

--Neighbourhood 1 Alerts


--Neighbourhood 2 Alerts

(1, 1, 2, 'I just saw a man trying to break into my car', '(43.652495, -79.412900)', '2020-08-03 15:40:34-07', 'Everyone keep an eye out and check your valuables in your cars tonight. He ran away when I opened my back door. He was tall, skinny, white, and he was wearing a navy sweater, jeans, and a black toque.', 'https://i.imgur.com/Nmx0Qxo.png'),

--Neighbourhood 3 Alerts

(17, 1, 3, 'LOST DOG - Chocolate Lab named Paul', '(45.542615, -73.636909)', '2020-08-01 19:40:34-07', 'My dog, Paul, whom many of you may know, escaped this morning and we still cannot find him. Please message me on here if you see or find him!', 'https://i.imgur.com/iHq8K8Z.jpg'),

(14, 2, 3, 'HUGE NEW POTHOLE', '(45.538166, -73.635435)', '2020-08-01 08:40:34-07', 'I drove into a nice big, new pothole here this morning. BE CAREFUL! IT IS REALLY BIG. I think it damaged my car...', 'https://i.imgur.com/3tVgsra.jpg');

--Neighbourhood 4 Alerts

INSERT INTO services(user_id, category_id, neighbourhood_id, service_offer, title, coordinates, time_created, description, service_photo )
VALUES

--Neighbourhood 1 Services

(8, 7, 1, true, 'Offering tutoring in HTML, CSS, and Javascript', '(43.656917, -79.422268)', '2020-08-01 18:46:34-07', 'I just completed an amazing Web Development Bootcamp with Lighthouse Labs. If any students are struggling with any coding curriculum, I am here to help! I charge $25/hour... for now.', 'https://i.imgur.com/okB9WKC.jpg'),

--Neighbourhood 2 Services

(1, 4, 2, false, 'Need help weeding my lawn', '(45.539441, -73.621180)', '2020-08-03 15:46:34-07', 'Hey everyone! I need to weed my lawn, but my sciatica is really acting up an I need some help. It should take around 2-3 hours, and I will pay $50', 'https://i.imgur.com/iHq8K8Z.jpg'),

--Neighbourhood 3 Services


(15, 5, 3, false, 'Leaky Kitchen Faucet', '(45.539593, -73.636783)', '2020-08-01 15:46:34-07', 'Does anybody know how to fix a leaky faucet? I do not want to call a plumber just for this...', 'https://i.imgur.com/LpaY82x.png');

--Neighbourhood 4 Services


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

-- Little Italy Coordinates
-- Little Italy  Users
-- (43.657603, -79.411882) --In use by user 2 John
-- (43.65878, -79.42172)
-- (43.65277, -79.41584)
-- (43.65768, -79.41084)
-- (43.65125, -79.41975)
-- (43.65903, -79.41303)
-- (43.65522, -79.41749)

-- Little Italy Alerts
-- (43.65732, -79.41678)
-- (43.65277, -79.41584)
-- (43.65682, -79.41461)

-- Little Italy Events
-- (43.65868, -79.40998)
-- (43.65411, -79.40807)
-- (43.655573, -79.415224) -- Central point of neighbourhood ID
-- (43.65111, -79.41636)

-- Little Italy Services
-- (43.65195, -79.41786)
-- (43.65257, -79.41342)
-- (43.656917, -79.422268) -- In use

--Queen West Coordinates
-- Queen West Users
-- (43.64504, -79.41477)
-- (43.64666, -79.41574)
-- (43.64419, -79.41273)
-- (43.64794, -79.40546)
-- (43.64617, -79.40885)

-- Queen West Alerts
-- (43.652495, -79.412900) -- In use
-- (43.64533, -79.40602)
-- (43.646315, -79.408272) -- Central point of neighbourhood 

-- Queen West Events
-- (43.658017, -79.414930) -- In use
-- (43.64535, -79.41519)
-- (43.64571, -79.40735)

-- Queen West Services
-- (43.64703, -79.40885)
-- (45.539441, -73.621180) -- In use

-- Jarry Coordinates
-- Jarry Users
-- (45.542915, -73.634951) -- In use by user 1 Graham
-- (45.539652, -73.629813) -- In use by user 3 Sam
-- (45.539390, -73.631162) -- Central point of neighbourhood ID
-- (45.54239, -73.62577)
-- (45.53979, -73.62693)
-- (45.53856, -73.62259)
-- (45.53588, -73.64042)
-- (45.53409, -73.62345)
-- (45.54301, -73.63066)

-- Jarry Alerts
-- (45.542615, -73.636909) -- In use
-- (45.538166, -73.635435) -- In use
-- (45.53629, -73.61912)
-- (45.54081, -73.63317)
-- (45.53714, -73.62186)

-- Jarry Events
-- (45.54098, -73.625174) -- In use
-- (45.537536, -73.619220) -- In use
-- (45.538950, -73.626219) -- In Use
-- (45.54171, -73.63641)
-- (45.53531, -73.63349)

-- Jarry Services
-- (45.539593, -73.636783) -- In use
-- (45.54331, -73.63609)
-- (45.53796, -73.63766)
-- (45.53316, -73.62229)
-- (45.53877, -73.61618)

-- Villeray Coordinates
-- Villeray Users
-- (45.547282, -73.620562) -- Central point of neighbourhood ID
-- (45.54367, -73.61444)
-- (45.54436, -73.62826)
-- (45.54821, -73.61487)
-- (45.54986, -73.61891)
-- (45.5496, -73.6161)
-- (45.54345, -73.61116)

-- Villeray Alerts
-- (45.55211, -73.62014)
-- (45.54526, -73.61208)
-- (45.54623, -73.60876)
-- (45.54564, -73.62411)

-- Villeray Events
-- (45.54604, -73.62006)
-- (45.54745, -73.62929)
-- (45.54731, -73.62317)
-- (45.54725, -73.61834)

-- Villeray Services
-- (45.54309, -73.61753)
-- (45.54617, -73.61596)
-- (45.54413, -73.62113)
