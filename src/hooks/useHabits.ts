import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Habito {
  id: string;
  nombre: string;
  emoji: string;
  racha: number;
  completado: boolean;
}

const STORAGE_KEY = '@habitos_diarios';

const HABITOS_INICIALES: Habito[] = [
  { id: '1', nombre: 'Leer', emoji: '📖', racha: 12, completado: false },
  { id: '2', nombre: 'Hidratación', emoji: '💧', racha: 25, completado: true },
  { id: '3', nombre: 'Meditar', emoji: '🧘', racha: 8, completado: false },
  { id: '4', nombre: 'Ejercicio', emoji: '💪', racha: 20, completado: true },
  { id: '5', nombre: 'Escribir', emoji: '✍️', racha: 5, completado: false },
];

export function useHabits() {
  const [habitos, setHabitos] = useState<Habito[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarHabitos = async () => {
      try {
        const datosGuardados = await AsyncStorage.getItem(STORAGE_KEY);
        if (datosGuardados) {
          setHabitos(JSON.parse(datosGuardados));
        } else {
          setHabitos(HABITOS_INICIALES);
        }
      } catch (error) {
        console.error('Error al cargar hábitos:', error);
        setHabitos(HABITOS_INICIALES);
      } finally {
        setCargando(false);
      }
    };
    cargarHabitos();
  }, []);

  useEffect(() => {
    if (!cargando) {
      const guardarHabitos = async () => {
        try {
          await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(habitos));
        } catch (error) {
          console.error('Error al guardar hábitos:', error);
        }
      };
      guardarHabitos();
    }
  }, [habitos, cargando]);

  const toggleHabito = useCallback((id: string) => {
    setHabitos((prev) =>
      prev.map((h) =>
        h.id === id
          ? {
              ...h,
              completado: !h.completado,
              racha: h.completado ? h.racha - 1 : h.racha + 1,
            }
          : h
      )
    );
  }, []);

  const agregarHabito = useCallback((nombre: string, emoji: string) => {
    const nuevo: Habito = {
      id: Date.now().toString(),
      nombre,
      emoji,
      racha: 0,
      completado: false,
    };
    setHabitos((prev) => [...prev, nuevo]);
  }, []);

  const completados = habitos.filter((h) => h.completado).length;
  const total = habitos.length;
  const porcentaje = total > 0 ? Math.round((completados / total) * 100) : 0;

  return {
    habitos,
    cargando,
    toggleHabito,
    agregarHabito,
    completados,
    total,
    porcentaje,
  };
}