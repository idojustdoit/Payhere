import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useReducer, useRef, createContext, useEffect } from "react";
import Detail from "./components/Detail";
import Main from "./components/Main";

const reducer = (state, action) => {
  let newState = [];
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      newState = [action.data, ...state];

      break;
    }
    case "REMOVE": {
      newState = state.filter((it, index) => it.id !== action.targetId);
      break;
    }

    default:
      return state;
  }
  localStorage.setItem("repinfo", JSON.stringify(newState));
  return newState;
};

export const RepoStateContext = createContext();
export const Repodispatchcontext = createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  // useEffect(() => {
  //   const localData = localStorage.getItem("repinfo");
  //   if (localData) {
  //     const repinfo = JSON.parse(localData).sort(
  //       (a, b) => parseInt(b.id) - parseInt(a.id)
  //     );
  //     dataId.current = parseInt(repinfo[0].id) + 1;
  //     dispatchEvent({ type: "INIT", data: repinfo });
  //   }
  // }, []);

  //SAVE
  const onCreate = (repoInfo, id, like) => {
    dispatch({
      type: "CREATE",
      data: {
        repoInfo,
        id,
        like,
      },
    });
    dataId.current += 1;
  };

  //REMOVE
  const onRemove = (targetId) => {
    dispatch({ type: "REMOVE", targetId });
  };

  useEffect(() => {
    let repinfo = localStorage.getItem("repinfo ");
    if (repinfo == null) {
      repinfo = [];
    } else {
      repinfo = JSON.parse(repinfo);
    }
  }, []);

  return (
    <RepoStateContext.Provider value={data}>
      <Repodispatchcontext.Provider value={{ onCreate, onRemove }}>
        <div className="App">
          <Router>
            <Routes>
              <Route path="/" element={<Main dataId={dataId} />}></Route>
              <Route
                path="/detail/:userInfo/:repoInfo"
                element={<Detail />}
              ></Route>
            </Routes>
          </Router>
        </div>
      </Repodispatchcontext.Provider>
    </RepoStateContext.Provider>
  );
}

export default App;
