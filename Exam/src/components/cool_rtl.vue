<template>
  <div style="background-color: white">
    <div class="resume" ref="resumeContent">
      <div style="display: flex;flex-direction: row">
        <div class="banner">
          <div contenteditable="true" ref="nameFirst" class="banner__fullname">{{ cv.contact.name }}</div><br>
          <div contenteditable="true" ref="position" class="banner__position">{{ cv.status }}</div>
          <button class="save-button" @click="saveSection('name')">Save</button>
        </div>
        <div class="banner">
        <span class="cv-name">{{ cv.name }}</span>
        </div>
    </div>
      <div class="content">
        <div class="content__left">
          <div v-if="sectionVisibility.about" class="section" @mouseenter="showOptions('about')" @mouseleave="hideOptions('about')">
            <div class="section-headline">
              <i class="fas fa-info-circle section-icon" style="color: #FF5722;"></i>
              About
              <i v-if="hoveredSection === 'about'" class="fas fa-edit edit-icon" @click="editItem('about')"></i>
            </div>
            <div>
              <div>{{ cv.about }}</div>
            </div>
          </div>

          <div v-if="sectionVisibility.skills" class="section" @mouseenter="showOptions('skills')" @mouseleave="hideOptions('skills')">
            <div class="section-headline">
              <i class="fas fa-tools section-icon" style="color: #8BC34A;"></i>
              Skills
              <i v-if="hoveredSection === 'skills'" class="fas fa-plus-circle add-icon" @click="addItem('skills')"></i>
            </div>
            <div class="section-content-grid">
              <div v-for="(skill, index) in cv.skills" class="grid-item" :key="index" @mouseenter="showItemOptions('skills', index)" @mouseleave="hideItemOptions('skills', index)">
                <span class="highlight"> {{ index + 1 }} - {{ skill.name }}</span>
                <div>{{ skill.details }}</div>
                <div>Level: {{ skill.level }}</div>
                <i v-if="hoveredItem === `skills-${index}`" class="fas fa-edit edit-icon" @click="editItem('skills', index)"></i>
                <i v-if="hoveredItem === `skills-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('skills', index)"></i>
              </div>
            </div>
          </div>

          <div v-if="sectionVisibility.contact" class="section" @mouseenter="showOptions('contact')" @mouseleave="hideOptions('contact')">
            <div class="section-headline">
              <i class="fas fa-address-book section-icon" style="color: #2196F3;"></i>
              Contact
              <i v-if="hoveredSection === 'contact'" class="fas fa-edit edit-icon" @click="editItem('contact')"></i>
            </div>
            <div>
              <div class="section-link">
                <i class="fas fa-map-marker-alt section-link__icon" style="color: #FF5722;"></i>
                <span>{{ cv.contact.street }}</span>
              </div>
              <div class="section-link">
                <i class="fas fa-envelope section-link__icon" style="color: #8BC34A;"></i>
                <span>{{ cv.contact.email }}</span>
              </div>
              <div class="section-link">
                <i class="fas fa-phone section-link__icon" style="color: #2196F3;"></i>
                <span>{{ cv.contact.phone }}</span>
              </div>
              <div v-if="cv.contact.website" class="section-link">
                <i class="fas fa-globe section-link__icon" style="color: #FFC107;"></i>
                <span>{{ cv.contact.website }}</span>
              </div>
              <div v-if="cv.contact.drivingLicense" class="section-link">
                <span><b>Driving License : </b></span>
                <span>{{ cv.contact.drivingLicense }}</span>
              </div>
            </div>
          </div>
        </div>

        <div class="content__right">
          <div v-if="sectionVisibility.experience" class="section" @mouseenter="showOptions('experience')" @mouseleave="hideOptions('experience')">
            <div class="section-headline">
              <i class="fas fa-briefcase section-icon" style="color: #FF5722;"></i> 
              Experiences
              <i v-if="hoveredSection === 'experience'" class="fas fa-plus-circle add-icon" @click="addItem('experience')"></i>
            </div>
            <div class="section-content">
              <div v-for="(experience, index) in cv.experience" :key="index" @mouseenter="showItemOptions('experience', index)" @mouseleave="hideItemOptions('experience', index)">
                <span class="highlight">{{ index + 1 }} - {{ experience.position }}</span>
                <div>{{ experience.company }}</div>
                <div>{{ experience.details }}</div>
                <div>{{ experience.location }}</div>
                <div>{{ experience.timePeriod }}</div>
                <div>{{ experience.description }}</div>
                <i v-if="hoveredItem === `experience-${index}`" class="fas fa-edit edit-icon" @click="editItem('experience', index)"></i>
                <i v-if="hoveredItem === `experience-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('experience', index)"></i>
              </div>
            </div>
          </div>
          
          <div v-if="sectionVisibility.education" class="section" @mouseenter="showOptions('education')" @mouseleave="hideOptions('education')">
            <div class="section-headline">
              <i class="fas fa-graduation-cap section-icon" style="color: #8BC34A;"></i> 
              Education
              <i v-if="hoveredSection === 'education'" class="fas fa-plus-circle add-icon" @click="addItem('education')"></i>
            </div>
            <div class="section-content">
              <div v-for="(education, index) in cv.education" :key="index" @mouseenter="showItemOptions('education', index)" @mouseleave="hideItemOptions('education', index)">
                <span class="highlight">{{ index + 1 }} - {{ education.degree }}</span>
                <div>{{ education.institution }}</div>
                <div>{{ education.location }}</div>
                <div>{{ education.timePeriod }}</div>
                <div>{{ education.details }}</div>
                <i v-if="hoveredItem === `education-${index}`" class="fas fa-edit edit-icon" @click="editItem('education', index)"></i>
                <i v-if="hoveredItem === `education-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('education', index)"></i>
              </div>
            </div>
          </div>
          
          <div v-if="sectionVisibility.projects" class="section" @mouseenter="showOptions('projects')" @mouseleave="hideOptions('projects')">
            <div class="section-headline">
              <i class="fas fa-code section-icon" style="color: #2196F3;"></i> 
              Projects
              <i v-if="hoveredSection === 'projects'" class="fas fa-plus-circle add-icon" @click="addItem('projects')"></i>
            </div>
            <div class="section-content-grid">
              <div v-for="(project, index) in cv.projects" :key="index" @mouseenter="showItemOptions('projects', index)" @mouseleave="hideItemOptions('projects', index)">
                <span class="highlight">{{ index + 1 }} - {{ project.name }}</span>
                <div>{{ project.platform }}</div>
                <div>{{ project.description }}</div>
                <i v-if="hoveredItem === `projects-${index}`" class="fas fa-edit edit-icon" @click="editItem('projects', index)"></i>
                <i v-if="hoveredItem === `projects-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('projects', index)"></i>
              </div>
            </div>
          </div>
          
          <div v-if="sectionVisibility.languages" class="section" @mouseenter="showOptions('languages')" @mouseleave="hideOptions('languages')">
            <div class="section-headline">
              <i class="fas fa-language section-icon" style="color: #FFC107;"></i> 
              Languages
              <i v-if="hoveredSection === 'languages'" class="fas fa-plus-circle add-icon" @click="addItem('languages')"></i>
            </div>
            <div class="section-content">
              <div v-for="(language, index) in cv.languages" :key="index" @mouseenter="showItemOptions('languages', index)" @mouseleave="hideItemOptions('languages', index)">
                <span class="highlight">{{ index + 1 }} - {{ language.name }}</span>
                <div>{{ language.level }}</div>
                <div>{{ language.details }}</div>
                <i v-if="hoveredItem === `languages-${index}`" class="fas fa-edit edit-icon" @click="editItem('languages', index)"></i>
                <i v-if="hoveredItem === `languages-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('languages', index)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <img class="picture" @click="triggerFileInput" :src="imageSrc" />
      <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;" />
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
              <input v-model="this.editData.name" />
              <label>Details</label>
              <textarea v-model="this.editData.details"></textarea>
              <label>Level</label>
              <input type="range" v-model="this.editData.level" min="0" max="100" />
          </div>
          <div v-if="editField === 'contact' || addField === 'contact'">
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
              <input v-model="this.editData.position" />
              <label>Company</label>
              <input v-model="this.editData.company" />
              <label>Location</label>
              <input v-model="this.editData.location" />
              <label>Time Period</label>
              <input v-model="this.editData.timeperiod" />
              <label>Description</label>
              <textarea v-model="this.editData.description"></textarea>
          </div>
          <div v-if="editField === 'education' || addField === 'education'">
              <label>Degree</label>
              <input v-model="this.editData.degree" />
              <label>Institution</label>
              <input v-model="this.editData.institution" />
              <label>Location</label>
              <input v-model="this.editData.location" />
              <label>Time Period</label>
              <input v-model="this.editData.timePeriod" />
              <label>Details</label>
              <textarea v-model="this.editData.details"></textarea>
          </div>
          <div v-if="editField === 'projects' || addField === 'projects'">
              <label>Name</label>
              <input v-model="this.editData.name" />
              <label>Platform</label>
              <input v-model="this.editData.platform" />
              <label>Description</label>
              <textarea v-model="this.editData.description"></textarea>
          </div>
          <div v-if="editField === 'languages' || addField === 'languages'">
              <label>Language</label>
              <input v-model="this.editData.name" />
              <label>Proficiency</label>
              <input v-model="this.editData.proficiency" />
              <label>Details</label>
              <textarea v-model="this.editData.details"></textarea>
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
import { projectFirestore } from '../firebase/config';

