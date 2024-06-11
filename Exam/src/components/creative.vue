<template>
  <div class="resume" ref="resumeContent">
    <div class="content">
      <div class="content__left">
        <div>
          <br>
          <div class="headline">
            <span class="cv-name">{{ cv.name }}</span>
            <span contenteditable="true" class="banner__fullname" ref="nameFirst">{{ cv.contact.name }}</span>
          </div> <br>
          <p>
            <span class="txt-full-white" ref="position">{{ cv.status }}</span>
            <br />
            <span ref="city">{{ cv.contact.city }}</span>
          </p>
        </div>

        <div v-if="sectionVisibility.about" class="multi-line-txt" @mouseenter="showOptions('about')" @mouseleave="hideOptions('about')">
          <div class="section-headline">
            <i class="fas fa-info-circle section-icon" style="color: #FF5722;"></i>
            About
            <i v-if="hoveredSection === 'about'" class="fas fa-edit edit-icon" @click="editItem('about')"></i>
          </div>
          <div class="txt-full-white" ref="about">{{ cv.about }}</div>
          <br>
        </div>

        <span>
          <div class="block-marged txt-full-white" ref="contactEmail" @mouseenter="showForm('contact')" @mouseleave="hideForm">
            <i class="fas fa-envelope section-icon" style="color: #8BC34A;"></i>
            {{ cv.contact.email }}
          </div>
        </span>

        <div contenteditable="true" class="block-marged txt-full-white" ref="contactPhone" @mouseenter="showForm('contact')" @mouseleave="hideForm">
          <i contenteditable="true" class="fas fa-phone section-icon" style="color: #2196F3;"></i>
          {{ cv.contact.phone }}
        </div>

        <div class="social-container">
          <span v-if="cv.contact.website">
            <div contenteditable="true" class="block-marged txt-full-white" ref="contactWebsite" @mouseenter="showForm('contact')" @mouseleave="hideForm">
              <i class="fa fa-globe contact-icon"></i>
              {{ cv.contact.website }}
            </div>
          </span>

          <span v-if="cv.contact.github" class="external-link">
            <i class="fa fa-github contact-icon"></i>
            <span contenteditable="true" class="block-marged txt-full-white" ref="contactGithub">
              {{ cv.contact.github }}
            </span>
          </span>
        </div>

        <div v-if="sectionVisibility.hobbies" class="hobbies-container">
          <div class="hobbies-content">
            <span v-for="(hobby, index) in cv.hobbies" :key="index" class="hobby-item">
              <i v-if="hobby.iconClass" :class="hobby.iconClass + ' hobby-item__icon'"></i>
              <span :ref="'hobby' + index" class="hobby-item__icon-label">{{ hobby.name }}</span>
            </span>
          </div>
          <button class="delete-button" @click="deleteSection('hobbies')">Delete</button>
          <button class="save-button" @click="saveSection('hobbies')">Save</button>
        </div>
      </div>

      <div class="content__right">
        <div v-if="sectionVisibility.experience" class="experience-section section" @mouseenter="showOptions('experience')" @mouseleave="hideOptions('experience')">
          <div class="icon">
            <i class="material-icons small-icon">Experience</i>
            <i v-if="hoveredSection === 'experience'" class="fas fa-plus-circle add-icon" @click="addItem('experience')"></i>
          </div>
          <div class="section-content">
            <span v-for="(experience, index) in cv.experience" :key="index" class="section-content__item" @mouseenter="showItemOptions('experience', index)" @mouseleave="hideItemOptions('experience', index)">
              <span class="highlight">{{ index + 1 }} - {{ experience.position }}</span>
              <span :ref="'experienceCompany' + index" class="section-content__subheader">{{ experience.company }}</span>
              <div :ref="'experienceTimeperiod' + index" class="section-content__text">{{ experience.timePeriod }}</div>
              <span :ref="'experienceDescription' + index" class="section-content__text--light">{{ experience.description }}</span>
              <i v-if="hoveredItem === `experience-${index}`" class="fas fa-edit edit-icon" @click="editItem('experience', index)"></i>
              <i v-if="hoveredItem === `experience-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('experience', index)"></i>
            </span>
          </div>
        </div>

        <div v-if="sectionVisibility.education" class="education-section section" @mouseenter="showOptions('education')" @mouseleave="hideOptions('education')">
          <div class="icon">
            <i class="material-icons">Education</i>
            <i v-if="hoveredSection === 'education'" class="fas fa-plus-circle add-icon" @click="addItem('education')"></i>
          </div>
          <div class="section-content">
            <span v-for="(education, index) in cv.education" :key="index" class="section-content__item" @mouseenter="showItemOptions('education', index)" @mouseleave="hideItemOptions('education', index)">
              <span class="highlight">{{ index + 1 }} - {{ education.degree }}</span>
              <span :ref="'educationSchool' + index" class="section-content__subheader">{{ education.school }}</span>
              <span :ref="'educationDescription' + index" class="section-content__text--light">{{ education.details }}</span>
              <span :ref="'educationDescription' + index" class="section-content__text--light">{{ education.institution }}</span>
              <span :ref="'educationDescription' + index" class="section-content__text--light">{{ education.location }}</span>
              <span :ref="'educationTimeperiod' + index" class="section-content__text">{{ education.timePeriod }}</span>
              <i v-if="hoveredItem === `education-${index}`" class="fas fa-edit edit-icon" @click="editItem('education', index)"></i>
              <i v-if="hoveredItem === `education-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('education', index)"></i>
            </span>
          </div>
        </div>

        <div v-if="sectionVisibility.projects" class="projects-section section" @mouseenter="showOptions('projects')" @mouseleave="hideOptions('projects')">
          <div class="icon">
            <i class="material-icons">Projects</i>
            <i v-if="hoveredSection === 'projects'" class="fas fa-plus-circle add-icon" @click="addItem('projects')"></i>
          </div>
          <div class="section-content">
            <span v-for="(project, index) in cv.projects" :key="index" class="section-content__item" @mouseenter="showItemOptions('projects', index)" @mouseleave="hideItemOptions('projects', index)">
              <span class="highlight">{{ index + 1 }} - {{ project.name }}</span>
              <span :ref="'projectPlatform' + index" class="section-content__subheader">{{ project.platform }}</span>
              <span :ref="'projectDescription' + index" class="section-content__text">{{ project.description }}</span>
              <span :ref="'projectUrl' + index" class="section-content__text--light">{{ project.url }}</span>
              <i v-if="hoveredItem === `projects-${index}`" class="fas fa-edit edit-icon" @click="editItem('projects', index)"></i>
              <i v-if="hoveredItem === `projects-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('projects', index)"></i>
            </span>
          </div>
        </div>

        <div v-if="sectionVisibility.skills" class="skills-section section" @mouseenter="showOptions('skills')" @mouseleave="hideOptions('skills')">
          <div class="icon">
            <i class="material-icons">Skills</i>
            <i v-if="hoveredSection === 'skills'" class="fas fa-plus-circle add-icon" @click="addItem('skills')"></i>
          </div>
          <div class="section-content">
            <span v-for="(skill, index) in cv.skills" :key="index" class="section-content__item" @mouseenter="showItemOptions('skills', index)" @mouseleave="hideItemOptions('skills', index)">
              <span class="highlight">{{ index + 1 }} - {{ skill.name }}</span>
              <span :ref="'skillDetails' + index" class="section-content__subheader">{{ skill.details }}</span>
              <span :ref="'skillLevel' + index" class="section-content__text">Level: {{ skill.level }}</span>
              <i v-if="hoveredItem === `skills-${index}`" class="fas fa-edit edit-icon" @click="editItem('skills', index)"></i>
              <i v-if="hoveredItem === `skills-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('skills', index)"></i>
            </span>
          </div>
        </div>

        <div v-if="sectionVisibility.languages" class="languages-section section" @mouseenter="showOptions('languages')" @mouseleave="hideOptions('languages')">
          <div class="icon">
            <i class="material-icons">Languages</i>
            <i v-if="hoveredSection === 'languages'" class="fas fa-plus-circle add-icon" @click="addItem('languages')"></i>
          </div>
          <div class="section-content">
            <span v-for="(language, index) in cv.languages" :key="index" class="section-content__item" @mouseenter="showItemOptions('languages', index)" @mouseleave="hideItemOptions('languages', index)">
              <span class="highlight">{{ index + 1 }} - {{ language.name }}</span>
              <span :ref="'languageProficiency' + index" class="section-content__subheader">{{ language.proficiency }}</span>
              <span :ref="'languageDetails' + index" class="section-content__text">{{ language.details }}</span>
              <i v-if="hoveredItem === `languages-${index}`" class="fas fa-edit edit-icon" @click="editItem('languages', index)"></i>
              <i v-if="hoveredItem === `languages-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('languages', index)"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <button @click="exportPDF" class="export-button">Export as PDF</button>

    <!-- Modal for Editing/Adding -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modl">
        <h2>{{ editField ? 'Edit' : 'Add' }} {{ modalTitle }}</h2>
        <form @submit.prevent="saveSection()">
          <div v-if="editField === 'about' || addField === 'about'">
            <label>About</label>
            <textarea v-model="editData"></textarea>
          </div>
          <div v-if="editField === 'skills' || addField === 'skills'">
            <label>Name</label>
            <input v-model="editData.name" />
            <label>Details</label>
            <textarea v-model="editData.details"></textarea>
            <label>Level</label>
            <input type="range" v-model="editData.level" min="0" max="100" />
          </div>
          <div v-if="editField === 'contact' || addField === 'contact'">
            <label>City</label>
            <input v-model="editData.city" />
            <label>Street</label>
            <input v-model="editData.street" />
            <label>Email</label>
            <input v-model="editData.email" />
            <label>Phone</label>
            <input v-model="editData.phone" />
            <label>Website</label>
            <input v-model="editData.website" />
          </div>
          <div v-if="editField === 'experience' || addField === 'experience'">
            <label>Position</label>
            <input v-model="editData.position" />
            <label>Company</label>
            <input v-model="editData.company" />
            <label>Location</label>
            <input v-model="editData.location" />
            <label>Time Period</label>
            <input v-model="editData.timeperiod" />
            <label>Description</label>
            <textarea v-model="editData.description"></textarea>
          </div>
          <div v-if="editField === 'education' || addField === 'education'">
            <label>Degree</label>
            <input v-model="editData.degree" />
            <label>Institution</label>
            <input v-model="editData.institution" />
            <label>Location</label>
            <input v-model="editData.location" />
            <label>Time Period</label>
            <input v-model="editData.timePeriod" />
            <label>Details</label>
            <textarea v-model="editData.details"></textarea>
          </div>
          <div v-if="editField === 'projects' || addField === 'projects'">
            <label>Name</label>
            <input v-model="editData.name" />
            <label>Platform</label>
            <input v-model="editData.platform" />
            <label>Description</label>
            <textarea v-model="editData.description"></textarea>
          </div>
          <div v-if="editField === 'languages' || addField === 'languages'">
            <label>Language</label>
            <input v-model="editData.name" />
            <label>Proficiency</label>
            <input v-model="editData.proficiency" />
            <label>Details</label>
            <textarea v-model="editData.details"></textarea>
          </div>
          <button type="submit">Save</button>
        </form>
        <button @click="showModal = false">Cancel</button>
      </div>
    </div>
  </div>
