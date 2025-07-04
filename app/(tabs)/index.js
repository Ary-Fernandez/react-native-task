// app/(tabs)/index.js
import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

//
// ——— Constantes de Diseño ———
//
const { width } = Dimensions.get('window');

const Colors = {
  background: '#1E1E1E',
  dotInactive: '#555',
  dotActive: '#2E86AB',
  primary: '#FFF',
  shadow: '#000',
};

const Spacing = {
  xs: 4,
  s: 8,
  m: 16,
  l: 24,
  xl: 32,
};

const FontSize = {
  subtitle: 18,
  body: 14,
};

//
// ——— Datos de ejemplo ———
//

// Ancho tarjeta del carrusel = ancho pantalla – 2×spacing
const CARD_WIDTH = width - Spacing.m * 2;

// Colores del carrusel (y ahora del grid)
const gradients = [
  ['#4e54c8', '#8f94fb'], // 1. violeta–azul
  ['#11998e', '#38ef7d'], // 2. verde
  ['#fc4a1a', '#f7b733'], // 3. naranja
  ['#e52d27', '#b31217'], // 4. rojo intenso
];

const carouselItems = [
  { id: '1', title: 'Hoy: 3 tareas',   colors: gradients[0] },
  { id: '2', title: 'Eventos: 2',      colors: gradients[1] },
  { id: '3', title: 'Recordatorios',   colors: gradients[2] },
];

const gridItems = [
  { id: 'a', title: 'Últimas tareas',       icon: 'time-outline',            colors: gradients[0] },
  { id: 'b', title: 'Pendientes',           icon: 'clipboard-outline',       colors: gradients[1] },
  { id: 'c', title: 'Completadas',          icon: 'checkmark-done-outline', colors: gradients[2] },
  { id: 'd', title: 'Próximas',             icon: 'calendar-outline',        colors: gradients[3] },
];

//
// ——— Componente Principal ———
//
export default function HomeScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const listRef = useRef(null);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { x: new Animated.Value(0) } } }],
    {
      useNativeDriver: false,
      listener: e => {
        const idx = Math.round(
          e.nativeEvent.contentOffset.x / (CARD_WIDTH + Spacing.m)
        );
        setActiveIndex(idx);
      },
    }
  );

  return (
    <SafeAreaView style={styles.safe}>
      {/* — Carrusel con Gradientes — */}
      <FlatList
        ref={listRef}
        data={carouselItems}
        horizontal
        snapToAlignment="start"
        snapToInterval={CARD_WIDTH + Spacing.m}
        decelerationRate="fast"
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: Spacing.m }}
        keyExtractor={i => i.id}
        onScroll={onScroll}
        scrollEventThrottle={16}
        renderItem={({ item }) => (
          <LinearGradient
            colors={item.colors}
            start={[0, 0]}
            end={[1, 1]}
            style={styles.carouselCard}
          >
            <Text style={styles.carouselText}>{item.title}</Text>
          </LinearGradient>
        )}
      />

      {/* — Indicadores (dots) — */}
      <View style={styles.dotsContainer}>
        {carouselItems.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* — Grid 2×2 con MISMO Gradiente — */}
      <View style={styles.gridContainer}>
        {gridItems.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.gridCard}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={item.colors}
              start={[0, 0]}
              end={[0, 1]}
              style={styles.gridGradient}
            >
              <Ionicons
                name={item.icon}
                size={32}
                color={Colors.primary}
                style={styles.gridIcon}
              />
              <Text style={styles.gridText}>{item.title}</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

//
// ——— Estilos ———
//
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: Platform.OS === 'ios' ? Spacing.l : Spacing.m,
  },

  /* — Carrusel — */
  carouselCard: {
    width: CARD_WIDTH,
    height: CARD_WIDTH * 0.45,
    marginRight: Spacing.m,
    borderRadius: 12,
    padding: Spacing.l,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  carouselText: {
    color: '#FFF',
    fontSize: FontSize.subtitle,
    fontWeight: '600',
    textAlign: 'center',
  },

  /* — Dots — */
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: Spacing.s / 2,
    marginBottom: Spacing.l,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.dotInactive,
    marginHorizontal: Spacing.xs,
  },
  dotActive: {
    backgroundColor: Colors.dotActive,
  },

  /* — Grid 2×2 — */
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.m,
    marginTop: -Spacing.s, // levantar un pelín la grilla
  },
  gridCard: {
    width: (width - Spacing.m * 4) / 2,
    height: 120,
    borderRadius: 12,
    marginBottom: Spacing.l,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  gridGradient: {
    flex: 1,
    padding: Spacing.m,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridIcon: {
    marginBottom: Spacing.s,
  },
  gridText: {
    color: '#FFF',
    fontSize: FontSize.body,
    textAlign: 'center',
  },
});
