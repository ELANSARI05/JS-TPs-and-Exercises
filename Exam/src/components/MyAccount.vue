<template>
  <div class="my-account-container">
    <h2>My Account</h2>
    <p>Manage your account settings here.</p>
    <div class="account-sections">
      <div class="section-tabs">
        <button :class="{active: selectedSection === 'personal'}" @click="selectSection('personal')">Personal Information</button>
        <button :class="{active: selectedSection === 'position'}" @click="selectSection('position')">Position and Resumes</button>
        <button :class="{active: selectedSection === 'additional'}" @click="selectSection('additional')">Additional Information</button>
      </div>
      <div class="section-content">
        <div v-if="selectedSection === 'personal'">
          <div class="profile-picture">
            <img :src="person.profilePicture || defaultProfilePicture" alt="Profile Picture" class="profile-img">
            <input type="file" @change="updateProfilePicture" class="file-input">
          </div>
          <div class="form-group" v-for="field in personalFields" :key="field.id">
            <label :for="field.id">{{ field.label }}</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" :class="field.iconClass"><i :class="field.icon"></i></span>
              </div>
              <input :type="field.type" :id="field.id" v-model="person[field.model]" :disabled="field.disabled" class="form-control" :placeholder="field.placeholder">
            </div>
          </div>
        </div>
        <div v-if="selectedSection === 'position'">
          <div class="form-group" v-for="field in positionFields" :key="field.id">
            <label :for="field.id">{{ field.label }}</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" :class="field.iconClass"><i :class="field.icon"></i></span>
              </div>
              <select :id="field.id" v-model="person[field.model]" class="form-control" required>
                <option disabled value="">{{ field.placeholder }}</option>
                <option v-for="option in field.options" :key="option" :value="option">{{ option }}</option>
              </select>
            </div>
          </div>
        </div>
        <div v-if="selectedSection === 'additional'">
          <div class="form-group" v-for="field in additionalFields" :key="field.id">
            <label :for="field.id">{{ field.label }}</label>
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text" :class="field.iconClass"><i :class="field.icon"></i></span>
              </div>
              <div v-if="field.type === 'text' || field.type === 'email'">
                <input :type="field.type" :id="field.id" v-model="person[field.model]" class="form-control" :placeholder="field.placeholder">
              </div>
              <div v-else>
                <div v-for="(item, index) in person[field.model]" :key="index" class="input-group mb-2">
                  <input v-model="person[field.model][index]" class="form-control" required :placeholder="field.placeholder">
                  <div class="input-group-append">
                    <button type="button" class="btn btn-danger btn-sm" @click="removeItem(field.model, index)">
                      <i class="fas fa-minus-circle"></i>
                    </button>
                  </div>
                </div>
                <button type="button" class="btn btn-success btn-sm" @click="addItem(field.model)">
                  <i class="fas fa-plus-circle"></i> Add {{ field.label }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button @click="saveChanges" class="btn btn-primary">Save changes</button>
  </div>
</template>

<script>
export default {
  name: 'MyAccount',
  props: ['person'],
  data() {
    return {
      selectedSection: 'personal',
      defaultProfilePicture: 'path/to/default/profile/picture.png', // Replace with your default profile picture path
      personalFields: [
        { id: 'name', label: 'Full Name', model: 'name', type: 'text', placeholder: 'Enter your full name', iconClass: 'text-primary', icon: 'fas fa-user', disabled: true },
        { id: 'birthdate', label: 'Birth Date', model: 'birthdate', type: 'date', placeholder: '', iconClass: 'text-success', icon: 'fas fa-calendar-alt' },
        { id: 'birthlocation', label: 'Birth Location', model: 'birthlocation', type: 'text', placeholder: 'Enter your birth location', iconClass: 'text-danger', icon: 'fas fa-map-marker-alt' },
        { id: 'tel', label: 'Telephone', model: 'tel', type: 'tel', placeholder: 'Enter your telephone number', iconClass: 'text-warning', icon: 'fas fa-phone' },
        { id: 'city', label: 'City', model: 'city', type: 'text', placeholder: 'Enter your city', iconClass: 'text-info', icon: 'fas fa-city' },
        { id: 'email', label: 'Email', model: 'email', type: 'email', placeholder: 'Enter your email', iconClass: 'text-secondary', icon: 'fas fa-envelope', disabled: true },
        { id: 'street', label: 'Street (Optional)', model: 'street', type: 'text', placeholder: 'Enter your street', iconClass: 'text-dark', icon: 'fas fa-road' },
        { id: 'gender', label: 'Gender', model: 'gender', type: 'select', placeholder: 'Please select one', iconClass: 'text-primary', icon: 'fas fa-venus-mars', options: ['Male', 'Female'] }
      ],
      positionFields: [
        { id: 'position', label: 'Position', model: 'position', type: 'select', placeholder: 'Please select one', iconClass: 'text-info', icon: 'fas fa-briefcase', options: ['Developer', 'Designer', 'Manager'] }, // Replace with actual position options
        { id: 'location', label: 'Preferred Location', model: 'location', type: 'select', placeholder: 'Please select one', iconClass: 'text-success', icon: 'fas fa-map-marker-alt', options: ['New York', 'San Francisco', 'Los Angeles'] }, // Replace with actual location options
        { id: 'purpose', label: 'Purpose of Resume', model: 'purpose', type: 'select', placeholder: 'Please select one', iconClass: 'text-warning', icon: 'fas fa-clipboard-list', options: ['Job Application', 'Networking', 'Portfolio'] }, // Replace with actual purpose options
        { id: 'status', label: 'Status', model: 'status', type: 'select', placeholder: 'Please select one', iconClass: 'text-warning', icon: 'fas fa-user-tag', options: ['Student', 'Employed', 'Unemployed', 'Freelancer', 'Other'] }
      ],
      additionalFields: [
        { id: 'languages', label: 'Languages', model: 'languages', type: 'list', placeholder: 'Enter language', iconClass: 'text-primary', icon: 'fas fa-language' },
        { id: 'education', label: 'Education Degrees', model: 'education', type: 'list', placeholder: 'Enter degree', iconClass: 'text-secondary', icon: 'fas fa-graduation-cap' },
        { id: 'experiences', label: 'Experiences', model: 'experiences', type: 'list', placeholder: 'Enter experience', iconClass: 'text-dark', icon: 'fas fa-briefcase' },
        { id: 'hobbies', label: 'Hobbies', model: 'hobbies', type: 'list', placeholder: 'Enter hobby', iconClass: 'text-primary', icon: 'fas fa-heart' },
        { id: 'projects', label: 'Projects', model: 'projects', type: 'list', placeholder: 'Enter project name', iconClass: 'text-danger', icon: 'fas fa-tasks' },
        { id: 'skills', label: 'Skills', model: 'skills', type: 'list', placeholder: 'Enter skill', iconClass: 'text-info', icon: 'fas fa-cogs' }
      ]
    };
  },
  methods: {
    selectSection(section) {
      this.selectedSection = section;
    },
    updateProfilePicture(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.person.profilePicture = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    async saveChanges() {
      try {
        await this.$firestore.collection('Person').doc(this.person.id).update(this.person);
        alert('Changes saved successfully.');
      } catch (error) {
        console.error('Error saving changes:', error);
        alert('Failed to save changes.');
      }
    },
    addItem(field) {
      this.person[field].push('');
    },
    removeItem(field, index) {
      this.person[field].splice(index, 1);
    }
  }
};
</script>

<style scoped>
.my-account-container {
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  font-family: 'Montserrat', sans-serif;
}

.account-sections {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-tabs {
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
}

.section-tabs button {
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.section-tabs button.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.section-content {
  width: 100%;
}

.profile-picture {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.file-input {
  margin-top: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.btn {
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
}
</style>
