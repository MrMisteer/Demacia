<template>
  <div class="container">
    <!-- Section Jeu de la Semaine -->
    <section class="game-of-the-week">
      <div class="game-info">
        <h2 class="section-title">Jeu de la Semaine</h2>
        <p class="note">Note : <strong>9.54/10</strong></p>
        <p class="description">
          Jeu de société classique de gestion de propriétés
        </p>
      </div>
      <div class="game-image">
        <img src="https://www.regles-de-jeux.com/wp-content/uploads/2014/03/regle-monopoly.jpg" alt="Jeu de la semaine" />
      </div>
    </section>

    <!-- Section Jeux les plus populaires -->
    <section class="popular-games">
  <h2 class="section-title">Jeux les plus populaires</h2>
  <div class="game-thumbnails">
    <div class="thumbnail">
      <img src="https://www.regles-de-jeux.com/wp-content/uploads/2014/03/regle-monopoly.jpg" alt="Monopoly" />
      <p>Monopoly</p>
    </div>
    <div class="thumbnail">
      <img src="https://www.nintendo.com/eu/media/images/10_share_images/games_15/nintendo_switch_download_software_1/2x1_NSwitchDS_CatanConsoleEdition.jpg" alt="Catan" />
      <p>Catan</p>
    </div>
    <div class="thumbnail">
      <img src="https://cdn.svc.asmodee.net/production-rprod/storage/games/7-wonders/sev-content-159243209212Feq.png" alt="7 Wonders" />
      <p>7 Wonders</p>
    </div>
    <div class="thumbnail">
      <img src="https://lagranderecre-lagranderecre-fr-storage.omn.proximis.com/Imagestorage/images/0/0/6103b33eaa2fb_PBAZU01FR_EAN_826956620105_1_.jpg" alt="Azul" />
      <p>Azul</p>
    </div>
    <div class="thumbnail">
      <img src="https://www.vindjeu.eu/prd/wp-content/uploads/2014/09/833-Risk-2.jpg" alt="Risk" />
      <p>Risk</p>
    </div>
  </div>
  <p class="footer">Rejoignez plus d’un million de joueurs dans le monde !</p>
</section>
  </div>
</template>

<script>
export default {
  name: 'AccueilView'
}
</script>

<style scoped>
.container {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(to bottom, #ffffff, #fef6e4);
  padding: 2rem;
  min-height: 100vh;
}

/* ==== Jeu de la Semaine ==== */
.game-of-the-week {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2rem;
  background: #f1f8e9;
  padding: 2rem;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #2e7d32;
}

.note {
  font-size: 1.25rem;
  color: #33691e;
}

.description {
  color: #444;
  margin-top: 1rem;
}

.game-image img {
  width: 100%;
  max-width: 400px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

/* ==== Jeux les plus populaires ==== */
.popular-games {
  background-color: #e3f2fd;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
  margin-top: 2rem;
}

.popular-games .game-thumbnails {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1.5rem;
  margin-top: 2rem;
}

.thumbnail {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
}

.thumbnail:hover {
  transform: translateY(-5px);
  background-color: #bbdefb;
}

.thumbnail img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 0.5rem;
}

.footer {
  margin-top: 2rem;
  color: #555;
  font-style: italic;
  font-size: 0.95rem;
}

/* === Navigation (ajout de contours) === */
nav a, .navbar button {
  border: 2px solid #ddd;
  border-radius: 6px;
  padding: 6px 12px;
  margin: 0 5px;
  text-decoration: none;
  color: #333;
  background-color: #fefefe;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

nav a:hover, .navbar button:hover {
  background-color: #eeeeee;
  border-color: #aaa;
}
</style>