</template>


<script>
import { defineComponent, reactive } from 'vue';
import html2pdf from 'html2pdf.js';
import { projectFirestore } from '../firebase/config'; // Import Firebase Firestore

export default defineComponent({
  name: 'Creative',
  data() {
    return {
      cv: reactive({
        name: '',
        position: '',
        about: '',
        knowledge: '',
        skills: [],
        contact: {
          city: '',
          email: '',
          phone: '',
          website: '',
          github: '',
        },
        experience: [],
        education: [],
        projects: [],
        languages: [],
        hobbies: [],
      }),
      sectionVisibility: reactive({
        about: true,
        skills: true,
        contact: true,
        experience: true,
        education: true,
        projects: true,
        hobbies: true,
        languages: true,
      }),
      imageSrc: require('../assets/id.jpg'), // Path to the default image
      editField: "", // To track the field being edited
      addField: "", // To track the field being added
      editData: reactive({}), // To store data for the field being edited
      showModal: false, // To control the modal visibility
      cvid: this.$route.params.id, // Store the cvid parameter
      hoveredSection: "", // To track the section being hovered
      hoveredItem: "", // To track the item being hovered
      showContactForm: false, // To control the visibility of the contact form
    };
  },
  computed: {
    modalTitle() {
      return this.addField || this.editField;
    }
  },
  mounted() {
    this.fetchCv();
  },
  methods: {
    async fetchCv() {
      try {
        const doc = await projectFirestore.collection('cv').doc(this.cvid).get();
        if (doc.exists) {
          Object.assign(this.cv, doc.data()); // Assign fetched cv object to this.cv
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.log("Error getting document:", error);
      }
    },
    async saveSection() {
      if (this.editField) {
        if (this.editField === 'about') {
          this.cv.about = this.editData;
        } else if (Array.isArray(this.cv[this.editField])) {
          const index = this.editData.index;
          delete this.editData.index;
          this.cv[this.editField].splice(index, 1, this.editData);
        } else {
          this.cv[this.editField] = { ...this.editData };
        }

        try {
          await projectFirestore.collection('cv').doc(this.cvid).update({ [this.editField]: this.cv[this.editField] });
        } catch (error) {
          console.error("Error updating document: ", error);
        }

        this.editField = "";
        this.editData = {};
        this.showModal = false;
      } else if (this.addField) {
        if (Array.isArray(this.cv[this.addField])) {
          this.cv[this.addField].push(this.editData);
        } else {
          this.cv[this.addField] = { ...this.editData };
        }

        try {
          await projectFirestore.collection('cv').doc(this.cvid).update({ [this.addField]: this.cv[this.addField] });
        } catch (error) {
          console.error("Error updating document: ", error);
        }

        this.addField = "";
        this.editData = {};
        this.showModal = false;
      }
    },
    editItem(section, index) {
      this.editField = section;
      this.addField = "";
      if (section === 'about') {
        this.editData = this.cv.about;
      } else {
        this.editData = index !== undefined ? { ...this.cv[section][index], index } : { ...this.cv[section] };
      }
      this.showModal = true;
    },
    deleteItem(section, index) {
      this.cv[section].splice(index, 1);
      this.saveToFirebase(section);
    },
    addItem(section) {
      this.addField = section;
      this.editField = "";
      this.editData = {};
      this.showModal = true;
    },
    async saveToFirebase(section) {
      try {
        await projectFirestore.collection('cv').doc(this.cvid).update({ [section]: this.cv[section] });
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    },
    confirmDelete(section) {
      if (confirm(`Do you really want to delete all items in ${section}?`)) {
        this.cv[section] = [];
        this.saveToFirebase(section);
      }
    },
    deleteSection(section) {
      this.sectionVisibility[section] = false;
    },
    showOptions(section) {
      this.hoveredSection = section;
    },
    hideOptions(section) {
      if (this.hoveredSection === section) {
        this.hoveredSection = "";
      }
    },
    showItemOptions(section, index) {
      this.hoveredItem = `${section}-${index}`;
    },
    hideItemOptions(section, index) {
      if (this.hoveredItem === `${section}-${index}`) {
        this.hoveredItem = "";
      }
    },
    showForm(section) {
      if (section === 'contact') {
        this.showContactForm = true;
      }
    },
    hideForm() {
      this.showContactForm = false;
    },
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageSrc = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    exportPDF() {
      const element = this.$refs.resumeContent;
      const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 1 },
        jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
      };

      const height = element.offsetHeight;
      if (height > 1120) {
        const scale = 1120 / height;
        opt.html2canvas.scale = scale;
      }

      html2pdf().from(element).set(opt).save();
    },
  },
});
</script>


