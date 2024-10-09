import React from "react";
import Login from "./pages/Login";
import ErrorBox from "./pages/ErrorBox";
import { useAppDispatch, useAppSelector } from "./state";
import { isApiError } from "./state/serviceCenter/serviceCenter.selector";
import { scActions } from "./state/serviceCenter/serviceCenter.store";

function App() {
  const [isErrorVisible, setIsErrorVisible] = React.useState(false);
  const { isVisible, message } = useAppSelector(isApiError);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (isVisible) {
      setIsErrorVisible(true);
    }
  }, [isVisible]);
  const errorHandler = () => {
    setIsErrorVisible(false);
    dispatch(
      scActions.setApiError({
        isVisible: false,
        message: "",
      })
    );
  };
  return (
    <div className="h-screen w-screen font-poppins">
      <Login />
      {isErrorVisible && (
        <div className="fixed inset-0 bg-black opacity-95 flex items-center justify-center z-50">
          <ErrorBox cross={errorHandler} message={message} />
        </div>
      )}

      {/* <Home /> */}
      {/* <Main /> */}
      {/* <RegistrationTab /> */}
      {/* <Verification /> */}
      {/* <Photography /> */}
      {/* <FlexInstallation /> */}
      {/* <TrainAndOnboard /> */}
      {/* <NextFollowup /> */}
    </div>
  );
}

export default App;
