const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB1GXgSF4aYVgrkLugpmV5hbhNe71GWz_U",
  authDomain: "articles-f24ce.firebaseapp.com",
  projectId: "articles-f24ce",
  storageBucket: "articles-f24ce.appspot.com",
  messagingSenderId: "164022110187",
  appId: "1:164022110187:web:acf461151b731c9174bbae"
};

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const jobsData = [
  {
    "id": 1,
    "title": "Healthy Eating Habits",
    "body": "Learn about the importance of healthy eating habits, including balanced nutrition, portion control, and the benefits of consuming fresh fruits and vegetables.",
    "tags": ["Healthy Eating", "Nutrition", "Wellness", "Diet"],
    "createdAt": "2024-05-13T10:00:00Z",
    "modifiedAt": "2024-05-13T12:30:00Z",
    "snippet": "Learn about the importance of healthy eating habits, including balanced"
  },
  {
    "id": 2,
    "title": "Photography Basics",
    "body": "Discover the fundamentals of photography, such as composition, lighting techniques, camera settings, and post-processing tips for creating stunning photographs.",
    "tags": ["Photography", "Composition", "Lighting", "Camera Settings"],
    "createdAt": "2024-05-10T08:45:00Z",
    "modifiedAt": "2024-05-12T15:20:00Z",
    "snippet": "Discover the fundamentals of photography, such as composition, lighti"
  },
  {
    "id": 3,
    "title": "Effective Communication Skills",
    "body": "Improve your communication skills by learning about active listening, empathy, nonverbal communication, and effective verbal communication strategies for personal and professional success.",
    "tags": ["Communication Skills", "Active Listening", "Empathy", "Verbal Communication"],
    "createdAt": "2024-05-08T14:20:00Z",
    "modifiedAt": "2024-05-11T09:10:00Z",
    "snippet": "Improve your communication skills by learning about active listening, e"
  },
  {
    "id": 4,
    "title": "Sustainable Living Practices",
    "body": "Explore sustainable living practices, including reducing waste, conserving energy, using eco-friendly products, and promoting environmental stewardship for a healthier planet.",
    "tags": ["Sustainable Living", "Environmental Conservation", "Waste Reduction", "Eco-friendly"],
    "createdAt": "2024-05-05T11:30:00Z",
    "modifiedAt": "2024-05-10T13:55:00Z",
    "snippet": "Explore sustainable living practices, including reducing waste, conser"
  },
  {
    "id": 5,
    "title": "Fitness and Exercise Tips",
    "body": "Discover fitness and exercise tips for maintaining a healthy lifestyle, including workout routines, strength training, cardio exercises, and strategies for staying motivated.",
    "tags": ["Fitness", "Exercise", "Workout Routines", "Motivation"],
    "createdAt": "2024-05-02T09:15:00Z",
    "modifiedAt": "2024-05-09T11:40:00Z",
    "snippet": "Discover fitness and exercise tips for maintaining a healthy lifestyle"
  },
  {
    "id": 6,
    "title": "Art History Overview",
    "body": "Explore the history of art, including major art movements, influential artists, iconic artworks, and the evolution of artistic styles throughout different periods.",
    "tags": ["Art History", "Art Movements", "Artists", "Artistic Styles"],
    "createdAt": "2024-04-30T15:00:00Z",
    "modifiedAt": "2024-05-08T10:20:00Z",
    "snippet": "Explore the history of art, including major art movements, influential"
  },
  {
    "id": 7,
    "title": "Personal Finance Management",
    "body": "Learn about personal finance management, including budgeting, saving strategies, investment options, debt management, and financial planning for achieving financial goals.",
    "tags": ["Personal Finance", "Budgeting", "Saving Strategies", "Investment"],
    "createdAt": "2024-04-28T12:30:00Z",
    "modifiedAt": "2024-05-07T14:15:00Z",
    "snippet": "Learn about personal finance management, including budgeting, saving "
  },
  {
    "id": 8,
    "title": "Mindfulness Meditation Techniques",
    "body": "Discover mindfulness meditation techniques for stress reduction, relaxation, improved focus, emotional well-being, and cultivating a sense of mindfulness in daily life.",
    "tags": ["Mindfulness Meditation", "Stress Reduction", "Relaxation", "Emotional Well-being"],
    "createdAt": "2024-04-26T09:45:00Z",
    "modifiedAt": "2024-05-05T11:00:00Z",
    "snippet": "Discover mindfulness meditation techniques for stress reduction, rela"
  },
  {
    "id": 9,
    "title": "Home Gardening Tips",
    "body": "Get valuable home gardening tips, including plant care, gardening tools, soil management, pest control, and creating beautiful outdoor spaces.",
    "tags": ["Home Gardening", "Plant Care", "Gardening Tools", "Outdoor Spaces"],
    "createdAt": "2024-04-24T08:00:00Z",
    "modifiedAt": "2024-05-03T10:30:00Z",
    "snippet": "Get valuable home gardening tips, including plant care, gardening tool"
  },
  {
    "id": 10,
    "title": "Exploring World Cultures",
    "body": "Embark on a journey of exploring world cultures, traditions, customs, languages, cuisine, and fascinating aspects that make each culture unique and diverse.",
    "tags": ["World Cultures", "Traditions", "Languages", "Cuisine"],
    "createdAt": "2024-04-22T14:20:00Z",
    "modifiedAt": "2024-05-01T16:50:00Z",
    "snippet": "Embark on a journey of exploring world cultures, traditions, customs,"
  }
];


// Function to add data to Firestore
const addJobsToFirestore = async (jobsData) => {
  try {
    // Loop through each job and add it to Firestore
    for (const job of jobsData) {
      // Use set with merge to add or update the document
      await db.collection('articles').doc(job.id.toString()).set(job, { merge: true });
    }
    console.log("Jobs added to Firestore successfully!");
  } catch (error) {
    console.error("Error adding jobs to Firestore: ", error);
  }
};

// Call the function to add jobs data to Firestore
addJobsToFirestore(jobsData);