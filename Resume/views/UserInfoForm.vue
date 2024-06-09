<template>
  <div class="formbold-main-wrapper">
    <div class="formbold-form-wrapper">
      <div class="logo-container">
        <img width="100%" :src="image" alt="Logo" class="logo">
      </div>
      <form @submit.prevent="submitForm">
        <!-- Full Name and Birth Date -->
        <div class="formbold-input-wrapp formbold-mb-3">
          <label for="name" class="formbold-form-label">Full Name</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text text-primary"><i class="fas fa-user"></i></span>
            </div>
            <input id="name" v-model="name" class="form-control input-light-blue" required placeholder="Enter your full name">
          </div>
        </div>
        <div class="formbold-mb-3">
          <label for="birthdate" class="formbold-form-label">Birth Date</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text text-success"><i class="fas fa-calendar-alt"></i></span>
            </div>
            <input type="date" id="birthdate" v-model="birthdate" class="form-control input-light-blue" required>
          </div>
        </div>

        <!-- Birth Location and Telephone -->
        <div class="formbold-input-wrapp formbold-mb-3">
          <label for="birthlocation" class="formbold-form-label">Birth Location</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text text-danger"><i class="fas fa-map-marker-alt"></i></span>
            </div>
            <input id="birthlocation" v-model="birthlocation" class="form-control input-light-blue" required placeholder="Enter your birth location">
          </div>
        </div>
        <div class="formbold-mb-3">
          <label for="tel" class="formbold-form-label">Telephone</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text text-warning"><i class="fas fa-phone"></i></span>
            </div>
            <input id="tel" v-model="tel" class="form-control input-light-blue" required placeholder="Enter your telephone number">
          </div>
        </div>

        <!-- City and Email -->
        <div class="formbold-input-wrapp formbold-mb-3">
          <label for="city" class="formbold-form-label">City</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text text-info"><i class="fas fa-city"></i></span>
            </div>
            <input id="city" v-model="city" class="form-control input-light-blue" required placeholder="Enter your city">
          </div>
        </div>
        <div class="formbold-mb-3">
          <label for="email" class="formbold-form-label">Email</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text text-secondary"><i class="fas fa-envelope"></i></span>
            </div>
            <input type="email" id="email" v-model="email" class="form-control input-light-blue" required placeholder="Enter your email">
          </div>
        </div>

        <!-- Street and Gender -->
        <div class="formbold-input-wrapp formbold-mb-3">
          <label for="street" class="formbold-form-label">Street (Optional)</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text text-dark"><i class="fas fa-road"></i></span>
            </div>
            <input id="street" v-model="street" class="form-control input-light-blue" placeholder="Enter your street">
          </div>
        </div>
        <div class="formbold-mb-3">
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

        <!-- Position -->
        <div class="formbold-mb-3">
          <label for="position" class="formbold-form-label">Position</label>
          <select id="position" v-model="position" class="form-control input-light-blue" required>
            <option disabled value="">Please select one</option>
            <option value="Software Developer">Software Developer</option>
            <option value="Frontend Developer">Frontend Developer</option>
            <option value="Backend Developer">Backend Developer</option>
            <option value="Fullstack Developer">Fullstack Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="DevOps Engineer">DevOps Engineer</option>
            <option value="System Administrator">System Administrator</option>
          </select>
        </div>

        <!-- Preferred Location -->
        <div class="formbold-mb-3">
          <label for="location" class="formbold-form-label">Preferred Location</label>
          <select id="location" v-model="location" class="form-control input-light-blue" required>
            <option disabled value="">Please select one</option>
            <option value="New York, USA">New York, USA</option>
            <option value="San Francisco, USA">San Francisco, USA</option>
            <option value="London, UK">London, UK</option>
            <option value="Berlin, Germany">Berlin, Germany</option>
            <option value="Tokyo, Japan">Tokyo, Japan</option>
            <option value="Sydney, Australia">Sydney, Australia</option>
            <option value="Toronto, Canada">Toronto, Canada</option>
          </select>
        </div>

        <!-- Purpose of Resume -->
        <div class="formbold-mb-3">
          <label for="purpose" class="formbold-form-label">Purpose of Resume</label>
          <select id="purpose" v-model="purpose" class="form-control input-light-blue" required>
            <option disabled value="">Please select one</option>
            <option value="Job Application">Job Application</option>
            <option value="Career Change">Career Change</option>
            <option value="Freelance Work">Freelance Work</option>
            <option value="Networking">Networking</option>
            <option value="Personal Branding">Personal Branding</option>
          </select>
        </div>

        <!-- Status -->
        <div class="formbold-mb-3">
          <label for="status" class="formbold-form-label">Status</label>
          <select id="status" v-model="status" class="form-control input-light-blue" required>
            <option disabled value="">Please select one</option>
            <option value="Student">Student</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <!-- Languages -->
        <div class="formbold-mb-3">
          <label for="languages" class="formbold-form-label">Languages</label>
          <div v-for="(language, index) in languages" :key="index" class="input-group mb-2">
            <input v-model="languages[index]" class="form-control input-light-blue" required placeholder="Enter language">
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

        <!-- Education Degrees -->
        <div class="formbold-mb-3">
          <label for="education" class="formbold-form-label">Education Degrees</label>
          <div v-for="(degree, index) in education" :key="index" class="input-group mb-2">
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

        <!-- Experiences -->
        <div class="formbold-mb-3">
          <label for="experience" class="formbold-form-label">Experiences</label>
          <div v-for="(exp, index) in experiences" :key="index" class="input-group mb-2">
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

        <!-- Hobbies -->
        <div class="formbold-mb-3">
          <label for="hobbies" class="formbold-form-label">Hobbies</label>
          <div v-for="(hobby, index) in hobbies" :key="index" class="input-group mb-2">
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

        <!-- Projects -->
        <div class="formbold-mb-3">
          <label for="projects" class="formbold-form-label">Projects</label>
          <div v-for="(project, index) in projects" :key="index" class="input-group mb-2">
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

        <!-- Skills -->
        <div class="formbold-mb-3">
          <label for="skills" class="formbold-form-label">Skills</label>
          <div v-for="(skill, index) in skills" :key="index" class="input-group mb-2">
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

        <button type="submit" class="formbold-btn">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
