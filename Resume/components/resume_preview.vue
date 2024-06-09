<template>
  <div v-for="cv in resumes" :key="cv.id">
    <div v-if="cv.id == id" class="cv-container">
      <div class="cv-image-container">
        <router-link :to="{ name: 'Resume', params: { id: person.id, cvid: cv.id } }">
        <img :src="preview" alt="CV Preview" class="cv-image">
      </router-link>
      </div>
      <div class="cv-details">
        <div class="cv-item">
          <div class="cv-name" @click="startEditing('name', cv)">
            <template v-if="isEditing && editId === cv.id && editingField === 'name'">
              <input v-model="editName" class="edit-input" @blur="saveEdit('name', cv)" />
            </template>
            <template v-else>
              {{ cv.Name }}
            </template>
          </div>
        </div>
        <div class="cv-item">
          <div class="cv-purpose" @click="startEditing('purpose', cv)">
            <template v-if="isEditing && editId === cv.id && editingField === 'purpose'">
              <input v-model="editPurpose" class="edit-input" @blur="saveEdit('purpose', cv)" />
            </template>
            <template v-else>
              {{ cv.Purpose }}
            </template>
          </div>
        </div>
        <div class="cv-item">
          <div class="cv-modified">Last modified</div>
        </div>
        <div class="cv-item">
          <div class="cv-city">
            <i class="fas fa-map-marker-alt"></i> {{ person.contact.city }}
          </div>
        </div>
      </div>
      <div class="cv-actions">
        <router-link :to="{ name: 'Resume', params: { id: person.id, cvid: cv.id } }">
        <button  class="action-button modify-button">
          <i class="fas fa-edit"></i> Modify
        </button>
        </router-link>
        <button @click="duplicateCv(cv)" class="action-button">
          <i class="fas fa-copy"></i> Duplicate
        </button>
        <button @click="installCv(cv)" class="action-button">
          <i class="fas fa-download"></i> Install
        </button>
        <button @click="deleteCv(cv)" class="action-button delete-button">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </div>
    </div>
  </div>
  <br>
</template>

<script>
import { projectFirestore } from '../firebase/config';
import preview from '../assets/preview.png';

export default {
  name: 'resume_preview',
  props: ['id', 'person'],
  data() {
    return {
      preview: preview,
      resumes: [],
      isEditing: false,
      editId: null,
      editingField: '',
      editName: '',
      editPurpose: ''
    };
  },
  async mounted() {
    try {
      const discussionsRes = await projectFirestore.collection('cv').get();
      this.resumes = discussionsRes.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    } catch (err) {
      console.error(err.message);
    }
  },
  methods: {
    startEditing(field, cv) {
      this.isEditing = true;
      this.editId = cv.id;
      this.editingField = field;
      this.editName = cv.Name;
      this.editPurpose = cv.Purpose;
    },
    async saveEdit(field, cv) {
      if (field === 'name') {
        await projectFirestore.collection('cv').doc(cv.id).update({ Name: this.editName });
        cv.Name = this.editName;
      } else if (field === 'purpose') {
        await projectFirestore.collection('cv').doc(cv.id).update({ Purpose: this.editPurpose });
        cv.Purpose = this.editPurpose;
      }
      this.isEditing = false;
      this.editId = null;
      this.editingField = '';
    },
    async duplicateCv(cv) {
      // Implement your duplication functionality here
      alert(`Duplicate CV: ${cv.Name}`);
    },
    async installCv(cv) {
      // Implement your installation functionality here
      alert(`Install CV: ${cv.Name}`);
    },
    async deleteCv(cv) {
      try {
        await projectFirestore.collection('cv').doc(cv.id).delete();
        this.resumes = this.resumes.filter(resume => resume.id !== cv.id);
        this.$emit('update');
      } catch (err) {
        console.error('Error deleting CV:', err);
      }
    }
  }
};
</script>

<style>
.cv-container {
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 14px;
  background-color: white;
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.cv-image-container {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cv-image {
  height: 100%;
  max-height: 200px;
  border-radius: 10px;
}

.cv-details {
  flex: 3;
  padding-left: 20px;
}

.cv-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.cv-name,
.cv-purpose {
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  flex: 1;
  text-align: left; /* Align text to the left */
}

.cv-modified,
.cv-city {
  font-size: 1em;
  color: #333;
  text-align: left; /* Align text to the left */
}

.cv-city {
  display: flex;
  align-items: center;
}

.cv-city i {
  margin-right: 5px;
}

.edit-input {
  width: 100%;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  text-align: left; /* Align text to the left */
}

.cv-actions {
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 10px;
  top: 10px;
}

.action-button {
  padding: 5px 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.modify-button {
  background-color: #007bff;
  color: white;
}

.delete-button {
  background-color: #d9534f;
  color: white;
}

.action-button i {
  margin-right: 5px;
}
</style>
