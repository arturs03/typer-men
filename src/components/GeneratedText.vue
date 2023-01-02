<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useTypingStore } from '@/stores/typing'
import { getText } from '@/services/textApi'

export default defineComponent({
    name: 'GeneratedText',
    data: () => ({
        text: 'Lorem ipsum mister generator',
    }),
    async mounted() {
        this.resetStates()
        this.text = await getText()
        this.setText(this.text)
    },
    computed: {
        ...mapState(useTypingStore, [
            'textSplitInWords',
            'typedTextResults',
            'currentWordIndex',
        ]),
    },
    methods: {
        ...mapActions(useTypingStore, ['setText', 'resetStates']),
        getWordClass(index: any): String {
            if (this.currentWordIndex < index) {
                return 'text-neutral-400'
            }

            if (this.currentWordIndex === index) {
                return 'text-white font-bold'
            }

            if (!this.typedTextResults[index]) {
                return 'text-red-900'
            }

            return 'text-neutral-400 line-through'
        },
    },
})
</script>

<template>
    <div id="generated-text">
        <div class="flex flex-wrap">
            <div
                class="word mr-1"
                v-for="(word, i) in textSplitInWords"
                :key="i"
            >
                <span :class="getWordClass(i)" class="text-2xl">
                    {{ word }}
                </span>
            </div>
        </div>
    </div>
</template>
