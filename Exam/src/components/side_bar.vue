<template>
    <div class="fr">
      <div id="resume2" class="resume" ref="resumeContent">
        <div class="top-row">
          <span class="cv-name">{{ cv.name }}</span>
          <span contenteditable="true" class="person-name">{{ cv.contact.name }}</span>
          <span contenteditable="true" class="person-position">{{ cv.status }}</span>
        </div>
        <div class="left-col">
          <div class="person-image">
            <div class="image-centerer">
              <div class="img" @click="triggerFileInput" :style="{ backgroundImage: 'url(' + imageSrc + ')' }">
                <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none;">
              </div>
            </div>
          </div>
          <div class="contact section" v-if="sectionVisibility.contact" @mouseenter="showOptions('contact')" @mouseleave="hideOptions('contact')">
            <h3 class="section-headline">
              <i class="fas fa-address-book section-icon" style="color: #2196F3;"></i>
              Contact
              <i v-if="hoveredSection === 'contact'" class="fas fa-edit edit-icon" @click="editItem('contact')"></i>
            </h3>
            <span class="contact-row">
              <span contenteditable="true">{{ cv.contact.email }}</span>
            </span>
            <div class="contact-row dots">
              <i class="fa fa-circle" aria-hidden="true"></i>
              <i class="fa fa-circle" aria-hidden="true"></i>
              <i class="fa fa-circle" aria-hidden="true"></i>
            </div>
            <div class="contact-row">
              <span contenteditable="true">{{ cv.contact.phone }}</span>
            </div>
            <div class="contact-row dots">
              <i class="fa fa-circle" aria-hidden="true"></i>
              <i class="fa fa-circle" aria-hidden="true"></i>
              <i class="fa fa-circle" aria-hidden="true"></i>
            </div>
            <div class="contact-row" contenteditable="true">
              {{ cv.contact.street }} <br /> {{ cv.contact.city }}
            </div>
          </div>
        </div>
        <div class="right-col">
          <div class="experience section" v-if="sectionVisibility.experience" @mouseenter="showOptions('experience')" @mouseleave="hideOptions('experience')">
            <h3 class="section-headline">
              <i class="fas fa-briefcase section-icon" style="color: #FF5722;"></i> 
              Experience
              <i v-if="hoveredSection === 'experience'" class="fas fa-plus-circle add-icon" @click="addItem('experience')"></i>
            </h3>
            <div class="experience-block" v-for="(experience, index) in cv.experience" :key="index" @mouseenter="showItemOptions('experience', index)" @mouseleave="hideItemOptions('experience', index)">
              <div class="row">
                <span class="highlight company" contenteditable="true">{{ index + 1 }} - {{ experience.position }}</span> 
                <span class="job-title" contenteditable="true">- {{ experience.company }}</span>
                <span class="job-title" contenteditable="true">- {{ experience.details }}</span>
                <span class="job-title" contenteditable="true">- {{ experience.location }}</span>
                <span class="job-title" contenteditable="true">- {{ experience.timePeriod }}</span>

                <i v-if="hoveredItem === `experience-${index}`" class="fas fa-edit edit-icon" @click="editItem('experience', index)"></i>
                <i v-if="hoveredItem === `experience-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('experience', index)"></i>
              </div>
              <div class="row">
                <span class="time-period" contenteditable="true">{{ experience.timeperiod }}</span>
              </div>
              <div class="row">
                <span class="job-description" contenteditable="true">{{ experience.description }}</span>
              </div>
            </div>
          </div>
          <div class="education section" v-if="sectionVisibility.education" @mouseenter="showOptions('education')" @mouseleave="hideOptions('education')">
            <h3 class="section-headline">
              <i class="fas fa-graduation-cap section-icon" style="color: #8BC34A;"></i> 
              Education
              <i v-if="hoveredSection === 'education'" class="fas fa-plus-circle add-icon" @click="addItem('education')"></i>
            </h3>
            <div class="education-block" v-for="(education, index) in cv.education" :key="index" @mouseenter="showItemOptions('education', index)" @mouseleave="hideItemOptions('education', index)">
              <div class="row">
                <span class="highlight degree" contenteditable="true">{{ index + 1 }} - {{ education.degree }}</span>
              </div>
              <div class="row">
                <span class="degree-description" contenteditable="true">{{ education.details }}</span>
              </div>
              <div class="row">
                <span class="time-period" contenteditable="true">{{ education.institution }}</span>
              </div>
              <div class="row">
                <span class="time-period" contenteditable="true">{{ education.location }}</span>
              </div>
              <div class="row">
                <span class="time-period" contenteditable="true">{{ education.timePeriod }}</span>
              </div>
              <i v-if="hoveredItem === `education-${index}`" class="fas fa-edit edit-icon" @click="editItem('education', index)"></i>
              <i v-if="hoveredItem === `education-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('education', index)"></i>
            </div>
          </div>
          <div class="skills section" v-if="sectionVisibility.skills" @mouseenter="showOptions('skills')" @mouseleave="hideOptions('skills')">
            <h3 class="section-headline">
              <i class="fas fa-tools section-icon" style="color: #8BC34A;"></i>
              Skills
              <i v-if="hoveredSection === 'skills'" class="fas fa-plus-circle add-icon" @click="addItem('skills')"></i>
            </h3>
            <div class="education-block">
              <div class="row" v-for="(skill, index) in cv.skills" :key="index" @mouseenter="showItemOptions('skills', index)" @mouseleave="hideItemOptions('skills', index)">
                <span class="highlight" contenteditable="true">{{ index + 1 }} - {{ skill.name }}</span>
                <div class="row">
                       <span class="project-description" contenteditable="true">{{ skill.details }}</span>
                </div>               
                <div class="row">
                       <span class="project-description" contenteditable="true">{{ skill.level }}</span>
                </div>                 
                 <i v-if="hoveredItem === `skills-${index}`" class="fas fa-edit edit-icon" @click="editItem('skills', index)"></i>
                <i v-if="hoveredItem === `skills-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('skills', index)"></i>
              </div>
            </div>
          </div>
          <div class="projects section" v-if="sectionVisibility.projects" @mouseenter="showOptions('projects')" @mouseleave="hideOptions('projects')">
            <h3 class="section-headline">
              <i class="fas fa-code section-icon" style="color: #2196F3;"></i>
              Projects
              <i v-if="hoveredSection === 'projects'" class="fas fa-plus-circle add-icon" @click="addItem('projects')"></i>
            </h3>
            <div class="projects-block" v-for="(project, index) in cv.projects" :key="index" @mouseenter="showItemOptions('projects', index)" @mouseleave="hideItemOptions('projects', index)">
              <div class="row">
                <span class="highlight project-name" contenteditable="true">{{ index + 1 }} - {{ project.name }}</span>
                <i v-if="hoveredItem === `projects-${index}`" class="fas fa-edit edit-icon" @click="editItem('projects', index)"></i>
                <i v-if="hoveredItem === `projects-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('projects', index)"></i>
              </div>
              <div class="row">
                <span class="project-platform" contenteditable="true">{{ project.platform }}</span>
              </div>
              <div class="row">
                <span class="project-description" contenteditable="true">{{ project.description }}</span>
              </div>
              <div class="row">
                <span class="project-url" contenteditable="true">{{ project.url }}</span>
              </div>
            </div>
          </div>
          <div class="languages section" v-if="sectionVisibility.languages" @mouseenter="showOptions('languages')" @mouseleave="hideOptions('languages')">
            <h3 class="section-headline">
              <i class="fas fa-language section-icon" style="color: #FFC107;"></i> 
              Languages
              <i v-if="hoveredSection === 'languages'" class="fas fa-plus-circle add-icon" @click="addItem('languages')"></i>
            </h3>
            <div class="languages-block" v-for="(language, index) in cv.languages" :key="index" @mouseenter="showItemOptions('languages', index)" @mouseleave="hideItemOptions('languages', index)">
              <div class="row">
                <span class="highlight language-name" contenteditable="true">{{ index + 1 }} - {{ language.name }}</span>
              </div>
              <div class="row">
                <span class="language-proficiency" contenteditable="true">{{ language.level }}</span>
              </div>
              <div class="row">
                <span class="language-details" contenteditable="true">{{ language.details }}</span>
              </div>
              <i v-if="hoveredItem === `languages-${index}`" class="fas fa-edit edit-icon" @click="editItem('languages', index)"></i>
                <i v-if="hoveredItem === `languages-${index}`" class="fas fa-trash delete-icon" @click="deleteItem('languages', index)"></i>
            </div>
          </div>
        </div>
      </div>
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
              <label>URL</label>
              <input v-model="editData.url" />
            </div>
            <div v-if="editField === 'languages' || addField === 'languages'">
              <label>Language</label>
              <input v-model="editData.name" />
              <label>Proficiency</label>
              <input v-model="editData.level" />
              <label>Details</label>
              <textarea v-model="editData.details"></textarea>
            </div>
            <button type="submit">Save</button>
          </form>
          <button @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>
    <button @click="exportPDF" class="export-button">Export as PDF</button>

  </template>
  
  <script>
