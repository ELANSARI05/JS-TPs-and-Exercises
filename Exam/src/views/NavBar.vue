<template>
  <div class="background">
    <div class="logo-container">
      <img src="https://lh3.googleusercontent.com/rvCT7c7_3-uSuOxxf11vnaSwTDomkZOWm1hDcuzT6tscd5QkeuszPdSvGqeC5x4Ec1c" alt="Logo" class="logo">
    </div>
    <div class="content-container">
      <div class="left-content">
        <div class="description">
          <b>In just a few minutes, create your resume for free.</b>
        </div>
        <div class="app-description">
          <h3>How it works:</h3>
          <ul>
            <li>
              <span class="icon text-primary"><i class="fas fa-file-alt"></i></span> Choose from multiple templates with various themes and colors.
            </li>
            <li>
              <span class="icon text-primary"><i class="fas fa-paint-brush"></i></span> Customize your resume with modern fonts and colorful icons.
            </li>
            <li>
              <span class="icon text-primary"><i class="fas fa-file-pdf"></i></span> Download your resume in PDF format in just a few minutes.
            </li>
            <li>
              <span class="icon text-primary"><i class="fas fa-briefcase"></i></span> Create professional resumes that attract recruiters.
            </li>
          </ul>
        </div>
        <router-link to="/register">
          <button class="cta-button">Create Your Resume</button>
        </router-link>
      </div>
      <div class="right-content">
        <div class="area">
          <ul class="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div class="carousel">
          <div v-for="(benefit, index) in benefits" :key="index" v-show="currentBenefit === index" >
            <div class="image-container">
              <img :src="benefit.image" class="carousel-image" alt="Benefit Image">
              <div class="benefit-text"><b>{{ benefit.text }}</b></div>
            </div>
          </div>
        </div>
        <div class="carousel-dots">
          <span v-for="(benefit, index) in benefits" :key="index" :class="['dot', { active: currentBenefit === index }]" @click="setCurrentBenefit(index)"></span>
        </div>
      </div>
    </div><br><br><br>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h3>About Us</h3>
          <p>Our mission is to help you create a professional resume with ease and efficiency.</p>
        </div>
        <div class="footer-section contact">
          <h3>Contact</h3>
          <p>Email: support@resumecreator.com</p>
          <p>Phone: +123-456-7890</p>
        </div>
        <div class="footer-section legal">
          <h3>Legal</h3>
          <p><a href="/privacy-policy">Privacy Policy</a></p>
          <p><a href="/terms-of-service">Terms of Service</a></p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; Resume Creator. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script>
import logo from '../logo.png'
import design from "../assets/design.webp"
import device from "../assets/device.webp"
import pdf from "../assets/pdf.webp"

export default {
  name: "NavBar",
  data() {
    return {
      logo: logo,
      currentBenefit: 0,
      benefits: [
        {
          image: 'https://img.freepik.com/free-vector/minimalist-cv-template_23-2148916066.jpg?t=st=1717965645~exp=1717969245~hmac=d0382734fa3252fc682c9968c3f7493e706e602ecf394ef4a4f92710b3f9f1e4&w=740',
          text: 'In our application, you can apply multiple templates with different themes and colors.'
        },
        {
          image: design,
          text: 'Customize your resume with modern fonts and colorful icons.'
        },
        {
          image: pdf,
          text: 'Download your resume in PDF format in just a few minutes.'
        },
        {
          image: device,
          text: 'The application is responsive and optimized for various devices.'
        }
      ]
    };
  },
  mounted() {
    this.startCarousel();
  },
  methods: {
    startCarousel() {
      setInterval(() => {
        this.currentBenefit = (this.currentBenefit + 1) % this.benefits.length;
      }, 3900);
    },
    setCurrentBenefit(index) {
      this.currentBenefit = index;
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Exo:400,700');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Exo', sans-serif;
  background: #f4f4f9;
  color: #333;
}

.background {
  background: linear-gradient(135deg, white, #c6d8ff 75%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  min-height: 100vh;
}

.logo-container {
  width: 100%;
  text-align: left;
  padding: 20px;
}

.logo {
  width: 200px;
  border-radius: 10px;
}

.content-container {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  flex: 1;
}

.left-content {
  flex: 1;
  padding: 20px;
}

.right-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, rgba(23, 8, 155, 0.7), rgba(0, 0, 0, 0.7)), no-repeat center center/cover;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.description, .app-description {
  margin-bottom: 20px;
}

.description {
  font-family: Georgia;
  font-size: 24px;
}

.app-description ul {
  list-style-type: none;
  padding: 0;
}

.app-description ul li {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.icon {
  font-size: 24px;
  margin-right: 10px;
}

.cta-button {
  width: 100%;
  max-width: 300px;
  height: 50px;
  border-radius: 25px;
  font-size: 1.2rem;
  cursor: pointer;
  background-color: #007bff;
  color: #fff;
  border: none;
  margin-top: 20px;
}

.cta-button:hover {
  background-color: #0056b3;
}

.carousel {
  width: 100%;
  max-width: 400px;
  height: auto;
  overflow: hidden;
}

.carousel-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-container {
  position: relative;
  width: 100%;
  height: 40%;
}

.carousel-image {
  width: 100%;
  border-radius: 10px;
}

.benefit-text {
  color: white;
  text-align: center;
  font-size: 1rem;
  border-radius: 0 0 10px 10px;
  width: 100%;
}

.carousel-dots {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.dot {
  cursor: pointer;
  height: 10px;
  width: 10px;
  margin: 0 5px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
}

.dot.active {
  background-color: #007bff;
}

.area {
  position: absolute;
  width: 100%;
  height: 100vh;
  background: #4e54c8;
  background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);
  z-index: -1;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.2);
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
}

@keyframes animate {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 1;
    border-radius: 0;
  }

  100% {
    transform: translateY(-1000px) rotate(720deg);
    opacity: 0;
    border-radius: 50%;
  }
}

.footer {
  width: 100%;
  color: black;
  text-align: center;
  padding: 20px 0;
  margin-top: auto;
}

.footer-content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  padding: 10px;
}

.footer-bottom {
  margin-top: 20px;
  border-top: 1px solid #444;
  padding-top: 10px;
}
</style>
