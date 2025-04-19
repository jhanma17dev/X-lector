<template>
  <div class="mask-opacity diagnosis-results overflow-scroll no-scrollbar flex flex-col">
    <!-- Conclusions Section -->
    <DiagnosisCard title="Conclusions">
      <ul class="list-disc list-outside pl-4">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores distinctio recusandae
          beatae nemo laboriosam molestiae quasi?
          <span class="underline bg-error/50 text-error-content">Commodi quo quos itaque</span>
          natus sit ipsum dolorum temporibus error. Optio excepturi quas quod!
        </li>
        <br />
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          <span class="underline bg-warning/50 text-warning-content">Maiores distinctio recusandae beatae</span>
          nemo laboriosam molestiae quasi? Commodi quo quos itaque natus sit ipsum dolorum
          temporibus error. Optio excepturi quas quod!
        </li>
      </ul>
    </DiagnosisCard>

    <!-- Suggestions Section -->
    <DiagnosisCard title="Suggestions">
      <!-- First suggestion -->
      <div class="flex">
        <div
          class="flex min-w-[64px] min-h-[64px] w-[64px] h-[64px] rounded-lg bg-primary/30 items-center justify-center relative">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
            fill="#7dc8c2">
            <path
              d="m826-585-42-42 45-45-157-157-45 45-43-43 30-31q23-23 57-22.5t57 23.5l129 129q23 23 23 56.5T857-615l-31 30ZM346-104q-23 23-56.5 23T233-104L90-247q-17-17.38-17-42.69T90-332l44-44 43 42-45 45 157 157 45-45 42 43-30 30Zm397-308 85-85-331-331-85 85 331 331ZM463-132l86-86-331-331-86 86 331 331Zm9-248 109-109-92-92-109 109 92 92Zm33 290q-16.93 17-41.97 17Q438-73 421-90L90-421q-17-16.93-17-41.97Q73-488 90-505l85-86q17.38-17 42.69-17T260-591l77 77 110-110-77-77q-17-16.93-17-41.97Q353-768 370-785l85-86q17.38-17 42.69-17T540-871l331 331q17 17.38 17 42.69T871-455l-86 85q-16.93 17-41.97 17Q718-353 701-370l-77-77-110 110 77 77q17 17.38 17 42.69T591-175l-86 85Z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#f59b08" class="absolute -top-2 -right-2 m-auto">
            <path
              d="m48-144 432-720 432 720H48Zm431.79-120q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM444-384h72v-192h-72v192Z" />
          </svg>
        </div>

        <div class="flex flex-col ml-4">
          <span class="text-sm font-semibold">Lorem ipsum dolor sit amet</span>
          <span class="text-xs text-neutral mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Delectus vel reprehenderit
            accusantium ad corporis! Sunt fugiat voluptatem quisquam molestiae quas temporibus
            animi eius voluptates modi consectetur illum itaque, reprehenderit cumque?</span>
        </div>
      </div>

      <!-- Second suggestion -->
      <div class="flex mt-8">
        <div
          class="flex min-w-[64px] min-h-[64px] w-[64px] h-[64px] rounded-lg bg-primary/30 items-center justify-center relative">
          <svg xmlns="http://www.w3.org/2000/svg" height="40px" viewBox="0 -960 960 960" width="40px"
            fill="#7dc8c2">
            <path
              d="M533-96q-97.62 0-166.31-68.98Q298-233.97 298-332v-30q-85-11-143.5-74.5T96-588v-228h120v-48h72v168h-72v-48h-48v156.46q0 64.54 45.5 110.04T324-432q65 0 110.5-45.5T480-587.54V-744h-48v48h-72v-168h72v48h120v228q0 84.35-51.5 146.67Q449-379 370-364v33q0 67.92 47.5 115.46Q465-168 533-167q68-1 115.5-48.54T696-331v-59.37Q659-401 635.5-432T612-504q0-50 35-85t85-35q50 0 85 35t35 85q0 41-23.5 72T768-390v58q0 97.62-69 166.31T533-96Z" />
          </svg>

          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
            fill="#f42423" class="absolute -top-2 -right-2 m-auto">
            <path
              d="M479.79-300q15.21 0 25.71-10.29t10.5-25.5q0-15.21-10.29-25.71t-25.5-10.5q-15.21 0-25.71 10.29t-10.5 25.5q0 15.21 10.29 25.71t25.5 10.5ZM444-432h72v-240h-72v240ZM341-144 144-342v-277l197-197h278l197 197v278L618-144H341Z" />
          </svg>
        </div>

        <div class="flex flex-col ml-4">
          <span class="text-sm font-semibold">Lorem ipsum dolor sit amet</span>
          <span class="text-xs text-neutral mt-1">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Delectus vel reprehenderit
            accusantium ad corporis! Sunt fugiat voluptatem quisquam molestiae quas temporibus
            animi eius voluptates modi consectetur illum itaque, reprehenderit cumque?</span>
        </div>
      </div>
    </DiagnosisCard>
  </div>

  <!-- Chat input at the bottom -->
  <input 
    class="absolute bottom-0 w-full bg-base-300 rounded-2xl border border-neutral h-[40px] px-4"
    type="text" 
    placeholder="Ask something..."
  />
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import DiagnosisCard from '@/components/XRay/DiagnosisCard.vue'

defineProps({
  diagnosisData: {
    type: Object,
    default: () => ({
      conclusions: [],
      suggestions: []
    })
  }
})
</script>

<style scoped>
.diagnosis-results {
  height: calc(100vh - 4rem - 200px);
}

.no-scrollbar {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer and Edge */
}

.no-scrollbar::-webkit-scrollbar {
  display: none; /* Safari and Chrome */
}

.mask-opacity {
  -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0));
  -webkit-mask-size: 100%;
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: left top;

  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 90%, rgba(0, 0, 0, 0));
  mask-size: 100%;
  mask-repeat: no-repeat;
  mask-position: left top;
}
</style>