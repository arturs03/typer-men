<script lang="ts">
import { defineComponent } from 'vue'
import GeneratedText from './GeneratedText.vue'
import TypingInput from './TypingInput.vue'

export default defineComponent({ components: { GeneratedText, TypingInput } })
</script>

<template>
    <div id="typing-section" class="flex items-center flex-col h-full">
        <GeneratedText />
        <div class="flex h-full w-full items-center justify-center">
            <TypingInput class="w-4/5" />
        </div>
    </div>
</template>