<style lang="less" scoped>
@accent-color: #A800FA;
@banner-color: #A800FA;
@banner-height: 140px;
@picture-size: 150px;
@picture-offset: 10px;
@picture-left-adjust: -310px;
@base-padding: 40px;
@left-column-width: 10px;

a {
  color: inherit;
  cursor: pointer;
  text-decoration-line: none;

  &:visited {
    color: inherit;
  }
}

.resume {
  position: relative;
  border: groove;
  font-family: 'Roboto', sans-serif;
  font-size: 1em;
  max-width: 900px;
  margin: auto;
}

.picture {
  position: absolute;
  top: (@banner-height - @picture-offset);
  left: calc((@left-column-width + @base-padding) - @picture-left-adjust);
  height: @picture-size;
  width: @picture-size;
  border-radius: 50%;
  border: 5px solid @accent-color;
  cursor: pointer;
  z-index: 2;
}

.banner {
  width: calc(100% - @base-padding * 2);
  height: @banner-height;
  padding: @base-padding;
  background-color: @banner-color;
  color: white;

  &__fullname {
    font-size: 40px;
    display: inline-block;
    margin-left: 10px;
  }

  &__position {
    font-size: 20px;
  }
}
.highlight {
  font-size: 1.2em;
  font-weight: bold;
  color: #42b883;
}
.content {
  display: flex;
  width: 100%;
  height: 100%;

  &__left,
  &__right {
    text-align: left;
    padding: @base-padding;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-grow: 1;
  }

  &__left {
    width: @left-column-width;
    color: rgba(255, 255, 255, 0.85);
    background-color: @accent-color;
    font-size: 23px;
    .section-headline {
      color: white;
      font-size: 1.6em;
    }
  }

  &__right {
    flex: 1;
    padding-left: 60px;
  }
}

