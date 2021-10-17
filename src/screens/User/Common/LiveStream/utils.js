import { Platform } from "react-native";


const AppId_ANDROID ="5EBg3aLaeRJLXdPjZZEKAQ";
const AppId_IOS = "ISN0ixNKY5FJgrj326dD8w"

export const AppID = Platform.OS === "android" ? AppId_ANDROID : AppId_IOS;