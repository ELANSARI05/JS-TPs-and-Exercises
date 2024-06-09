<template>
  <div class="resume-container">
    <div class="left-column">
      <div class="header">
        <h1 class="name">{{ person.name.first }} {{ person.name.middle }} <span class="last-name">{{ person.name.last }}</span></h1>
        <p class="position">{{ person.position }}</p>
        <p class="birth">Born {{ person.birth.year }} in {{ person.birth.location }}</p>
      </div>
      <div class="avatar">
        <img :src="avatar" alt="Avatar" />
      </div>
      <div class="about">
        <h3>About me</h3>
        <p>{{ person.about }}</p>
      </div>
      <div class="skills">
        <h3>Skills</h3>
        <div class="skills-list">
          <div v-for="(skill, index) in person.skills" :key="index" class="skill-item">{{ skill.name }}</div>
        </div>
      </div>
      <div class="contact">
        <h3>Contact</h3>
        <p>{{ person.contact.street }}</p>
        <p>{{ person.contact.email }}</p>
        <p>{{ person.contact.phone }}</p>
        <p v-if="person.contact.website">{{ person.contact.website }}</p>
        <p v-if="person.contact.social" v-for="(social, index) in person.contact.social" :key="index">
          {{ social.platform }}: {{ social.handle }}
        </p>
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
      <section class="contributions" v-if="person.contributions">
        <h3>Contributions</h3>
        <div v-for="(contribution, index) in person.contributions" :key="index" class="contribution-item">
          <h4>{{ contribution.name }}</h4>
          <p>{{ contribution.description }}</p>
          <a :href="contribution.url">{{ contribution.url }}</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'creative',
  props: {
    person: Object,
    avatar: String // Pass the avatar image URL
  }
};
</script>

<style scoped>
.resume-container {
  display: flex;
  font-family: 'Roboto', sans-serif;
  color: #333;
  width: 100%;
}

.left-column {
  width: 30%;
  background-color: #2c3e50;
  color: white;
  padding: 20px;
  text-align: left;
  box-sizing: border-box;
}

.header {
  text-align: left;
  margin-bottom: 20px;
}

.name {
  font-size: 24px;
  font-weight: bold;
}

.last-name {
  text-transform: uppercase;
}

.position {
  margin: 0;
  font-size: 18px;
  font-style: italic;
}

.birth {
  margin: 0;
  font-size: 14px;
  color: #b0c4de;
}

.avatar {
  text-align: center;
  margin: 20px 0;
}

.avatar img {
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.about, .skills, .contact {
  margin-top: 20px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
}

.skill-item {
  background-color: #444;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 5px;
}

.right-column {
  width: 70%;
  padding: 20px;
  box-sizing: border-box;
}

section {
  margin-bottom: 20px;
}

h3 {
  color: #2c3e50;
  font-size: 20px;
  border-bottom: 2px solid #2c3e50;
  padding-bottom: 5px;
}

.experience-item, .education-item, .project-item, .contribution-item {
  margin-bottom: 10px;
}

a {
  color: #3498db;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
