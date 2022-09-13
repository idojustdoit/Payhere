import { useEffect, useState, useContext } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Repodispatchcontext } from "../App.js";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 250px;
  height: 250px;
  background-color: #c4b2a9;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 300;
  margin: 1rem;
  color: white;
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
  border: 1px solid black;
  transition: all 80ms linear;
  user-select: none;
  outline: none;
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

const RegisteredRepo = (datas) => {
  const navigate = useNavigate();
  const { onRemove } = useContext(Repodispatchcontext); //삭제 리듀서

  const issueInfo = datas.data.repoInfo.full_name; // 쿼리값으로 쓸 값

  // 저장된 레포 삭제
  const removeRepo = (id) => {
    onRemove(id);
  };

  return (
    <div>
      <Card>
        <Title
          onClick={() => {
            navigate(`/detail/${issueInfo}`);
          }}
        >
          {" "}
          {datas.data.repoInfo.full_name}
        </Title>
        <Button onClick={() => removeRepo(datas.data.id)}>삭제</Button>
      </Card>
    </div>
  );
};

export default RegisteredRepo;
