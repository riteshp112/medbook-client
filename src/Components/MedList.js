import React, { useRef, useState } from "react";
import { FlatList, View } from "react-native";
import { usePost } from "../Actions/useFetch";
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
    afterFetch,
    hideRowSeparator,
    fullScreen = true,
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
    afterFetch,
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
      <View
        style={{ width: "100%", height: 1, backgroundColor: "lightskyblue" }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ffffff",
        ...containerStyle,
      }}
    >
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
        ItemSeparatorComponent={
          !hideRowSeparator ? ItemSeparatorComponent : void 0
        }
        contentContainerStyle={{ flexGrow: fullScreen ? 1 : void 0 }}
        ListFooterComponentStyle={{ flex: 1, justifyContent: "flex-end" }}
        ListHeaderComponentStyle={{ flex: 1, justifyContent: "flex-start" }}
        ListHeaderComponent={
          renderHeader
            ? (props) => renderHeader({ ...props, ...restProps, data })
            : void 0
        }
        ListFooterComponent={
          renderFooter
            ? (props) => renderFooter({ ...props, ...restProps, data })
            : void 0
        }
        {...restProps}
      />
      {floatingActions.length > 0 && <FloatingAction />}
    </View>
  );
};

export default List;
