<template>
  <div class="container">
    <div class="form">
      <h2>User Information</h2>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="gender">Gender</label>
          <select id="gender" v-model="gender" required>
            <option disabled value="">Please select one</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div class="form-group">
          <label for="position">Position</label>
          <select id="position" v-model="position" required>
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
        <div class="form-group">
          <label for="location">Preferred Location</label>
          <select id="location" v-model="location" required>
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
        <div class="form-group">
          <label for="purpose">Purpose of Resume</label>
          <select id="purpose" v-model="purpose" required>
            <option disabled value="">Please select one</option>
            <option value="Job Application">Job Application</option>
            <option value="Career Change">Career Change</option>
            <option value="Freelance Work">Freelance Work</option>
            <option value="Networking">Networking</option>
            <option value="Personal Branding">Personal Branding</option>
          </select>
        </div>
        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" v-model="status" required>
            <option disabled value="">Please select one</option>
            <option value="Student">Student</option>
            <option value="Employed">Employed</option>
            <option value="Unemployed">Unemployed</option>
            <option value="Freelancer">Freelancer</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfoForm",
  data() {
    return {
      gender: "",
      position: "",
      location: "",
      purpose: "",
      status: "",
    };
  },
  methods: {
    submitForm() {
      this.$emit("submit-user-info", {
        gender: this.gender,
        position: this.position,
        location: this.location,
        purpose: this.purpose,
        status: this.status,
      });
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

.form {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}

.form h2 {
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

.form-group select {
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
</style>
