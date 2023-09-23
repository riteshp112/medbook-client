import React from "react";
import { Button, TextInput, View } from "react-native";
import { Formik } from "formik";
import { CustomRenders } from "./FormEditors";
import { defaultFormTheme } from "./Theme";

export const Form = (props) => {
  const {
    fields = [],
    onSubmit,
    submitText = "Submit",
    initialValues = {},
    theme = defaultFormTheme,
  } = props;

  const FormFields = (formikProps) => {
    return (
      <View>
        {fields.map((field) => {
          const { type } = field;
          const Component = CustomRenders[type];
          return (
            <Component
              {...field}
              {...formikProps}
              style={{
                ...theme[type],
              }}
            />
          );
        })}
      </View>
    );
  };

  const SubmitButton = ({ handleSubmit }) => {
    return <Button title={submitText} onPress={handleSubmit} />;
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <View style={theme.containerStyle}>
          <FormFields {...props} />
          <SubmitButton {...props} />
        </View>
      )}
    </Formik>
  );
};
