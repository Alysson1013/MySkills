import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList
} from 'react-native'
import { Button } from '../components/Button';
import { SkillCard } from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date?: Date;
}

export function Home() {

  const [newSkill, setNewSkill] = React.useState('')
  const [mySkills, setMySkills] = React.useState<SkillData[]>([])

  function handleAddSkill(): void {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill
    }


    //oldState: dados anteriores
    //newSkill: skill a ser adiconada
    setMySkills(oldState => [...oldState, data])
  }

  function handleRemoveSkill(id: string){
    setMySkills(oldState => oldState.filter(
      skill => skill.id !== id
    ));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, Alysson</Text>
      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
      />
      <Button onPress={handleAddSkill} activeOpacity={0.7} title="Add" />
      <Text style={[styles.title, { margin: 50 }]}>
        My Skills
      </Text>
      <FlatList 
        data={mySkills}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <SkillCard 
            skill={item.name} 
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121015',
    paddingHorizontal: 30,
    paddingVertical: 70,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#FFF',
    fontSize: 18,
    padding: Platform.OS === 'ios' ? 15 : 12,
    marginTop: 30,
    borderRadius: 7
  },
  greetings: {
    color: '#fff'
  }
})