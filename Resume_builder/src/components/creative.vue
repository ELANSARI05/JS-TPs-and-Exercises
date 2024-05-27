<template>
  <div class="resume-container">
    <div class="left-column">
      <h1 class="name">{{ person.name.first }} {{ person.name.middle }} <span class="last-name">{{ person.name.last }}</span></h1>
      <p class="position">{{ person.position }}</p>
      <p class="location">{{ person.contact.city }}</p>
      <div class="about">{{ person.about }}</div>
      <div class="contact-info">
        <a :href="`mailto:${person.contact.email}`" class="contact-item">{{ person.contact.email }}</a>
        <div class="contact-item">{{ person.contact.phone }}</div>
        <div v-if="person.contact.website" class="contact-item">{{ person.contact.website }}</div>
      </div>
      <div class="social-media">
        <div v-if="person.contact.social" v-for="(social, index) in person.contact.social" :key="index" class="social-item">
          {{ social.platform }}: {{ social.handle }}
        </div>
      </div>
      <div class="hobbies">
        <h3>Hobbies</h3>
        <ul>
          <li v-for="(hobby, index) in person.hobbies" :key="index">{{ hobby.name }}</li>
        </ul>
      </div>
    </div>
    <div class="right-column">
      <section class="experience">
        <h3>Experience</h3>
        <div v-for="(experience, index) in person.experience" :key="index" class="experience-item">
          <h4>{{ experience.position }}</h4>
          <p>{{ experience.company }} <span>{{ experience.timeperiod }}</span></p>
          <p>{{ experience.Details }}</p>
        </div>
      </section>
      <section class="education">
        <h3>Education</h3>
        <div v-for="(education, index) in person.education" :key="index" class="education-item">
          <h4>{{ education.degree }}</h4>
          <p>{{ education.Institution }} <span>{{ education.timeperiod }}</span></p>
          <p>{{ education.Details }}</p>
        </div>
      </section>
      <section class="projects" v-if="person.projects">
        <h3>Projects</h3>
        <div v-for="(project, index) in person.projects" :key="index" class="project-item">
          <h4>{{ project.name }}</h4>
          <p>{{ project.platform }}</p>
          <p>{{ project.description }}</p>
          <a :href="project.url">{{ project.url }}</a>
        </div>
      </section>
      <section class="skills">
        <h3>Skills</h3>
        <div class="skills-grid">
          <div v-for="(skill, index) in person.skills" :key="index" class="skill-item">
            {{ skill.name }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'creative',
  props: {
    person: Object
  }
};
</script>

<style scoped>
.resume-container {
  display: flex;
  flex-direction: row;
  font-family: 'Roboto', sans-serif;
  color: #333;
  width: 100%;
}

.left-column {
  width: 30%;
  background-color: #6c63ff;
  color: white;
  padding: 20px;
  text-align: left;
  box-sizing: border-box;
}

.right-column {
  width: 70%;
  padding: 20px;
  box-sizing: border-box;
}

.name {
  font-size: 24px;
  font-weight: bold;
}

.last-name {
  text-transform: uppercase;
}

.position, .location {
  margin: 0;
  font-size: 18px;
}

.about {
  margin: 20px 0;
  font-size: 14px;
}

.contact-info {
  margin: 20px 0;
}

.contact-item {
  margin-bottom: 10px;
  display: block;
}

.social-media {
  margin: 20px 0;
}

.hobbies {
  margin: 20px 0;
}

section {
  margin-bottom: 20px;
}

h3 {
  color: #6c63ff;
  font-size: 20px;
  border-bottom: 2px solid #6c63ff;
  padding-bottom: 5px;
}

.experience-item, .education-item, .project-item {
  margin-bottom: 10px;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
}

.skill-item {
  background-color: #eee;
  border: 1px solid #ccc;
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
}
</style>
