import { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useHabits } from '@/hooks/useHabits';
import { HabitoItem } from '@/components/HabitoItem';
import { ProgresoBarra } from '@/components/ProgresoBarra';
import { ResumenSemanal } from '@/components/ResumenSemanal';

export default function HomeScreen() {
  const {
    habitos,
    cargando,
    toggleHabito,
    agregarHabito,
    completados,
    total,
    porcentaje,
  } = useHabits();

  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoEmoji, setNuevoEmoji] = useState('⭐');

  if (cargando) {
    return (
      <View style={styles.cargaContainer}>
        <ActivityIndicator size="large" color="#C4D600" />
      </View>
    );
  }

  const abrirModal = () => {
    setNuevoNombre('');
    setNuevoEmoji('⭐');
    setModalVisible(true);
  };

  const confirmarAgregar = () => {
    if (nuevoNombre.trim()) {
      agregarHabito(nuevoNombre.trim(), nuevoEmoji || '⭐');
      setModalVisible(false);
    }
  };

  const EMOJIS = ['⭐', '📖', '💧', '🧘', '💪', '✍️', '🏃', '🎯', '🍎', '😴'];

  return (
    <SafeAreaView style={styles.contenedor}>
      <FlatList
        data={habitos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitoItem
            emoji={item.emoji}
            nombre={item.nombre}
            racha={item.racha}
            completado={item.completado}
            onToggle={() => toggleHabito(item.id)}
          />
        )}
        ListHeaderComponent={
          <>
            <View style={styles.encabezado}>
              <Text style={styles.titulo}>Mi Rutina</Text>
              <Text style={styles.subtitulo}>¡Mantente constante!</Text>
            </View>

            <View style={styles.progresoContainer}>
              <ProgresoBarra
                porcentaje={porcentaje}
                completados={completados}
                total={total}
              />
            </View>

            <Text style={styles.seccionTitulo}>Tus Hábitos</Text>
          </>
        }
        ListFooterComponent={
          <>
            <ResumenSemanal />
            <TouchableOpacity style={styles.botonAgregar} onPress={abrirModal}>
              <Text style={styles.botonTexto}>AGREGAR NUEVO HÁBITO</Text>
              <Ionicons name="add-circle" size={22} color="#1C1C1E" />
            </TouchableOpacity>
          </>
        }
        contentContainerStyle={styles.listaContenido}
        showsVerticalScrollIndicator={false}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContenido}>
            <Text style={styles.modalTitulo}>Nuevo Hábito</Text>
            <Text style={styles.modalSubtitulo}>
              ¿Qué hábito quieres agregar?
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Ej: Correr 20 min"
              placeholderTextColor="#8E8E93"
              value={nuevoNombre}
              onChangeText={setNuevoNombre}
              autoFocus
            />

            <Text style={styles.labelEmoji}>Elige un ícono:</Text>
            <View style={styles.emojiRow}>
              {EMOJIS.map((e) => (
                <TouchableOpacity
                  key={e}
                  onPress={() => setNuevoEmoji(e)}
                  style={[
                    styles.emojiBoton,
                    nuevoEmoji === e && styles.emojiBotonActivo,
                  ]}
                >
                  <Text style={styles.emojiTexto}>{e}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.botonesRow}>
              <TouchableOpacity
                style={[styles.botonModal, styles.botonCancelar]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.botonCancelarTexto}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.botonModal, styles.botonConfirmar]}
                onPress={confirmarAgregar}
              >
                <Text style={styles.botonConfirmarTexto}>Agregar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, backgroundColor: '#1C1C1E' },
  cargaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  listaContenido: { paddingHorizontal: 16, paddingBottom: 30 },
  encabezado: { marginTop: 10, marginBottom: 10 },
  titulo: { color: '#FFFFFF', fontSize: 26, fontWeight: 'bold' },
  subtitulo: { color: '#8E8E93', fontSize: 14, marginTop: 4 },
  progresoContainer: { alignItems: 'center' },
  seccionTitulo: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  botonAgregar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C4D600',
    borderRadius: 30,
    paddingVertical: 16,
    marginTop: 20,
    gap: 8,
  },
  botonTexto: {
    color: '#1C1C1E',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContenido: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#2C2C2E',
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  modalTitulo: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  modalSubtitulo: { color: '#8E8E93', fontSize: 14, marginBottom: 18 },
  input: {
    backgroundColor: '#1C1C1E',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#FFFFFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  labelEmoji: {
    color: '#8E8E93',
    fontSize: 13,
    marginTop: 18,
    marginBottom: 10,
  },
  emojiRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  emojiBoton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#1C1C1E',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  emojiBotonActivo: {
    borderColor: '#C4D600',
    backgroundColor: '#2A2E1A',
  },
  emojiTexto: { fontSize: 20 },
  botonesRow: {
    flexDirection: 'row',
    gap: 10,
  },
  botonModal: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  botonCancelar: {
    backgroundColor: '#1C1C1E',
    borderWidth: 1,
    borderColor: '#3A3A3C',
  },
  botonCancelarTexto: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
  botonConfirmar: { backgroundColor: '#C4D600' },
  botonConfirmarTexto: { color: '#1C1C1E', fontSize: 15, fontWeight: 'bold' },
});