import { defineComponent, reactive } from 'vue';
import html2pdf from 'html2pdf.js';
import { projectFirestore } from '../firebase/config'; // Import Firebase Firestore

export default defineComponent({
  name: 'side_bar',
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
          website: ''
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
    deleteSection(section) {
      this.sectionVisibility[section] = false;
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
    exportPDF() {
      const element = this.$refs.resumeContent;
      const opt = {
        margin: 0.5,
        filename: 'resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
        },
        jsPDF: { unit: 'in', format: 'a3', orientation: 'portrait' }
      };

      html2pdf().from(element).set(opt).save();
    }
  },
});
</script>
  
  <style lang="less" scoped>
  @accent-color: #242b32;
  .fr {
    margin: 0 auto;
    background-color: white;
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
  .highlight {
  font-size: 1.2em;
  font-weight: bold;
  color: #42b883;
}
  #resume2 {
    font-family:'Raleway', sans-serif;
    padding-bottom:50px;
    max-width: 1200px; /* Increased width */
    
    a, a:focus, a:hover, a:visited {
      text-decoration:none;
    }
    h3 {
      text-transform:uppercase;
      padding-top:0;
      margin-top:0;
      letter-spacing:5px;
      font-weight:400;
    }
    .top-row {
      width:100%;
      padding-top:100px;
      padding-bottom:50px;
      padding-right: 70px;
      span {
        width:100%;
        display:block;
        text-align:center;
        font-weight:normal;
      }
      span.person-name {
        text-transform:uppercase;
        font-size:50px;
        letter-spacing:10px;
      }
      span.person-position {
        letter-spacing:5px;
      }
    }
    .left-col {
      width:26%;
      float:left;
      padding-left:8%;
      padding-right:4%;
      .person-image .image-centerer {
        display:flex;
        justify-content:center;
        height:auto;
        overflow:hidden;
        .img {
          flex:none;
          background:require('../assets/id.jpg');
          background-position:center;
          background-size:cover;
          height:250px;
          width:100%;
          cursor: pointer;
        }
      }
      .contact h3 {
        text-align:center;
        margin-top:20px;
      }
      .contact .contact-row {
        text-align:center;
        letter-spacing:2px;
        margin-bottom:3px;
        a {
          color:black;
        }
      }
      .contact .contact-row:first-of-type {
        margin-top:50px;
      }
      .contact .contact-row.dots {
        margin-top:20px;
        margin-bottom:15px;
        font-size:10px;
        color:rgba(153,153,153,0.6);
        width: 100%
      }
    }
    .right-col {
      width:50%;
      float:right;
      padding-left:4%;
      padding-right:8%;
      .experience-block {
        margin-bottom:10px;
        .row:first-child {
          margin-bottom:3px;
        }
        .row .company {
          text-transform:uppercase;
          font-size:19px;
        }
        .row .job-title {
          font-size:19px;
        }
      }
      .education {
        margin-top:50px;
        .education-block {
          margin-bottom:10px;
          .degree {
            font-size:19px;
            text-transform:uppercase;
            margin-bottom:3px;
          }
        }
      }
      .skills-block {
        margin-top:50px;
        position:relative;
        .skills {
          margin-bottom:10px;
          margin-bottom:20px;
          position:relative;
          margin-left:auto;
          margin-right:auto;
          display:inline-block;
          .skill {
            width:80px;
            height:80px;
            border-radius:50%;
            position:relative;
            border:#333333 1px solid;
            margin:3px;
            float:left;
            font-size:13px;
            .skill-name {
              text-align:center;
              position:absolute;
              top:50%;
              transform:translateY(-50%);
              width:100%;
            }
          }
          .skills-other {
            display:inline-block;
            width:100%;
            margin-top:20px;
          }
        }
      }
    }
  }
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
    background-color: @accent-color;
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
  .cv-name {
      position: absolute;
      color: black;
      top: 0;
      left: 0;
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 10px;
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
  