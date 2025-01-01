import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import BookListScreen from '../screens/BookListScreen';
import ProfileStackNavigator from '../screens/ProfileStackNavigator';
import { StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Books':
              iconName = 'book-outline';
              break;
            default:
              iconName = 'help-circle-outline';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#7a5c58',
        tabBarInactiveTintColor: '#bfa49a',
        headerStyle: styles.header,
        headerTitleStyle: styles.headerTitle,
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarBadge: 3,
          tabBarBadgeStyle: styles.badge,
        }}
      />
      <Tab.Screen name="Books" component={BookListScreen} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f5ebe0',
    borderTopWidth: 1,
    borderTopColor: '#d3c1b2',
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: -2 },
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  header: {
    backgroundColor: '#f5ebe0',
    borderBottomWidth: 1,
    borderBottomColor: '#d3c1b2',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  headerTitle: {
    color: '#7a5c58',
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.8,
  },
  badge: {
    backgroundColor: '#7a5c58',
    color: '#f5ebe0',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default TabNavigator;
