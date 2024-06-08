<template>
    <div>
        <div v-show="!open" class="">
            <div class="flex items-center">
                <div class="mb-4 mx-auto relative">

                    <ArrowButton :direction="'left'" size="32" shadow @click="onLeft(currentImageIndex - 1)"
                        class="sm:hidden" />

                    <div class="py-4 border-y-[2px] border-[#F0BF6C] sm:border-none">
                        <Transition :name="transitionName" mode="out-in">
                            <img v-if="currentImage" :key="currentImage" :src="`http://localhost:1337${currentImage}`"
                                alt="" class="w-full sm:rounded-lg cursor-pointer big-image" @click="handleOpenModal">
                        </Transition>

                    </div>

                    <ArrowButton size="32" shadow @click="onRight(currentImageIndex + 1)" class="sm:hidden" />

                </div>
            </div>

            <div class="hidden sm:flex items-center min-h-[148px] relative px-12">

                <ArrowButton :direction="'left'" size="24" @click="onLeft(currentImageIndex - 1)" />

                <div ref="carouselContainer" class="flex gap-2 overflow-x-scroll no-scrollbar " :class="initialOffset">
                    <div class="flex gap-[2px] items-center" :class="initialOffset">
                        <div v-for="(image, idx) in data" :key="image.id"
                            class="min-w-[200px] duration-300 border-[3px] rounded p-1 cursor-pointer"
                            :class="idx === currentImageIndex ? 'border-[#F0BF6C] min-w-[220px]' : 'border-transparent'">
                            <img :src="`http://localhost:1337${image.attributes.url}`" alt="" @click="changeImage(idx)"
                                class="rounded-sm">
                        </div>
                    </div>
                </div>

                <ArrowButton size="24" @click="onRight(currentImageIndex + 1)" />

            </div>
        </div>
        <CarouselModal :open="open" @close="open = false" :images="images"
            :currentImage="`http://localhost:1337${currentImage}`" v-model:index="currentImageIndex"
            @index="changeImage(index)" />
    </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, onUnmounted } from 'vue';
import CarouselModal from './CarouselModal.vue'
import ArrowButton from './ArrowButton.vue';

const props = defineProps({
    data: {
        type: Array,
        required: true
    }
})


// let images = []
// const images = ref([])

// const images = computed(() => {
//     const imgArray = []
//     if (rawImages.value.length > 1) {
//         const midIdx = Math.ceil(rawImages.value.length / 2)

//         imgArray.push(
//             ...rawImages.value.slice(-midIdx),
//             ...rawImages.value,
//             ...rawImages.value.slice(0, rawImages.value.length % 2 ? midIdx - 1 : midIdx),
//         )
//         // currentImageIndex.value = midIdx
//     }

//     return imgArray
// })

const currentImageIndex = ref(2)

const images = computed(() => {
    const imagesArray = [];
    props.data?.map(image => imagesArray.push(image.attributes.url))
    return imagesArray
})

// const setInitialImagesArray = () => {

//     if (rawImages.value.length > 1) {
//         const midIdx = Math.ceil(rawImages.value.length / 2)

//         images.value = [
//             ...rawImages.value.slice(-midIdx),
//             ...rawImages.value,
//             ...rawImages.value.slice(0, rawImages.value.length % 2 ? midIdx - 1 : midIdx),
//         ]
//         currentImageIndex.value = midIdx
//     }
// }

const currentImage = computed(() => {
    return images?.value[currentImageIndex.value]
})

// setInitialImagesArray()

const open = ref(false)

const handleOpenModal = () => {
    if (window.innerWidth >= 640) {
        open.value = true;
    }
}

const initialOffset = ref('')

const changeImage = (idx) => {
    if (idx === currentImageIndex.value) {
        return
    }

    else {
        if (idx > images.value.length - 1) {
            currentImageIndex.value = 0;
            activeImagePosition()
        }
        else if (idx < 0) {
            currentImageIndex.value = images.value.length - 1;
            activeImagePosition()
        }
        else {
            currentImageIndex.value = idx;
            activeImagePosition()
        }
    }
}

const transitionName = ref('fade')

const onRight = (idx) => {
    if (window.innerWidth < 640) {
        transitionName.value = 'right'
    } else {
        transitionName.value = 'fade'
    }

    if (idx > images.value.length - 1) {
        currentImageIndex.value = 0;
        activeImagePosition()

    } else {
        currentImageIndex.value = idx;
        activeImagePosition()
    }
}

const onLeft = (idx) => {
    if (window.innerWidth < 640) {
        transitionName.value = 'left'
    } else {
        transitionName.value = 'fade'
    }

    if (idx < 0) {
        currentImageIndex.value = images.value.length - 1;
        activeImagePosition()

    } else {
        currentImageIndex.value = idx;
        activeImagePosition()
    }
}


const carouselContainer = ref(null)

const activeImagePositionVal = computed(() => {
    return currentImageIndex.value * 200;
})

const activeImagePosition = () => {
    carouselContainer.value.scrollTo(activeImagePositionVal.value - (carouselContainer.value?.offsetWidth - 235) / 2, 0);
}

const screenWidth = ref(1920)

const handleResize = () => {
    screenWidth.value = window.innerWidth
}

onMounted(() => {
    handleResize()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    document.documentElement.style.overflow = 'auto'
})

watch(screenWidth, (val) => {
    if (val) {
        activeImagePosition()
    }
})

watch(open, (val) => {
    if (val) {
        document.documentElement.style.overflow = 'hidden'

        return
    }
    document.documentElement.style.overflow = 'auto'
    activeImagePosition()
})

</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.right-enter-active,
.right-leave-active,
.left-enter-active,
.left-leave-active {
    transition: transform 0.2s ease, opacity 0.3s ease-in-out;
}

.right-enter-from {
    opacity: 0;
    transform: translateX(100%);

}

.right-leave-to {
    opacity: 0;
    transform: translateX(-100%);

}

.left-enter-from {
    opacity: 0;
    transform: translateX(-100%);

}

.left-leave-to {
    opacity: 0;
    transform: translateX(100%);

}
</style>