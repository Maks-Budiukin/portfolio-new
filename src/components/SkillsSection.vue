<template>
    <div ref="skills" class="flex justify-center items-center">
        <div class="w-full px-5 py-6 xl:py-10 2xl:py-20 md:px-6 lg:w-[1000px] xl:w-[1240px] 2xl:w-[1520px]">

            <div class="mb-8">
                <h2 class="font-semibold text-5xl text-white">My skills</h2>
            </div>

            <!-- <div class="grid grid-rows-2 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 text-white text-xl"> -->
            <Transition name="list"
                class="grid grid-rows-2 grid-cols-2 sm:grid-cols-4 xl:grid-cols-6 gap-4 text-white text-xl">
                <div v-if="true" class="max-h-[400px]">
                    <div v-for="skill in shownSkills" :key="skill.name"
                        class="col-span-1 w-full min-w-[100px] lg:min-w-[180px] flex flex-col items-center justify-center bg-[#3D3E42] hover:bg-[#F0BF6C99] duration-300 rounded-lg p-4">

                        <div class="w-[50px] lg:w-[100px] mb-4">
                            <img :src="skill.icon" alt="skill icon">
                        </div>
                        <div>
                            <p>{{ skill.name }}</p>
                        </div>
                    </div>
                </div>
            </Transition>

            <!-- </div> -->
            <div class="flex justify-end text-white fill-[#FFFFFF] hover:text-[#F0BF6C] hover:fill-[#F0BF6C] duration-300 items-center cursor-pointer"
                @click="showMore = !showMore">
                <ArrowRight size="12" class="mt-1" :class="showMore ? '-rotate-90 mr-2' : ' order-1 ml-2 rotate-90'" />

                <p v-if="!showMore" class=" text-base font-medium">More</p>
                <p v-else class=" text-base font-medium ">Less</p>

            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import ArrowRight from './icons/ArrowRight.vue';

const showMore = ref(false)

const skills = [
    { name: "React", icon: "/images/skills/react.png" },
    { name: "Mongo DB", icon: "/images/skills/mongo.png" },
    { name: "Redux", icon: "/images/skills/redux.png" },
    { name: "Vue", icon: "/images/skills/vue.png" },
    { name: "Sequelize", icon: "/images/skills/sequelize.png" },
    { name: "Typescript", icon: "/images/skills/ts.png" },
    { name: "REST api", icon: "/images/skills/restapi.png" },
    { name: "Git", icon: "/images/skills/git.png" },
    { name: "HTML + CSS", icon: "/images/skills/htmlcss.png" },
    { name: "Node.js", icon: "/images/skills/nodejs.png" },
    { name: "Nest JS", icon: "/images/skills/nestjs.png" },
    { name: "Javascript", icon: "/images/skills/js.png" }
];
const minXl = ref(false)

const shownSkills = computed(() => {
    if (!showMore.value & minXl.value) {
        return skills.slice(0, 6)
    } else if (!showMore.value & !minXl.value) {
        return skills.slice(0, 4)
    }
    return skills
})

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
})

watch(screenWidth, (val) => {
    if (val >= 1280) {
        minXl.value = true
    } else {
        minXl.value = false
    }
})

</script>

<style lang="scss" scoped>
.list-enter-active,
.list-leave-active {
    transition: max-height .5s;
}

.list-enter-from,
.list-leave-to {
    max-height: 0;
}
</style>