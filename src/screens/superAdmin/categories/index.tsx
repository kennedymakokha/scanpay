
import { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import { useTheme } from '../../../../contexts/themeContext';


const initialCategories = [
  { id: '1', name: 'Restaurants' },
  { id: '2', name: 'Retail' },
  { id: '3', name: 'Healthcare' },
  { id: '4', name: 'Education' },
];

export default function CategoryManager() {
  const { theme } = useTheme();
  const [categories, setCategories] = useState(initialCategories);
  const [selected, setSelected] = useState<{ id: string; name: string } | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editedName, setEditedName] = useState('');

  const openModal = (item: { id: string; name: string }) => {
    setSelected(item);
    setEditedName(item.name);
    setModalVisible(true);
  };

  const saveEdit = () => {
    if (!selected) return;
    const updated = categories.map((cat) =>
      cat.id === selected.id ? { ...cat, name: editedName } : cat
    );
    setCategories(updated);
    setModalVisible(false);
  };

  return (
    <View className="flex-1 bg-white dark:bg-black-50 px-4 py-14">
    
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => openModal(item)}
            className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl mb-3"
          >
            <Text className="text-lg text-gray-800 dark:text-white">{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Edit Modal */}
      <Modal transparent visible={modalVisible} animationType="slide">
        <View className="flex-1 justify-center min-h-[200px] items-center bg-black/50 px-4">
          <View className="w-full bg-white dark:bg-gray-900 rounded-2xl p-6">
            <Text className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              Edit Category
            </Text>

            <TextInput
              value={editedName}
              onChangeText={setEditedName}
              className="border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white px-4 py-2 rounded-xl mb-4 bg-gray-100 dark:bg-gray-800"
              placeholder="Category name"
              placeholderTextColor={theme === 'dark' ? '#aaa' : '#666'}
            />

            <View className="flex-row justify-end space-x-3">
              <Pressable onPress={() => setModalVisible(false)}>
                <Text className="text-red-500">Cancel</Text>
              </Pressable>
              <Pressable onPress={saveEdit}>
                <Text className="text-blue-600 font-semibold">Save</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
