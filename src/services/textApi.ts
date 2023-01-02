export async function getText(): Promise<string | null> {
    try {
        const re = await fetch('http://metaphorpsum.com/paragraphs/1')

        if (!re || re.status !== 200) {
            return getRandomTextFromFeatched()
        }
        const text = await re.text()
        saveFetchedTextsInLocal(text)

        return text
    } catch (e) {
        console.error(e)

        return getRandomTextFromFeatched()
    }
}

const TEXTS_LS_KEY = 'fetched_texts_key'

function saveFetchedTextsInLocal(text: string) {
    const texts = localStorage.getItem(TEXTS_LS_KEY),
        newTexts = [text]

    if (texts?.length) {
        const savedTexts = JSON.parse(texts)
        newTexts.push(...savedTexts)
    }

    if (Array.isArray(newTexts)) {
        localStorage.setItem(TEXTS_LS_KEY, JSON.stringify(newTexts))
    }
}

function getRandomTextFromFeatched(): string | null {
    const texts = localStorage.getItem(TEXTS_LS_KEY)
    if (texts?.length) {
        const parsedTexts = JSON.parse(texts),
            randomIndex = Math.ceil(Math.random() * parsedTexts.length)

        return texts[randomIndex]
    }

    return null
}
