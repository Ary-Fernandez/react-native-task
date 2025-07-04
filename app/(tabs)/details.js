// app/(tabs)/details.js
import { View, Text, StyleSheet } from 'react-native';

export default function DetailsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📄 Pantalla de Detalles</Text>
      <Text style={styles.text}>
        Aquí irá la información detallada de lo que elijas.  
        Esta es una pantalla secundaria.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex:1, backgroundColor:'#1E1E1E', padding:16, justifyContent:'center' },
  title:     { color:'#FFF', fontSize:22, marginBottom:12 },
  text:      { color:'#CCC', fontSize:16, lineHeight:24 }
});
