import React, { useState, useEffect, useContext } from "react";
import { Repodispatchcontext } from "../App.js";
import styled from "styled-components";

const Card = styled.div`
  display: inline-block;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;
  height: 15%;
  color: #755139;
  background-color: #f2edd7;
  border-radius: 4px;
  padding: 10px;
  margin: 1rem;
  cursor: pointer;
`;

const Button = styled.button`
  align-content: center;
  text-align: center;
  color: #f2edd7;
  background-color: #755139;
  border: none;
  font-size: 14px;
  font-weight: 400;
  width: 70px;
  height: 36px;
  margin-top: 1.5rem;
  border: 1px solid black;
  transition: all 80ms linear;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  &:hover {
    background-color: rgba(74, 21, 75, 0.9);
    border: none;
  }
  &:focus {
    --saf-0: rgba(var(--sk_highlight, 18, 100, 163), 1);
    box-shadow: 0 0 0 1px var(--saf-0), 0 0 0 5px rgba(29, 155, 209, 0.3);
  }
`;

const SearchZone = (repo) => {
  const { onCreate } = useContext(Repodispatchcontext);

  // 레포지토리 배열 불러오기
  let repinfo = localStorage.getItem("repinfo");
  let saveRepo = JSON.parse(repinfo);
  let length = saveRepo.length + 1;

  // 레포지토리에 저장
  const addIssue = (id) => {
    if (length > 4) {
      alert("최대 4개까지 추가할 수 있습니다.");
    } else {
      onCreate(repo.repos, repo.repos.id);
    }
  };

  return (
    <Card>
      <img
        alt=""
        src={repo.repos.owner.avatar_url}
        style={{ width: "50px", height: "50px", borderRadius: "10px" }}
      />
      <h3>Name: {repo.repos.name}</h3> <br />
      <span>description: {repo.repos.description}</span>
      <br />
      <span>Count of Issues: {repo.repos.open_issues}</span>
      <br />
      <Button
        onClick={() => {
          addIssue(repo.repos.id);
        }}
      >
        추가
      </Button>
    </Card>
  );
};

export default SearchZone;
