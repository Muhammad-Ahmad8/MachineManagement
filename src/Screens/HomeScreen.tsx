import {View, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import Home from '../Components/Home';
import {AppState} from '../Store/AppState';
import {useDispatch, useSelector} from 'react-redux';
import {setCategoriesList} from '../Store/AppState';

export interface IcategoriesListObject {
  title: string;
  fields: {title: string; type: string}[];
  titleField: string;
}

let activeCategoryIndex = -1;
export default function HomeScreen() {
  const [showSelectTypePopup, setShowSelectTypePopup] = useState(false);
  const [showSelectTitleFieldPopup, setShowSelectTitleFieldPopup] =
    useState(false);

  const dispatch = useDispatch();
  const categoriesList = useSelector(
    (state: {app: AppState}) => state.app.categoriesList,
  );
  const onAddCategoryPressed = () => {
    let temp = JSON.parse(JSON.stringify(categoriesList));
    let listItem: IcategoriesListObject = {
      title: 'New Category',
      fields: [
        {
          title: '',
          type: 'Text',
        },
      ],
      titleField: '',
    };
    temp.push(listItem);
    dispatch(setCategoriesList(temp));
  };
  const onAddFieldPressed = (index: number) => {
    activeCategoryIndex = index;
    setShowSelectTypePopup(true);
  };
  const onRemoveFieldPressed = (CategoryIndex: number, fielIndex: number) => {
    let temp = JSON.parse(JSON.stringify(categoriesList));
    temp[CategoryIndex].fields.splice(fielIndex, 1);
    dispatch(setCategoriesList(temp));
  };
  const onRemoveCategoryPressed = (CategoryIndex: number) => {
    let temp = JSON.parse(JSON.stringify(categoriesList));
    temp.splice(CategoryIndex, 1);
    dispatch(setCategoriesList(temp));
  };
  const onCategoryNameChange = (val: string, CategoryIndex: number) => {
    let temp = JSON.parse(JSON.stringify(categoriesList));
    temp[CategoryIndex].title = val;
    dispatch(setCategoriesList(temp));
  };
  const onFieldNameChange = (
    val: string,
    CategoryIndex: number,
    fieldIndex: number,
  ) => {
    let temp = JSON.parse(JSON.stringify(categoriesList));
    temp[CategoryIndex].fields[fieldIndex].title = val;
    dispatch(setCategoriesList(temp));
  };
  const onDropDownItemPressed = (selectedType: string) => {
    if (showSelectTypePopup) {
      let temp = JSON.parse(JSON.stringify(categoriesList));
      let fieldItem = {
        id: temp[activeCategoryIndex].fields.length,
        title: '',
        type: selectedType,
      };
      temp[activeCategoryIndex].fields.push(fieldItem);
      dispatch(setCategoriesList(temp));
    } else {
      let temp = JSON.parse(JSON.stringify(categoriesList));
      temp[activeCategoryIndex].titleField = selectedType;
      dispatch(setCategoriesList(temp));
    }
    setShowSelectTitleFieldPopup(false);
    setShowSelectTypePopup(false);
  };
  const onSelectTitleFieldPressed = (categoryIndex: number) => {
    activeCategoryIndex = categoryIndex;
    setShowSelectTitleFieldPopup(true);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Home
        categoriesList={categoriesList}
        onAddCategoryPressed={onAddCategoryPressed}
        onAddFieldPressed={onAddFieldPressed}
        onCategoryNameChange={onCategoryNameChange}
        onFieldNameChange={onFieldNameChange}
        onRemoveCategoryPressed={onRemoveCategoryPressed}
        onRemoveFieldPressed={onRemoveFieldPressed}
        showSelectTypePopup={showSelectTypePopup}
        onDropDownItemPressed={onDropDownItemPressed}
        showSelectTitleFieldPopup={showSelectTitleFieldPopup}
        onSelectTitleFieldPressed={onSelectTitleFieldPressed}
        activeCategoryIndex={activeCategoryIndex}
      />
    </SafeAreaView>
  );
}
