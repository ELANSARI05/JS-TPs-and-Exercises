<template>
  <div class="home">
    <header class="header">
      <div class="logo">
        <img src="https://th.bing.com/th/id/OIP.Dj7vVJWYLSXIGbZSWFnNkgHaFL?rs=1&pid=ImgDetMain" alt="Logo">
      </div>
      <nav class="navigation">
        <router-link to="/profile" class="nav-button profile-button">
          <svg xmlns="http://www.w3.org/2000/svg" class="profile-icon" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M12 12c3.31 0 6-2.69 6-6s-2.69-6-6-6-6 2.69-6 6 2.69 6 6 6zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4zm0-10c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
          </svg>
          Profile
        </router-link>
      </nav>
    </header>

    <!-- Information Message -->
   

    <!-- Search Bar -->
    <div class="search-bar-container">
      <input type="text" v-model="searchQuery" placeholder="Search for events..." class="search-bar">
    </div>

    <!-- Event List -->
    <section class="event-list">
      <h3>UM6P Events</h3>
      <div class="info-message">
      <p>Tap on the event to vote or see more details</p>
    </div>
      <div class="event-grid">
        <div class="event-card" v-for="event in filteredEvents" :key="event.id">
          <router-link :to="{ name: 'Detail', params: { id: event.id } }" class="event-link">
            <div class="event-content">
              <h4>{{ event.title }}</h4>
              <p>{{ new Date(event.date).toLocaleString() }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { projectFirestore } from '@/firebase/config';

export default {
  data() {
    return {
      events: [],
      searchQuery: ''
    };
  },
  async created() {
    await this.fetchEvents();
  },
  methods: {
    async fetchEvents() {
      try {
        const eventsSnapshot = await projectFirestore.collection('Events').orderBy('date', 'asc').get();
        this.events = eventsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  },
  computed: {
    filteredEvents() {
      if (this.searchQuery) {
        return this.events.filter(event =>
          event.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }
      return this.events;
    }
  }
};
</script>

<style scoped>
.home {
  font-family: 'Arial', sans-serif;
  background-color: #f4f4f4;
  color: #333;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #343a40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo img {
  width: 100px;
  height: auto;
}

.navigation {
  display: flex;
  align-items: center;
}

.nav-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.nav-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.profile-button {
  background-color: #fff;
  color: #007bff;
  display: flex;
  align-items: center;
}

.profile-icon {
  width: 24px;
  height: 24px;
  fill: #007bff;
  margin-right: 5px;
}

.info-message {
  text-align: center;
  background-color: rgb(255, 0, 0);
  color: #fff;
  padding: 10px;
  margin: 20px 0;
  border-radius: 5px;
  font-size: 25px;
  font-weight: bold;
}

.search-bar-container {
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.search-bar {
  width: 60%;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #007bff;
  border-radius: 5px;
  margin-right: 10px;
  transition: border-color 0.3s;
}

.search-bar:focus {
  border-color: #0056b3;
  outline: none;
}

.event-list {
  padding: 20px;
}

.event-list h3 {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
  color: #007bff;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.event-card {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease-in-out;
}

.event-card:hover {
  transform: translateY(-5px);
}

.event-content {
  padding: 20px;
  text-align: center;
}

.event-link {
  text-decoration: none;
  color: inherit;
  background-color: rgb(212, 212, 224);

}

.event-card h4 {
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0 10px;
  color: #343a40;
}

.event-card p {
  font-size: 14px;
  color: #666;
}
</style>
