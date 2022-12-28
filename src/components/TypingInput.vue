<template>
    <div id="typing-input">
        <div class="flex">
            <p class="text-lg mb-4">Remaining time: {{ time.toFixed(2) }}</p>
            <p v-if="resultWPM" class="ml-auto">WPM: {{ resultWPM }}</p>
        </div>
        <input
            type="text"
            class="text-black w-full rounded drop-shadow-2xl p-4"
            placeholder="Start typing"
            :disabled="!time"
            v-model="currentWord"
            @keyup="onType"
            @keyup.space="moveToNextWord"
        />
    </div>
</template>

<script lang="ts">
import { useTypingStore } from '@/stores/typing'
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'TypingInput',
    data: () => ({
        typedText: [],
        currentWord: '',
        timer: 0,
        time: 20.0,
        resultWPM: 0,
    }),
    computed: {
        ...mapState(useTypingStore, [
            'textSplitInWords',
            'currentWordIndex',
            'typedTextResults',
        ]),
    },
    methods: {
        ...mapActions(useTypingStore, ['setTypedText', 'setCurrentWord']),
        onType() {
            if (this.currentWordIndex === 0 && !this.timer) {
                this.timer = setInterval(() => {
                    if (this.time <= 0.1) {
                        clearInterval(this.timer)
                        this.time = 0.0
                        this.resultWPM = this.getNetWPM()
                        return
                    }

                    this.time -= 0.1
                }, 100)
            }
        },
        moveToNextWord() {
            this.typedText.push(this.currentWord.trim())
            this.setTypedText(this.typedText)
            this.setCurrentWord(this.currentWordIndex + 1)
            this.currentWord = ''
        },
        getIncorrectAnswerCount() {
            return this.typedTextResults.reduce(
                (sum, answer) => (!answer ? sum + 1 : sum),
                0
            )
        },
        getGrossWPM(): number {
            return this.typedText.length / 5 / 0.25
        },
        getNetWPM(): number {
            return (
                (this.typedText.length / 5 - this.getIncorrectAnswerCount()) /
                0.25
            )
        },
    },
})
</script>