import image from '../assets/ook.jpg';

export default {
  name: "UserInfoForm",
  data() {
    return {
      image: image,
      name: "",
      birthdate: "",
      birthlocation: "",
      tel: "",
      city: "",
      email: "",
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
      skills: [""]
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit-user-info", {
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
      });
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

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: url('https://www.hdwallpapers.in/download/material_design_paper_texture_blue_lines_creative_background_hd_abstract-1920x1080.jpg') no-repeat center center fixed;
  background-size: cover;
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
  max-width: 720px;
  width: 100%;
  background: #4e4c67; /* Changed to a color matching a violet theme */
  padding: 40px;
  border-radius: 8px; /* Adding some rounding to the form */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.logo {
  max-width: 150px;
}

.formbold-img {
  display: block;
  margin: 0 auto 45px;
}

.formbold-input-wrapp > div {
  display: flex;
  gap: 20px;
}

.formbold-input-flex {
  display: flex;
  gap: 20px;
  margin-bottom: 15px;
}

.formbold-input-flex > div {
  width: 50%;
}

.formbold-form-input {
  width: 100%;
  padding: 13px 22px;
  border-radius: 5px;
  border: 1px solid #b8b5d4; /* Light violet border */
  background: #6f6c8e; /* Dark violet background for inputs */
  font-weight: 500;
  font-size: 16px;
  color: #e4e3f0; /* Light text color */
  outline: none;
  resize: none;
}

.formbold-form-input::placeholder,
select.formbold-form-input,
.formbold-form-input[type='date']::-webkit-datetime-edit-text,
.formbold-form-input[type='date']::-webkit-datetime-edit-month-field,
.formbold-form-input[type='date']::-webkit-datetime-edit-day-field,
.formbold-form-input[type='date']::-webkit-datetime-edit-year-field {
  color: #b8b5d4; /* Placeholder color */
}

.formbold-form-input:focus {
  border-color: #aea9d9; /* Slightly lighter border on focus */
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

.formbold-form-label {
  color: #e4e3f0; /* Light text color */
  font-size: 14px;
  line-height: 24px;
  display: block;
  margin-bottom: 10px;
}

.formbold-checkbox-label {
  display: flex;
  cursor: pointer;
  user-select: none;
  font-size: 16px;
  line-height: 24px;
  color: #e4e3f0;
}

.formbold-checkbox-label a {
  margin-left: 5px;
  color: #aea9d9; /* Link color */
}

.formbold-input-checkbox {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.formbold-checkbox-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  margin-right: 16px;
  margin-top: 2px;
  border: 0.7px solid #b8b5d4;
  border-radius: 3px;
}

.formbold-form-file {
  padding: 12px;
  font-size: 14px;
  line-height: 24px;
  color: #b8b5d4; /* File input color */
}

.formbold-form-file::-webkit-file-upload-button {
  display: none;
}

.formbold-form-file:before {
  content: 'Upload';
  display: inline-block;
  background: #6f6c8e; /* Dark violet background */
  border: 0.5px solid #b8b5d4;
  border-radius: 3px;
  padding: 3px 12px;
  outline: none;
  white-space: nowrap;
  -webkit-user-select: none;
  cursor: pointer;
  color: #e4e3f0; /* Light text color */
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  margin-right: 10px;
}

.formbold-btn {
  font-size: 16px;
  border-radius: 5px;
  padding: 14px 25px;
  border: none;
  font-weight: 500;
  background-color: #aea9d9; /* Light violet button */
  color: #4e4c67; /* Darker text on button */
  cursor: pointer;
  margin-top: 25px;
}

.formbold-btn:hover {
  background-color: #bfb9e6; /* Slightly lighter button on hover */
  box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.05);
}

.formbold-w-45 {
  width: 45%;
}

.input-group {
  display: flex;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}

.input-group .form-control {
  flex: 1;
}

.input-group-prepend {
  margin-right: -1px;
}

.input-group-text {
  background-color: #6f6c8e; /* Dark violet background */
  border: 1px solid #b8b5d4; /* Light violet border */
}

.input-group-text.text-primary {
  color: #aea9d9; /* Light violet icon color */
}

.input-group-text.text-success {
  color: #aea9d9; /* Light violet icon color */
}

.input-group-text.text-danger {
  color: #aea9d9; /* Light violet icon color */
}

.input-group-text.text-warning {
  color: #aea9d9; /* Light violet icon color */
}

.input-group-text.text-info {
  color: #aea9d9; /* Light violet icon color */
}

.input-group-text.text-secondary {
  color: #aea9d9; /* Light violet icon color */
}

.input-group-text.text-dark {
  color: #aea9d9; /* Light violet icon color */
}

.input-light-blue {
  background-color: #6f6c8e; /* Dark violet background for inputs */
  border: none;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
  color: #e4e3f0; /* Light text color */
}
</style>
