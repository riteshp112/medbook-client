// @ts-nocheck
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import medFetch from "../Actions/medFetchAction";
const List = (props) => {
  const {
    renderItem,
    uri,
    containerStyle,
    renderHeader,
    renderFooter,
    increasePerScroll = 5,
    floatingAction,
    ...restProps
  } = props;
  const [data, setData] = useState();
  const [dataLength, setDataLength] = useState(10);
  const [isLoading, setIsLoading] = useState();
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      medFetch({
        ...uri,
        limit: dataLength,
      }).then(({ response } = {}) => {
        setIsLoading(false);
        setData(response);
      });
    }
  }, [dataLength, isFocused]);

  return (
    <View style={{ flex: 1, justifyContent: "center", ...containerStyle }}>
      {renderHeader ? renderHeader({ ...props, data }) : void 0}
      <FlatList
        data={data}
        renderItem={(info) =>
          renderItem({ ...info, ...props, data, setDataLength })
        }
        keyExtractor={(item) => item?._id}
        onEndReached={() => {
          setDataLength((prev) => prev + increasePerScroll);
        }}
        showsVerticalScrollIndicator={false}
        {...restProps}
      ></FlatList>
      {isLoading && (
        <ActivityIndicator style={{ alignSelf: "center" }}></ActivityIndicator>
      )}
      {renderFooter ? renderFooter({ ...props, data }) : void 0}
      {floatingAction ? floatingAction({ ...props, data }) : void 0}
    </View>
  );
};

const MedList = (props) => {
  if (typeof props == "function")
    return (info) => {
      const newProps = props(info);
      return <List {...newProps} {...info} />;
    };
  return (info) => <List {...props} {...info} />;
};

export default MedList;