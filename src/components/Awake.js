import { NativeModules } from 'react-native';

export default KeepAwake = {
    activate: () => {
        NativeModules.KCKeepAwake.activate();
    },
    deactivate: () => {
        NativeModules.KCKeepAwake.deactivate();
    }
}