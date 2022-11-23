// @ts-nocheck
import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";
import medFetch from "../../../Actions/medFetchAction";
import FloatingActionComponent from "../../../Components/FloatingActionComponent";
import PostItem from "./PostItem";
import React from "react";
import MedList from "../../../Components/MedList";

const PostList = () =>
  MedList({
    uri: { type: "select", table: "post", condition: {} },
    renderItem: ({ item, ...restProps }) => (
      <PostItem item={item} {...restProps} />
    ),
  });

export default PostList;
