<template>
    <div class="container">
      <div v-if="showForm" class="register-form">
        <h2>Register</h2>
        <form @submit.prevent="register">
          <div class="form-group">
            <label for="email">Email address</label>
            <input
              id="email"
              type="email"
              v-model="email"
              required
              placeholder="Enter email"
            >
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input
              id="password"
              type="password"
              v-model="password"
              required
              placeholder="Enter password"
            >
          </div>
          <button type="submit">Register</button>
        </form>
        <p v-if="error" class="error">{{ error }}</p>
        <button class="google-button" @click="signInWithGoogle">Sign In with Google</button>
        <router-link to="/login">Already have an account? Login</router-link>
      </div>
  
      <user-info-form v-else @submit-user-info="handleUserInfoSubmit" />
    </div>
  </template>
  
  <script>
  import { projectAuth, projectFirestore, googleProvider } from '../firebase/config';
  import UserInfoForm from '../components/UserInfoForm.vue';
  
  export default {
    name: "Register",
    components: { UserInfoForm },
    data() {
      return {
        email: "",
        password: "",
        error: "",
        showForm: true,
        userInfo: null,
        userId: null,
      };
    },
    methods: {
      async register() {
        try {
          const userCredential = await projectAuth.createUserWithEmailAndPassword(this.email, this.password);
          const user = userCredential.user;
          this.userId = user.uid;
          const userDoc = await projectFirestore.collection('Person').doc(user.uid).get();
          
          if (userDoc.exists) {
            this.$router.push("/home");
          } else {
            this.showForm = false;
          }
        } catch (error) {
          this.error = "Error creating account. Please try again.";
          console.error("Error registering:", error);
        }
      },
      async signInWithGoogle() {
        try {
          const userCredential = await projectAuth.signInWithPopup(googleProvider);
          const user = userCredential.user;
          this.userId = user.uid;
          const userDoc = await projectFirestore.collection('Person').doc(user.uid).get();
          
          if (userDoc.exists) {
            this.$router.push("/home");
          } else {
            this.showForm = false;
          }
        } catch (error) {
          this.error = "Error signing in with Google. Please try again.";
          console.error("Error signing in with Google:", error);
        }
      },
      async createUserDocument(userInfo) {
        const userRef = projectFirestore.collection('Person').doc(this.userId);
        const { email, displayName } = projectAuth.currentUser;
        const defaultUserData = {
          name: {
            first: displayName ? displayName.split(' ')[0] : 'John',
            middle: '',
            last: displayName ? displayName.split(' ')[1] : 'Doe'
          },
          about: "Hi, my name is John Doe. I'm just about the most boring type of person you could possibly imagine. I like collecting leaves from the tree in my back yard and documenting each time I eat a peanut that is non-uniform. I am not a robot. Please hire me.",
          position: userInfo.position || "Software Developer",
          birth: {
            year: 1990,
            location: "New York"
          },
          experience: [
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
          education: [
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
          skills: [
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
          projects: [
            {
              "name": "best-resume-ever",
              "platform": "Vue",
              "timeperiod": "February 2016",
              "description": "👔 💼 Build fast 🚀 and easy multiple beautiful resumes and create your best CV ever! Made with Vue and LESS.",
              "url": "https://github.com/salomonelli/best-resume-ever"
            }
          ],
          hobbies: [
            {
              "name": "Video Games",
              "Details": ""
            },
            {
              "name": "Drawing",
              "Details": ""
            }
          ],
          contact: {
            email: email,
            street: "1234 Broadway",
            phone: "0123 456789",
            BirthDate: "",
            DrivingLicense: "",
            city: "New York",
            Tel: "0678593831"
          },
          Languages: [
            {
              "Name": "English",
              "Level": "",
              "Details": ""
            },
            {
              "Name": "French",
              "Level": "",
              "Details": ""
            }
          ],
          gender: userInfo.gender,
          location: userInfo.location,
          purpose: userInfo.purpose,
          status: userInfo.status,
        };
  
        try {
          await userRef.set(defaultUserData);
          this.$router.push("/home");
        } catch (error) {
          console.error("Error creating user document:", error);
        }
      },
      handleUserInfoSubmit(userInfo) {
        this.createUserDocument(userInfo);
      },
    },
  };
  </script>
  
  <style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .register-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
  }
  
  .register-form h2 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
  }
  
  .form-group input {
    width: calc(100% - 20px);
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  
  button {
    display: block;
    width: calc(100% - 20px);
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .google-button {
    margin-top: 10px;
    background-color: #db4437;
  }
  
  .google-button:hover {
    background-color: #c33d2e;
  }
  
  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  
  a {
    display: block;
    text-align: center;
    margin-top: 10px;
    color: #007bff;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  