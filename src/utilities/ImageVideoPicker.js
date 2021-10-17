import * as ImagePicker from 'expo-image-picker';

const MEDIA_OPTIONS = {
  Images: {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  },
  Videos: {
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
  },
};

export default function ImageVideoPicker(media) {
  return async (aspect) => {
    let file = null;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        ...MEDIA_OPTIONS[media],
        ...(aspect ?? { aspect }),
      });

      if (!result.cancelled) file = await result;
    } catch (e) {
      const msg = e;
    }
    return file;
  };
}
