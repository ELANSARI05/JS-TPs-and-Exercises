<template>
    <div class="container mt-4">
      <div v-for="discussion in discussions" :key="discussion.id">
        <div v-if="discussion.id == discid">
          <div class="card mb-3">
            <div class="card-body">
              <p class="card-text">{{ discussion.content }}</p>
              <ul class="list-group list-group-flush">
                <li
                  v-for="rep in discussion.replies"
                  :key="rep"
                  :class="['list-group-item', repAuteurClass(rep)]"
                  @mouseover="hoveredRep = rep"
                  @mouseleave="hoveredRep = null"
                >
                  <div class="reply-content">
                    <span class="reply-text">{{ func(rep) }}</span>
                    <i 
                      v-if="hoveredRep == rep && userId ==discussion.createdBy "
                      class="material-icons delete-icon"
                      @click="deleteReply(rep)"
                    >
                      &#xe872;
                    </i>
                  </div>
                </li>
                <li class="list-group-item">
                  <div class="comment-container">
                    <textarea class="comment-textarea" v-model="comment" placeholder="Ajouter un commentaire.."></textarea>
                    <i class="material-icons send-icon" @click="add_comm()">send</i>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary mt-3" @click="goHome">Back to Home</button>
    </div>
  </template>
  
  
  
  <script>
  import firebase from 'firebase/app';
  import { projectFirestore } from '../firebase/config';
  
  export default {
    data() {
      return {
        discid: this.$route.params.id,
        userId: this.$route.params.userId,
        discussions: [],
        replies: [],
        comment: "",
        hoveredRep: null
      };
    },
    async mounted() {
      try {
        const res = await projectFirestore.collection('Discussions').get();
        this.discussions = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (err) {
        this.error = err.message;
      }
      try {
        const res = await projectFirestore.collection('responses').get();
        this.replies = res.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      } catch (err) {
        this.error = err.message;
      }
    },
    methods: {
      func(rep) {
        for (let i = 0; i < this.replies.length; i++) {
          if (this.replies[i].id == rep) {
            return this.replies[i].contenu;
          }
        }
      },
      goHome() {
      this.$router.push('/home');
    },
      repAuteurClass(rep) {
        const reply = this.replies.find(r => r.id === rep);
        return reply && reply.auteur === this.userId ? 'my-reply' : 'other-reply';
      },
      async add_comm() {
        if (this.comment !== "") {
          try {
            console.log(this.userId);
            // Add the reply to the responses collection
            const newReply = {
              auteur: this.userId,
              contenu: this.comment,
              dateCreation: new Date().toISOString(),
              discussionId: this.discid
            };
            const replyRef = await projectFirestore.collection('responses').add(newReply);
  
            // Update the replies array of the specific discussion
            await projectFirestore.collection('Discussions').doc(this.discid).update({
              replies: firebase.firestore.FieldValue.arrayUnion(replyRef.id)
            });
  
            // Reset comment textarea
            this.comment = "";
  
            // Optionally, you can update the local state as well
            this.discussions = this.discussions.map(discussion => {
              if (discussion.id === this.discid) {
                return {
                  ...discussion,
                  replies: [...discussion.replies, replyRef.id]
                };
              }
              return discussion;
            });
  
            // Optionally, add the new reply to the local replies state
            this.replies.push({ id: replyRef.id, ...newReply });
  
          } catch (error) {
            console.error("Error adding comment: ", error);
          }
        }
      },
      async deleteReply(repId) {
        try {
          // Delete the reply from the responses collection
          await projectFirestore.collection('responses').doc(repId).delete();
  
          // Update the replies array of the specific discussion
          await projectFirestore.collection('Discussions').doc(this.discid).update({
            replies: firebase.firestore.FieldValue.arrayRemove(repId)
          });
  
          // Update local state
          this.replies = this.replies.filter(rep => rep.id !== repId);
          this.discussions = this.discussions.map(discussion => {
            if (discussion.id === this.discid) {
              return {
                ...discussion,
                replies: discussion.replies.filter(id => id !== repId)
              };
            }
            return discussion;
          });
  
        } catch (error) {
          console.error("Error deleting reply: ", error);
        }
      }
    }
  };
  </script>
  

  
  <style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.card-text {
  font-size: 1.2em;
  line-height: 1.5;
}

.list-group-item {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 0.25rem;
  position: relative;
}

.comment-container {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-left: 50%;
  width: 50%;
}

.comment-textarea {
  flex-grow: 1;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ced4da;
}

.send-icon {
  font-size: 24px;
  color: #007bff;
  cursor: pointer;
  margin-left: 8px;
  transition: color 0.3s;
}

.send-icon:hover {
  color: #0056b3;
}

.my-reply {
  background-color: #dcf8c6;
  text-align: right;
  margin-left: auto;
}

.other-reply {
  background-color: #e9ecef; /* Different background color for other replies */
  text-align: left;
  margin-right: auto;
}

.reply-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reply-text {
  flex-grow: 1;
}

.delete-icon {
  margin-left: 10px;
  font-size: 20px;
  color: red;
  cursor: pointer;
  transition: color 0.3s;
}

.delete-icon:hover {
  color: darkred;
}

@media (max-width: 600px) {
  .card-text {
    font-size: 1em;
  }
  .list-group-item {
    font-size: 0.9em;
  }
}
</style>
