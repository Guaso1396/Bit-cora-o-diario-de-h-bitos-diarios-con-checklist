import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface Props {
  porcentaje: number;
  completados: number;
  total: number;
}

export function ProgresoBarra({ porcentaje, completados, total }: Props) {
  const radio = 80;
  const grosor = 12;
  const centroX = radio + grosor;
  const centroY = radio + grosor;

  const angulo = (porcentaje / 100) * 180;
  const radianes = (angulo * Math.PI) / 180;
  const finX = centroX - radio * Math.cos(radianes);
  const finY = centroY - radio * Math.sin(radianes);

  const path = `M ${centroX - radio} ${centroY} A ${radio} ${radio} 0 0 1 ${finX} ${finY}`;

  return (
    <View style={styles.contenedor}>
      <Svg width={centroX * 2} height={centroY + 20}>
        <Path
          d={`M ${centroX - radio} ${centroY} A ${radio} ${radio} 0 0 1 ${centroX + radio} ${centroY}`}
          stroke="#3A3A3C"
          strokeWidth={grosor}
          fill="none"
          strokeLinecap="round"
        />
        {porcentaje > 0 && (
          <Path
            d={path}
            stroke="#C4D600"
            strokeWidth={grosor}
            fill="none"
            strokeLinecap="round"
          />
        )}
      </Svg>
      <View style={styles.textoOverlay}>
        <Text style={styles.porcentaje}>{porcentaje}%</Text>
        <Text style={styles.subtexto}>
          {completados}/{total} completados
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { alignItems: 'center', marginVertical: 20 },
  textoOverlay: {
    position: 'absolute',
    bottom: 10,
    alignItems: 'center',
  },
  porcentaje: { color: '#FFFFFF', fontSize: 28, fontWeight: 'bold' },
  subtexto: { color: '#8E8E93', fontSize: 14 },
});