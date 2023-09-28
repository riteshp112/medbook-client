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
    increasePerScroll = 5,
    initialLimit = 10,
    floatingActions = [],
    reloadEvents,
    ...restProps
  } = props;

  const [limit, setLimit] = useState(initialLimit);
  const [skip, setSkip] = useState(0);
  const ref = useRef();

  uriParams = { ...uriParams, limit, skip };

  const { data, loading } = usePost({
    uri,
    body: uriParams,
    reloadParams: [limit, skip],
  });

  const onEndReached = () => {
    setLimit((prev) => prev + increasePerScroll);
    // setSkip(data?.length || 0);
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

  return (
    <View style={{ flex: 1, justifyContent: "center", ...containerStyle }}>
      {renderHeader && renderHeader({ ...props, data })}
      <FlatList
        ref={ref}
        data={data}
        renderItem={renderItemWithData}
        keyExtractor={keyExtractor}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        refreshing={loading}
        onRefresh={onEndReached}
        {...restProps}
      />
      {loading && <ActivityIndicator style={{ alignSelf: "center" }} />}
      {renderFooter && renderFooter({ ...props, data })}
      {floatingActions.length && <FloatingAction />}
    </View>
  );
};

export default List;
