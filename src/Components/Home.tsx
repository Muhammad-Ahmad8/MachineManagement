import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Button,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React from 'react';
import {IcategoriesListObject} from '../Screens/HomeScreen';
import SelectTypePopup from './SelectTypePopup';

interface Iprops {
  categoriesList: IcategoriesListObject[];
  onAddCategoryPressed: () => void;
  onAddFieldPressed: (val: number) => void;
  onCategoryNameChange: (val: string, CategoryIndex: number) => void;
  onFieldNameChange: (
    val: string,
    CategoryIndex: number,
    fieldIndex: number,
  ) => void;
  onRemoveCategoryPressed: (CategoryIndex: number) => void;
  onRemoveFieldPressed: (CategoryIndex: number, fielIndex: number) => void;
  showSelectTypePopup: boolean;
  onDropDownItemPressed: (name: string) => void;
  onSelectTitleFieldPressed: (categoryId: number) => void;
  showSelectTitleFieldPopup: boolean;
  activeCategoryIndex: number;
}

export default function Home(props: Iprops) {
  return (
    <View style={styles.mainContainer}>
      <SelectTypePopup
        onDropDownItemPressed={props.onDropDownItemPressed}
        showSelectTypePopup={props.showSelectTypePopup}
        showSelectTitleFieldPopup={props.showSelectTitleFieldPopup}
        flag={props.showSelectTitleFieldPopup ? 1 : 0}
        categoryFields={props.categoriesList[props.activeCategoryIndex]?.fields}
      />
      <FlatList
        data={props.categoriesList}
        renderItem={({item, index}) => (
          <View style={styles.itemContainer}>
            <Text style={{fontSize: 20, color: 'black', marginTop: 10}}>
              {item.title}
            </Text>
            <TextInput
              placeholder="Category Name"
              value={item.title}
              style={{
                fontSize: 16,
                color: 'black',
                borderWidth: 2,
                marginTop: 10,
                paddingHorizontal: 6,
              }}
              onChangeText={val => props.onCategoryNameChange(val, index)}
            />
            {item.fields.map((_item, fieldIndex) => (
              <>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <TextInput
                    placeholder="Field Name"
                    value={_item.title}
                    onChangeText={val =>
                      props.onFieldNameChange(val, index, fieldIndex)
                    }
                    style={{
                      fontSize: 16,
                      color: 'black',
                      borderWidth: 2,
                      marginTop: 10,
                      paddingHorizontal: 6,
                      width: '70%',
                    }}
                  />
                  <Text
                    style={{
                      color: 'purple',
                      minHeight: 50,
                      borderWidth: 2,
                      justifyContent: 'center',
                      textAlignVertical: 'center',
                      borderColor: 'grey',
                      paddingHorizontal: 10,
                      fontSize: 16,
                      // width: '16%',
                    }}>
                    {_item.type}
                  </Text>
                </View>
                <TouchableOpacity
                  onPress={() => props.onRemoveFieldPressed(index, fieldIndex)}>
                  <Text style={{color: 'grey'}}>Remove</Text>
                </TouchableOpacity>
              </>
            ))}
            <View>
              <Text></Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: 'blue',
                width: '97%',
                height: 40,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}
              onPress={() => props.onSelectTitleFieldPressed(index)}>
              <Text style={{color: 'white'}}>
                {item.titleField.length === 0
                  ? 'Select Title Field'
                  : 'Title Field:' + item.titleField}
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'blue',
                  width: 120,
                  height: 40,
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => props.onAddFieldPressed(index)}>
                <Text style={{color: 'white'}}>Add New Field</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.onRemoveCategoryPressed(index)}>
                <Text style={{marginLeft: 10}}>Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <TouchableOpacity
        style={styles.adCategoryBtn}
        onPress={props.onAddCategoryPressed}>
        <Text style={styles.btnText}>Add Category</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  itemContainer: {
    // backgroundColor: 'red',
    width: '96%',
    marginLeft: '2%',
    marginVertical: 10,
    elevation: 6,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  adCategoryBtn: {
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'blue',
    marginBottom: 20,
  },
  btnText: {
    color: 'white',
    fontSize: 14,
  },
});