export default defineComponent({
  name: 'cool_rtl',
  data() {
    return {
      cv: reactive({
        name: '',
        position: '',
        about: '',
        skills: [],
        contact: {
          street: '',
          email: '',
          phone: '',
          website: '',
        },
        experience: [],
        education: [],
        projects: [],
        languages: [],
      }),
      sectionVisibility: reactive({
        about: true,
        skills: true,
        contact: true,
        experience: true,
        education: true,
        projects: true,
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
@accent-color: #34495E;
@banner-color: #42b883;
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
  border:groove;
  position: relative;
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
.banner__position{
  font-size: 27px;
  color:blue
}
.content {
  display: flex;
  width: 100%;
  height: 100%;

  &__left,
  &__right {
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

.section {
  margin: 25px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;
  position: relative;

  &:hover .delete-button,
  &:hover .save-button {
    display: inline;
  }
}

.section-link,
.section-headline {
  display: flex !important;
  align-items: center;
  color: @accent-color;
  display: inline-block;
  font-size: 1.4em;
  margin: 12px 0;

  &__icon {
    margin-right: 8px;
    font-size: 1.6em;
  }
}

.section-link {
  font-size: 1.2em;
  color: rgba(255, 255, 255, 0.85) !important;

  &__icon {
    color: white;
  }

  span[contenteditable="true"] {
    border: none;
    outline: none;
    display: inline;
    cursor: text;
  }
}

.section-content {
  margin-top: 10px;
  padding-left: 36px;
  font-size: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  flex-grow: 1;

  &__item {
    display: block;
    margin-bottom: 10px;
  }

  &__header,
  &__subheader,
  &__plain,
  &__text,
  &__text--light {
    display: inline;
    border: none;
    outline: none;
    cursor: text;
  }

  &__header {
    font-size: 1.2em;
    font-weight: 500;
  }

  &__subheader {
    font-weight: 400;
  }

  &__plain,
  &__text {
    font-size: 14px;

    &--light {
      font-size: 14px;
    }
  }

  &__plain {
    font-weight: 300;
  }

  &__item-grid {
    flex: 1 1 0;
    margin-bottom: 10px;
    padding-right: 10px;
  }

  &--plain {
    padding: 0;
  }
}

.section-content-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
  margin-bottom: 10px;
}

.grid-item {
  padding-right: 10px;

  .squarred-grid-item {
    display: inline;
    border: none;
    outline: none;
    cursor: text;
  }
}

.highlight {
  font-size: 1.2em;
  font-weight: bold;
  color: #42b883;
}

.delete-button {
  display: none;
  background: red;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-left: 10px;
}

.save-button {
  display: none;
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
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
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
.cv-name {
      color: black;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 10px;
    }
.modl button:hover {
  background-color: #34495e;
}
</style>
