import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  emoji: string;
  nombre: string;
  racha: number;
  completado: boolean;
  onToggle: () => void;
}

export function HabitoItem({ emoji, nombre, racha, completado, onToggle }: Props) {
  return (
    <View style={[styles.contenedor, completado && styles.contenedorCompletado]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.nombre}>{nombre}</Text>
      <View style={styles.rachaContainer}>
        <Text style={styles.fuego}>🔥</Text>
        <Text style={styles.rachaTexto}>{racha} días</Text>
      </View>
      <TouchableOpacity onPress={onToggle} style={styles.checkContainer}>
        <Ionicons
          name={completado ? 'checkmark-circle' : 'ellipse-outline'}
          size={28}
          color={completado ? '#C4D600' : '#555'}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  contenedorCompletado: {
    borderColor: '#C4D600',
    backgroundColor: '#2A2E1A',
  },
  emoji: { fontSize: 20, marginRight: 12 },
  nombre: { flex: 1, color: '#FFFFFF', fontSize: 16, fontWeight: '600' },
  rachaContainer: { flexDirection: 'row', alignItems: 'center', marginRight: 12 },
  fuego: { fontSize: 14, marginRight: 4 },
  rachaTexto: { color: '#8E8E93', fontSize: 13 },
  checkContainer: { padding: 4 },
});