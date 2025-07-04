// app/(tabs)/_layout.js
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerStyle:         { backgroundColor: '#1E1E1E' },
        headerTintColor:     '#FFF',
        tabBarStyle:         { backgroundColor: '#1E1E1E' },
        tabBarActiveTintColor:   '#2E86AB',
        tabBarInactiveTintColor: '#888',
        tabBarIcon: ({ color, size, focused }) => {
          const icons = {
            index:   'home',
            details: 'information-circle'
          };
          const iconName = icons[route.name] + (focused ? '' : '-outline');
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="index"   options={{ title: 'Inicio'  }} />
      <Tabs.Screen name="details" options={{ title: 'Detalles' }} />
    </Tabs>
  );
}
