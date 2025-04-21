import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Dimensions,
  StyleSheet,
  useColorScheme,
} from 'react-native';

type Option = {
  label: string;
  value: string | number;
};

type Props = {
  label?: string;
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number) => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;

const SelectInput: React.FC<Props> = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const theme = useColorScheme(); // 'light' or 'dark'

  const selectedLabel = options.find((opt) => opt.value === value)?.label || 'Select';

  const filtered = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const isDark = theme === 'dark';

  return (
    <View className="mb-4 z-10">
      {label && (
        <Text className={`text-sm mb-1 ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
          {label}
        </Text>
      )}

      <TouchableOpacity
        activeOpacity={1}
        className={`
          flex w-full h-20 flex-row items-center justify-between 
          border rounded-lg px-4 py-3 
          ${isDark ? 'bg-gray-800' : 'bg-primary-50 '}
        `}
        onPress={() => setOpen((prev) => !prev)}
      >
        <Text className={`text-base ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          {selectedLabel}
        </Text>
        {/* Optional icon here */}
      </TouchableOpacity>

      {open && (
        <View
          style={styles.dropdownContainer}
          className={`absolute top-16 w-full rounded-lg shadow-lg border z-50 
          ${isDark ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
        >
          <TextInput
            placeholder="Type to filter..."
            placeholderTextColor={isDark ? '#ccc' : '#888'}
            value={search}
            onChangeText={setSearch}
            className={`px-4 py-2 text-lg h-20 border-b 
            ${isDark ? 'text-gray-100 border-gray-700' : 'text-gray-700 border-gray-200'}`}
          />

          <FlatList
            data={filtered}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={1}
                className={`px-4 py-3 border-b 
                ${isDark ? 'border-gray-700' : 'border-gray-100'}`}
                onPress={() => {
                  onChange(item.value);
                  setOpen(false);
                  setSearch('');
                }}
              >
                <Text className={`text-base text-lg ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
            style={{ maxHeight: 200 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownContainer: {
    width: SCREEN_WIDTH - 32,
    left: 0,
    right: 0,
  },
});

export default SelectInput;
