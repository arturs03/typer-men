import { defineStore } from 'pinia'

export const useTypingStore = defineStore('typing', {
    state: () => {
        return {
            text: '',
            typedTextSplit: [] as Array<String>,
            currentWordIndex: 0,
        }
    },
    getters: {
        textSplitInWords: (state): Array<any> => state.text.split(' '),
        typedTextResults(): Array<boolean> {
            if (!this.typedTextSplit.length) {
                return []
            }

            return this.typedTextSplit.map(
                (text: String, index: any): boolean => {
                    return this.textSplitInWords[index] === text
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
        setCurrentWord(index: number) {
            this.currentWordIndex = index
        },
        resetStates() {
            this.typedTextSplit = []
            this.currentWordIndex = 0
        },
    },
})
