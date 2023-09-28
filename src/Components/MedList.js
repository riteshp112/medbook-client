import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import medFetch from "../Actions/medFetchAction";
import { useFetch, usePost } from "../Actions/useFetch";
import FloatingActionComponent from "./FloatingActionComponent";

const List = (props) => {
  let {
    RenderItem,
    uri = "",
    uriParams = {},
    containerStyle,
    renderHeader,
    renderFooter,
    limit = 10,
    floatingActions = [],
    reloadEvents,
    ...restProps
  } = props;

  const [skip, setSkip] = useState(0);
  const [initialData, setInitialData] = useState([]);
  const ref = useRef();

  uriParams = { ...uriParams, limit, skip };
  const { data = [], loading } = usePost({
    uri,
    body: uriParams,
    reloadParams: [skip],
    initialData,
  });

  const onEndReached = () => {
    setSkip(data.length);
    setInitialData(data);
  };
  const keyExtractor = (item) => item?._id;
  const renderItemWithData = (props) => {
    return <RenderItem {...props} {...restProps} data={data} />;
  };

  const FloatingAction = () => {
    return floatingActions?.map((floatingAction) => (
      <FloatingActionComponent
        {...props}
        {...floatingAction}
        list={ref?.current}
      />
    ));
  };

  const ItemSeparatorComponent = () => {
    return (
      <View style={{ width: "100%", height: 1, backgroundColor: "skyblue" }} />
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", ...containerStyle }}>
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItemWithData}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={onEndReached}
        onEndReachedThreshold={limit / 2}
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListHeaderComponent={(props) =>
          renderHeader && renderHeader({ ...props, data })
        }
        ListFooterComponent={(props) =>
          renderHeader && renderFooter({ ...props, data })
        }
        {...restProps}
      />
      {floatingActions.length && <FloatingAction />}
    </View>
  );
};

export default List;
