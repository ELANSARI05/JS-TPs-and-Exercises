<template>
  <div class="container">
    <div class="forms-container">
      <div class="signin-signup">
        <div class="formbold-main-wrapper">
          <form @submit.prevent="submitForm" class="sign-in-form">
            <div class="formbold-steps">
              <ul>
                <li
                  :class="{ active: step === 1, disabled: !canGoToStep(1) }"
                  @click="canGoToStep(1) && goToStep(1)"
                >
                  <span>1</span>
                  Personal Information
                </li>
                <li
                  :class="{ active: step === 2, disabled: !canGoToStep(2) }"
                  @click="canGoToStep(2) && goToStep(2)"
                >
                  <span>2</span>
                  Resume Details
                </li>
                <li
                  :class="{ active: step === 3, disabled: !canGoToStep(3) }"
                  @click="canGoToStep(3) && goToStep(3)"
                >
                  <span>3</span>
                  Additional Information
                </li>
              </ul>
            </div>

            <!-- Step 1: Personal Information -->
            <div v-if="step === 1" class="formbold-form-step-1 active">
              <div class="formbold-input-flex">
                <div>
                  <label for="name" class="formbold-form-label">Full Name</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text text-primary"><i class="fas fa-user"></i></span>
                    </div>
                    <input id="name" v-model="name" class="form-control input-light-blue" required placeholder="Enter your full name">
                  </div>
                </div>
                <div>
                  <label for="birthdate" class="formbold-form-label">Birth Date</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text text-success"><i class="fas fa-calendar-alt"></i></span>
                    </div>
                    <input type="date" id="birthdate" v-model="birthdate" class="form-control input-light-blue" required>
                  </div>
                </div>
              </div>
              <div class="formbold-input-flex">
                <div>
                  <label for="birthlocation" class="formbold-form-label">Birth Location</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text text-danger"><i class="fas fa-map-marker-alt"></i></span>
                    </div>
                    <input id="birthlocation" v-model="birthlocation" class="form-control input-light-blue" required placeholder="Enter your birth location">
                  </div>
                </div>
                <div>
                  <label for="tel" class="formbold-form-label">Telephone</label>
                  <div class="input-group">
                    <div class="input-group-prepend">
                      <span class="input-group-text text-warning"><i class="fas fa-phone"></i></span>
                    </div>
                    <input id="tel" v-model="tel" class="form-control input-light-blue" required placeholder="Enter your telephone number">
                  </div>
                </div>
              </div>
              <div>
                <label for="city" class="formbold-form-label">City</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-info"><i class="fas fa-city"></i></span>
                  </div>
                  <input id="city" v-model="city" class="form-control input-light-blue" required placeholder="Enter your city">
                </div>
              </div>
              <div>
                <label for="email" class="formbold-form-label">Email</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-secondary"><i class="fas fa-envelope"></i></span>
                  </div>
                  <input type="email" id="email" v-model="email" class="form-control input-light-blue" required placeholder="Enter your email" disabled>
                </div>
              </div>
              <div>
                <label for="street" class="formbold-form-label">Street (Optional)</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-dark"><i class="fas fa-road"></i></span>
                  </div>
                  <input id="street" v-model="street" class="form-control input-light-blue" placeholder="Enter your street">
                </div>
              </div>
              <div>
                <label for="gender" class="formbold-form-label">Gender</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-primary"><i class="fas fa-venus-mars"></i></span>
                  </div>
                  <select id="gender" v-model="gender" class="form-control input-light-blue" required>
                    <option disabled value="">Please select one</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Step 2: Position and Resume Details -->
            <div v-if="step === 2" class="formbold-form-step-2">
              <div>
                <label for="position" class="formbold-form-label">Position</label>
                <select id="position" v-model="position" class="form-control input-light-blue" required>
                  <option disabled value="">Please select one</option>
                  <option v-for="pos in positions" :key="pos" :value="pos">{{ pos }}</option>
                </select>
              </div>
              <div>
                <label for="location" class="formbold-form-label">Preferred Location</label>
                <select id="location" v-model="location" class="form-control input-light-blue" required>
                  <option disabled value="">Please select one</option>
                  <option v-for="loc in locations" :key="loc" :value="loc">{{ loc }}</option>
                </select>
              </div>
              <div>
                <label for="purpose" class="formbold-form-label">Purpose of Resume</label>
                <select id="purpose" v-model="purpose" class="form-control input-light-blue" required>
                  <option disabled value="">Please select one</option>
                  <option v-for="purp in purposes" :key="purp" :value="purp">{{ purp }}</option>
                </select>
              </div>
              <div>
                <label for="status" class="formbold-form-label">Status</label>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-warning"><i class="fas fa-user-tag"></i></span>
                  </div>
                  <select id="status" v-model="status" class="form-control input-light-blue" required>
                    <option disabled value="">Please select one</option>
                    <option value="Student">Student</option>
                    <option value="Employed">Employed</option>
                    <option value="Unemployed">Unemployed</option>
                    <option value="Freelancer">Freelancer</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Step 3: Additional Information -->
            <div v-if="step === 3" class="formbold-form-step-3">
              <div>
                <label for="languages" class="formbold-form-label">Languages</label>
                <div v-for="(language, index) in languages" :key="index" class="input-group mb-2">
                  <select v-model="languages[index]" class="form-control input-light-blue" required>
                    <option disabled value="">Please select one</option>
                    <option v-for="lang in allLanguages" :key="lang" :value="lang">{{ lang }}</option>
                  </select>
                  <div class="input-group-append">
                    <button type="button" class="btn btn-danger btn-sm" @click="removeLanguage(index)">
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
                <button type="button" class="btn btn-success btn-sm" @click="addLanguage">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </div>
              <div>
                <label for="education" class="formbold-form-label">Education Degrees</label>
                <div v-for="(degree, index) in education" :key="index" class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-secondary"><i class="fas fa-graduation-cap"></i></span>
                  </div>
                  <input v-model="education[index]" class="form-control input-light-blue" required placeholder="Enter degree">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-danger btn-sm" @click="removeEducation(index)">
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
                <button type="button" class="btn btn-success btn-sm" @click="addEducation">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </div>
              <div>
                <label for="experience" class="formbold-form-label">Experiences</label>
                <div v-for="(exp, index) in experiences" :key="index" class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-dark"><i class="fas fa-briefcase"></i></span>
                  </div>
                  <input v-model="experiences[index]" class="form-control input-light-blue" required placeholder="Enter experience">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-danger btn-sm" @click="removeExperience(index)">
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
                <button type="button" class="btn btn-success btn-sm" @click="addExperience">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </div>
              <div>
                <label for="hobbies" class="formbold-form-label">Hobbies</label>
                <div v-for="(hobby, index) in hobbies" :key="index" class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-primary"><i class="fas fa-heart"></i></span>
                  </div>
                  <input v-model="hobbies[index]" class="form-control input-light-blue" required placeholder="Enter hobby">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-danger btn-sm" @click="removeHobby(index)">
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
                <button type="button" class="btn btn-success btn-sm" @click="addHobby">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </div>
              <div>
                <label for="projects" class="formbold-form-label">Projects</label>
                <div v-for="(project, index) in projects" :key="index" class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-danger"><i class="fas fa-tasks"></i></span>
                  </div>
                  <input v-model="projects[index]" class="form-control input-light-blue" required placeholder="Enter project name">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-danger btn-sm" @click="removeProject(index)">
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
                <button type="button" class="btn btn-success btn-sm" @click="addProject">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </div>
              <div>
                <label for="skills" class="formbold-form-label">Skills</label>
                <div v-for="(skill, index) in skills" :key="index" class="input-group mb-2">
                  <div class="input-group-prepend">
                    <span class="input-group-text text-info"><i class="fas fa-cogs"></i></span>
                  </div>
                  <input v-model="skills[index]" class="form-control input-light-blue" required placeholder="Enter skill">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-danger btn-sm" @click="removeSkill(index)">
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
                <button type="button" class="btn btn-success btn-sm" @click="addSkill">
                  <i class="fas fa-plus-circle"></i>
                </button>
              </div>
            </div>

            <div class="formbold-form-btn-wrapper">
              <button type="button" class="formbold-back-btn" @click="previousStep" :class="{ active: step > 1 }">
                Back
              </button>

              <button type="button" class="formbold-btn" @click="nextStep" v-if="step < 3">
                Next Step
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_1675_1807)">
                    <path d="M10.7814 7.33312L7.20541 3.75712L8.14808 2.81445L13.3334 7.99979L8.14808 13.1851L7.20541 12.2425L10.7814 8.66645H2.66675V7.33312H10.7814Z" fill="white"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_1675_1807">
                      <rect width="16" height="16" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button type="submit" class="formbold-btn" v-if="step === 3">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <div class="panels-container">
      <div class="panel left-panel">
        <div class="content">
          <img v-if="step === 1" src="https://img.freepik.com/free-psd/clean-modern-resume-portfolio-cv-template_120329-3603.jpg?t=st=1717941687~exp=1717945287~hmac=ebe0165c0eceb91e720534280b719c06297cfbe1af72fed27d82cab541df77ec&w=360" alt="Logo" class="image">
          <img v-if="step === 2" src="https://img.freepik.com/free-psd/clean-modern-resume-portfolio-cv-template_120329-3607.jpg?t=st=1717942091~exp=1717945691~hmac=5b209f2fc3d176ce7d1841e01e00933f00061d5af5c423c3932e301e35d9441e&w=360" alt="Logo" class="image">
          <img v-if="step === 3" src="https://img.freepik.com/premium-vector/clean-modern-resume-portfolio-cv-template_1031961-121.jpg?w=740" alt="Logo" class="image">

          <h3 v-if="step === 1">Personal Information</h3>
          <p v-if="step === 1">This section helps us understand your basic details.</p>
          <h3 v-if="step === 2">Resume Details</h3>
          <p v-if="step === 2">Please provide details about your position and preferences.</p>
          <h3 v-if="step === 3">Additional Information</h3>
          <p v-if="step === 3">Share more about your skills, projects, and experiences.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import data from "../data/select.json";
