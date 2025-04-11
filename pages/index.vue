<template>
  <div class="max-w-2xl mx-auto text-center">
    <h1 class="text-4xl font-bold text-purple-800 mb-6">
      Bienvenue dans LivreAventure !
    </h1>
    <p class="text-lg text-gray-700 mb-8">
      Commence ton aventure de lecture interactive
    </p>
    <div class="space-y-4">
      <button
        class="bg-purple-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
        @click="startNewAdventure"
      >
        Nouvelle Aventure
      </button>
      <div v-if="hasExistingGame" class="mt-4">
        <button
          class="bg-blue-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-blue-700 transition"
          @click="continueAdventure"
        >
          Continuer l'Aventure
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const hasExistingGame = computed(() => gameStore.character !== null)

const startNewAdventure = () => {
  navigateTo('/character-creation')
}

const continueAdventure = () => {
  navigateTo('/story')
}
</script>