import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const useImgCrud = () => {
  const route = useRoute();
  const router = useRouter();

  const documentID = computed(() => route.params.id);
  const state = ref({
    newLargeURL: "",
    newThumbnailURL: "",
    newWidth: 0,
    newHeight: 0,
    newFlag: "",
    newTitle: "",
    newAlt: "",
    newCategory: "",
    newColumn: 0,
    newClient: "",
    photos: [],
  });

  const getAllImg = async () => {
    try {
      const response = await fetch("https://api.slavic.media/img/");
      const data = await response.json();
      console.log("Fetched data:", data); // Add this line

      state.value.photos = data;
    } catch (error) {
      console.error(error);
    }
  };

  const newImg = async () => {
    if (
      !state.value.newLargeURL ||
      !state.value.newThumbnailURL ||
      !state.value.newWidth ||
      !state.value.newHeight ||
      !state.value.newFlag ||
      !state.value.newTitle ||
      !state.value.newAlt ||
      !state.value.newCategory ||
      !state.value.newClient
    ) {
      console.error("All fields must be filled out");
      return;
    }
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          largeURL: state.value.newLargeURL,
          thumbnailURL: state.value.newThumbnailURL,
          width: state.value.newWidth,
          height: state.value.newHeight,
          flag: state.value.newFlag,
          title: state.value.newTitle,
          alt: state.value.newAlt,
          category: state.value.newCategory,
          column: state.value.newColumn,
          client: state.value.newClient,
        }),
      };

      const response = await fetch(
        "https://api.slavic.media/img/",
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to add new photo");
      }

      await getAllImg();
    } catch (error) {
      console.error("Error adding new photo:", error);
    }
  };

  const deleteImg = async (img) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
      };
      const response = await fetch(
        `https://api.slavic.media/img/${img.id}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Failed to delete photo");
      }

      await getAllImg();
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  const editImg = async () => {
    try {
      if (!documentID.value) {
        throw new Error("No ID provided");
      }
      if (
        !state.value.newLargeURL ||
        !state.value.newThumbnailURL ||
        !state.value.newWidth ||
        !state.value.newHeight ||
        !state.value.newFlag ||
        !state.value.newTitle ||
        !state.value.newAlt ||
        !state.value.newCategory ||
        !state.value.newClient
      ) {
        console.error("All fields must be filled out");
        return;
      }

      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.lsToken,
        },
        body: JSON.stringify({
          largeURL: state.value.newLargeURL,
          thumbnailURL: state.value.newThumbnailURL,
          width: state.value.newWidth,
          height: state.value.newHeight,
          flag: state.value.newFlag,
          title: state.value.newTitle,
          alt: state.value.newAlt,
          category: state.value.newCategory,
          column: state.value.newColumn,
          client: state.value.newClient,
        }),
      };

      const url = "https://api.slavic.media/img/" + documentID.value;
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error("Failed to edit photo");
      }

      router.push("/photos");
    } catch (error) {
      console.error("Error editing photo:", error);
    }
  };

  const img = ref({});
  const getSpecificImg = async (documentID) => {
    try {
      const response = await fetch(
        `https://api.slavic.media/img/${documentID}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch photo with ID: ${documentID}`);
      }
      const data = await response.json();
      img.value = data;
    } catch (error) {
      console.error(error);
    }
  };

  return {
    state,
    getAllImg,
    newImg,
    deleteImg,
    getSpecificImg,
    img,
    documentID,
    editImg,
  };
};

export default useImgCrud;