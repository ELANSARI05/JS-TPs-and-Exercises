const firebase = require('firebase/app');
require('firebase/firestore');

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB-cinObT-isFpNq7TBv50tYnLeJ4S_fcY",
  authDomain: "myapp-b8dad.firebaseapp.com",
  projectId: "myapp-b8dad",
  storageBucket: "myapp-b8dad.appspot.com",
  messagingSenderId: "187694056110",
  appId: "1:187694056110:web:3b9221c7686a3dabbb233f"
};

firebase.initializeApp(firebaseConfig);

// Access Firestore
const db = firebase.firestore();

// Data to add
const jobsData = [
    {
      "id": 1,
      "name": "Grilled Chicken Salad",
      "ingredients": ["Grilled chicken breast", "Mixed greens", "Cherry tomatoes", "Cucumber", "Red onion", "Feta cheese", "Balsamic vinaigrette"],
      "regime": "Omnivore",
      "image": "https://example.com/grilled_chicken_salad.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 2,
      "name": "Vegetarian Chili",
      "ingredients": ["Kidney beans", "Black beans", "Tomatoes", "Bell peppers", "Onion", "Garlic", "Chili powder", "Cumin", "Vegetable broth"],
      "regime": "Sans gluten",
      "image": "https://example.com/vegetarian_chili.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 3,
      "name": "Mango Coconut Smoothie",
      "ingredients": ["Mango", "Coconut milk", "Banana", "Spinach", "Chia seeds", "Honey"],
      "regime": "Végétarien",
      "image": "https://example.com/mango_coconut_smoothie.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 4,
      "name": "Salmon Teriyaki",
      "ingredients": ["Salmon fillets", "Teriyaki sauce", "Garlic", "Ginger", "Soy sauce", "Sesame oil", "Green onions", "Sesame seeds"],
      "regime": "Pescétarien",
      "image": "https://example.com/salmon_teriyaki.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 5,
      "name": "Quinoa Stuffed Bell Peppers",
      "ingredients": ["Quinoa", "Bell peppers", "Black beans", "Corn", "Tomatoes", "Onion", "Garlic", "Cumin", "Chili powder", "Cheese"],
      "regime": "Végétalien(Vegan)",
      "image": "https://example.com/quinoa_stuffed_bell_peppers.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 6,
      "name": "Caprese Salad",
      "ingredients": ["Tomatoes", "Fresh mozzarella", "Basil leaves", "Balsamic glaze", "Salt", "Black pepper"],
      "regime": "Végétalien(Vegan)",
      "image": "https://example.com/caprese_salad.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 7,
      "name": "Spinach and Mushroom Quesadillas",
      "ingredients": ["Flour tortillas", "Spinach", "Mushrooms", "Red onion", "Garlic", "Cheese", "Salsa", "Sour cream"],
      "regime": "Omnivore",
      "image": "https://example.com/spinach_mushroom_quesadillas.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 8,
      "name": "Cauliflower Fried Rice",
      "ingredients": ["Cauliflower rice", "Carrots", "Peas", "Bell peppers", "Onion", "Garlic", "Soy sauce", "Eggs", "Green onions"],
      "regime": "Paléo",
      "image": "https://example.com/cauliflower_fried_rice.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 9,
      "name": "Pasta Primavera",
      "ingredients": ["Pasta", "Assorted vegetables", "Olive oil", "Garlic", "Parmesan cheese", "Salt", "Black pepper"],
      "regime": "Cétogène (Keto)",
      "image": "https://example.com/pasta_primavera.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 10,
      "name": "Black Bean Soup",
      "ingredients": ["Black beans", "Onion", "Garlic", "Carrots", "Celery", "Tomatoes", "Cumin", "Chili powder", "Vegetable broth"],
      "regime": "Crudivore",
      "image": "https://example.com/black_bean_soup.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 11,
      "name": "Stuffed Portobello Mushrooms",
      "ingredients": ["Portobello mushrooms", "Spinach", "Sun-dried tomatoes", "Feta cheese", "Breadcrumbs", "Garlic", "Olive oil"],
      "regime": "Crudivore",
      "image": "https://example.com/stuffed_portobello_mushrooms.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 12,
      "name": "Vegetable Stir Fry",
      "ingredients": ["Assorted vegetables", "Tofu", "Soy sauce", "Ginger", "Garlic", "Sesame oil", "Rice vinegar", "Brown sugar"],
      "regime": "Cétogène (Keto)",
      "image": "https://example.com/vegetable_stir_fry.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 13,
      "name": "Greek Salad",
      "ingredients": ["Cucumbers", "Tomatoes", "Red onion", "Kalamata olives", "Feta cheese", "Oregano", "Red wine vinegar", "Olive oil"],
      "regime": "Omnivore",
      "image": "https://example.com/greek_salad.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 14,
      "name": "Lentil Soup",
      "ingredients": ["Lentils", "Carrots", "Celery", "Onion", "Garlic", "Tomatoes", "Vegetable broth", "Cumin", "Coriander"],
      "regime": "Sans gluten",
      "image": "https://example.com/lentil_soup.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 15,
      "name": "Avocado Toast",
      "ingredients": ["Bread", "Avocado", "Tomatoes", "Red onion", "Lemon juice", "Salt", "Black pepper"],
      "regime": "Pescétarien",
      "image": "https://example.com/avocado_toast.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 16,
      "name": "Shakshuka",
      "ingredients": ["Eggs", "Tomatoes", "Bell peppers", "Onion", "Garlic", "Cumin", "Paprika", "Chili flakes", "Feta cheese", "Parsley"],
      "regime": "Flexitarien",
      "image": "https://example.com/shakshuka.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 17,
      "name": "Tofu Stir Fry",
      "ingredients": ["Tofu", "Assorted vegetables", "Soy sauce", "Garlic", "Ginger", "Sesame oil", "Rice vinegar", "Brown sugar"],
      "regime": "Végétalien",
      "image": "https://example.com/tofu_stir_fry.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 18,
      "name": "Veggie Burger",
      "ingredients": ["Black beans", "Quinoa", "Carrots", "Onion", "Garlic", "Paprika", "Cumin", "Salt", "Black pepper", "Burger buns", "Lettuce", "Tomato", "Avocado"],
      "regime": "Flexitarien",
      "image": "https://example.com/veggie_burger.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 19,
      "name": "Ratatouille",
      "ingredients": ["Eggplant", "Zucchini", "Bell peppers", "Tomatoes", "Onion", "Garlic", "Olive oil", "Herbes de Provence"],
      "regime": "Végétalien",
      "image": "https://example.com/ratatouille.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    },
    {
      "id": 20,
      "name": "Peanut Noodles",
      "ingredients": ["Spaghetti", "Peanut butter", "Soy sauce", "Rice vinegar", "Sesame oil", "Garlic", "Ginger", "Sriracha", "Green onions", "Cilantro", "Peanuts"],
      "regime": "Végétarien",
      "image": "https://example.com/peanut_noodles.jpg",
      "instructions": ["1. Heat olive oil in a large pot over medium heat.", "2. Add onion, bell peppers, and garlic. Cook until vegetables are tender.", "3. Stir in chili powder and cumin.", "4. Add tomatoes, beans, and vegetable broth. Simmer for 20 minutes."]
    }
  ];  


// Function to add data to Firestore
const addJobsToFirestore = async (jobsData) => {
    try {
        // Loop through each job and add it to Firestore
        for (const job of jobsData) {
            // Use set with merge to add or update the document
            await db.collection('recipes').doc(job.id.toString()).set(job, { merge: true });
        }
        console.log("Jobs added to Firestore successfully!");
    } catch (error) {
        console.error("Error adding jobs to Firestore: ", error);
    }
};

// Call the function to add jobs data to Firestore
addJobsToFirestore(jobsData);