a {
  color: inherit;
  cursor: pointer;
  text-decoration-line: none;

  &:visited {
    color: inherit;
  }
}

.material-icons {
  color: @accent-color;
  position: relative;
  font-size: 30px;
  top: 5px;
}

.font-awesome-icons {
  color: @accent-color;
  font-size: 1.3em;
  margin-right: 6px;
}

.small-icon {
  top: 2.5px;
  font-size: 1.4em;
}

.contact-icon {
  color: white;
  font-size: 1.5em;
  margin-right: 10px;
  top: 2px;
  position: relative;
}

.contact-icon-svg {
  margin-top: -2.5px;
  margin-right: 10px;
  transform: scale(1);
  top: 5px;
  position: relative;
}

.contact-icon-svg path {
  fill: white;
}

.external-link {
  display: block;
  margin-bottom: 5px;
}

.block-marged {
  margin-top: 15px;
  margin-bottom: 15px;
}

.multi-line-txt {
  margin-top: 30px;
  margin-bottom: 20px;
}

.social-container {
  margin-top: 30px;
  margin-bottom: 30px;
}
.cv-name {
      color: black;
      font-size: 25px;
      font-weight: bold;
      letter-spacing: 10px;
    }
.headline {
  color: white;
  font-size: 1.3em;
  font-weight: bold;
}

