<template>
  <div class="background">
    <div class="content-container">
      <div class="left-content">
        <div class="title">
          <b>Créez votre resume professionnel en ligne gratuitement avec ResumeGenius.</b>
        </div>
        <div class="description">
          En quelques minutes, créez votre resume gratuitement, choisissez un modèle, personnalisez son design, puis téléchargez-le en PDF.
        </div><br>
        <div class="logo-container">
          <img :src="logo" class="logo" alt="Logo">
        </div>
      </div>
      <div class="right-content">
        <router-link to="/register">
          <button class="cta-button">Creer votre resume</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '../logo.png'

export default {
  name: "NavBar",
  data(){
    return {
      logo : logo
    }
  }
};
</script>

<style>
.background {
  background: linear-gradient(135deg, #f5f5f5 25%, #b3c6ff 75%);
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.content-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
}

.left-content, .right-content {
  width: 100%;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 20px;
}

.description {
  margin-bottom: 20px;
}

.logo-container {
  margin-bottom: 20px;
}

.logo {
  border-radius: 50px;
  max-width: 100%;
  height: auto;
}

.cta-button {
  width: 100%;
  max-width: 400px;
  height: 50px;
  border-radius: 30px;
  font-size: 1.5rem;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  margin-top: 20px;
}

.cta-button:hover {
  background-color: #0056b3;
}

@media (min-width: 768px) {
  .content-container {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }

  .left-content, .right-content {
    width: 50%;
  }

  .title {
    font-size: 3rem;
  }

  .cta-button {
    width: 400px;
    height: 100px;
    font-size: 2rem;
  }

  .right-content {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
