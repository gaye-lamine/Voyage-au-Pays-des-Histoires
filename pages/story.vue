<template>
  <div class="max-w-4xl mx-auto">
    <!-- En-tête de l'histoire -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center space-x-4">
        <div class="w-12 h-12 flex items-center justify-center bg-purple-100 rounded-full text-2xl">
          {{ character?.avatarEmoji }}
        </div>
        <h2 class="text-2xl font-bold text-purple-800">{{ character?.name || 'Héros' }}</h2>
      </div>
      <div class="flex items-center space-x-4">
        <span class="text-gray-600">Chapitre {{ currentChapter + 1 }}</span>
        <button 
          class="bg-purple-100 p-2 rounded-full"
          @click="toggleAudio"
        >
          <span class="text-xl">{{ audioEnabled ? '🔊' : '🔇' }}</span>
        </button>
      </div>
    </div>

    <!-- Contenu de l'histoire -->
    <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div class="prose max-w-none mb-6">
        <p class="text-lg">{{ currentStoryContent }}</p>
      </div>

      <!-- Zone de compréhension -->
      <div v-if="showQuestion" class="mt-8 p-6 bg-purple-50 rounded-lg">
        <h3 class="text-xl font-semibold text-purple-800 mb-4">Question de compréhension</h3>
        <p class="text-gray-700 mb-4">{{ currentQuestion.question }}</p>
        <div class="space-y-3">
          <button
            v-for="(choice, index) in currentQuestion.choices"
            :key="index"
            class="w-full text-left p-4 rounded-lg border-2 transition"
            :class="[
              selectedAnswer === index 
                ? 'border-purple-500 bg-purple-50' 
                : 'border-gray-200 hover:border-purple-300'
            ]"
            @click="selectAnswer(index)"
          >
            {{ choice }}
          </button>
        </div>
        <button
          class="mt-6 w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
          :disabled="selectedAnswer === null"
          @click="checkAnswer"
        >
          Vérifier ma réponse
        </button>
      </div>

      <!-- Bouton pour continuer -->
      <div v-else class="mt-8">
        <button
          class="w-full bg-purple-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-purple-700 transition"
          @click="showComprehensionQuestion"
        >
          Continuer l'histoire
        </button>
      </div>
    </div>

    <!-- Barre de progression -->
    <div class="bg-white rounded-lg shadow p-4">
      <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
        <span>Progression</span>
        <span>{{ progressPercentage }}%</span>
      </div>
      <div class="h-2 bg-gray-200 rounded-full">
        <div 
          class="h-full bg-purple-500 rounded-full transition-all duration-500"
          :style="{ width: `${progressPercentage}%` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGameStore } from '~/stores/game'

const gameStore = useGameStore()
const character = computed(() => {
  if (!gameStore.character) return null
  const avatar = avatars.find(a => a.id === gameStore.character.avatarId)
  return {
    name: gameStore.character.name,
    avatarEmoji: avatar?.emoji
  }
})

// État local
const currentChapter = ref(0)
const showQuestion = ref(false)
const selectedAnswer = ref(null)
const audioEnabled = ref(false);


// Données de l'histoire
const story = [
  {
    content: "Il était une fois, dans un monde magique, un jeune héros qui rêvait de grandes aventures. Un matin, alors qu'il se promenait dans la forêt enchantée, il découvrit un mystérieux livre ancien...",
    question: {
      question: "Que trouve le héros dans la forêt ?",
      choices: [
        "Une épée magique",
        "Un livre ancien",
        "Une carte au trésor",
        "Une baguette magique"
      ],
      correctAnswer: 1
    }
  },
  {
    content: "Le héros ouvrit le livre et une lumière brillante en jaillit. Le livre lui indiqua le chemin vers une montagne lointaine. Après plusieurs jours de voyage, il arriva enfin devant la montagne mystérieuse.",
    question: {
      question: "Que fait le héros après avoir trouvé le livre ?",
      choices: [
        "Il rentre chez lui.",
        "Il part à la recherche d'une montagne.",
        "Il cherche un trésor.",
        "Il se repose sous un arbre."
      ],
      correctAnswer: 1
    }
  },
  {
    content: "Au sommet de la montagne, le héros rencontra un dragon géant. Ce dernier lui proposa un défi : résoudre une énigme pour obtenir un objet magique.",
    question: {
      question: "Qu'est-ce que le héros doit faire pour obtenir l'objet magique ?",
      choices: [
        "Battre le dragon en duel.",
        "Résoudre une énigme.",
        "Voler l'objet magique.",
        "Demander au dragon de lui donner l'objet."
      ],
      correctAnswer: 1
    }
  },
  {
    content: "Après avoir résolu l'énigme, le dragon donna au héros une clé magique qui ouvrait une porte vers un royaume secret. Le héros se lança dans une nouvelle aventure.",
    question: {
      question: "Que reçoit le héros du dragon ?",
      choices: [
        "Un anneau magique",
        "Une clé magique",
        "Une épée enflammée",
        "Un sort puissant"
      ],
      correctAnswer: 1
    }
  }
  // Tu peux ajouter plus de chapitres en suivant le même format.
]


const avatars = [
  { id: 1, emoji: '👦' },
  { id: 2, emoji: '👧' },
  { id: 3, emoji: '🧙‍♂️' },
  { id: 4, emoji: '🧙‍♀️' },
  { id: 5, emoji: '🦸‍♂️' },
  { id: 6, emoji: '🦸‍♀️' }
]

// Computed properties
const currentStoryContent = computed(() => story[currentChapter.value]?.content || '')
const currentQuestion = computed(() => story[currentChapter.value]?.question || {})
const progressPercentage = computed(() => 
  Math.round((currentChapter.value / story.length) * 100)
)

// Methods
const showComprehensionQuestion = () => {
  showQuestion.value = true
  selectedAnswer.value = null
}

const selectAnswer = (index) => {
  selectedAnswer.value = index
}

const checkAnswer = () => {
  if (selectedAnswer.value === currentQuestion.value.correctAnswer) {
    // Réponse correcte
    showQuestion.value = false
    currentChapter.value++
    gameStore.advanceChapter()
    
    // Vérifier si l'histoire est terminée
    if (currentChapter.value >= story.length) {
      // TODO: Afficher l'écran de fin
      navigateTo('/victory')
    }
  } else {
    // Réponse incorrecte
    selectedAnswer.value = null
    // TODO: Ajouter un feedback visuel pour la mauvaise réponse
  }
}

const toggleAudio = () => {
  audioEnabled.value = !audioEnabled.value;
  gameStore.settings.audioEnabled = audioEnabled.value;

  if (audioEnabled.value) {
    // Activer la lecture audio
    playAudio();
  } else {
    // Désactiver l'audio (par exemple, mettre en pause)
    stopAudio();
  }
};

const playAudio = () => {
  const synth = window.speechSynthesis;
  const text = "Bienvenue dans ton aventure !";
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
};

const stopAudio = () => {
  const synth = window.speechSynthesis;
  synth.cancel(); // Annule toute lecture en cours
};

// Navigation guards
onMounted(() => {
  // Rediriger vers la création de personnage si aucun personnage n'existe
  if (!gameStore.character) {
    navigateTo('/character-creation')
  }
})
</script>