import { projectFirestore, projectAuth } from '../firebase/config.js';

export default {
  name: "UserInfoForm",
  data() {
    return {
      step: 1,
      userId: null,
      name: "",
      birthdate: "",
      birthlocation: "",
      tel: "",
      city: "",
      email: 'john.doe@example.com', // Default email
      street: "",
      gender: "",
      position: "",
      location: "",
      purpose: "",
      status: "",
      languages: [""],
      education: [""],
      experiences: [""],
      hobbies: [""],
      projects: [""],
      skills: [""],
      error: "",
      showForm: true,
      positions: data.positions ,
      locations: data.location,
      purposes: data.purpose,
      allLanguages: data.languages
    };
  },
  async created() {
    const user = projectAuth.currentUser;
    if (user) {
      this.userId = user.uid;
      this.email = user.email; // Pre-fill email with the authenticated user's email
    } else {
      this.$router.push('/login'); // Redirect to login if not authenticated
    }
  },
  methods: {
    canGoToStep(step) {
      if (step === 1) return true;
      if (step === 2) return this.validateStep1();
      if (step === 3) return this.validateStep1() && this.validateStep2();
      return false;
    },
    validateStep1() {
      return this.name && this.birthdate && this.birthlocation && this.tel && this.city && this.gender;
    },
    validateStep2() {
      return this.position && this.location && this.purpose;
    },
    nextStep() {
      if (this.step === 1 && !this.validateStep1()) {
        alert("Please fill in all required fields before proceeding.");
      } else if (this.step === 2 && !this.validateStep2()) {
        alert("Please fill in all required fields before proceeding.");
      } else {
        this.step += 1;
      }
    },
    previousStep() {
      if (this.step > 1) {
        this.step -= 1;
      }
    },
    goToStep(step) {
      if (this.canGoToStep(step)) {
        this.step = step;
      }
    },
    async submitForm() {
      if (!this.skills.length || !this.education.length || !this.hobbies.length) {
        alert("Please fill in all required fields before submitting.");
        return;
      }
      const personData = {
        name: this.name,
        birthdate: this.birthdate,
        birthlocation: this.birthlocation,
        tel: this.tel,
        city: this.city,
        email: this.email,
        street: this.street,
        gender: this.gender,
        position: this.position,
        location: this.location,
        purpose: this.purpose,
        status: this.status,
        languages: this.languages,
        education: this.education,
        experiences: this.experiences,
        hobbies: this.hobbies,
        projects: this.projects,
        skills: this.skills
      };
      try {
        // Set or update the document with the user's UID
        await projectFirestore.collection('Person').doc(this.userId).set(personData, { merge: true });
        alert('Person data saved successfully!');
        this.$router.push('/home');
      } catch (error) {
        this.error = "Error saving data. Please try again.";
        console.error('Error saving person data: ', error);
      }
    },
    addLanguage() {
      this.languages.push("");
    },
    removeLanguage(index) {
      this.languages.splice(index, 1);
    },
    addEducation() {
      this.education.push("");
    },
    removeEducation(index) {
      this.education.splice(index, 1);
    },
    addExperience() {
      this.experiences.push("");
    },
    removeExperience(index) {
      this.experiences.splice(index, 1);
    },
    addHobby() {
      this.hobbies.push("");
    },
    removeHobby(index) {
      this.hobbies.splice(index, 1);
    },
    addProject() {
      this.projects.push("");
    },
    removeProject(index) {
      this.projects.splice(index, 1);
    },
    addSkill() {
      this.skills.push("");
    },
    removeSkill(index) {
      this.skills.splice(index, 1);
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none; /* Add this line */
}

body {
  font-family: 'Inter', sans-serif;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.forms-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
}

.formbold-main-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px;
}

.formbold-form-wrapper {
  margin: 0 auto;
  max-width: 550px;
  width: 100%;
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.formbold-steps {
  padding-bottom: 18px;
  margin-bottom: 35px;
  border-bottom: 1px solid #dde3ec;
}

.formbold-steps ul {
  padding: 0;
  margin: 0;
  list-style: none;
  display: flex;
  gap: 40px;
}

.formbold-steps li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
  cursor: pointer;
}

.formbold-steps li span {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #dde3ec;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
}

.formbold-steps li.active {
  color: #07074d;
}

.formbold-steps li.active span {
  background: #6a64f1;
  color: #fff;
}

.formbold-steps li.disabled {
  cursor: not-allowed;
  color: #aaa;
}

.formbold-steps li.disabled span {
  background: #ddd;
  color: #aaa;
}

.formbold-input-flex {
  display: flex;
  gap: 20px;
  margin-bottom: 22px;
}

.formbold-input-flex > div {
  width: 50%;
}

.formbold-form-input {
  width: 100%;
  padding: 13px 22px;
  border-radius: 5px;
  border: 1px solid #dde3ec;
  background: #fff;
  font-weight: 500;
  font-size: 16px;
  color: #536387;
  outline: none;
  resize: none;
}

.formbold-form-input:focus {
  border-color: #6a64f1;
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

.formbold-form-label {
  color: #07074d;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  display: block;
  margin-bottom: 10px;
}

.formbold-form-confirm {
  border-bottom: 1px solid #dde3ec;
  padding-bottom: 35px;
}

.formbold-form-confirm p {
  font-size: 16px;
  line-height: 24px;
  color: #536387;
  margin-bottom: 22px;
  width: 75%;
}

.formbold-form-confirm > div {
  display: flex;
  gap: 15px;
}

.formbold-confirm-btn {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 0.5px solid #dde3ec;
  border-radius: 5px;
  font-size: 16px;
  line-height: 24px;
  color: #536387;
  cursor: pointer;
  padding: 10px 20px;
  transition: all 0.3s ease-in-out;
}

.formbold-confirm-btn.active {
  background: #6a64f1;
  color: #fff;
}

.formbold-form-btn-wrapper {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 25px;
  margin-top: 25px;
}

.formbold-back-btn {
  cursor: pointer;
  background: #fff;
  border: none;
  color: #07074d;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  display: none;
}

.formbold-back-btn.active {
  display: block;
}

.formbold-btn {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 25px;
  border: none;
  font-weight: 500;
  background-color: #6a64f1;
  color: #fff;
  cursor: pointer;
}

.formbold-btn:hover {
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

.panels-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40%;
  height: 100%;
}

.panel {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
}

.panel .content {
  margin-top: 20px;
}

.panel .content h3 {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
}

.panel .content p {
  font-size: 1rem;
  color: #777;
}

.image {
  max-width: 100%;
  height: auto;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.input-group .input-group-prepend {
  display: flex;
  align-items: center;
}

.input-group .input-group-text {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
