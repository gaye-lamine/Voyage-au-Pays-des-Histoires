<template>
  <div class="max-w-2xl mx-auto">
    <h2 class="text-3xl font-bold text-purple-800 mb-6 text-center">
      Crée ton Personnage
    </h2>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <form @submit.prevent="createCharacter" class="space-y-6">
        <div>
          <label class="block text-gray-700 mb-2" for="name">Ton nom de héros</label>
          <input
            id="name"
            v-model="character.name"
            type="text"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
            required
          >
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Choisis ton avatar</label>
          <div class="grid grid-cols-3 gap-4">
            <button
              v-for="avatar in avatars"
              :key="avatar.id"
              type="button"
              :class="[
                'p-4 border-2 rounded-lg',
                character.avatarId === avatar.id
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-200'
              ]"
              @click="selectAvatar(avatar.id)"
            >
              {{ avatar.emoji }}
            </button>
          </div>
        </div>

        <button
          type="submit"
          class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
        >
          Commencer l'Aventure
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const character = ref({
  name: '',
  avatarId: null
})

const avatars = [
  { id: 1, emoji: '👦' },
  { id: 2, emoji: '👧' },
  { id: 3, emoji: '🧙‍♂️' },
  { id: 4, emoji: '🧙‍♀️' },
  { id: 5, emoji: '🦸‍♂️' },
  { id: 6, emoji: '🦸‍♀️' }
]

const selectAvatar = (id) => {
  character.value.avatarId = id
}

const createCharacter = () => {
  if (character.value.name && character.value.avatarId) {
    gameStore.saveCharacter({
      name: character.value.name,
      avatarId: character.value.avatarId
    })
    navigateTo('/story')
  }
}
</script>