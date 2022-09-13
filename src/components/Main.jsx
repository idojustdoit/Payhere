import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import SearchZone from "./SearchZone";
import RegisteredRepo from "./RegisteredRepo";
import styled from "styled-components";
import { RepoStateContext } from "../App";

const RepoTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 300;
  margin-left: 50px;
  margin-right: 10px;
  color: #c4b2a9;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Form = styled.form`
  width: 100%;
  display: inline-block;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;

  padding: 1rem;
  margin: 1rem;
  text-align: center;
  items-align: center;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 300;
  margin: 1rem;
  color: #c4b2a9;
`;

const Input = styled.input`
  border-radius: 5px;
  width: 400px;
`;

const Result = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

function Main() {
  const repolist = useContext(RepoStateContext);
  const token = "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";

  const [data, setData] = useState([]); //저장된 레포받을 상태값
  const [inputValue, setInputValue] = useState(""); // 검색어
  const [isLoading, setIsLoading] = useState(false); // 불러오는동안 로딩
  const [error, setError] = useState(false); // 검색이 이뤄지지 않을때
  const [repos, setRepos] = useState([]); //통신으로 검색될 레포 받을 곳

  useEffect(() => {
    let temp = [];
    const repinfo = localStorage.getItem("repinfo");
    const saveRepo = JSON.parse(repinfo);

    if (repinfo) {
      setData(saveRepo);
    } else {
      setData(temp);
    }

    if (!inputValue) {
      return;
    }

    setIsLoading(true);

    // API 통신
    axios
      .get("https://api.github.com/search/repositories?q=" + inputValue, {
        header: { Authorization: token },
      })
      .then((res) => {
        setIsLoading(false);
        setRepos(res.data.items);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(true);
      });
  }, [inputValue, repolist]);

  const searchHandler = (e) => {
    e.preventDefault();
    setInputValue(e.target.elements.query.value);
  };
  return (
    <div>
      <Container>
        <div>
          <RepoTitle>Selected Repo</RepoTitle>
        </div>
        {data.map((datas, id) => {
          return <RegisteredRepo key={id} data={datas} />;
        })}
      </Container>

      <Form onSubmit={searchHandler}>
        <img
          style={{ width: "100px", height: "100px" }}
          alt=""
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRDd0q3fi7KoRw66zX5weo15Kq5AcqgShewGWa_s-hfm1s-E42r5DdlW5epJlbXTVxf_A&usqp=CAU"
        />{" "}
        <Title>Git-Hub issues searcher!</Title>
        <Input
          type="text"
          name="query"
          className="github_search_input"
          placeholder="Search Github Repositories"
        />
      </Form>
      <Result>
        {isLoading ? (
          <div style={{ textAlign: "center" }}>
            <RepoTitle>Loading...</RepoTitle>
          </div>
        ) : (
          <div>
            {repos.map((repo, id) => {
              return (
                <SearchZone key={id} repos={repo} id={id} repolist={repolist} />
              );
            })}
          </div>
        )}
        {error && <div>에러가 났습니다!!!</div>}
      </Result>
    </div>
  );
}

export default Main;
