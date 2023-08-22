import {View, Text, Modal, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';

interface Iprops {
  onDropDownItemPressed: (name: string) => void;
  showSelectTypePopup: boolean;
  showSelectTitleFieldPopup?: boolean;
  flag: number;
  categoryFields?: {title: string; type: string}[];
}

export default function SelectTypePopup(props: Iprops) {
  return (
    <Modal
      visible={
        props.showSelectTitleFieldPopup
          ? props.showSelectTitleFieldPopup
          : props.showSelectTypePopup
      }
      transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            // height: 300,
            width: '70%',
            backgroundColor: 'white',
            borderRadius: 12,
            paddingTop: 10,
          }}>
          <Text style={{color: 'black', fontSize: 20, alignSelf: 'center'}}>
            {props.showSelectTitleFieldPopup
              ? 'Select Title Field'
              : 'Select Type'}
          </Text>
          <FlatList
            data={
              props.showSelectTitleFieldPopup
                ? props.categoryFields
                : [
                    {title: 'Text', type: ''},
                    {title: 'Check Box', type: ''},
                    {title: 'Date', type: ''},
                    {title: 'Number', type: ''},
                  ]
            }
            renderItem={({item}) => (
              <TouchableOpacity
                style={{
                  backgroundColor: 'grey',
                  marginVertical: 10,
                  width: '80%',
                  alignSelf: 'center',
                }}
                onPress={() => {
                  props.onDropDownItemPressed(item.title);
                }}>
                <Text
                  style={{
                    color: 'black',
                    textAlign: 'center',
                    fontSize: 18,
                    marginVertical: 10,
                  }}>
                  {item.title.length === 0
                    ? 'Please Add Title First'
                    : item.title}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </Modal>
  );
}
