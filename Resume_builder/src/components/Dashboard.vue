<template>
    <div class="dashboard">
      <div class="welcome-message">
        <h1>Welcome, {{ userName }}!</h1>
        <div class="icons">
          <i class="fas fa-smile-wink welcome-icon"></i>
          <i class="fas fa-hand-spock welcome-icon"></i>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  
  export default {
    name: 'Dashboard',
    data() {
      return {
      };
    },
    props : ['userId','userName',"person"]  
  };
  </script>
  
  <style>
  .dashboard {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }
  
  .welcome-message {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .welcome-message h1 {
    font-size: 24px; /* Smaller font size */
    margin-right: 10px;
  }
  
  .icons {
    display: flex;
  }
  
  .welcome-icon {
    font-size: 30px; /* Smaller icon size */
    margin: 0 10px;
  }
  </style>
  