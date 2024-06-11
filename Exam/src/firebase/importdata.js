const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCo2uMmTZkeMh4VF3iBUgF5jO3EUlCc7Zs",
    authDomain: "resume-builder-e7518.firebaseapp.com",
    projectId: "resume-builder-e7518",
    storageBucket: "resume-builder-e7518.appspot.com",
    messagingSenderId: "105335025618",
    appId: "1:105335025618:web:5a699dc77a68db29e2a20b"
  };

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const jobsData = [
    {
    "id": "1",
    "userid" : "ksjj",
    "createdat" : "2000-14-05",
    "updatedat" : "2000-14-05",
    
    "about": "Hi, my name is John Doe. I'm just about the most boring type of person you could possibly imagine. I like collecting leaves from the tree in my back yard and documenting each time I eat a peanut that is non-uniform. I am not a robot. Please hire me.",
    "position": "Software Developer",
    "birth": {
      "year": 1990,
      "location": "New York"
    },
    "experience": [
      {
        "timeperiod": "",
        "company/Organization": "Company A",
        "position": "Developer",
        "Location": "",
        "Details": "Programming and watching cute cat videos."
      },
      {
        "timeperiod": "January 2015 - December 2015",
        "company/Organization": "Company B",
        "position": "Frontend Developer",
        "Location": "",
        "Details": "Fulfillment of extremely important tasks."
      },
      {
        "timeperiod": "March 2014 - December 2014",
        "company/Organization": "Company C",
        "position": "Trainee",
        "Location": "",
        "Details": "Making coffee and baking cookies."
      }
    ],
    "education": [
      {
        "timeperiod": "March 2012 - December 2013",
        "degree": "Master of Arts",
        "Institution": "",
        "Location": "",
        "Details": "Major in Hacking and Computer Penetration, University A, New York, USA."
      },
      {
        "timeperiod": "March 2009 - December 2011",
        "degree": "Bachelor of Science",
        "Institution": "",
        "Location": "",
        "Details": "Major in Engineering, University B, Los Angeles, USA."
      }
    ],
    "skills": [
      {
        "name": "HTML5",
        "level": 99,
        "Details": ""
      },
      {
        "name": "CSS3",
        "level": 95,
        "Details": ""
      },
      {
        "name": "JavaScript",
        "level": 97,
        "Details": ""
      },
      {
        "name": "Node.js",
        "level": 93,
        "Details": ""
      },
      {
        "name": "Angular 2",
        "level": 60,
        "Details": ""
      },
      {
        "name": "TypeScript",
        "level": 80,
        "Details": ""
      },
      {
        "name": "ES.Next",
        "level": 70,
        "Details": ""
      },
      {
        "name": "Docker",
        "level": 99,
        "Details": ""
      }
    ],
    "projects": [
      {
        "name": "best-resume-ever",
        "platform": "Vue",
        "timeperiod": "February 2016",
        "description": "👔 💼 Build fast 🚀 and easy multiple beautiful resumes and create your best CV ever! Made with Vue and LESS.",
        "url": "https://github.com/salomonelli/best-resume-ever"
      }
    ],
    "hobbies/Interests": [
      {
        "name": "Video Games",
        "Details": ""
      },
      {
        "name": "Drawing",
        "Details": ""
      }
    ],
    "contact": {
      "email": "john.doe@email.com",
      "street": "1234 Broadway",
      "phone": "0123 456789",
      "BirthDate": "",
      "DrivingLicense": "",
      "city": "New York",
      "Tel": "0678593831"
    },
    "Languages": [
      {
        "Name": "English",
        "Level": "",
        "Details": ""
      },
      {
        "Name": "Frensh",
        "Level": "",
        "Details": ""
      }
    ]
  }
  ];


// Function to add data to Firestore
const addJobsToFirestore = async (jobsData) => {
    try {
        // Loop through each job and add it to Firestore
        for (const job of jobsData) {
            // Use set with merge to add or update the document
            await db.collection('Person').doc(job.id.toString()).set(job, { merge: true });
        }
        console.log("Jobs added to Firestore successfully!");
    } catch (error) {
        console.error("Error adding jobs to Firestore: ", error);
    }
};

// Call the function to add jobs data to Firestore
addJobsToFirestore(jobsData);
