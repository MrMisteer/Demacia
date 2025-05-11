<template>
    <div class="container">
      <h2>À propos de EcoCook</h2>
      <p>
        EcoCook est un projet web développé avec une démarche <strong>Green IT</strong> au cœur de ses choix techniques et éthiques.
        Notre objectif est de proposer une plateforme de cuisine durable, tout en réduisant l'impact environnemental du site lui-même.
      </p>
      <h3>Notre vision durable</h3>
      <ul>
        <li><strong>Réduire</strong> la pollution numérique en minimisant les ressources utilisées</li>
        <li><strong>Promouvoir</strong> les produits locaux et de saison</li>
        <li><strong>Informer</strong> les utilisateurs sur les enjeux environnementaux</li>
      </ul>
      <h3>Mesures Green IT appliquées</h3>
      <ul>
        <li>Technologies sobres : HTML/CSS simples, pas de framework inutile</li>
        <li>Optimisation des images et des ressources</li>
        <li>Navigation claire et légère</li>
        <li>Page inférieure à 1 Mo</li>
      </ul>
      <h3>Suivi de notre impact</h3>
      <p>
        Nous mesurons l'empreinte écologique du site avec des outils comme
        <a href="https://www.ecoindex.fr" target="_blank">EcoIndex</a> et
        <a href="https://www.websitecarbon.com" target="_blank">Website Carbon</a>.
      </p>
      <h3>Comment vous pouvez contribuer ?</h3>
      <ul>
        <li>Utilisez des produits locaux et de saison</li>
        <li>Partagez vos recettes écoresponsables</li>
        <li>Réduisez le gaspillage alimentaire</li>
      </ul>
      <p>Merci de faire partie du changement 🌱</p>
    </div>
  </template>
<script>
export default {
  name: 'AboutView'
}
</script>
  <style scoped>
  .container {
    padding: 40px;
    }
  h2, h3 {
    color: #2c3e50;
  }
  ul {
    padding-left: 20px;
  }
  p, li {
    line-height: 1.6;
  }
  a {
    color: #007BFF;
    text-decoration:underline;
  }
  </style>
