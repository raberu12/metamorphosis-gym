-- Create workout table
CREATE TABLE `workout` (
    workout_id INT PRIMARY KEY AUTO_INCREMENT,
    category VARCHAR(255) NOT NULL,
    exercise_name VARCHAR(255) NOT NULL,
    sets INT,
    reps VARCHAR(255), 
    intensity ENUM ('Low', 'Moderate', 'High')
);

-- Endurance exercises
INSERT INTO workout (category, exercise_name, sets, reps, intensity)
VALUES
    ('Endurance Training', 'Running', 3, 30, 'High' ),
    ('Endurance Training', 'Cycling', 4, 20, 'Moderate'),
    ('Endurance Training', 'Swimming', 5, 15, 'High'),
    ('Endurance Training', 'Jump Rope', 3, 50, 'Moderate' ),
    ('Endurance Training', 'Rowing', 4, 25, 'High');
-- Strength training exercises
INSERT INTO workout (category, exercise_name, sets, reps, intensity)
VALUES
    ('Strength Training', 'Squats', 4, 12, 'High' ),
    ('Strength Training', 'Deadlifts', 3, 10, 'High' ),
    ('Strength Training', 'Bench Press', 3, 15, 'Moderate' ),
    ('Strength Training', 'Pull-Ups', 4, 8, 'High' ),
    ('Strength Training', 'Lunges', 3, 12, 'Moderate' );

-- Circuit exercises
INSERT INTO workout (category, exercise_name, sets, reps, intensity)
VALUES
    ('Circuit Training', 'Burpees', 3, 15, 'High' ),
    ('Circuit Training', 'Mountain Climbers', 4, 20, 'Moderate' ),
    ('Circuit Training', 'Kettlebell Swings', 3, 15, 'High' ),
    ('Circuit Training', 'Medicine Ball Slams', 3, 12, 'High'),
    ('Circuit Training', 'Box Jumps', 3, 10, 'Moderate');

-- Flexibility exercises
INSERT INTO workout (category, exercise_name, reps, intensity)
VALUES
    ('Flexibility Training', 'Yoga', 1, 'Low' ),
    ('Flexibility Training', 'Static', 1, 'Low' ),
    ('Flexibility Training', 'Pilates', 1, 'Moderate' ),
    ('Flexibility Training', 'Tai Chi', 1, 'Low' ),
    ('Flexibility Training', 'Dynamic Stretching', 1, 'Moderate' );

-- Elevate exercises
INSERT INTO workout (category, exercise_name, sets, reps, intensity)
VALUES
    ('Elevate Training', 'Jump Squats', 3, 15, 'High' ),
    ('Elevate Training', 'Lunge Jumps', 3, 12, 'High' ),
    ('Elevate Training', 'Single-Leg Jumps', 3, 10, 'High'),
    ('Elevate Training', 'Tuck Jumps', 3, 12, 'High' ),
    ('Elevate Training', 'Calf Raises', 3, 20, 'Moderate' );



