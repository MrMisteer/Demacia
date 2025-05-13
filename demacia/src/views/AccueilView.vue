<template>
  <div class="container">
    <!-- Section Jeu de la Semaine -->
    <section class="game-of-the-week">
      <div class="game-info">
        <h1>Jeu de la Semaine<br>Note : 9.54/10</h1>
        <p>
          Supporting statement for your product's tagline. This text should
          communicate your unique selling proposition to the reader.
        </p>
        <button>AJOUTER À LA LISTE</button>
      </div>
      <div class="game-image">
        <img src="https://via.placeholder.com/400x300" alt="Jeu de la semaine" />
      </div>
    </section>

    <!-- Section Jeux les plus populaires -->
    <section class="popular-games">
      <h2>Jeux les plus populaires</h2>
      <div class="game-thumbnails">
        <div class="thumbnail"></div>
        <div class="thumbnail"></div>
        <div class="thumbnail"></div>
        <div class="thumbnail"></div>
        <div class="thumbnail"></div>
      </div>
      <p class="footer">Join over 1 000 000 customers worldwide</p>
    </section>
  </div>
</template>

<script>
export default {
  name: 'AccueilView'
}
</script>

<style scoped>
/* Section Jeu de la Semaine */
.game-of-the-week {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem;
}

.game-info {
  max-width: 50%;
}

.game-info h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.game-info p {
  margin-bottom: 1.5rem;
  color: #555;
}

.game-info button {
  padding: 0.75rem 1.5rem;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.game-info button:hover {
  background-color: #555;
}

.game-image img {
  max-width: 100%;
  border-radius: 8px;
}

/* Section Jeux les plus populaires */
.popular-games {
  text-align: center;
  margin-top: 3rem;
}

.popular-games h2 {
  margin-bottom: 2rem;
}

.popular-games .game-thumbnails {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.popular-games .thumbnail {
  width: 100px;
  height: 100px;
  background-color: #ddd;
  border-radius: 8px;
}

.footer {
  margin-top: 2rem;
  color: #777;
}
</style>
