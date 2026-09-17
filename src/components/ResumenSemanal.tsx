import { View, Text, StyleSheet } from 'react-native';

const DIAS = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export function ResumenSemanal() {
  const datos = [60, 80, 45, 90, 70, 100, 55];

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Resumen Semanal</Text>
      <View style={styles.grafico}>
        {DIAS.map((dia, index) => (
          <View key={index} style={styles.columna}>
            <View style={styles.barraFondo}>
              <View
                style={[styles.barraRelleno, { height: `${datos[index]}%` }]}
              />
            </View>
            <Text style={styles.dia}>{dia}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#2C2C2E',
    borderRadius: 16,
    padding: 16,
    marginTop: 10,
  },
  titulo: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  grafico: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 80,
  },
  columna: { alignItems: 'center', flex: 1 },
  barraFondo: {
    width: 18,
    height: 60,
    backgroundColor: '#3A3A3C',
    borderRadius: 9,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barraRelleno: {
    width: '100%',
    backgroundColor: '#C4D600',
    borderRadius: 9,
  },
  dia: { color: '#8E8E93', fontSize: 12, marginTop: 4 },
});