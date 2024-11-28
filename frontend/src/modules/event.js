// event.js
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const timeline = () => {
  const route = useRoute();

  const documentID = computed(() => route.params.id);
  const state = ref({
    events: [],
  });

  // Read all documents - GET
  const getAllEvents = async () => {
    try {
      const response = await fetch(
        "https://slavic-media-2-0.onrender.com/event/"
      );
      const data = await response.json();
      state.value.events = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllEvents,
    documentID,
  };
};

export default timeline;
