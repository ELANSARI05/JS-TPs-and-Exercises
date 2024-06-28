<template>
  <div class="detail">
    <div class="event-header">
      <h2>{{ event.title }}</h2>
    </div>
    <div class="event-content">
      <div class="event-image">
        <img :src="event.image" alt="Event Image">
      </div>
      <div class="event-detail">
        <p><i class="fas fa-info-circle"></i> <strong>Description: </strong><span class="description-text">{{ event.description }}</span></p>
        <p><i class="fas fa-calendar-alt"></i> <strong>Date: </strong><span class="date-text">{{ new Date(event.date).toLocaleString() }}</span></p>
        <div class="votes-summary">
          <p><strong>Votes:</strong></p>
          <div class="vote-bar">
            <div class="yes-bar" :style="{ width: yesPercentage + '%' }"></div>
            <div class="no-bar" :style="{ width: noPercentage + '%' }"></div>
          </div>
          <div class="votes-numbers">
            <span class="yes-votes">{{ event.yesVotes }} Yes</span>
            <span class="no-votes">{{ event.noVotes }} No</span>
          </div>
        </div>
      </div>
    </div>
    <div class="vote-buttons">
      <p>Vote for the event:</p>
      <div class="buttons-container">
        <button class="yes-button" @click="confirmVote('yes')" :disabled="loading || hasVoted">Yes</button>
        <button class="no-button" @click="confirmVote('no')" :disabled="loading || hasVoted">No</button>
      </div>
      <p v-if="hasVoted" class="vote-message">You have already voted for this event.</p>
    </div>
    <router-link to="/home">
      <button class="go-back-button">Go Back to Home</button>
    </router-link>
    <div v-if="loading" class="loading-overlay">
      <div class="spinner"></div>
      <p style="color: white;">Please wait...</p>
    </div>
  </div>
</template>

<script>
import { projectFirestore, projectAuth } from '@/firebase/config';

export default {
  data() {
    return {
      event: {
        title: '',
        description: '',
        date: '',
        yesVotes: 0,
        noVotes: 0,
        image: ''
      },
      user: null,
      loading: false,
      hasVoted: false,
    };
  },
  computed: {
    totalVotes() {
      return this.event.yesVotes + this.event.noVotes;
    },
    yesPercentage() {
      return this.totalVotes ? (this.event.yesVotes / this.totalVotes) * 100 : 0;
    },
    noPercentage() {
      return this.totalVotes ? (this.event.noVotes / this.totalVotes) * 100 : 0;
    }
  },
  async created() {
    await this.fetchEvent();
    this.user = projectAuth.currentUser;
    if (this.user) {
      await this.checkIfUserVoted();
    }
  },
  methods: {
    async fetchEvent() {
      try {
        const eventId = this.$route.params.id;
        const eventDoc = await projectFirestore.collection('Events').doc(eventId).get();
        if (eventDoc.exists) {
          this.event = eventDoc.data();
        } else {
          console.error('Event not found');
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    },
    async checkIfUserVoted() {
      try {
        const eventId = this.$route.params.id;
        const userId = this.user.uid;
        const voteRef = projectFirestore.collection('Votes').doc(`${eventId}_${userId}`);
        const voteDoc = await voteRef.get();

        if (voteDoc.exists) {
          this.hasVoted = true;
        }
      } catch (error) {
        console.error('Error checking vote:', error);
      }
    },
    confirmVote(voteType) {
      if (confirm("Are you sure you want to vote? Once you confirm, you cannot change your vote.")) {
        this.vote(voteType);
      }
    },
    async vote(voteType) {
      if (!this.user) {
        alert('You need to be logged in to vote.');
        return;
      }
      this.loading = true;
      try {
        const eventId = this.$route.params.id;
        const userId = this.user.uid;
        const voteRef = projectFirestore.collection('Votes').doc(`${eventId}_${userId}`);
        const voteDoc = await voteRef.get();

        if (voteDoc.exists) {
          this.loading = false;
          return;
        }

        await voteRef.set({
          eventId,
          userId,
          vote: voteType,
          createdAt: new Date().toISOString()
        });

        const eventRef = projectFirestore.collection('Events').doc(eventId);
        await projectFirestore.runTransaction(async (transaction) => {
          const eventDoc = await transaction.get(eventRef);
          if (!eventDoc.exists) {
            throw "Event does not exist!";
          }

          let yesVotes = eventDoc.data().yesVotes;
          let noVotes = eventDoc.data().noVotes;

          if (voteType === 'yes') {
            yesVotes += 1;
          } else {
            noVotes += 1;
          }

          transaction.update(eventRef, { yesVotes, noVotes });
        });

        await this.fetchEvent();
        this.hasVoted = true;
        alert('Your vote has been recorded.');
      } catch (error) {
        console.error('Error voting:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');

.detail {
  font-family: 'Roboto', sans-serif;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 800px;
  margin: 20px auto;
  position: relative;
}

.event-header {
  text-align: center;
  margin-bottom: 20px;
}

.event-header h2 {
  font-size: 32px;
  color: #333;
}

.event-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.event-image img {
  width: 100%;
  max-width: 600px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.event-detail {
  width: 100%;
  max-width: 700px;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.event-detail p {
  font-size: 18px;
  margin: 20px 0;
  color: #555;
  display: flex;
  align-items: center;
}

.event-detail p i {
  margin-right: 10px;
  color: #007bff;
}

.description-text {
  font-size: 18px;
  font-weight: 500;
  color: #444;
  margin-left: 10px;
}

.date-text {
  font-size: 18px;
  font-weight: 500;
  color: #444;
  margin-left: 10px;
}

.votes-summary {
  margin-top: 20px;
  width: 100%;
}

.vote-bar {
  display: flex;
  height: 20px;
  width: 100%;
  background-color: #ddd;
  border-radius: 10px;
  overflow: hidden;
}

.yes-bar {
  background-color: #24ec53;
}

.no-bar {
  background-color: #dc3545;
}

.votes-numbers {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.yes-votes, .no-votes {
  font-weight: bold;
  color: #555;
}

.vote-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  position: relative;
}

.vote-buttons p {
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}

.buttons-container {
  display: flex;
  justify-content: center;
  width: 100%;
}

.yes-button, .no-button {
  padding: 10px 20px;
  margin: 0 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.yes-button {
  background-color: #24ec53;
  color: #fff;
}

.no-button {
  background-color: #dc3545;
  color: #fff;
}

.yes-button:hover:enabled {
  background-color: #218838;
  transform: translateY(-2px);
}

.no-button:hover:enabled {
  background-color: #c82333;
  transform: translateY(-2px);
}

.yes-button:disabled,
.no-button:disabled {
  background-color: #ddd;
  cursor: not-allowed;
  transform: none;
}

.go-back-button {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: block;
  margin: 0 auto;
}

.go-back-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.vote-message {
  font-size: 16px;
  color: #ff0000;
  margin-top: 10px;
}

.loading-overlay {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10;
  padding: 20px;
  border-radius: 10px;
}

.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-left-color: #fff;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
