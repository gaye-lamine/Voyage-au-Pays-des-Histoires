<template>
  <div class="max-w-2xl mx-auto text-center">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-4xl font-bold text-purple-800 mb-6">
        Félicitations ! 🎉
      </h1>
      <p class="text-xl text-gray-700 mb-8">
        Tu as terminé cette partie de l'histoire avec succès !
      </p>
      <div class="space-y-4">
        <button
          class="bg-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
          @click="navigateTo('/')"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  </div>
</template>