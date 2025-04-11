import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    character: null,
    currentChapter: 0,
    progress: {
      wordsLearned: [],
      chaptersCompleted: [],
      badges: []
    },
    settings: {
      audioEnabled: true,
      parentalControls: false
    }
  }),
  
  actions: {
    saveCharacter(character) {
      this.character = character
    },
    
    advanceChapter() {
      this.currentChapter++
      this.progress.chaptersCompleted.push(this.currentChapter)
    },
    
    addLearnedWord(word) {
      if (!this.progress.wordsLearned.includes(word)) {
        this.progress.wordsLearned.push(word)
      }
    },
    
    earnBadge(badge) {
      if (!this.progress.badges.includes(badge)) {
        this.progress.badges.push(badge)
      }
    }
  },
  
  persist: true
})