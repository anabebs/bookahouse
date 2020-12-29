import { createStore, action } from "easy-peasy";

export default createStore({
  login: {
    loggedIn: false,
    setLoggedIn: action((state) => {
      // @ts-ignore
      state.loggedIn = true;
    }),
  },
  modals: {
    showModal: false,
    showLoginModal: false,
    showRegistrationModal: false,
    setShowModal: action((state) => {
      // @ts-ignore
      state.showModal = true;
    }),
    setHideModal: action((state) => {
      // @ts-ignore
      state.showModal = false;
    }),
    setShowLoginModal: action((state) => {
      // @ts-ignore
      state.showModal = true;
      // @ts-ignore
      state.showLoginModal = true;
      // @ts-ignore
      state.showRegistrationModal = false;
    }),
    setShowRegistrationModal: action((state) => {
      // @ts-ignore
      state.showModal = true;
      // @ts-ignore
      state.showLoginModal = false;
      // @ts-ignore
      state.showRegistrationModal = true;
    }),
  },
});
