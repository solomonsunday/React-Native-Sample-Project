import * as ImagePicker from 'expo-image-picker';

const MEDIA_OPTIONS = {
  Images: {
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  },
  Videos: {
    mediaTypes: ImagePicker.MediaTypeOptions.Videos,
    videoMaxDuration: 60,
  },
};

export default function ImageVideoCamera(media) {
  return async (aspect) => {
    let fileUri = null;

    try {
      const result = await ImagePicker.launchCameraAsync({
        ...MEDIA_OPTIONS[media],
        ...(aspect ?? { aspect }),
      });

      if (!result.cancelled) fileUri = await result.uri;
    } catch (e) {
      const msg = e;
    }
    return fileUri;
  };
}