.txt-full-white {
  color: white;
}

.uppercase {
  text-transform: uppercase;
}

.section-headline {
  color: @accent-color;
  display: inline-block;
  font-size: 1.2em;
  margin-left: 5px;
}

.section-content {
  margin-top: 10px;
  padding-left: 32px;
}

.section-content__item {
  display: block;
  margin-bottom: 10px;
}

.section-content__item-grid {
  flex: 1 1 0;
  margin-bottom: 10px;
  padding-right: 10px;
}

.section-content-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 10px;
  margin-bottom: 10px;
}

.grid-item {
  padding-right: 20px;
}

.section-content__header {
  display: block;
  font-size: 1.1em;
  font-weight: 500;
}

.squarred-grid-item {
  border: 1px solid @accent-color;
  background-color: @accent-color;
  color: white;
  margin-left: 130px;
  padding: 5px;
  transition: 0.5s;

  &:hover {
    background-color: transparent;
    color: @accent-color;
    transition: 0.5s;
  }
}

.section-content__subheader {
  display: block;
  font-weight: 400;
}

.section-content__text {
  display: block;
  font-weight: 300;
}

.section-content__text--light {
  color: rgba(0, 0, 0, 0.42);
  font-weight: 300;
}

.section-content__subheader,
.section-content__text--light,
.section-content__header {
  line-height: 1.5em;
}

.section {
  margin-top: 10px;
  margin-bottom: 10px;
}

.lang-icon {
  color: rgba(0, 0, 0, 0.72);
  font-size: 3em;

  &:hover {
    color: @accent-color;
  }
}

.hobbies-container {
  margin-top: 30px;
}

.hobbies-content {
  display: flex;
  flex-direction: column;
}

.hobby-item {
  display: grid;
  grid-template-columns: 30px auto;
  color: rgba(255, 255, 255, 0.6);
  margin-right: 25px;
  margin-bottom: 10px;
  transition: 0.5s;

  &:hover {
    color: rgba(255, 255, 255, 0.8);
    transition: 0.5s;
  }
}

.hobby-item__icon {
  font-size: 1.3em;
}

.hobby-item__icon-label {
  top: 2.5px;
  position: relative;
}

.subheadline {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.2em;
  display: block;
  margin-bottom: 10px;
}

.delete-button {
  display: inline-block;
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
}

.save-button {
  display: inline-block;
  background: blue;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
}

.export-button {
  margin: 20px;
  padding: 10px 20px;
  background-color: #A800FA;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.section:hover .delete-button,
.section:hover .save-button,
.headline:hover .delete-button,
.headline:hover .save-button {
  display: inline-block;
}

.delete-button,
.save-button {
  display: none;
}

.edit-icon {
  color: #FF5722;
  cursor: pointer;
  margin-left: 5px;
}

.add-icon {
  color: #8BC34A;
  cursor: pointer;
  margin-left: 5px;
}

.delete-icon {
  color: red;
  cursor: pointer;
  margin-left: 5px;
}

.edit-icon:hover,
.add-icon:hover,
.delete-icon:hover {
  color: #A800FA;
}
/* Modal styling */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modl {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-width: 600px;
  font-family: 'Arial', sans-serif;
}

.modl h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.modl label {
  display: block;
  font-size: 18px;
  margin-top: 10px;
}

.modl input,
.modl textarea {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.modl button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.modl button:hover {
  background-color: #34495e;
}
</style>

