import { createMmdGeneralDatePicker } from ".";

createMmdGeneralDatePicker("#app");

if (import.meta.hot) {
  import.meta.hot.accept(".", (newModule) => {
    const newCreateMmdGeneralDatePicker = newModule?.createMmdGeneralDatePicker;
    newCreateMmdGeneralDatePicker?.("#app");
  });
}
