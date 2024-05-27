<template>
    <div style="display: flex;justify-content: space-between;">
      <div style="width:50%"><div style="font-size: 50px;width: 100%;"><b>Créez votre resume  professionnel en ligne gratuitement avec ResumeGenius.</b></div>
          <div style="width: 100%;">En quelques minutes, créez votre resume gratuitement, choisissez un modèle, personnalisez son design, puis téléchargez-le en PDF.</div><br>
          <div style="width: 100%;"><img :src="logo" style="border-radius: 50px;" alt=""></div></div>
      <div style="margin-right: 15%;margin-top: 20%;font-size: 40px"><router-link to="/register"><button style="width: 400px;height: 100px;border-radius: 30px">Creer votre resume</button></router-link></div>
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
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .login-form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto; /* Center the form horizontally */
  }
  
  .login-form h2 {
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
  
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  button {
    display: block;
    width: 100%;
    padding: 10px;
    border: none;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    box-sizing: border-box;
  }
  
  .google-button {
    margin-top: 10px;
    background-color: #db4437;
  }
  
  .google-button:hover {
    background-color: #c33d2e;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  
  .error {
    color: red;
    margin-top: 10px;
    text-align: center;
  }
  
  a {
    display: block;
    text-align: center;
    margin-top: 10px;
    color: #007bff;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>
  