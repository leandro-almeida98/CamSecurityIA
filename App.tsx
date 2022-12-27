// @ts-nocheck
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import RNFS from "react-native-fs";
import ViewShot from "react-native-view-shot";
import { Button } from "react-native";

export default function App() {
  const handleCapture = async () => {
    try {
      const filePath = `${RNFS.DocumentDirectoryPath}/face.jpg`;
      const options = { quality: 0.5, base64: true };
      const data = await this.refs.viewShot.capture(options);
      await RNFS.writeFile(filePath, data, "base64");
      console.log(`Salvou em: ${filePath}`);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFacesDetected = async ({ faces }) => {
    if (faces.length > 0) {
      // Tirar uma foto da tela
      await this.refs.viewShot.capture();

      // Obtenha a primeira face detectada
      const face = faces[0];

      // Calcule as coordenadas e o tamanho do quadrado em volta da face
      const {
        bounds: {
          origin: { x, y },
          size: { width, height },
        },
      } = face;

      // Exiba o quadrado em volta da face usando um componente View
      return (
        <View
          style={{
            position: "absolute",
            borderWidth: 2,
            borderColor: "#FFD700",
            left: x,
            top: y,
            width,
            height,
          }}
        />
      );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app!</Text>
      {/* <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.front}
        faceDetectionClassifications={
          RNCamera.Constants.FaceDetection.Classifications.all
        }
        faceDetectionLandmarks={RNCamera.Constants.FaceDetection.Landmarks.all}
        onFacesDetected={handleFacesDetected}
      >
        <ViewShot ref="viewShot" captureMode="mount" />
      </RNCamera> */}
      {/* <Button title="Salvar imagem" onPress={handleCapture} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {},
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
