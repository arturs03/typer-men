import { defineStore } from 'pinia'

export const useTypingStore = defineStore('typing', {
    state: () => {
        return {
            text: '',
            typedTextSplit: [],
            currentWordIndex: 0,
        }
    },
    getters: {
        textSplitInWords: (state): Array<string> => state.text.split(' '),
        typedTextResults(state): Array<boolean> {
            if (!this.typedTextSplit.length) {
                return []
            }

            return this.typedTextSplit.map(
                (text: String, index: any): boolean => {
                    return state.textSplitInWords[index] === text
                }
            )
        },
    },
    actions: {
        setText(text: string) {
            this.text = text
        },
        setTypedText(typedText: Array<String>) {
            this.typedTextSplit = typedText
        },
        setCurrentWord(index: Number) {
            this.currentWordIndex = index
        },
        resetStates() {
            this.typedTextSplit = []
            this.currentWordIndex = 0
        },
    },
})
