<script lang="ts">
import { mapActions, mapState } from 'pinia'
import { defineComponent } from 'vue'
import { useTypingStore } from '@/stores/typing'

export default defineComponent({
    name: 'GeneratedText',
    data: () => ({
        text: 'Lorem ipsum mister generator',
    }),
    async mounted() {
        this.resetStates()
        this.text =
            "It's an undeniable fact, really; deathful raies show us how plaies can be denims. We can assume that any instance of a goose can be construed as a proscribed button. A pull is a closet from the right perspective. The first clingy editor is, in its own way, a clam."

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
        async getText() {
            try {
                const re = await fetch('http://metaphorpsum.com/paragraphs/1')

                if (!re || re.status !== 200) {
                    return ''
                }

                return re.text()
            } catch (e) {
                console.error(e)

                return ''
            }
        },
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
