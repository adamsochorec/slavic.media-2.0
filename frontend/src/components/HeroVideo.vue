<script setup>
import { onMounted } from "vue";
import { defineProps } from "vue";

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    default: "",
  },
  muted: {
    type: Boolean,
    default: false,
  },
  autoplay: {
    type: Boolean,
    default: false,
  },
  loop: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: "",
  },
});

// VIDEO OFFLOAD START
function videoOffload() {
  // Get all video elements with the "video-offload" class
  const videos = document.querySelectorAll(".video-offload");

  // Function to handle the Intersection Observer for a single video
  function handleVideoIntersection(video) {
    // Define the options for the Intersection Observer
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: "0px", // No margin
      threshold: 0.1, // 10% of the target element must be visible to trigger
    };

    // Callback function when the video enters or exits the viewport
    const callback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // The video is in the viewport, so play it and show controls
          video.play();
          video.removeAttribute("controls");
        } else {
          // The video is out of the viewport, so pause it and hide controls
          video.pause();
        }
      });
    };

    // Create an Intersection Observer with the specified options and callback for the current video
    const observer = new IntersectionObserver(callback, options);

    // Start observing the current video element
    observer.observe(video);
  }

  // Iterate over all video elements and apply the Intersection Observer
  videos.forEach((video) => {
    video.setAttribute("autoplay", "false"); // Disable autoplay initially

    // Apply Intersection Observer to the current video
    handleVideoIntersection(video);
  });
}

// Call videoOffload in onMounted hook
onMounted(() => {
  videoOffload();
});
</script>
<template>
  <article class="showcase">
    <div class="video-container">
      <video
        :src="src"
        :loop="loop"
        :autoplay="autoplay"
        :muted="muted"
        class="video-offload video-control"
        preload="auto"
        :aria-label="ariaLabel"
        aria-describedby="video"
        playsinline
        role="video"
        :poster="poster"
      ></video>
    </div>
  </article>
</template>

<style scoped>
.showcase {
  height: var(--dimension-1);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
}
.video-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: var(--dimension-1);
  overflow: hidden;
  background-position: center;
  background-size: cover;
  z-index: -1;
}
.video-container video {
  min-width: 100%;
  min-height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  object-fit: cover;
}
</style>
