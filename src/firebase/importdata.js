const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBg-WUqA62IO5JaWW8du2RXL_ZCtC_OAl0",
    authDomain: "final-d58d7.firebaseapp.com",
    projectId: "final-d58d7",
    storageBucket: "final-d58d7.appspot.com",
    messagingSenderId: "1067911488964",
    appId: "1:1067911488964:web:79d0d6c8566baef2ce3091"
  };

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const jobsData =  [
    {
      "id" : "1",
      "title": "Concert de fin d'année",
      "description": "Un concert pour célébrer la fin de l'année universitaire.",
      "date": "2024-07-01T18:00:00Z",
      "yesVotes": 100,
      "noVotes": 20,
      "createdAt": "2024-06-20T12:00:00Z",
      "updatedAt": "2024-06-25T15:30:00Z"
    },
    {
        "id" : "2",
      "title": "Conférence sur l'IA",
      "description": "Une conférence sur les dernières avancées en intelligence artificielle.",
      "date": "2024-07-05T14:00:00Z",
      "yesVotes": 150,
      "noVotes": 10,
      "createdAt": "2024-06-21T09:00:00Z",
      "updatedAt": "2024-06-26T10:00:00Z"
    },
    {
        "id" : "3",
      "title": "Journée des sports",
      "description": "Une journée dédiée aux activités sportives pour tous les étudiants.",
      "date": "2024-07-10T08:00:00Z",
      "yesVotes": 200,
      "noVotes": 15,
      "createdAt": "2024-06-22T11:30:00Z",
      "updatedAt": "2024-06-27T12:45:00Z"
    },
    {
        "id" : "4",
      "title": "Atelier de développement web",
      "description": "Un atelier pratique sur le développement web moderne.",
      "date": "2024-07-15T10:00:00Z",
      "yesVotes": 120,
      "noVotes": 5,
      "createdAt": "2024-06-23T13:00:00Z",
      "updatedAt": "2024-06-28T14:15:00Z"
    },
    {
        "id" : "5",
      "title": "Séance de méditation",
      "description": "Une séance de méditation pour réduire le stress avant les examens.",
      "date": "2024-07-20T07:00:00Z",
      "yesVotes": 90,
      "noVotes": 30,
      "createdAt": "2024-06-24T15:00:00Z",
      "updatedAt": "2024-06-29T16:30:00Z"
    },
    {
        "id" : "6",
      "title": "Exposition d'art étudiant",
      "description": "Une exposition présentant les œuvres d'art des étudiants.",
      "date": "2024-07-25T16:00:00Z",
      "yesVotes": 70,
      "noVotes": 10,
      "createdAt": "2024-06-25T17:30:00Z",
      "updatedAt": "2024-06-30T18:45:00Z"
    },
    {
        "id" : "7",
      "title": "Soirée cinéma",
      "description": "Une soirée cinéma avec la projection de films choisis par les étudiants.",
      "date": "2024-07-30T19:00:00Z",
      "yesVotes": 200,
      "noVotes": 25,
      "createdAt": "2024-06-26T20:00:00Z",
      "updatedAt": "2024-07-01T21:15:00Z"
    },
    {
        "id" : "8",
      "title": "Hackathon",
      "description": "Un hackathon de 24 heures pour les passionnés de programmation.",
      "date": "2024-08-05T09:00:00Z",
      "yesVotes": 300,
      "noVotes": 50,
      "createdAt": "2024-06-27T08:30:00Z",
      "updatedAt": "2024-07-02T09:45:00Z"
    },
    {
        "id" : "9",
      "title": "Session de networking",
      "description": "Une session de networking pour rencontrer des professionnels de divers secteurs.",
      "date": "2024-08-10T17:00:00Z",
      "yesVotes": 130,
      "noVotes": 10,
      "createdAt": "2024-06-28T10:00:00Z",
      "updatedAt": "2024-07-03T11:15:00Z"
    },
    {
        "id" : "10",
      "title": "Débat étudiant",
      "description": "Un débat sur des sujets d'actualité organisé par les étudiants.",
      "date": "2024-08-15T15:00:00Z",
      "yesVotes": 80,
      "noVotes": 40,
      "createdAt": "2024-06-29T12:00:00Z",
      "updatedAt": "2024-07-04T13:30:00Z"
    }
  ];
  


// Function to add data to Firestore
const addJobsToFirestore = async (jobsData) => {
    try {
        // Loop through each job and add it to Firestore
        for (const job of jobsData) {
            // Use set with merge to add or update the document
            await db.collection('Events').doc(job.id.toString()).set(job, { merge: true });
        }
        console.log("Jobs added to Firestore successfully!");
    } catch (error) {
        console.error("Error adding jobs to Firestore: ", error);
    }
};

// Call the function to add jobs data to Firestore
addJobsToFirestore(jobsData);
